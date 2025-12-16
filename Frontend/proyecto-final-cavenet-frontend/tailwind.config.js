"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaUser } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full shadow-md z-50"
      style={{ backgroundColor: "var(--cavenet-blue)", color: "white" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logocavenet1.png"
            alt="CAVENET Logo"
            width={150}
            height={50}
            priority
            className="w-auto h-auto max-h-10 md:max-h-12"
          />
        </Link>

        {/* 🔹 Menú principal centrado */}
        <div className="flex items-center justify-center w-full ml-6">
          <ul className="flex font-semibold uppercase tracking-widest justify-center">
            <li className="mx-24">
              <Link href="/" className="hover:text-(--cavenet-indigo)">Inicio</Link>
            </li>
            <li className="mx-12">
              <Link href="/cobertura" className="hover:text-(--cavenet-indigo)">Cobertura</Link>
            </li>
            <li className="mx-12">
              <Link href="/contratar" className="hover:text-(--cavenet-indigo)">Contratar</Link>
            </li>
            <li className="mx-12">
              <Link href="/planes" className="hover:text-(--cavenet-indigo)">Planes</Link>
            </li>
            <li className="mx-12">
              <Link href="/reporte-pago" className="hover:text-(--cavenet-indigo)">Reporta tu pago</Link>
            </li>
            <li className="mx-12">
              <Link href="/contacto" className="hover:text-(--cavenet-indigo)">Contacto</Link>
            </li>
            <li className="mx-12">
              <Link href="/mi-cuenta" className="hover:text-(--cavenet-indigo)">Mi cuenta</Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Íconos sociales alineados a la derecha */}
        <div className="flex gap-4 ml-6">
          <Link href="/tv" className="hover:text-(--cavenet-indigo)">
            <MdLiveTv size={20} />
          </Link>
          <Link href="/mi-cuenta" className="hover:text-(--cavenet-indigo)">
            <FaUser size={20} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hover:text-(--cavenet-indigo)"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="https://wa.me/00000000000"
            target="_blank"
            className="hover:text-(--cavenet-indigo)"
          >
            <FaWhatsapp size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
