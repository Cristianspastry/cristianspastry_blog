"use client";
import { APP_NAME, AUTHOR, EMAIL, SOCIAL_MEDIA_LINK } from '@/shared/constants/Constants';
import { BlogRoutes } from '@/routes/Routes';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-bluModerato text-white mt-auto">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Copyright & Links */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-playfair_display mb-4">
                            {APP_NAME}
                        </h2>
                        <p className="text-sm opacity-80 mb-4">
                            &copy; {new Date().getFullYear()} Tutti i diritti riservati.
                        </p>
                        <ul className="flex flex-wrap justify-center md:justify-start gap-4">
                            {Object.values(BlogRoutes)
                                .filter(route =>
                                    (process.env.NODE_ENV !== 'production' || route.name !== 'Admin') &&
                                    route.name !== 'Search'
                                ).map((route) => (
                                    <li key={route.name}>
                                        <Link
                                            href={route.link}
                                            className="text-white hover:underline whitespace-nowrap"
                                        >
                                            {route.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Seguimi</h2>
                        <ul className="flex justify-center space-x-4">
                            {SOCIAL_MEDIA_LINK.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.name}
                                        className="text-white hover:text-grigioChiaro transition-colors"
                                    >
                                        {link.icon}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contatti */}
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl font-bold mb-4">Contatti</h2>
                        <p className="text-sm opacity-80 mb-2">
                            Email:{' '}
                            <Link
                                href="mailto:info@cristianspastry.com"
                                className="text-white hover:underline"
                            >
                                {EMAIL}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Divisore */}
                <div className="border-t border-gray-500 pt-6 text-center text-sm opacity-80">
                    <p className="font-playfair_display">
                        {" Realizzato con ❤️ da  " + AUTHOR}
                    </p>
                </div>
            </div>
        </footer>
    );
}