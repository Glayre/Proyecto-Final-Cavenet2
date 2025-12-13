import Hero from "../components/Hero";
import PlanCard from "../components/PlanCard";

export default function Home() {
  const planesHogar = [
    { nombre: "BÁSICO", velocidad: "100 Mbps", precio: "$25 mensual" },
    { nombre: "BÁSICO Plus", velocidad: "150 Mbps", precio: "$35 mensual" },
    { nombre: "IDEAL", velocidad: "300 Mbps", precio: "$50 mensual" },
    { nombre: "MULTIMEDIA", velocidad: "600 Mbps", precio: "$70 mensual" },
    { nombre: "FULLHD", velocidad: "900 Mbps", precio: "$100 mensual" },
  ];

  const planesPyme = [
    { nombre: "Bronce", velocidad: "200 Mbps", precio: "$40 mensual" },
    { nombre: "Plata", velocidad: "400 Mbps", precio: "$60 mensual" },
    { nombre: "Oro", velocidad: "800 Mbps", precio: "$90 mensual" },
    { nombre: "Diamante", velocidad: "1 Gbps", precio: "$120 mensual" },
  ];

  return (
    <main>
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
    </main>
  );
}
