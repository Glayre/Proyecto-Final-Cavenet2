import { FaWifi, FaHeadset, FaShieldAlt } from "react-icons/fa";

export default function Benefits() {
  const items = [
    { icon: <FaWifi size={32} />, title: "Fibra Óptica", desc: "Conexión estable y de alta velocidad." },
    { icon: <FaHeadset size={32} />, title: "Soporte Técnico", desc: "Atención personalizada 24/7." },
    { icon: <FaShieldAlt size={32} />, title: "Seguridad", desc: "Protección avanzada para tu red." },
  ];

  return (
    <section className="px-6 py-12 bg-(--background)">
      <h2 className="text-3xl font-bold text-center mb-8 text-(--cavenet-blue)">
        ¿Por qué elegirnos?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-(--cav-gray) rounded-xl p-6 text-center shadow-cav hover:scale-105 transition-transform"
          >
            <div className="text-(--cavenet-indigo) mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-(--cav-dark)">{item.title}</h3>
            <p className="text-(--foreground)">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
