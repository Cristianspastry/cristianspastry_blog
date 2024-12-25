export default function AboutPage() {
    return (
      <main className="flex flex-col min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div className="bg-[#003366] text-white py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Chi Siamo
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            La nostra storia di passione per la pasticceria artigianale
          </p>
        </div>
  
        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-serif text-[#003366] mb-4">
                La Nostra Storia
              </h2>
              <p className="text-gray-700 leading-relaxed">
                La passione per la pasticceria è nata nella mia famiglia, dove fin da piccolo 
                ho imparato i segreti delle ricette tradizionali. Dopo anni di formazione 
                e esperienza in diverse pasticcerie italiane, ho deciso di aprire 
                Cristian's Pastry per condividere la mia passione con tutti gli amanti 
                dei dolci.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-serif text-[#003366] mb-4">
                La Nostra Missione
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Il nostro obiettivo è creare dolci che non solo delizino il palato, 
                ma che raccontino anche una storia. Utilizziamo solo ingredienti di 
                alta qualità e seguiamo metodi tradizionali, combinandoli con 
                tecniche moderne per offrire creazioni uniche e memorabili.
              </p>
            </div>
          </div>
  
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-[#003366] mb-4">
              Il Nostro Laboratorio
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nel nostro laboratorio, ogni giorno inizia all'alba con la preparazione 
              di impasti freschi e la cottura dei nostri prodotti. Seguiamo un 
              rigoroso processo di selezione degli ingredienti e di controllo della 
              qualità per garantire che ogni dolce che esce dal nostro forno sia 
              perfetto.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La nostra specialità sono i dolci della tradizione italiana, 
              ma amiamo anche sperimentare con nuovi sapori e combinazioni, 
              creando dessert innovativi che sorprendono e deliziano i nostri clienti.
            </p>
          </div>
  
          <div>
            <h2 className="text-2xl font-serif text-[#003366] mb-4">
              I Nostri Valori
            </h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Qualità senza compromessi negli ingredienti</li>
              <li>Rispetto per le tradizioni della pasticceria italiana</li>
              <li>Innovazione nelle tecniche e nelle presentazioni</li>
              <li>Attenzione al dettaglio in ogni creazione</li>
              <li>Passione per l'arte della pasticceria</li>
            </ul>
          </div>
        </div>
      </main>
    )
  }
  
  