import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-conditions-container">
      <h1 className="text-2xl font-bold mb-4">Termini e Condizioni</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Diritti d&apos;autore sulle ricette e foto</h2>
        <p>
          Tutti i contenuti presenti sul sito, incluse ricette e fotografie, sono protetti da diritti d&apos;autore e non possono essere copiati, riprodotti o distribuiti senza il consenso esplicito del Titolare.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Regole per i commenti</h2>
        <p>
          Gli utenti sono invitati a commentare in modo rispettoso e costruttivo. Commenti offensivi, discriminatori o che violano la legge saranno rimossi e l&apos;utente potrà essere bannato dal sito.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Limitazioni di responsabilità</h2>
        <p>
          Il Titolare non è responsabile per eventuali danni derivanti dall&apos;uso delle informazioni presenti sul sito. Gli utenti sono invitati a verificare personalmente la validità delle informazioni fornite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Regole per l&apos;utilizzo dei contenuti</h2>
        <p>
          I contenuti del sito possono essere utilizzati esclusivamente per scopi personali e non commerciali. Ogni altro utilizzo richiede l&apos;autorizzazione scritta del Titolare.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Modalità di modifica dei termini</h2>
        <p>
          Il Titolare si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche saranno comunicate attraverso il sito e avranno effetto immediato.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
