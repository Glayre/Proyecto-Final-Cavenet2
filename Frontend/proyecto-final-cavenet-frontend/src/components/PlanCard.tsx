interface PlanProps {
  nombre: string;
  velocidad: string;
  precio: string;
  detalles?: string;
  popular?: boolean;
}

export default function PlanCard({
  nombre,
  velocidad,
  precio,
  detalles,
  popular,
}: PlanProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition-transform relative">
      {popular && (
        <span className="absolute top-4 right-4 bg-cavenetIndigo text-white text-xs font-semibold px-2 py-1 rounded-full">
          Más popular
        </span>
      )}
      <h3 className="text-xl font-bold text-cavenetBlue mb-2">{nombre}</h3>
      <p className="text-gray-600 mb-2">{velocidad}</p>
      {detalles && <p className="text-sm text-gray-500 mb-2">{detalles}</p>}
      <p className="text-lg font-semibold text-cavDark">{precio}</p>
      <button className="mt-4 w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
        Contratar
      </button>
    </div>
  );
}
