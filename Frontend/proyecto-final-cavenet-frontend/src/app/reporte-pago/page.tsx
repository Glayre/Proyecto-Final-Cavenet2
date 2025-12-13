export default function ReportePagoPage() {
  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Reporta tu pago
      </h1>
      <form className="max-w-lg mx-auto bg-white shadow-card rounded-xl p-6 space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />
        <input
          type="text"
          placeholder="Referencia bancaria"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />
        <button className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
          Enviar reporte
        </button>
      </form>
    </main>
  );
}
