"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1">
      {/* 🔹 Mitad izquierda: fondo con texto */}
      <div
        className="relative flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/fondopantalla.jpg')",
          color: "var(--foreground)",
        }}
      >
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-cavenetBlue)]/70 to-[var(--color-cavenetIndigo)]/70"></div>

       {/* Contenido */}
    <div className="relative z-10 px-4 mt-20 h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-0 text-white">
        Prepárate para el internet
      </h1>
      <h1 className="text-5xl font-bold mb-8 text-white">
        de alta velocidad
      </h1>
      <p className="text-lg max-w-xl text-[var(--color-cavGray)]">
        ¿Qué esperas para contratar Internet de Fibra Óptica?
      </p>
      <p className="text-lg max-w-xl text-[var(--color-cavGray)]">
        ¡Navega a ULTRA ALTA VELOCIDAD!
      </p>
    </div>

      </div>

      {/* 🔹 Mitad derecha: 3 tarjetas en línea */}
  <div className="flex flex-col lg:flex-row justify-center items-center gap-[100px] p-6 bg-white mt-[90px]">
    {/* Tarjeta 1 */}
    <div className="flex flex-col items-center text-center w-[300px]">
      <Image
        src="/tv.png"
        alt="Televisión HD"
        width={350}
        height={220}
        className="rounded-lg shadow-md mb-2"
      />
      <h2 className="text-base font-bold text-[var(--color-cavenetBlue)]">
        Televisión HD
      </h2>
      <p className="text-sm leading-snug text-justify">
        Más de 100 canales en vivo y en alta definición.
      </p>
    </div>

    {/* Tarjeta 2 */}
    <div className="flex flex-col items-center text-center w-[300px]">
      <Image
        src="/wifi.jpg"
        alt="Hasta 10 Gbps"
        width={350}
        height={220}
        className="rounded-lg shadow-md mb-2"
      />
      <h2 className="text-base font-bold text-[var(--color-cavenetBlue)]">
        Hasta 10 Gbps
      </h2>
      <p className="text-sm leading-snug text-justify">
        Red MPLS para transmisión de datos de alta capacidad.
      </p>
    </div>

    {/* Tarjeta 3 */}
    <div className="flex flex-col items-center text-center w-[300px]">
      <Image
        src="/control.jpg"
        alt="Sin interrupciones"
        width={350}
        height={220}
        className="rounded-lg shadow-md mb-2"
      />
      <h2 className="text-base font-bold text-[var(--color-cavenetBlue)]">
        Sin interrupciones
      </h2>
      <p className="text-sm leading-snug text-justify">
        Streaming y juegos sin límite ni caídas.
      </p>
    </div>
</div>
    </section>
  );
}
