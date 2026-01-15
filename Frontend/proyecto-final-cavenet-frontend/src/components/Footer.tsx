"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; 
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#1D166F] text-white px-6 py-12 mt-12">
      {/* Logo centrado */}
      <div className="flex justify-center mb-8">
        <Image
          src="/logocavenet1.png" 
          alt="Cavenet Logo"
          width={220}
          height={100}
          priority
          // 🔹 CORRECCIÓN: Se añade style para mantener el aspect ratio
          style={{ width: "auto", height: "auto" }} 
        />
      </div>

      {/* Redes sociales centradas */}
      <div className="flex justify-center gap-8 mb-8">
        <a
          href="https://facebook.com/cavenet" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cavenetIndigo)]"
        >
          <FaFacebookF size={28} />
        </a>
        <a
          href="https://instagram.com/cavenettelecom.ve" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cavenetIndigo)]"
        >
          <FaInstagram size={28} />
        </a>
        <a
          href="https://twitter.com/cavenet" 
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-cavenetIndigo)]"
        >
          <FaTwitter size={28} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center text-lg font-normal">
        © {year ?? ""} CAVENET. Todos los derechos reservados.
      </div>
    </footer>
  );
}