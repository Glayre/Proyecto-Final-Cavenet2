export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center bg-linear-to-r"
      style={{
        backgroundImage: "linear-gradient(to right, var(--cavenet-blue), var(--cavenet-indigo))",
        color: "var(--foreground)",
      }}
    >
      {/* 🔹 Título principal */}
      <h1 className="text-5xl font-bold mb-4">
        Bienvenido a <span className="text-(--cavenet-indigo)">CAVENET</span>
      </h1>

      {/* 🔹 Subtítulo */}
      <p className="text-lg max-w-xl text-(--cav-gray)">
        Conectando innovación y tecnología, inspirado en 360NET.
      </p>

      {/* 🔹 Botón CTA */}
      <button
        className="mt-6 px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors hover:bg-(--cavenet-indigo)"
        style={{
          backgroundColor: "var(--cavenet-blue)",
          color: "white",
        }}
      >
        Explora nuestros planes
      </button>
    </section>
  );
}
