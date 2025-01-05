"use client";

import { APP_NAME } from '@/shared/constants/Constants';
import Link from 'next/link';
import { useState, useEffect, } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { BlogRoutes } from '@/routes/Routes';
import { useAppDispatch, useAppSelector } from "@/presentation/state/hooks"
import { fetchRecipes } from '@/presentation/state/slices/recipe/recipeSlice';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const dispatch = useAppDispatch();
    const { recipes, status, error } = useAppSelector((state) => state.recipes);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <header
            className={`sticky top-0 z-50 bg-bluModerato text-white py-4 transition-all duration-300 
            ${isScrolled ? 'shadow-lg py-2' : 'shadow-md py-4'}`}

        >
            <nav className="container mx-auto flex justify-between items-center px-6" role="navigation">
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide transition-all duration-300">
                    <Link
                        href="/"
                        className="hover:text-grigioChiaro transition-colors font-playfair_display"
                        aria-label={`${APP_NAME} homepage`}
                    >
                        {APP_NAME}
                    </Link>
                </h1>

                <div className="hidden md:flex justify-center items-center w-full max-w-md mx-4">
                    <SearchBar recipes={recipes} />
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex md:flex-row md:space-x-8 md:items-center" role="menubar">
                    {
                        Object.values(BlogRoutes)
                            .filter(route =>
                                // Esclude "Admin" solo in produzione
                                (process.env.NODE_ENV !== 'production' || route.name !== 'Admin') &&
                                // Esclude "Search"
                                route.name !== 'Search' &&
                                // Esclude "Privacy Policy"
                                route.name !== 'Privacy Policy' &&
                                // Esclude "Terms of Service"
                                route.name !== 'Termini e Condizioni' &&
                                // Esclude "Cookie Policy"
                                route.name !== 'Cookie Policy' &&
                                // Esclude "Disclaimer"
                                route.name !== 'Disclaimer'
                            )
                            .map((route) => (
                                <li key={route.name}>
                                    <Link
                                        href={route.link}
                                        className="text-white hover:underline font-inter"
                                        aria-label={route.name}
                                    >
                                        {route.name}
                                    </Link>
                                </li>
                            ))
                    }
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-1"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity backdrop-blur-sm"
                        aria-hidden="true"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                >
                    <div className="h-full flex flex-col">
                        <div className="p-4 flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-bluModerato rounded-lg p-1"
                                aria-label="Close menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pt-8">
                            <div className="px-6 pb-8">
                                <SearchBar recipes={recipes} />
                            </div>

                            <div className="w-full border-t border-gray-200 mb-8" />

                            <ul className="flex flex-col items-center space-y-8" role="menu">
                                {Object.values(BlogRoutes).filter(route =>
                                    // Esclude "Admin" solo in produzione
                                    (process.env.NODE_ENV !== 'production' || route.name !== 'Admin') &&

                                    // Esclude "Search" 
                                    route.name !== 'Search' &&
                                    // Esclude "Privacy Policy"
                                    route.name !== 'Privacy Policy' &&
                                    // Esclude "Terms of Service"
                                    route.name !== 'Termini e Condizioni' &&
                                    // Esclude "Cookie Policy"
                                    route.name !== 'Cookie Policy' &&
                                    // Esclude "Disclaimer"
                                    route.name !== 'Disclaimer'
                                ).map((link, index) => (
                                    <li key={index} className="w-full text-center" role="none">
                                        <Link
                                            href={link.link}
                                            className="inline-block text-xl text-bluModerato font-semibold hover:text-gray-600 transition-colors relative group px-4 py-2"
                                            onClick={() => setIsOpen(false)}
                                            role="menuitem"
                                        >
                                            {link.name}
                                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-bluModerato transition-all duration-300 group-hover:w-1/2 -translate-x-1/2"></span>
                                            <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-bluModerato transition-all duration-300 group-hover:w-1/2"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}