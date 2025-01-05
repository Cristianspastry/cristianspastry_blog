import { APP_NAME, AUTHOR, EMAIL } from '@/shared/constants/Constants';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Introduzione</h2>
        <p>Questa Privacy Policy descrive le modalità di gestione del sito web {APP_NAME} in riferimento al trattamento dei dati personali degli utenti che lo consultano.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Titolare del Trattamento</h2>
        <p>Il Titolare del trattamento dei dati personali è {AUTHOR}, con sede in via crocifisso 4, Torre Del Greco (NA), email: {EMAIL}, {/*P.IVA: [numero]*/}.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Tipologie di Dati Raccolti</h2>
        <h3 className="text-xl font-medium mb-2">3.1 Dati di navigazione</h3>
        <p>I sistemi informatici e le procedure software preposte al funzionamento di questo sito web acquisiscono, nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell&apos;uso dei protocolli di comunicazione di Internet. Questi dati vengono utilizzati al solo fine di ricavare informazioni statistiche anonime sull&apos;uso del sito e per controllarne il corretto funzionamento.</p>

        <h3 className="text-xl font-medium mt-4 mb-2">3.2 Dati forniti volontariamente dall&apos;utente</h3>
        <ul className="list-disc ml-8">
          <li>Dati di registrazione al sito</li>
          <li>Informazioni fornite tramite form di contatto</li>
          <li>Dati per l&apos;iscrizione alla newsletter</li>
          <li>Commenti alle ricette</li>
          <li>Informazioni per salvare ricette preferite</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Finalità del Trattamento</h2>
        <p>I dati personali sono trattati per le seguenti finalità:</p>
        <ul className="list-disc ml-8">
          <li>Permettere la registrazione al sito</li>
          <li>Gestire i commenti alle ricette</li>
          <li>Inviare la newsletter se richiesta</li>
          <li>Rispondere alle richieste inviate tramite form di contatto</li>
          <li>Gestire le ricette salvate dagli utenti</li>
          <li>Analizzare l&apos;utilizzo del sito per migliorarne le funzionalità</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">5. Base Giuridica del Trattamento</h2>
        <ul className="list-disc ml-8">
          <li>Consenso dell&apos;utente</li>
          <li>Adempimento di obblighi contrattuali</li>
          <li>Legittimo interesse del titolare</li>
          <li>Adempimento di obblighi di legge</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">6. Modalità del Trattamento</h2>
        <p>I dati personali sono trattati con strumenti automatizzati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti. Vengono adottate specifiche misure di sicurezza per prevenire la perdita dei dati, usi illeciti o non corretti ed accessi non autorizzati.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">7. Periodo di Conservazione</h2>
        <ul className="list-disc ml-8">
          <li>Dati di navigazione: 14 mesi</li>
          <li>Dati di registrazione: fino alla cancellazione dell&apos;account</li>
          <li>Dati newsletter: fino alla disiscrizione</li>
          <li>Commenti: permanentemente salvo richiesta di cancellazione</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">8. Diritti degli Utenti</h2>
        <p>Gli utenti hanno il diritto di:</p>
        <ul className="list-disc ml-8">
          <li>Accedere ai propri dati personali</li>
          <li>Chiederne la rettifica o la cancellazione</li>
          <li>Richiedere la limitazione del trattamento</li>
          <li>Opporsi al trattamento</li>
          <li>Richiedere la portabilità dei dati</li>
          <li>Revocare il consenso in qualsiasi momento</li>
        </ul>
        <p>Per esercitare questi diritti, gli utenti possono contattare il Titolare all&apos;indirizzo email: {EMAIL}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">9. Trasferimento dei Dati</h2>
        <p>I dati personali sono trattati principalmente all&apos;interno dell&apos;Unione Europea. Qualsiasi trasferimento di dati al di fuori dell&apos;UE avverrà nel rispetto delle garanzie appropriate previste dal GDPR.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">10. Modifiche alla Privacy Policy</h2>
        <p>Il Titolare si riserva il diritto di apportare modifiche alla presente Privacy Policy in qualunque momento, dandone notizia agli utenti su questa pagina. Si prega dunque di consultare regolarmente questa pagina.</p>
        <p><strong>Data ultimo aggiornamento:</strong> {new Date().toLocaleDateString()}</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
