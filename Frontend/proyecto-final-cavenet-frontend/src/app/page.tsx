// src/app/page.tsx (Inicio)
import Hero from "../components/Hero";
import PlanCard from "../components/PlanCard";
import Benefits from "../components/Benefits";

export default function Home() {
  const planesHogar = [
    { nombre: "Básico 100", velocidad: "100 Mbps", precio: "$25 /mes" },
    { nombre: "Básico 150", velocidad: "150 Mbps", precio: "$30 /mes" },
    {
      nombre: "Ideal",
      velocidad: "300 Mbps",
      precio: "$35 /mes",
      detalles: "TV +100 Canales Full HD",
      popular: true,
    },
    {
      nombre: "Multimedia",
      velocidad: "600 Mbps",
      precio: "$40 /mes",
      detalles: "TV +100 Canales Full HD",
    },
    {
      nombre: "Full HD",
      velocidad: "900 Mbps",
      precio: "$45 /mes",
      detalles: "TV +100 Canales Full HD + Telemedicina",
    },
  ];

  const planesPyme = [
    { nombre: "Bronce", velocidad: "400 Mbps", precio: "$50 /mes" },
    { nombre: "Plata", velocidad: "600 Mbps", precio: "$70 /mes" },
    { nombre: "Oro", velocidad: "800 Mbps", precio: "$100 /mes" },
    { nombre: "Diamante", velocidad: "1 Gbps", precio: "$150 /mes" },
  ];

  return (
    <main>
      {/* 🔹 Hero principal */}
      <Hero />

      {/* 🔹 Planes Hogar */}
      <section className="px-6 py-12 bg-cavGray">
        <h2 className="text-3xl font-bold text-center mb-8 text-cavenetBlue">
          Planes Hogar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planesHogar.map((plan, i) => (
            <PlanCard key={i} {...plan} />
          ))}
        </div>
      </section>

      {/* 🔹 Planes PyME */}
      <section className="px-6 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8 text-cavenetBlue">
          Planes PyME
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {planesPyme.map((plan, i) => (
            <PlanCard key={i} {...plan} />
          ))}
        </div>
      </section>

      {/* 🔹 Beneficios */}
      <Benefits />

      {/* 🔹 CTA final */}
      <section className="bg-linear-to-r from-cavenetBlue to-cavenetIndigo text-white text-center py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para navegar a máxima velocidad?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contrata hoy mismo tu plan de Internet de Fibra Óptica y disfruta de
          streaming, gaming y teletrabajo sin interrupciones.
        </p>
        <button className="bg-white text-cavenetBlue px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition">
          Contratar Ahora
        </button>
      </section>
    </main>
  );
}
