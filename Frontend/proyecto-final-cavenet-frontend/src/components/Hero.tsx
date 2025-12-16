"use client";
import Image from "next/image";

export default function Hero() {
  return (
    // 🔹 Aquí ajustas el espacio superior con pt-*
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-96">
      {/* 🔹 Mitad izquierda: fondo con texto */}
      <div
        className="relative flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/fondopantalla.jpg')",
          color: "var(--foreground)",
        }}
      >
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-linear-to-r from-(--cavenet-blue)/70 to-(--cavenet-indigo)/70"></div>

        {/* Contenido */}
<div className="relative z-10 px-4 mt-22">
  <h1 className="text-5xl font-bold mb-0 text-white">
    Prepárate para el internet{" "}
    <span className="text-(--cavenet-indigo)"></span>
  </h1>
  <h1 className="text-5xl font-bold mb-0 text-white">
    de alta velocidad
    <span className="text-(--cavenet-indigo)"></span>
  </h1>
  <p className="text-lg max-w-xl text-(--cav-gray)">
    ¿Qué esperas para contratar Internet de Fibra Óptica?
  </p>
  <p className="text-lg max-w-xl text-(--cav-gray)">
    ¡Navega a ULTRA ALTA VELOCIDAD!
  </p>
</div>
      </div>

      {/* 🔹 Mitad derecha: 3 tarjetas en línea */}
      <div className="flex flex-row justify-center items-start gap-[100px] p-6 bg-white mt-[90px]">
        {/* Tarjeta 1 */}
        <div className="flex flex-col items-center text-center w-[200px]">
          <Image
            src="/tv.png"
            alt="Televisión HD"
            width={270}
            height={169}
            className="rounded-lg shadow-md mb-2"
          />
          <h2 className="text-base font-bold text-(--cavenet-blue)">
            Televisión HD
          </h2>
          <p className="text-sm text-(--foreground) leading-snug">
            Más de 100 canales en vivo y en alta definición.
          </p>
        </div>

        {/* Tarjeta 2 */}
        <div className="flex flex-col items-center text-center w-[200px]">
          <Image
            src="/wifi.jpg"
            alt="Hasta 10 Gbps"
            width={270}
            height={169}
            className="rounded-lg shadow-md mb-2"
          />
          <h2 className="text-base font-bold text-(--cavenet-blue)">
            Hasta 10 Gbps
          </h2>
          <p className="text-sm text-(--foreground) leading-snug">
            Red MPLS para transmisión de datos de alta capacidad.
          </p>
        </div>

        {/* Tarjeta 3 */}
        <div className="flex flex-col items-center text-center w-[200px]">
          <Image
            src="/control.jpg"
            alt="Sin interrupciones"
            width={270}
            height={169}
            className="rounded-lg shadow-md mb-2"
          />
          <h2 className="text-base font-bold text-(--cavenet-blue)">
            Sin interrupciones
          </h2>
          <p className="text-sm text-(--foreground) leading-snug">
            Streaming y juegos sin límite ni caídas.
          </p>
        </div>
      </div>
    </section>
  );
}
