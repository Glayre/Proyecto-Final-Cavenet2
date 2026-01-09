"use client";
import { useState, useEffect } from "react";

export default function CoberturaPage() {
  const mapas = [
    { src: "/mapasandiego.png", alt: "Mapa San Diego" },
    { src: "/mapalosguayos.png", alt: "Mapa Los Guayos" },
    { src: "/mapaguacara.png", alt: "Mapa Guacara" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mapas.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="section bg-[var(--background)] text-[var(--foreground)]">
      {/* Título principal */}
      <h1 className="title-xl text-center">Cobertura</h1>

      {/* Descripción general */}
      <p className="max-w-2xl mx-auto text-center mb-8">
        Nuestro servicio de Internet de Fibra Óptica está disponible en varias
        zonas de Carabobo y pronto en más ciudades de Venezuela.
      </p>

      {/* Sección visual del mapa */}
      <section
        className="relative w-full mx-auto shadow-card rounded-xl bg-cover bg-center flex flex-col items-center justify-center p-6"
        style={{ backgroundImage: "url('/mapadevenezuelafondoazul.jpg')" }}
      >
        {/* Título grande */}
        <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-2">
          Mapa de cobertura y
        </h2>
        <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-6">
          ubicaciones
        </h2>

        {/* Texto de zonas */}
        <p className="font-bold text-white text-lg sm:text-xl md:text-2xl text-center">
          Puedes disfrutar de nuestro servicio en San Diego,
        </p>
        <p className="font-bold text-white text-lg sm:text-xl md:text-2xl text-center mb-8">
          Los Guayos y Guacara.
        </p>

        {/* Carrusel de mapas */}
        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl aspect-video rounded-lg overflow-hidden shadow-card">
          <img
            src={mapas[index].src}
            alt={mapas[index].alt}
            className="w-full h-full object-contain transition-opacity duration-700"
          />
        </div>
      </section>
    </main>
  );
}
