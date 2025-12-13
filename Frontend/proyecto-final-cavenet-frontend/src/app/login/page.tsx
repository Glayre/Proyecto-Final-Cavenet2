export default function LoginPage() {
  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Iniciar Sesión
      </h1>

      <form className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* 🔹 Correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Botón */}
        <button className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
          Ingresar
        </button>
      </form>

      {/* 🔹 Links adicionales */}
      <p className="text-center text-sm mt-4">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="text-cavenetIndigo hover:underline">
          Regístrate aquí
        </a>
      </p>
      <p className="text-center text-sm mt-2">
        ¿Olvidaste tu contraseña?{" "}
        <a href="/mi-cuenta" className="text-cavenetIndigo hover:underline">
          Recuperar acceso
        </a>
      </p>
    </main>
  );
}
