
"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { metaData, navLinks, routes } from '../../utils/const';

type Props = {}

function NavBar({}: Props) {
 
  return (
    <>
    <div className="max-w-screen-lg mx-auto">
      <nav className="flex items-center justify-between bg-white shadow-sx py-6 px-6 ">
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Accedi</button>
        </div>
       {/** Mobile menu */}
       <div>
         
       </div>
      </nav>
      
    </div>
    
    </>
  )
}

export default NavBar;