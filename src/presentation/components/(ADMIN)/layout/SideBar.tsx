"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminRoutes } from "@/routes/Routes";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);


  return (
    <>
    {/* Mobile Menu Toggle */}
    <div className="md:hidden bg-blue-600 p-4">
      <button
        onClick={toggleSidebar}
        className="text-white text-xl focus:outline-none"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
    </div>

    {/* Sidebar */}
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } md:block bg-blue-700 text-white w-64 fixed top-0 left-0 h-full shadow-lg z-40`}
    >
      <div className="flex flex-col items-center justify-between h-full">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Links */}
        <nav className="flex flex-col flex-1 justify-center space-y-4">
          {Object.values(AdminRoutes).map((route) => (
            <Link
              key={route.name}
              href={route.link}
              className="text-white hover:underline"
            >
              {route.name}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="py-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Admin Panel</p>
        </div>
      </div>
    </div>
  </>
  );
};

export default SideBar;
