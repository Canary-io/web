"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg px-12 py-6 rounded-b-3xl flex items-center justify-between sticky top-0 z-50 gap-5">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 flex items-center gap-3 ">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image
              src="/orca.png"
              alt="Orca logo"
              fill
              className="object-cover"
            />
          </div>
        Orca
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">

        <li>
          <Link
            href="/login"
            className="px-5 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-200 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 bg-blue-50 rounded-2xl p-6 space-y-4 shadow-lg absolute top-24 left-6 right-6 z-40 text-center">
          <li><a href="#about" className="block hover:text-blue-600 transition">About</a></li>
          <li><a href="#features" className="block hover:text-blue-600 transition">Features</a></li>
          <li><a href="#contact" className="block hover:text-blue-600 transition">Contact</a></li>
          <li>
            <Link
              href="/login"
              className="block px-5 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}