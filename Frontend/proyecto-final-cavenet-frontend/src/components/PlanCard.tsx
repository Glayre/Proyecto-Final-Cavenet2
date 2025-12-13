interface PlanCardProps {
  nombre: string;
  velocidad: string;
  precio: string;
}

export default function PlanCard({ nombre, velocidad, precio }: PlanCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center border hover:scale-105 transition">
      <h3 className="text-xl font-bold text-cavenetBlue mb-2">{nombre}</h3>
      <p className="text-gray-700 mb-2">{velocidad}</p>
      <p className="text-2xl font-semibold text-cavenetIndigo mb-4">{precio}</p>
      <button className="bg-cavenetBlue text-white px-4 py-2 rounded hover:bg-cavenetIndigo">
        Contratar
      </button>
    </div>
  );
}
