"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-cavenetBlue text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔹 Logo */}
        <h1 className="text-2xl font-bold tracking-wide">CAVENET</h1>

        {/* 🔹 Menú desktop */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li><Link href="/" className="hover:text-cavenetIndigo transition-colors">Inicio</Link></li>
          <li><Link href="/cobertura" className="hover:text-cavenetIndigo transition-colors">Cobertura</Link></li>
          <li><Link href="/planes" className="hover:text-cavenetIndigo transition-colors">Planes</Link></li>
          <li><Link href="/reporte-pago" className="hover:text-cavenetIndigo transition-colors">Reportar Pago</Link></li>
          <li><Link href="/contacto" className="hover:text-cavenetIndigo transition-colors">Contacto</Link></li>
          <li><Link href="/mi-cuenta" className="hover:text-cavenetIndigo transition-colors">Mi Cuenta</Link></li>
        </ul>

        {/* 🔹 Botón menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 🔹 Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-cavenetBlue px-6 pb-6">
          <ul className="flex flex-col gap-4 font-medium">
            <li><Link href="/" className="hover:text-cavenetIndigo transition-colors" onClick={toggleMenu}>Inicio</Link></li>
            <li><Link href="/cobertura" className="hover:text-cavenetIndigo transition-colors" onClick={toggleMenu}>Cobertura</Link></li>
            <li><Link href="/planes" className="hover:text-cavenetIndigo transition-colors" onClick={toggleMenu}>Planes</Link></li>
            <li><Link href="/reporte-pago" className="hover:text-cavenetIndigo transition-colors" onClick={toggleMenu}>Reportar Pago</Link></li>
            <li><Link href="/contacto" className="hover:text-cavenetIndigo transition-colors" onClick={toggleMenu}>Contacto</Link></li>
            <li><Link href="/mi-cuenta" className="hover:text-cavenetIndigo transition-colors" onClick={toggleMenu}>Mi Cuenta</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

