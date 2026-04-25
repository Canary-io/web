"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-5 rounded-b-3xl bg-gray-900 px-8 py-5 text-white shadow-lg sm:px-12">
      {/* Logo */}
      <div className="flex items-center gap-3 text-2xl font-bold text-white">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
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
      <ul className="hidden items-center space-x-8 font-medium text-gray-200 md:flex">
        <li>
          <Link
            href="/login"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-white shadow transition hover:opacity-90"
          >
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="rounded-lg p-2 text-white transition hover:bg-gray-800 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute left-6 right-6 top-24 z-40 mt-4 space-y-4 rounded-2xl bg-gray-900 p-6 text-center text-white shadow-lg md:hidden">
          <li><a href="#about" className="block transition hover:text-cyan-300">About</a></li>
          <li><a href="#features" className="block transition hover:text-cyan-300">Features</a></li>
          <li><a href="#contact" className="block transition hover:text-cyan-300">Contact</a></li>
          <li>
            <Link
              href="/login"
              className="block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-white transition hover:opacity-90"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
