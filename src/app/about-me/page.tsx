import { socialIcons } from "@/utils/const";
import Link from "next/link";
import Image from "next/image";

const AboutPage: React.FC = () => {
    return (
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Chi Sono</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="mb-4 lg:mb-0">
            <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="Immagine del profilo" className="rounded-lg shadow-md" />
          </div>
          <div>
            <p className="text-lg mb-4">Ciao, sono [Il Tuo Nome]!</p>
            <p className="text-gray-600 mb-4">[Una breve descrizione su di te, le tue passioni, le tue competenze e le tue esperienze]</p>
            <p className="text-gray-600 mb-4">Mi piace [cosa ti piace fare], e sono appassionato/a di [argomento di interesse].</p>
            <p className="text-gray-600 mb-4">In questo spazio, condivido [cosa condividi nel tuo sito/web/app], e spero di [quali sono i tuoi obiettivi o le tue speranze per il tuo pubblico].</p>
            <p className="text-gray-600 mb-4">Se vuoi contattarmi per [motivo del contatto], non esitare a visitare la pagina di <Link href="/contatti" className="text-blue-500 hover:underline">contatti</Link>.</p>
            <div className="flex space-x-4">
                {
                    socialIcons.map((icon, index) => (
                        <Link key={index} href={icon.link} className="text-gray-600 hover:text-gray-800" aria-label={icon.ariaLabel}>
                            <Image src={icon.icon} alt={icon.ariaLabel} width={24} height={24} />
                        </Link>
                    ))
                }       
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutPage;
  