import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "CAVENET",
  description:
    "Planes de Internet para hogar y empresas desde $25 mensuales. Sin interrupciones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          {/* 🔹 Navbar fijo arriba */}
          <Navbar />

          {/* 🔹 Contenido principal */}
          <main className="pt-16">{children}</main>

          {/* 🔹 Footer dinámico */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

