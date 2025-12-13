import type { Metadata } from "next";
import "./globals.css";   // ✅ Importación correcta
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "CAVENET",
  description: "Internet de Alta Velocidad con CAVENET",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans bg-white text-cavDark antialiased">
        {/* 🔹 Contexto de autenticación */}
        <AuthProvider>
          {/* 🔹 Navbar global */}
          <Navbar />

          {/* 🔹 Contenido dinámico */}
          <main className="pt-20 min-h-screen">{children}</main>

          {/* 🔹 Footer global */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
