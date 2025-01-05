import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Precisazioni sulla precisione delle ricette</h3>
        <p>
          Le ricette presentate nel nostro blog sono frutto di esperimenti culinari e sono
          fornite con l’intento di guidare e ispirare. Tuttavia, i risultati possono variare a
          seconda degli ingredienti, delle attrezzature utilizzate e delle condizioni
          ambientali. Si consiglia di adattare le indicazioni in base alle proprie necessità e
          esperienze personali.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Avvertenze su allergie e intolleranze</h3>
        <p>
          Tutte le ricette riportate potrebbero contenere ingredienti che causano allergie o
          intolleranze. È fondamentale consultare le informazioni sugli ingredienti e modificare
          le ricette in base alle proprie esigenze dietetiche o alle raccomandazioni mediche. Non
          possiamo garantire l&apos;assenza di contaminazioni incrociate, anche se facciamo attenzione
          nella scelta degli ingredienti.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Limitazioni di responsabilità per risultati</h3>
        <p>
          Non siamo responsabili per eventuali problemi o insoddisfazioni derivanti dai risultati
          delle ricette. Ogni ricetta è testata in condizioni controllate, ma i risultati finali
          possono differire in base alle variabili non prevedibili. L’utente è responsabile per
          l’utilizzo delle ricette e per l’adeguatezza degli ingredienti in base alla propria
          situazione.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Chiarimenti su consigli e suggerimenti</h3>
        <p>
          I suggerimenti e i consigli presenti nel nostro blog sono forniti a titolo informativo
          e basati sulla nostra esperienza culinaria. Sebbene siano pensati per essere utili, non
          possiamo garantire che siano applicabili a tutti i lettori, in quanto ogni persona ha
          esigenze, gusti e attrezzature differenti. Invitiamo gli utenti a fare affidamento sul
          proprio giudizio e a consultare professionisti quando necessario.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
