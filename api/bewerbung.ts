// Vercel Function for the recruiting funnel (/kundenberater, /kundenberater-2).
//
// POST application/json      -> new application: Slack message to the team,
//                               optional notification mail, thank-you mail to the applicant.
// POST multipart/form-data   -> optional CV upload from the thank-you page: mailed as
//                               attachment to LEAD_NOTIFY_EMAIL, short note in Slack.
//
// Environment variables (Vercel project settings):
//   SLACK_WEBHOOK_URL   Slack incoming webhook of the channel that receives the leads
//   MAILGUN_API_KEY     Mailgun private API key
//   MAILGUN_DOMAIN      verified sending domain, e.g. mg.mq-connect.de
//   MAILGUN_FROM        sender, e.g. "MQ-Connect <bewerbung@mg.mq-connect.de>"
//   MAILGUN_API_BASE    optional, defaults to the EU region https://api.eu.mailgun.net
//   LEAD_NOTIFY_EMAIL   optional, internal inbox that also gets every lead (+ the CVs)
//
// Rule: an application only counts as received when at least one internal channel
// (Slack or notification mail) accepted it. The applicant's thank-you mail is best effort.

const REPLY_TO = 'info@mq-connect.de';
const PHONE = '0163 / 40 36 513';
const MAX_CV_BYTES = 4 * 1024 * 1024; // Vercel limits request bodies to 4.5 MB.

interface Application {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  telefonLand?: string;
  wohnort: string;
  prioritaeten?: string[];
  vertriebserfahrung?: string;
  deutschkenntnisse?: string;
  fuehrerschein?: string;
  erreichbarkeit?: string;
  variante?: string;
  eingereichtAm?: string;
}

const env = (key: string) => process.env[key]?.trim() || '';

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const clip = (value: unknown, max = 200) => String(value ?? '').trim().slice(0, max);

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Slack mrkdwn only needs &, < and > escaped.
const escapeSlack = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/* --------------------------------- Delivery --------------------------------- */

async function postToSlack(text: string): Promise<boolean> {
  const url = env('SLACK_WEBHOOK_URL');
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) console.error('slack_failed', res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error('slack_failed', error);
    return false;
  }
}

interface MailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachment?: File;
}

async function sendMail(mail: MailInput): Promise<boolean> {
  const apiKey = env('MAILGUN_API_KEY');
  const domain = env('MAILGUN_DOMAIN');
  const from = env('MAILGUN_FROM');
  if (!apiKey || !domain || !from) return false;
  const base = env('MAILGUN_API_BASE') || 'https://api.eu.mailgun.net';

  const form = new FormData();
  form.append('from', from);
  form.append('to', mail.to);
  form.append('subject', mail.subject);
  form.append('text', mail.text);
  if (mail.html) form.append('html', mail.html);
  form.append('h:Reply-To', REPLY_TO);
  if (mail.attachment) form.append('attachment', mail.attachment, mail.attachment.name);

  try {
    const res = await fetch(`${base}/v3/${domain}/messages`, {
      method: 'POST',
      headers: { Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}` },
      body: form,
    });
    if (!res.ok) console.error('mail_failed', res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error('mail_failed', error);
    return false;
  }
}

/* --------------------------------- Content ---------------------------------- */

function leadLines(a: Application): [string, string][] {
  return [
    ['Name', `${a.vorname} ${a.nachname}`],
    ['Telefon', a.telefon],
    ['E-Mail', a.email],
    ['Wohnort', a.wohnort],
    ['Erreichbar', a.erreichbarkeit || '–'],
    ['Vertriebserfahrung', a.vertriebserfahrung || '–'],
    ['Führerschein', a.fuehrerschein || '–'],
    ['Deutschkenntnisse', a.deutschkenntnisse || '–'],
    ['Wichtig im Job', a.prioritaeten?.length ? a.prioritaeten.join(', ') : '–'],
    ['Landingpage', a.variante === 'classic' ? '/kundenberater-2' : '/kundenberater'],
  ];
}

function slackLeadText(a: Application): string {
  const rows = leadLines(a)
    .map(([label, value]) => `*${label}:* ${escapeSlack(value)}`)
    .join('\n');
  return `:tada: *Neue Bewerbung Kundenberater*\n${rows}`;
}

function internalLeadText(a: Application): string {
  return ['Neue Bewerbung Kundenberater (Außendienst)', '', ...leadLines(a).map(([l, v]) => `${l}: ${v}`)].join('\n');
}

// Reachability answer ("Vormittags von 8 – 12 Uhr") -> "vormittags zwischen 8 und 12 Uhr".
function reachabilityPhrase(value?: string): string {
  if (!value) return '';
  const lower = value.charAt(0).toLowerCase() + value.slice(1);
  return lower.replace(/ von (\d+) – (\d+) Uhr/, ' zwischen $1 und $2 Uhr');
}

function thankYouMail(a: Application): Pick<MailInput, 'subject' | 'text' | 'html'> {
  const when = reachabilityPhrase(a.erreichbarkeit);
  const callLine = when
    ? `Wir melden uns in den nächsten Tagen telefonisch bei Dir, wie gewünscht ${when}.`
    : 'Wir melden uns in den nächsten Tagen telefonisch bei Dir.';
  const paragraphs = [
    `Hallo ${a.vorname},`,
    'vielen Dank für Deine Bewerbung als Kundenberater im Außendienst bei MQ-Connect. Deine Angaben sind bei uns angekommen.',
    `${callLine} Ruft Dich eine unbekannte Nummer an, sind das vermutlich wir.`,
    `Du hast vorher schon eine Frage? Antworte einfach auf diese E-Mail oder ruf uns an: ${PHONE}.`,
    'Viele Grüße\nMilan Jasieniecki\nMQ-Connect',
  ];
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1F2147;max-width:560px">
${paragraphs.map((p) => `<p style="margin:0 0 14px">${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('\n')}
<p style="margin:24px 0 0;font-size:12px;color:#64748b">MQ-Connect · Uerdinger Str. 77 · 47441 Moers · <a href="https://mq-connect.de" style="color:#64748b">mq-connect.de</a></p>
</div>`;
  return {
    subject: 'Danke für Deine Bewerbung bei MQ-Connect',
    text: paragraphs.join('\n\n'),
    html,
  };
}

/* --------------------------------- Handlers --------------------------------- */

async function handleApplication(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  const application: Application = {
    vorname: clip(body.vorname, 80),
    nachname: clip(body.nachname, 80),
    email: clip(body.email, 160),
    telefon: clip(body.telefon, 40),
    telefonLand: clip(body.telefonLand, 60),
    wohnort: clip(body.wohnort, 120),
    prioritaeten: Array.isArray(body.prioritaeten) ? body.prioritaeten.slice(0, 10).map((p) => clip(p, 80)) : [],
    vertriebserfahrung: clip(body.vertriebserfahrung, 80),
    deutschkenntnisse: clip(body.deutschkenntnisse, 20),
    fuehrerschein: clip(body.fuehrerschein, 40),
    erreichbarkeit: clip(body.erreichbarkeit, 60),
    variante: clip(body.variante, 20),
    eingereichtAm: new Date().toISOString(),
  };

  const missing = (['vorname', 'nachname', 'email', 'telefon', 'wohnort'] as const).filter((k) => !application[k]);
  if (missing.length) return json(400, { ok: false, error: 'missing_fields', fields: missing });
  if (!isEmail(application.email)) return json(400, { ok: false, error: 'invalid_email' });

  // Last-resort backup: the full lead is in the Vercel runtime logs even if every channel fails.
  console.log('lead_received', JSON.stringify(application));

  const notifyEmail = env('LEAD_NOTIFY_EMAIL');
  const [slackOk, notifyOk] = await Promise.all([
    postToSlack(slackLeadText(application)),
    notifyEmail
      ? sendMail({
          to: notifyEmail,
          subject: `Neue Bewerbung: ${application.vorname} ${application.nachname}`,
          text: internalLeadText(application),
        })
      : Promise.resolve(false),
  ]);

  if (!slackOk && !notifyOk) {
    console.error('lead_not_delivered', application.email);
    return json(502, { ok: false, error: 'not_delivered' });
  }

  const confirmationOk = await sendMail({ to: application.email, ...thankYouMail(application) });
  return json(200, { ok: true, slack: slackOk, notify: notifyOk, confirmation: confirmationOk });
}

async function handleCvUpload(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, error: 'invalid_form' });
  }
  const file = form.get('datei');
  if (!(file instanceof File) || file.size === 0) return json(400, { ok: false, error: 'missing_file' });
  if (file.size > MAX_CV_BYTES) return json(413, { ok: false, error: 'file_too_large' });

  const name = clip(form.get('name'), 160) || 'Unbekannt';
  const email = clip(form.get('email'), 160);
  const notifyEmail = env('LEAD_NOTIFY_EMAIL');

  const mailOk = notifyEmail
    ? await sendMail({
        to: notifyEmail,
        subject: `Lebenslauf: ${name}`,
        text: `Lebenslauf zur Bewerbung von ${name}${email ? ` (${email})` : ''} im Anhang.`,
        attachment: file,
      })
    : false;
  // The file itself can't go through a Slack webhook, so Slack only gets a pointer to the inbox.
  await postToSlack(
    mailOk
      ? `:page_facing_up: Lebenslauf von *${escapeSlack(name)}* ist per Mail an ${escapeSlack(notifyEmail)} gegangen.`
      : `:warning: Lebenslauf von *${escapeSlack(name)}* konnte nicht zugestellt werden, bitte telefonisch nachfragen.`,
  );

  return mailOk ? json(200, { ok: true }) : json(502, { ok: false, error: 'not_delivered' });
}

export async function POST(request: Request): Promise<Response> {
  const type = request.headers.get('content-type') || '';
  if (type.includes('multipart/form-data')) return handleCvUpload(request);
  return handleApplication(request);
}
