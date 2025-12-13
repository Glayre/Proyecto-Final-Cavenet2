import type { Metadata } from "next";
import "/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        {/* 🔹 Navbar global */}
        <Navbar />

        {/* 🔹 Contenido dinámico */}
        {children}

        {/* 🔹 Footer global */}
        <Footer />
      </body>
    </html>
  );
}
