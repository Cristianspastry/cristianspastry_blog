import { footerLinks, metaData, socialIcons } from "@/utils/const";
import Link from "next/link";
import { getYear } from "@/utils/utils";
import Image from "next/image";

const Footer: React.FC = () => {
 
  return (
    <footer className=" py-8 bottom-0 left-0 right-0 z-10 ">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">{metaData.title?.toString()}</h3>
            <p className="text-gray-600">{metaData.description?.toString()}</p>
          </div>
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
        <hr className="my-4 border-gray-300" />
        <div className="text-center text-gray-600">
          {footerLinks.map((link, index) => (
            <Link key={index} href={link.href} className="mr-4 hover:text-gray-800">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-center mt-4 text-gray-500">
          {/* Copywriter */}
          <p>© {getYear()} {metaData.title?.toString()}. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
