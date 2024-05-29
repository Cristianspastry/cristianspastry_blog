"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { metaData, navLinks, routes } from '../../utils/const';
import { useRouter } from 'next/navigation';
import userImg from '../../../assets/img/user.png';
import Image from 'next/image';
import { UrlObject } from 'url';
import { CloseIcon, HamburgerIcon } from '@/utils/icons';

const MobileNavBar = ({ user, userAvatar }: { user: any, userAvatar: any }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='max-w-screen-lg mx-auto md:hidden flex items-center justify-between'>
      <Link href="/" className="text-black text-3xl font-semibold m-3">
        {metaData.title?.toString()}
      </Link>


      <button
        onClick={toggleNavbar}
        className="p-4 focus:outline-none"
      >
        <HamburgerIcon />
      </button>

      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <button
          onClick={toggleNavbar}
          className="absolute top-4 right-4 focus:outline-none"
        >
          <CloseIcon />
        </button>

        <nav className="mt-16">
          <ul className="space-y-4">
            {
              navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className='block px-4 py-2 text-gray-700 hover:bg-gray-200'>
                    {link.label}
                  </Link>
                </li>
              ))
            }
            <div className=" m-4 divide-dashed divide-gray-200">
              {user ? (
                <Link href={routes.profile}>
                  {userAvatar ? (
                    <img src={userAvatar} alt="Avatar" className="h-12 w-12 rounded-full border-2 border-blue-500" />
                  ) : (
                    <Image width={45} height={45} src={userImg} alt="Avatar" className="rounded-full border-2 border-blue-500" />
                  )}
                </Link>
              ) : (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => router.push(routes.login)}>Accedi</button>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
};


/*
 <div className="max-w-screen-lg mx-auto">
      <nav className="flex items-center justify-between bg-white shadow-sx py-6 px-6 relative">
        <div className="flex items-center md:hidden">
          
          <Link href="/" className="text-black text-3xl font-semibold">
            {metaData.title?.toString()}
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ?  <CloseIcon/>: <HamburgerIcon />}
          </button>
        </div>
        <div className={`absolute top-0 right-0 bg-white h-screen w-80 shadow-md ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-10 md:hidden`}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <button onClick={closeMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="py-4 px-6">
                {navLinks.map((link: { href: string | UrlObject; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                  <Link key={index} href={link.href} className='text-black text-lg block py-2'>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pb-8 px-6">
              {user ? (
                <Link href={routes.profile}>
                  {userAvatar ? (
                    <img src={userAvatar} alt="Avatar" className="h-12 w-12 rounded-full border-2 border-blue-500" />
                  ) : (
                    <Image width={45} height={45} src={userImg} alt="Avatar" className="rounded-full border-2 border-blue-500" />
                  )}
                </Link>
              ) : (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => router.push(routes.login)}>Accedi</button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>*/
export default MobileNavBar;