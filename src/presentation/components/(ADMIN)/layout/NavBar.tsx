// Admin NavBar.tsx
"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { AdminRoutes } from '@/routes/Routes';


export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold cursor-pointer">
                Dashboard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {Object.values(AdminRoutes).map((route) => (
              <Link
                key={route.name}
                href={route.link}
                className="text-white hover:underline"
              >
                {route.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Object.values(AdminRoutes).map((route) => (
              <Link
                key={route.name}
                href={route.link}
                className="text-white hover:underline"
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
    );
}

