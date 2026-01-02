import PlanCard from "../../components/PlanCard";

export default function PlanesPage() {
  // Planes para el Hogar (según diseño Figma)
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

  // Planes PyME (estilo corporativo sin medidor)
  const planesPyME = [
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
      medidor: "diamantepyme1000.png",
      variant: "diamante",
      detalles: "Sin interrupciones · Sin límites · Sin caídas",
    },
  ];

  return (
    <main className="section">
      {/* Título principal */}
      <h1 className="section-title">Todos nuestros planes</h1>

      {/* Planes para el Hogar */}
      <h2 className="title-lg text-center">Planes para el Hogar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {planesHogar.map((plan, i) => (
          <PlanCard key={`hogar-${i}`} {...plan} />
        ))}
      </div>

      {/* Planes PyME */}
      <h2 className="title-lg text-center">Planes PyME</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planesPyME.map((plan, i) => (
          <PlanCard key={`pyme-${i}`} {...plan} />
        ))}
      </div>
    </main>
  );
}
