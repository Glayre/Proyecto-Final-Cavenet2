// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-cavenetBlue to-cavenetIndigo text-white min-h-[70vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Prepárate para Internet de Alta Velocidad
        </h2>
        <p className="text-lg md:text-xl mb-6">
          ¿Qué esperas para contratar Internet de Fibra Óptica? Navega con ultra alta velocidad, sin límites y con baja latencia.
        </p>
        <button className="bg-white text-cavenetBlue px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200 transition">
          Contratar Ahora
        </button>
      </div>
    </section>
  );
}
