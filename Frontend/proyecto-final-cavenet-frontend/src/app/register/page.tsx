export default function RegisterPage() {
  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Crear una cuenta
      </h1>

      <form className="max-w-lg mx-auto bg-white shadow-card rounded-xl p-6 space-y-4">
        {/* 🔹 Nombre */}
        <input
          type="text"
          placeholder="Nombre"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Apellido */}
        <input
          type="text"
          placeholder="Apellido"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Teléfono */}
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Confirmar contraseña */}
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Botón */}
        <button className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
          Registrarse
        </button>
      </form>

      {/* 🔹 Link a login */}
      <p className="text-center text-sm mt-4">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-cavenetIndigo hover:underline">
          Inicia sesión aquí
        </a>
      </p>
    </main>
  );
}
