export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-cavenetBlue to-cavenetIndigo text-white h-[70vh] flex flex-col justify-center items-center text-center px-6">
      {/* 🔹 Título principal */}
      <h2 className="text-5xl font-bold mb-4">
        Prepárate para el Internet de Alta Velocidad
      </h2>

      {/* 🔹 Subtítulo */}
      <p className="text-lg mb-6 max-w-2xl">
        ¡Navega a ULTRA ALTA VELOCIDAD con CAVENET! Disfruta streaming, gaming y
        descargas sin interrupciones.
      </p>

      {/* 🔹 Botón de acción */}
      <button className="bg-white text-cavenetBlue px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200 transition">
        Contratar Ahora
      </button>
    </section>
  );
}
