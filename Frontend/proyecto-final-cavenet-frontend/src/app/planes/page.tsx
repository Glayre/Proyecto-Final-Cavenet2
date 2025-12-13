import PlanCard from "../../components/PlanCard";

export default function PlanesPage() {
  const planes = [
    { nombre: "BÁSICO", velocidad: "100 Mbps", precio: "$25 mensual" },
    { nombre: "BÁSICO Plus", velocidad: "150 Mbps", precio: "$35 mensual" },
    { nombre: "IDEAL", velocidad: "300 Mbps", precio: "$50 mensual" },
    { nombre: "MULTIMEDIA", velocidad: "600 Mbps", precio: "$70 mensual" },
    { nombre: "FULLHD", velocidad: "900 Mbps", precio: "$100 mensual" },
    { nombre: "Bronce PyME", velocidad: "200 Mbps", precio: "$40 mensual" },
    { nombre: "Plata PyME", velocidad: "400 Mbps", precio: "$60 mensual" },
    { nombre: "Oro PyME", velocidad: "800 Mbps", precio: "$90 mensual" },
    { nombre: "Diamante PyME", velocidad: "1 Gbps", precio: "$120 mensual" },
  ];

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-cavenetBlue">
        Todos nuestros planes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planes.map((plan, i) => (
          <PlanCard key={i} {...plan} />
        ))}
      </div>
    </main>
  );
}
