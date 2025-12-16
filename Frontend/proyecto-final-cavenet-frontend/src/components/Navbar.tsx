"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="fixed top-0 w-full shadow-md z-50"
      style={{ backgroundColor: "var(--cavenet-blue)", color: "white" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logocavenet1.png"
            alt="CAVENET Logo"
            width={180}
            height={60}
            priority
            className="w-auto h-auto max-h-12 md:max-h-16"
          />
        </Link>

        {/* 🔹 Menú desktop */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <Link href="/" className="transition-colors hover:text-(--cavenet-indigo)">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/cobertura" className="transition-colors hover:text-(--cavenet-indigo)">
              Cobertura
            </Link>
          </li>
          <li>
            <Link href="/planes" className="transition-colors hover:text-(--cavenet-indigo)">
              Planes
            </Link>
          </li>
          <li>
            <Link href="/nosotros" className="transition-colors hover:text-(--cavenet-indigo)">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="transition-colors hover:text-(--cavenet-indigo)">
              Contacto
            </Link>
          </li>
          <li>
            <Link href="/mi-cuenta" className="transition-colors hover:text-(--cavenet-indigo)">
              Pagos
            </Link>
          </li>
        </ul>

        {/* 🔹 Botón menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 🔹 Menú móvil */}
      {isOpen && (
        <div
          className="md:hidden px-6 pb-6 transition-all duration-300 ease-in-out"
          style={{ backgroundColor: "var(--cavenet-blue)" }}
        >
          <ul className="flex flex-col gap-4 font-medium">
            <li>
              <Link href="/" onClick={toggleMenu} className="hover:text-(--cavenet-indigo)">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/cobertura" onClick={toggleMenu} className="hover:text-(--cavenet-indigo)">
                Cobertura
              </Link>
            </li>
            <li>
              <Link href="/planes" onClick={toggleMenu} className="hover:text-(--cavenet-indigo)">
                Planes
              </Link>
            </li>
            <li>
              <Link href="/nosotros" onClick={toggleMenu} className="hover:text-(--cavenet-indigo)">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" onClick={toggleMenu} className="hover:text-(--cavenet-indigo)">
                Contacto
              </Link>
            </li>
            <li>
              <Link href="/mi-cuenta" onClick={toggleMenu} className="hover:text-(--cavenet-indigo)">
                Pagos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
