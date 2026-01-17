"use client";
import Hero from "../components/Hero";
import PlanCard from "../components/PlanCard";
import Benefits from "../components/Benefits";
import Link from "next/link";

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#004aad] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
  </svg>
);

export default function Home() {
  const planesHogar = [
    {
      nombre: "BÁSICO",
      velocidad: "100 Mbps",
      precio: "$25 mensual",
      variant: "primary",
      medidor: "basicohogar100.png",
      ventajas: ["Sin interrupciones", "Sin límites", "Sin caídas"],
    },
    {
      nombre: "BÁSICO Plus",
      velocidad: "150 Mbps",
      precio: "$35 mensual",
      variant: "primary",
      medidor: "basicohogar150.png",
      ventajas: ["Sin interrupciones", "Sin límites", "Sin caídas"],
    },
  ];

  const planesPyme = [
    {
      nombre: "Bronce PyME",
      velocidad: "400 Mbps",
      precio: "$50 mensual",
      variant: "bronce",
      medidor: "broncepyme400.png",
      ventajas: ["Sin interrupciones", "Sin límites", "Sin caídas"],
    },
    {
      nombre: "Plata PyME",
      velocidad: "600 Mbps",
      precio: "$70 mensual",
      variant: "plata",
      medidor: "platapyme600.png",
      ventajas: ["Sin interrupciones", "Sin límites", "Sin caídas"],
    },
    {
      nombre: "Oro PyME",
      velocidad: "800 Mbps",
      precio: "$100 mensual",
      variant: "oro",
      medidor: "oropyme800.png",
      ventajas: ["Sin interrupciones", "Sin límites", "Sin caídas"],
    },
    {
      nombre: "Diamante PyME",
      velocidad: "1 Gbps",
      precio: "$150 mensual",
      variant: "diamante",
      medidor: "diamantepyme1000.png",
      ventajas: ["Sin interrupciones", "Sin límites", "Sin caídas"],
    },
  ];

  return (
    <main className="bg-white">
      <Hero />

      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#004aad] inline-block border-b-4 border-slate-100 pb-3 px-10 uppercase tracking-tight">
            Planes para el Hogar
          </h2>
        </div>

        {/* 🔹 Grid de Hogar ajustado para coincidir con el tamaño de PyME */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 justify-center">
          <div className="lg:col-start-2">
            <PlanItem plan={planesHogar[0]} />
          </div>
          <div>
            <PlanItem plan={planesHogar[1]} />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#004aad] inline-block border-b-4 border-slate-100 pb-3 px-10 uppercase tracking-tight">
            Planes PyME
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planesPyme.map((plan, i) => (
            <PlanItem key={i} plan={plan} />
          ))}
        </div>
      </section>

      <Benefits />

      <section className="bg-gradient-to-r from-[#004aad] to-[#3b82f6] text-white text-center py-24 px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          ¿Listo para navegar a máxima velocidad?
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
          Contrata hoy mismo tu plan de Internet de Fibra Óptica y disfruta de streaming, gaming y teletrabajo sin interrupciones.
        </p>
        <Link href="/registro" className="bg-white text-[#004aad] px-12 py-4 rounded-xl font-bold shadow-2xl hover:scale-105 transition-all inline-block uppercase tracking-widest">
          Contratar Ahora
        </Link>
      </section>
    </main>
  );
}

// 🔹 Componente de Tarjeta con efecto Hover Expand y Fondo Blanco (Imagen 1)
function PlanItem({ plan }: { plan: any }) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center h-full">
      <h3 className="text-lg font-bold text-[#004aad] mb-1">{plan.nombre}</h3>
      <div className="text-3xl font-black text-slate-800 mb-1">{plan.velocidad}</div>
      <p className="text-[#3b82f6] font-bold mb-4">{plan.precio}</p>
      
      <img src={`/${plan.medidor}`} alt={plan.nombre} className="w-full h-auto mb-6 rounded-xl" />

      <ul className="w-full space-y-3 mb-8 text-left text-sm">
        {plan.ventajas.map((ventaja: string, idx: number) => (
          <li key={idx} className="flex items-center gap-2 text-slate-600 font-medium leading-tight">
            <CheckIcon /> {ventaja}
          </li>
        ))}
      </ul>

      <Link href="/registro" className="w-full bg-[#004aad] text-white py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-[#003d8f] transition-all text-center text-xs mt-auto">
        Contratar Plan
      </Link>
    </div>
  );
}