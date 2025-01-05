import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="cookie-policy-container">
      <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tipi di cookie utilizzati</h2>
        <p>
          Questo sito utilizza diversi tipi di cookie per migliorare l&apos;esperienza degli utenti. I cookie utilizzati includono cookie tecnici, di funzionalità e di terze parti.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Scopo di ciascun cookie</h2>
        <p>
          I cookie tecnici sono necessari per il corretto funzionamento del sito. I cookie di funzionalità migliorano l&apos;usabilità del sito, mentre i cookie di terze parti (es. Google Analytics) raccolgono dati statistici anonimi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Durata dei cookie</h2>
        <p>
          La durata dei cookie varia a seconda del tipo: i cookie di sessione vengono eliminati alla chiusura del browser, mentre i cookie persistenti rimangono memorizzati per un periodo definito.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Come disabilitare i cookie</h2>
        <p>
          Gli utenti possono gestire le preferenze sui cookie direttamente dalle impostazioni del proprio browser. Tuttavia, disabilitare i cookie può compromettere alcune funzionalità del sito.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cookie di terze parti</h2>
        <p>
          Questo sito utilizza servizi di terze parti come Google Analytics per analisi statistiche e pulsanti social per facilitare la condivisione dei contenuti. Questi servizi possono impostare cookie propri.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Banner cookie conforme al GDPR</h2>
        <p>
          Al primo accesso al sito, verrà mostrato un banner che richiede il consenso per l&apos;uso dei cookie. Gli utenti possono accettare o rifiutare i cookie non essenziali.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
