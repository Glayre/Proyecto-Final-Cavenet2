"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 🔹 Importa el componente de Next.js
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full bg-cavenetBlue text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔹 Logo como imagen (sin texto) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logocavenet1.png"   // Ruta desde carpeta public
            alt="CAVENET Logo"
            width={303}       // Ajusta tamaño según tu diseño Figma
            height={107}
            priority
          />
        </Link>

        {/* 🔹 Menú desktop */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li><Link href="/" className="hover:text-cavenetIndigo transition-colors">Inicio</Link></li>
          <li><Link href="/cobertura" className="hover:text-cavenetIndigo transition-colors">Cobertura</Link></li>
          <li><Link href="/planes" className="hover:text-cavenetIndigo transition-colors">Planes</Link></li>
          <li><Link href="/nosotros" className="hover:text-cavenetIndigo transition-colors">Nosotros</Link></li>
          <li><Link href="/contacto" className="hover:text-cavenetIndigo transition-colors">Contacto</Link></li>
          <li><Link href="/mi-cuenta" className="hover:text-cavenetIndigo transition-colors">Pagos</Link></li>
        </ul>

        {/* 🔹 Botón menú móvil */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 🔹 Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-cavenetBlue px-6 pb-6">
          <ul className="flex flex-col gap-4 font-medium">
            <li><Link href="/" onClick={toggleMenu} className="hover:text-cavenetIndigo">Inicio</Link></li>
            <li><Link href="/cobertura" onClick={toggleMenu} className="hover:text-cavenetIndigo">Cobertura</Link></li>
            <li><Link href="/planes" onClick={toggleMenu} className="hover:text-cavenetIndigo">Planes</Link></li>
            <li><Link href="/nosotros" onClick={toggleMenu} className="hover:text-cavenetIndigo">Nosotros</Link></li>
            <li><Link href="/contacto" onClick={toggleMenu} className="hover:text-cavenetIndigo">Contacto</Link></li>
            <li><Link href="/mi-cuenta" onClick={toggleMenu} className="hover:text-cavenetIndigo">Pagos</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
