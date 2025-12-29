"use client";
import { useState, useEffect } from "react";

export default function CoberturaPage() {
  const mapas = [
    { src: "/mapasandiego.png", alt: "Mapa San Diego" },
    { src: "/mapalosguayos.png", alt: "Mapa Los Guayos" },
    { src: "/mapaguacara.png", alt: "Mapa Guacara" },
  ];

  const [index, setIndex] = useState(0);

  // Cambiar imagen cada 4 segundos
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
        className="relative w-full max-w-[1579px] h-[1124px] mx-auto shadow-card rounded-xl bg-cover bg-center"
        style={{ backgroundImage: "url('/mapadevenezuelafondoazul.jpg')" }}
      >
        {/* Título grande */}
        <h2 className="absolute top-[208px] left-[86px] w-[1415px] text-center font-bold text-[#FFF8F8] text-[60px] leading-[73px]">
          Mapa de cobertura y
        </h2>
        <h2 className="absolute top-[275px] left-[103px] w-[1382px] text-center font-bold text-[#FFF8F8] text-[60px] leading-[73px]">
          ubicaciones
        </h2>

        {/* Texto de zonas */}
        <p className="absolute top-[368px] left-[103px] w-[1382px] text-center font-bold text-[#FFF8F8] text-[30px] leading-[36px]">
          Puedes disfrutar de nuestro servicio en San Diego,
        </p>
        <p className="absolute top-[404px] left-[101px] w-[1381px] text-center font-bold text-[#FFF8F8] text-[30px] leading-[36px]">
          Los Guayos y Guacara.
        </p>

        {/* Carrusel de mapas */}
        <div className="absolute top-[670px] left-[462px] w-[657px] h-[381px] rounded-lg overflow-hidden shadow-card">
          <img
            src={mapas[index].src}
            alt={mapas[index].alt}
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>
      </section>
    </main>
  );
}
