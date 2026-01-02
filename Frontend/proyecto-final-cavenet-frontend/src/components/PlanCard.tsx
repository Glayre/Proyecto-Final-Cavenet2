import Link from "next/link";

interface PlanProps {
  nombre: string;
  velocidad: string;
  precio: string;
  detalles?: string;
  popular?: boolean;
  medidor?: string;
  variant?: string;
}

export default function PlanCard({
  nombre,
  velocidad,
  precio,
  detalles,
  popular,
  medidor,
  variant = "primary",
}: PlanProps) {
  const headerStyles: Record<string, string> = {
    primary: "bg-[var(--color-cavenetBlue)] text-white",
    bronce: "bg-[#965235] text-white",
    plata: "bg-[#8C93A1] text-white",
    oro: "bg-[#EACA4B] text-white",
    diamante: "bg-[#9DE3FF] text-[#2114B5]",
  };

  const buttonStyles: Record<string, string> = {
    primary: "bg-[var(--color-cavenetBlue)] hover:bg-[var(--color-cavenetIndigo)] text-white",
    bronce: "bg-[#965235] hover:opacity-90 text-white",
    plata: "bg-[#8C93A1] hover:opacity-90 text-white",
    oro: "bg-[#EACA4B] hover:opacity-90 text-white",
    diamante: "bg-[#9DE3FF] hover:opacity-90 text-[#2114B5]",
  };

  return (
    <div className="card shadow-card text-center hover:scale-105 transition-transform relative p-0 overflow-hidden">
      {/* Encabezado */}
      <div className={`py-4 ${headerStyles[variant]} font-bold text-xl`}>
        {nombre} {velocidad}
      </div>

      {/* Cuerpo */}
      <div className="bg-[var(--color-cavGray)] px-6 py-6">
        {popular && (
          <span className="absolute top-4 right-4 bg-[var(--color-cavenetIndigo)] text-white text-xs font-semibold px-2 py-1 rounded-full">
            Más popular
          </span>
        )}

        {detalles && (
          <p className="text-base text-[var(--foreground)] mb-4 leading-relaxed">
            {detalles}
          </p>
        )}

        {medidor && (
          <div className="flex justify-center mb-4">
            <img
              src={medidor}
              alt={`Medidor ${velocidad}`}
              className="w-32 h-auto drop-shadow-sm"
            />
          </div>
        )}

        <p className="text-4xl font-semibold text-[var(--color-cavDark)] mb-6">
          {precio}
        </p>
        <div className="flex justify-center">
          <Link
            href="/contratar"
            className={`w-[225px] py-2 rounded-lg font-semibold transition-colors text-center ${buttonStyles[variant]}`}
          >
            CONTRATAR
          </Link>
        </div>
      </div>
    </div>
  );
}
