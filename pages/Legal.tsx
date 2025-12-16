import React from 'react';
import { APP_CONFIG } from '../constants';

export const Impressum: React.FC = () => (
  <div className="pt-12 pb-24 max-w-3xl mx-auto px-4">
    <h1 className="text-3xl font-bold mb-8 text-slate-900">Impressum</h1>
    
    <div className="prose prose-slate max-w-none text-slate-600">
      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>MQ-Connect</strong><br />
        Inhaber: Milan Jasieniecki<br />
        Uerdinger Str. 77<br />
        47441 Moers<br />
        Deutschland
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Kontakt</h2>
      <p>
        Telefon: —<br />
        E-Mail: <a href="mailto:info@mq-connect.de" className="text-[#004e82] hover:underline font-medium">info@mq-connect.de</a>
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Unternehmensangaben</h2>
      <p>
        <strong>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</strong><br />
        —
      </p>
      <p>
        <strong>Handelsregister:</strong><br />
        —
      </p>
      <p>
        <strong>Registergericht:</strong><br />
        —
      </p>
      <p className="text-sm italic text-slate-400">
        (Hinweis: Falls Einzelunternehmen ohne HR-Eintrag → diese Punkte können später vollständig entfernt werden.)
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Postadresse</h2>
      <p>
        MQ-Connect<br />
        Uerdinger Str. 77<br />
        47441 Moers<br />
        Deutschland
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#004e82] hover:underline">https://ec.europa.eu/consumers/odr/</a>
      </p>
      <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

      <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  </div>
);

export const Datenschutz: React.FC = () => (
  <div className="pt-12 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">Datenschutzerklärung</h1>
    
    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
      
      {/* 1. Datenschutz auf einen Blick */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-6 border-b border-slate-200 pb-2">1. Datenschutz auf einen Blick</h2>
        
        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie der nachfolgenden Datenschutzerklärung.
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Datenerfassung auf dieser Website</h3>
        
        <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
        <p>
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt <strong>„Hinweis zur verantwortlichen Stelle“</strong> in dieser Datenschutzerklärung entnehmen.
        </p>

        <p><strong>Wie erfassen wir Ihre Daten?</strong></p>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. durch Eingaben in ein Kontaktformular). Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
        </p>

        <p><strong>Wofür nutzen wir Ihre Daten?</strong></p>
        <p>
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </p>

        <p><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht auf Berichtigung oder Löschung dieser Daten. Eine erteilte Einwilligung können Sie jederzeit für die Zukunft widerrufen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </p>
      </section>

      {/* 2. Hosting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-6 border-b border-slate-200 pb-2">2. Hosting</h2>
        
        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Hosting mit All-Inkl</h3>
        <p>
          Wir hosten unsere Website bei <strong>All-Inkl</strong>.<br />
          Anbieter ist die ALL-INKL.COM – Neue Medien Münnich, Inh. René Münnich, Hauptstraße 68, 02742 Friedersdorf.
        </p>
        <p>
          Details entnehmen Sie der Datenschutzerklärung von All-Inkl:<br />
          <a href="https://all-inkl.com/datenschutzinformationen/" target="_blank" rel="noopener noreferrer" className="text-[#004e82] hover:underline break-all">
            https://all-inkl.com/datenschutzinformationen/
          </a>
        </p>
        <p>
          Die Verwendung von All-Inkl erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Sofern eine Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Auftragsverarbeitung</h3>
        <p>
          Wir haben mit dem Anbieter einen Vertrag zur Auftragsverarbeitung (AVV) geschlossen.
        </p>
      </section>

      {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-6 border-b border-slate-200 pb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Datenschutz</h3>
        <p>
          Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei E-Mail-Kommunikation) Sicherheitslücken aufweisen kann. Ein vollständiger Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
        <p>
          <strong>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</strong>
        </p>
        <p className="bg-slate-50 p-6 rounded-xl border border-slate-100">
          <strong>MQ-Connect</strong><br />
          <strong>Inhaber: Milan Jasieniecki</strong><br />
          Uerdinger Str. 77<br />
          47441 Moers<br />
          Deutschland<br /><br />
          E-Mail: <a href="mailto:info@mq-connect.de" className="text-[#004e82] hover:underline font-bold">info@mq-connect.de</a>
        </p>
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung personenbezogener Daten entscheidet.
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Speicherdauer</h3>
        <p>
          Sofern innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Hinweis zur Datenübermittlung in Drittstaaten</h3>
        <p>
          Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder anderen Drittstaaten. Es kann nicht ausgeschlossen werden, dass Behörden dort auf personenbezogene Daten zugreifen. Ein mit der EU vergleichbares Datenschutzniveau kann nicht garantiert werden.
        </p>
      </section>

      {/* 4. Datenerfassung auf dieser Website */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-6 border-b border-slate-200 pb-2">4. Datenerfassung auf dieser Website</h2>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Cookies</h3>
        <p>
          Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
        </p>
        <p>
          Notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Andere Cookies werden nur mit Ihrer Einwilligung gespeichert (Art. 6 Abs. 1 lit. a DSGVO).
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Einwilligung mit Borlabs Cookie</h3>
        <p>
          Diese Website nutzt Borlabs Cookie zur Verwaltung Ihrer Cookie-Einwilligungen.<br />
          Anbieter: Borlabs – Benjamin A. Bornschein, Rübenkamp 32, 22305 Hamburg.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO.
        </p>
      </section>

      {/* 5. Kontaktaufnahme */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-6 border-b border-slate-200 pb-2">5. Kontaktaufnahme</h2>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Kontaktformular</h3>
        <p>
          Wenn Sie uns per Kontaktformular Anfragen senden, werden Ihre Angaben inklusive der angegebenen Kontaktdaten zur Bearbeitung der Anfrage gespeichert.
        </p>
        <p>
          Rechtsgrundlage:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Art. 6 Abs. 1 lit. b DSGVO (vertraglich / vorvertraglich)</li>
          <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
          <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung, sofern abgefragt)</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Kontakt per E-Mail oder Telefon</h3>
        <p>
          Bei Kontaktaufnahme per E-Mail oder Telefon werden Ihre Daten zur Bearbeitung Ihres Anliegens verarbeitet. Eine Weitergabe erfolgt nicht ohne Ihre Einwilligung.
        </p>
      </section>

      {/* 6. Plugins und Tools */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-6 border-b border-slate-200 pb-2">6. Plugins und Tools</h2>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Google reCAPTCHA</h3>
        <p>
          Diese Website nutzt Google reCAPTCHA.<br />
          Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p>
          Zweck ist der Schutz vor missbräuchlicher automatisierter Nutzung.
        </p>
        <p>
          Rechtsgrundlage:<br />
          Art. 6 Abs. 1 lit. f DSGVO<br />
          (oder Art. 6 Abs. 1 lit. a DSGVO bei Einwilligung)
        </p>
        <p>
          Weitere Informationen:<br />
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#004e82] hover:underline break-all">https://policies.google.com/privacy</a><br />
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#004e82] hover:underline break-all">https://policies.google.com/terms</a>
        </p>

        <h3 className="text-xl font-bold text-slate-700 mt-6 mb-3">Beschwerderecht</h3>
        <p>
          Ihnen steht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsortes.
        </p>
      </section>

    </div>
  </div>
);