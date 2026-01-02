"use client";
import Hero from "../components/Hero";
import PlanCard from "../components/PlanCard";
import Benefits from "../components/Benefits";
import Link from "next/link"; // 👈 Importamos Link

export default function Home() {
  const planesHogar = [
    {
      nombre: "BÁSICO",
      velocidad: "100 Mbps",
      precio: "$25 mensual",
      variant: "primary",
      medidor: "basicohogar100.png",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
    {
      nombre: "BÁSICO Plus",
      velocidad: "150 Mbps",
      precio: "$35 mensual",
      variant: "primary",
      medidor: "basicohogar150.png",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
  ];

  const planesPyme = [
    {
      nombre: "Bronce PyME",
      velocidad: "400 Mbps",
      precio: "$50 mensual",
      variant: "bronce",
      medidor: "broncepyme400.png",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
    {
      nombre: "Plata PyME",
      velocidad: "600 Mbps",
      precio: "$70 mensual",
      variant: "plata",
      medidor: "platapyme600.png",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
    {
      nombre: "Oro PyME",
      velocidad: "800 Mbps",
      precio: "$100 mensual",
      variant: "oro",
      medidor: "oropyme800.png",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
    {
      nombre: "Diamante PyME",
      velocidad: "1 Gbps",
      precio: "$150 mensual",
      variant: "diamante",
      medidor: "diamantepyme1000.png",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
  ];

  return (
    <main>
      {/* 🔹 Hero principal */}
      <Hero />

      {/* 🔹 Planes Hogar */}
      <section className="section max-w-screen-xl mx-auto">
        <h2 className="title-lg text-center">Planes para el Hogar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {planesHogar.map((plan, i) => (
            <PlanCard key={`hogar-${i}`} {...plan} />
          ))}
        </div>

        {/* 🔹 Planes PyME */}
        <h2 className="title-lg text-center">Planes PyME</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {planesPyme.map((plan, i) => (
            <PlanCard key={`pyme-${i}`} {...plan} />
          ))}
        </div>
      </section>

      {/* 🔹 Beneficios */}
      <Benefits />

      {/* 🔹 CTA final */}
      <section className="bg-gradient-to-r from-[var(--color-cavenetBlue)] to-[var(--color-cavenetIndigo)] text-white text-center py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para navegar a máxima velocidad?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contrata hoy mismo tu plan de Internet de Fibra Óptica y disfruta de
          streaming, gaming y teletrabajo sin interrupciones.
        </p>
        {/* 🔹 Botón corregido con Link */}
        <Link
          href="/contratar"
          className="bg-white text-[var(--color-cavenetBlue)] px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition inline-block"
        >
          Contratar Ahora
        </Link>
      </section>
    </main>
  );
}
