import React from 'react'
import Link from 'next/link';
import { metaData, navLinks, routes } from '../../utils/const';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firabase';
import userImg from '../../../assets/img/user.png';
import Image from 'next/image';
import { UrlObject } from 'url';
type Props = {
    user: any;
    userAvatar: any;
}

function DesktopNavBar({ user, userAvatar }: Props) {
    const router = useRouter();
    return (
        <nav className="md:flex items-center justify-between bg-white shadow-sx py-6 px-6 hidden ">
            <div className="animate-fadeIn flex items-center">
                <Link href="/" className="text-black text-3xl font-semibold">
                    {metaData.title?.toString()}
                </Link>
            </div>
            <div className="hidden md:flex space-x-4 items-center pt-3">
                {navLinks.map((link, index) => (
                    <Link key={index} href={link.href} className='text-black text-lg'>
                        {link.label}
                    </Link>
                ))}
            </div>
            <div className="animate-fadeIn pt-3 ">
                {
                    user ? (
                        <Link href={routes.profile}>
                            {
                                userAvatar ?
                                    <img src={userAvatar} alt="Avatar" className="h-12 w-12 rounded-full border-2 border-blue-500" />
                                    :
                                    <Image width={45} height={45} src={userImg} alt="Avatar" className=" rounded-full border-2 border-blue-500" />
                            }
                        </Link>
                    ) : (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => router.push(routes.login)}>Accedi</button>
                    )
                }


            </div>

        </nav>
    )
}

export default DesktopNavBar