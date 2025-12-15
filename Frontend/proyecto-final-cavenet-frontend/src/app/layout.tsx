import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // 🔹 importa tu Navbar

export const metadata: Metadata = {
  title: "CAVENET | Internet de Alta Velocidad",
  description: "Planes de Internet para hogar y empresas desde $25 mensuales. Sin interrupciones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        {/* 🔹 Navbar fijo arriba */}
        <Navbar />

        {/* 🔹 Contenido principal */}
        <main className="pt-20">{children}</main>

        {/* 🔹 Footer opcional */}
        <footer className="bg-cavenetBlue text-white text-center py-6 mt-12">
          &copy; {new Date().getFullYear()} CAVENET. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
