"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";

const Elemento = ({ href, text }: { href: string; text: string }) => {
  return (
    <li>
      <Link
        href={href}
        className="hover:text-[var(--color-cavenetBlue)] p-2 rounded hover:bg-[var(--color-cavenetIndigo)] transition"
      >
        {text}
      </Link>
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
            className="w-32 h-12 max-w-64"
          />
        </Link>

        {/* 🔹 Menú principal */}
        <div className="flex items-center justify-center w-full ml-6 relative">
          <ul className="flex">
            <div
              className={`${menu} absolute top-10 left-[-180px] flex-col lg:flex-row bg-[var(--color-cavenetBlue)] p-4 lg:static lg:flex justify-center items-start lg:items-center font-semibold uppercase tracking-widest gap-12 lg:gap-8 xl:gap-10 text-sm`}
            >
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

        {/* 🔹 Íconos sociales */}
        <div className="flex gap-4 ml-6">
          <Link href="/tv" className="hover:text-[var(--color-cavenetIndigo)]">
            <MdLiveTv size={20} />
          </Link>
          <Link
            href="/mi-cuenta"
            className="hover:text-[var(--color-cavenetIndigo)]"
          >
            <FaUser size={20} />
          </Link>
          <a
            href="https://instagram.com/cavenettelecom.ve" // 👈 tu cuenta real de Instagram
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-cavenetIndigo)]"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://wa.me/584144971799" // 👈 tu número real en formato internacional
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-cavenetIndigo)]"
          >
            <FaWhatsapp size={20} />
          </a>

          {/* 🔹 Botón menú hamburguesa */}
          <button
            onClick={toggleMenu}
            className="bg-white text-[var(--color-cavenetBlue)] p-2 rounded-lg shadow-lg hover:bg-gray-200 transition lg:hidden cursor-pointer"
          >
            <HiMenu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
