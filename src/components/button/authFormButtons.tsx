import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';



export const AuthFormButtons = ({ buttonText ,  onDisabled, } :
     { buttonText: string , onDisabled?: boolean,}) => {
    return (
        <div className="mb-6">
            <button disabled={onDisabled} type="submit" className={`w-full ${ onDisabled ? 'animate-pulse cursor-not-allowed' : ''} bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600`}>
                {buttonText}
            </button>
        </div>
    )
}

export const AuthFormSocialButtons = ({ socialText,src, onDisabled,onClick,}: { socialText: string,src : string | StaticImport, onDisabled?: boolean,onClick  : any,}) => {
    return (
        <button disabled={onDisabled} onClick={onClick} className={`bg-white ${onDisabled ? 'animate-pulse cursor-not-allowed' : ''} text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-200`}>
            <Image src={src} alt={`${socialText} img`} className="h-6 w-6 mr-2" />
            Accedi con {socialText}
        </button>)
}