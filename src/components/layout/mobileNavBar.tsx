// components/MobileNavbar.tsx
"use client";
import React, { useState } from 'react'
import { navLinks } from '@/utils/const';
import Link from 'next/link';

const MobileNavbar: React.FC<{ navLinks: { href: string; label: string }[]; onClose: () => void }> = ({ navLinks, onClose }) => {
  const handleLinkClick = () => {
    onClose(); // Chiudi il menu quando viene cliccato un link
  };

  return (
    <div className="md:hidden">
      <div className="bg-white px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <div> {/* Spazio vuoto per centrare il titolo */}
          </div>
          <div>
            <button onClick={onClose} className="text-gray-500 hover:text-black focus:outline-none" aria-label="Chiudi">
            <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={handleLinkClick}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg> {/* Icona "X" per chiudere il menu */}
            </button>
          </div>
        </div>
        {navLinks.map((link, index) => (
          <Link key={index} href={link.href} className="block text-black text-lg py-2" onClick={handleLinkClick}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;








/*
export const MobileNavbar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-md transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col justify-between h-full py-8 px-4">
        <div>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index} className="my-2">
                <Link href={link.href} className='text-black text-lg'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-300 pt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Accedi</button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;


// components/MobileMenuIcon.tsx
// components/MobileMenuIcon.tsx
export const MobileMenuIcon: React.FC<{ onClick: () => void; isOpen: boolean }> = ({ onClick, isOpen }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {isOpen ? (

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={"w-8 h-8 fill-inherit"}
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>

      )
        : (


          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={"w-10 h-10 items-center fill-inherit"}
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
    </div>
  );
};
*/

