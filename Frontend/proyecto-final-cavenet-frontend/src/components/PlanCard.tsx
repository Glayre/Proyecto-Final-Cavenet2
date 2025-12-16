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
    <div className="bg-(--background) shadow-cav rounded-xl p-6 text-center hover:scale-105 transition-transform relative">
      {popular && (
        <span className="absolute top-4 right-4 bg-(--cavenet-indigo) text-white text-xs font-semibold px-2 py-1 rounded-full">
          Más popular
        </span>
      )}
      <h3 className="text-xl font-bold text-(--cavenet-blue) mb-2">{nombre}</h3>
      <p className="text-(--foreground) mb-2">{velocidad}</p>
      {detalles && <p className="text-sm text-(--cav-gray) mb-2">{detalles}</p>}
      <p className="text-lg font-semibold text-(--cav-dark)">{precio}</p>
      <button className="mt-4 w-full bg-(--cavenet-blue) text-white py-2 rounded-lg transition-colors hover:bg-(--cavenet-indigo)">
        Contratar
      </button>
    </div>
  );
}
