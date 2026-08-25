# MQ-Connect Website — Übergabe-Dokumentation

Stand: 2026-08-25. Dieses Dokument beschreibt alles, was du brauchst, um das Projekt
eigenständig weiterzuentwickeln (inkl. Arbeit mit Claude Code CLI).

## 1. Projekt-Überblick

- **Live-Site:** https://mq-connect.de (Kunde: MQ-Connect, Vertriebsagentur Moers, GF Milan Jasieniecki)
- **Stack:** React 19 + Vite + TypeScript + Tailwind CSS + Framer Motion. Single-Page-App, Dateien liegen im Projekt-Root (kein `src/`).
- **Kein Backend im Repo** — Formulare posten an externe n8n-Webhooks, Videos liegen in Supabase Storage, Chat nutzt die Google-Gemini-API direkt aus dem Frontend.

## 2. Infrastruktur & Zugänge

| Dienst | Details | Zugang nötig? |
|---|---|---|
| **GitHub** | `github.com/fafsfafaf/mq-connect-website-`, Branch `main`, public | Ja — Collaborator-Invite (Schreibrechte) |
| **Vercel** | Projekt `mq-connect-website` (ID `prj_7nTV93bXdrY67rS1yiTr0gNQLfxt`), Team `team_IPcf1yo45JKt1MPd1tUPS4gf`. **Auto-Deploy von GitHub `main`** — jeder Push geht live. | Optional fürs Deployen (Push reicht), nötig für Domains/Logs/Settings |
| **Domains** | `mq-connect.de` + `www` (primär), `mqconnect.de` + `www` (Redirect) — verwaltet in Vercel | via Vercel |
| **Supabase** | Projekt `ffrthxboliylsnbkxtmj` — nur **Storage** (Bucket `Videos`, 2 Team-MP4s, public URLs in `data/reels.ts`). Keine Datenbank, kein Auth, kein Client-SDK im Code. | Nur wenn Videos getauscht werden sollen |
| **n8n** | Webhook-Ziel der Formulare: `n8n.srv824470.hstgr.cloud` — ⚠️ **OFFLINE, Domain existiert nicht mehr** (VPS stillgelegt). Siehe „Offene Punkte". | Neue Instanz nötig |
| **Google Gemini** | ChatWidget ruft `gemini-2.0-flash` direkt mit API-Key im Frontend-Code auf (`components/ChatWidget.tsx`). | Eigener Key empfohlen, siehe „Offene Punkte" |

Es gibt **keine `.env`-Dateien** und keine Vercel-Environment-Variablen, die für den Build nötig wären — Repo klonen genügt für einen lauffähigen Build.

## 3. Lokales Setup (5 Minuten)

```bash
git clone https://github.com/fafsfafaf/mq-connect-website-.git
cd mq-connect-website-
npm install
npm run dev        # Dev-Server auf Port 3000
npm run build      # Produktions-Build (dist/)
```

### Arbeiten mit Claude Code CLI

Einfach im Projektordner `claude` starten. Die Datei `CLAUDE.md` wird automatisch
geladen und enthält Code-Struktur, Patterns und Infrastruktur-Hinweise für die KI.
Bitte `CLAUDE.md` aktuell halten, wenn sich Grundlegendes ändert.

## 4. Deployment

- **Push auf `main` = Produktions-Deploy** (Vercel Auto-Deploy). Es gibt keinen Staging-Branch.
- Für risikoreiche Änderungen: Feature-Branch pushen → Vercel baut automatisch eine Preview-URL → erst nach Prüfung nach `main` mergen.
- `vercel.json`: Die vier Formular-Rewrites (`/energie-formular` etc.) müssen **vor** dem Catch-all `/(.*)` stehen — Vercel matcht top-down.

## 5. Wartungsmodus (Runbook, erprobt)

- **Einschalten:** `index.html` selbst durch eine gebrandete Wartungsseite ersetzen (React-Entry-Script entfernen) + in `vercel.json` Rewrite `/(.*)` → `/index.html`. Ein reiner Rewrite-Ansatz reicht NICHT — Vercel liefert die statische `index.html` für `/` vor den Rewrites aus.
- **Ausschalten:** Die Wartungs-Commits reverten (Vorbild: Commit `67dd376` revertete `4dbfd78` + `44950cb`), dann gegen den Pre-Wartungs-Commit diffen: `git diff <pre-commit> -- index.html vercel.json` muss leer sein.

## 6. Offene Punkte / bekannte Baustellen

1. ⚠️ **Formulare senden ins Leere:** Alle Formular-Endpunkte zeigen auf `n8n.srv824470.hstgr.cloud` — die Domain existiert nicht mehr (Hostinger-VPS stillgelegt). Betroffen:
   - `components/ApplicationQuiz.tsx` (Bewerbungen, `/webhook/bewerbung`)
   - `components/forms/ContractFormLayout.tsx` (`/webhook/testing`)
   - `public/energie-formular.html`, `gas-formular.html`, `glasfaser-formular.html`, `pv-formular.html` (`/webhook/forms`)
   → Neue n8n-Instanz (z. B. Railway/n8n Cloud) aufsetzen und die URLs zentral austauschen. Bis dahin gehen Bewerbungen und Vertragsformulare verloren.
2. ⚠️ **Gemini-API-Key liegt öffentlich im Repo** (`components/ChatWidget.tsx`, Repo ist public). Key sollte rotiert und der neue Key in der Google Cloud Console per HTTP-Referrer auf `mq-connect.de` beschränkt werden. Sauberer wäre ein kleiner Server-Proxy (z. B. Vercel Function), damit gar kein Key im Frontend liegt.
3. `pages/Login.tsx` existiert als Seite — prüfen, ob das Feature aktiv genutzt wird oder Altlast ist.

## 7. Kontaktdaten des Kunden

Telefon 0163 / 40 36 513 · info@mq-connect.de · Markenfarbe Blau (`brand`-Palette in `tailwind.config.js`), Font Inter, Logo `/images/logo.png`.
