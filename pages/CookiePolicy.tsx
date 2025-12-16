import React from 'react';
import { APP_CONFIG } from '../constants';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="pt-12 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">Cookie-Richtlinie (EU)</h1>
      
      <div className="prose prose-slate prose-lg max-w-none text-slate-600">
        <p className="lead text-xl text-slate-500 mb-8">
          Diese Cookie-Richtlinie erklärt, wie {APP_CONFIG.COMPANY_NAME} Cookies und ähnliche Technologien verwendet, 
          wenn Sie unsere Website besuchen.
        </p>

        <h3>1. Was sind Cookies?</h3>
        <p>
          Cookies sind kleine Textdateien, die auf Ihrem Computer oder Mobilgerät gespeichert werden, wenn Sie eine Website besuchen. 
          Sie werden häufig verwendet, um Websites funktionsfähig oder effizienter zu machen und um den Betreibern der Website Informationen bereitzustellen.
        </p>

        <h3>2. Wie wir Cookies verwenden</h3>
        <p>
          Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren. 
          Außerdem geben wir Informationen zu Ihrer Verwendung unserer Website an unsere Partner für soziale Medien, Werbung und Analysen weiter.
        </p>

        <h3>3. Arten von Cookies</h3>
        <p>Wir unterscheiden zwischen folgenden Kategorien:</p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Notwendige Cookies (Technisch erforderlich):</strong> Diese Cookies sind für das Funktionieren der Website unerlässlich. 
            Ohne diese Cookies können bestimmte Dienste (z. B. Datenschutzeinstellungen speichern) nicht bereitgestellt werden. 
            Für diese Cookies ist keine Einwilligung erforderlich.
          </li>
          <li>
            <strong>Marketing-Cookies:</strong> Diese werden verwendet, um Besuchern auf Webseiten zu folgen. 
            Die Absicht ist, Anzeigen zu zeigen, die relevant und ansprechend für den einzelnen Benutzer sind und daher wertvoller für Publisher und werbetreibende Drittparteien sind.
          </li>
          <li>
            <strong>Medien- / Funktionale Cookies:</strong> Diese Cookies ermöglichen es der Website, bereits getätigte Angaben (wie z. B. Benutzernamen, Spracheauswahl oder Ihren Standort) 
            zu speichern und verbesserte, persönlichere Funktionen anzubieten, sowie externe Inhalte (z.B. Videos, Karten) einzubinden.
          </li>
        </ul>

        <h3>4. Rechtsgrundlage</h3>
        <p>
          Die Rechtsgrundlage für die Verwendung technisch notwendiger Cookies ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). 
          Für alle anderen Cookie-Arten (Marketing, Medien) erfolgt die Verarbeitung auf Basis Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. 
          Diese Einwilligung können Sie jederzeit über unseren Cookie-Banner (Link "Cookie-Einstellungen" im Footer) widerrufen oder anpassen.
        </p>

        <h3>5. Verwaltung von Cookies</h3>
        <p>
          Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie auf den Link „Cookie-Einstellungen“ im Fußbereich unserer Website klicken. 
          Zudem können Sie Ihren Browser so einstellen, dass er Cookies ablehnt oder Sie informiert, bevor ein Cookie gesetzt wird.
        </p>

        <h3>6. Kontakt</h3>
        <p>
          Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns bitte unter:<br/>
          E-Mail: <a href={`mailto:${APP_CONFIG.CONTACT_EMAIL}`} className="text-[#004e82] hover:underline">{APP_CONFIG.CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
};