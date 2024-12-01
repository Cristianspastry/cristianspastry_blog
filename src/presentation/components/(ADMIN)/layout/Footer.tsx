import React from "react";
import Link from "next/link";
import { AdminRoutes } from "@/routes/Routes";


const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul>
              {Object.values(AdminRoutes).map((route) => (
                <li key={route.name} className="mb-2">
                  <Link href={route.link} className="hover:underline">
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm">
              This dashboard is designed to manage recipes and settings for your
              application. Built with Next.js and Tailwind CSS.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm">
              Email: <a href="mailto:support@example.com" className="hover:underline">support@example.com</a>
            </p>
            <p className="text-sm">
              Phone: <a href="tel:+123456789" className="hover:underline">+123 456 789</a>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 border-t border-blue-500 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
