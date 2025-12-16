"use client";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('fondopantalla.jpg')", // coloca aquí tu imagen exportada de Figma
        color: "var(--foreground)",
      }}
    >
      {/* 🔹 Overlay para oscurecer la imagen y mejorar contraste */}
      <div className="absolute inset-0 bg-linear-to-r from-(--cavenet-blue)/70 to-(--cavenet-indigo)/70"></div>

      {/* 🔹 Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Prepárate para el internet <span className="text-(--cavenet-indigo)"></span>
        </h1>
        <h1 className="text-5xl font-bold mb-4 text-white">
          de alta velocidad<span className="text-(--cavenet-indigo)"></span>
        </h1>
        
        <p className="text-lg max-w-xl text-(--cav-gray)">
          ¿Qué esperas para contratar Internet de Fibra Óptica?
        </p>
         <p className="text-lg max-w-xl text-(--cav-gray)">
          !Navega a ULTRA ALTA VELOCIDAD!
        </p>

        <button
          className="mt-6 px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors bg-(--cavenet-blue) hover:bg-(--cavenet-indigo) text-white"
        >
          Explora nuestros planes
        </button>
      </div>
    </section>
  );
}
