export default function MiCuentaPage() {
  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Mi Cuenta
      </h1>
      <form className="max-w-md mx-auto bg-white shadow-card rounded-xl p-6 space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border rounded-lg px-4 py-2"
        />
        <button className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
          Ingresar
        </button>
      </form>
    </main>
  );
}

