"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { useState } from "react";

const Elemento = ({ href, text }: { href: string; text: string }) => {
  return (
                <li>
                <Link href={href} className="hover:text-cavenetBlue p-2 rounded hover:bg-cavenetIndigo transition">{text}</Link>
              </li>
  );
};




export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menu = isMenuOpen ? "flex" : "hidden";

  return (
    <nav
      className="fixed top-0 w-full shadow-md z-50"
      style={{ backgroundColor: "var(--color-cavenetBlue)", color: "white" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center w-36 h-12">
          <Image
            src={"/logocavenet1.png"}
            alt="CAVENET Logo"
            width={150}
            height={50}
            priority
            className="w-32 h-12 max-w-64 "
          />
        </Link>

        {/* 🔹 Menú principal centrado con espacio entre palabras */}
        <div className="flex items-center justify-center w-full ml-6 relative">
          <ul className="flex">
            <div className={`${menu} absolute top-10 left-[-180px] flex-col lg:flex-row bg-cavenetBlue p-4 lg:static lg:flex justify-center items-start lg:items-center font-semibold uppercase tracking-widest gap-12 lg:gap-8 xl:gap-10 text-sm`}>
              <Elemento href="/" text="Inicio" />
              <Elemento href="/cobertura" text="Cobertura" />
              <Elemento href="/contratar" text="Contratar" />
              <Elemento href="/planes" text="Planes" />
              <Elemento href="/reporte-pago" text="Reporta tu pago" />
              <Elemento href="/contacto" text="Contacto" />
              <Elemento href="/mi-cuenta" text="Mi cuenta" />
            </div>
          </ul>
        </div>

        {/* 🔹 Íconos sociales alineados a la derecha */}
        <div className="flex gap-4 ml-6">
          <Link href="/tv" className="hover:text-cavenetIndigo">
            <MdLiveTv size={20} />
          </Link>
          <Link href="/mi-cuenta" className="hover:text-cavenetIndigo">
            <FaUser size={20} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hover:text-cavenetIndigo"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="https://wa.me/00000000000"
            target="_blank"
            className="hover:text-cavenetIndigo"
          >
            <FaWhatsapp size={20} />
          </Link>
          <button onClick={ () => toggleMenu()} className="bg-white text-cavenetBlue p-1 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition p-0 text-sm lg:hidden cursor-pointer">
           <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
