"use client";
import { useState } from "react";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    referencia: "",
    monto: "",
    bancoOrigen: "",
    cuentaDestino: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔹 Aquí luego conectas con tu backend (POST /api/payments)
    console.log("Datos enviados:", formData);
    alert("Pago reportado correctamente ✅");
    setFormData({
      nombre: "",
      email: "",
      referencia: "",
      monto: "",
      bancoOrigen: "",
      cuentaDestino: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-(--background) shadow-cav rounded-xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-(--cavenet-blue)">
        Reportar Pago
      </h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={formData.nombre}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--cavenet-indigo)"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--cavenet-indigo)"
        required
      />

      <input
        type="text"
        name="referencia"
        placeholder="Referencia bancaria (últimos 6 dígitos)"
        value={formData.referencia}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--cavenet-indigo)"
        required
      />

      <input
        type="number"
        name="monto"
        placeholder="Monto del pago"
        value={formData.monto}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--cavenet-indigo)"
        required
      />

      <input
        type="text"
        name="bancoOrigen"
        placeholder="Banco de origen"
        value={formData.bancoOrigen}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--cavenet-indigo)"
      />

      <input
        type="text"
        name="cuentaDestino"
        placeholder="Cuenta destino"
        value={formData.cuentaDestino}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-(--cavenet-indigo)"
      />

      <button className="w-full py-2 rounded-lg transition-colors bg-(--cavenet-blue) text-white hover:bg-(--cavenet-indigo)">
        Enviar reporte
      </button>
    </form>
  );
}
