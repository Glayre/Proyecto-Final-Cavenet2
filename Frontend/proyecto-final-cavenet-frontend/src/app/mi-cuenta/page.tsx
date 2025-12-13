"use client";
import { useState } from "react";
import InvoiceTable from "../../components/InvoiceTable";

export default function MiCuentaPage() {
  // 🔹 Estado simulado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔹 Facturas de ejemplo con estados literales correctos
  const facturas = [
    { id: "INV-001", fecha: "2025-12-01", monto: "$25", estado: "Pagada" as const },
    { id: "INV-002", fecha: "2025-12-05", monto: "$40", estado: "Pendiente" as const },
    { id: "INV-003", fecha: "2025-12-10", monto: "$70", estado: "Vencida" as const },
  ];

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Mi Cuenta
      </h1>

      {!isLoggedIn ? (
        // 🔹 Formulario de login
        <form
          className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoggedIn(true); // Simulación de login
          }}
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
          />
          <button className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
            Ingresar
          </button>
        </form>
      ) : (
        // 🔹 Vista de facturas
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-cavenetBlue">
            Mis Facturas
          </h2>
          <InvoiceTable invoices={facturas} />
        </div>
      )}
    </main>
  );
}
