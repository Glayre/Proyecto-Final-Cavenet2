"use client";
import { useState, useEffect } from "react";

export default function ReportePagoPage() {
  const tasa = 303.92; // 🔹 Tasa del día (puedes reemplazar con API)
  const deudaUsd = 26.9;
  const pagosUsd = 10;

  const deudaBs = (deudaUsd * tasa).toFixed(2);
  const pagosBs = (pagosUsd * tasa).toFixed(2);

  const [montoUsd, setMontoUsd] = useState("");
  const [montoBs, setMontoBs] = useState("");
  const [bancoOrigen, setBancoOrigen] = useState("");
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [cedula, setCedula] = useState("");
  const [fecha, setFecha] = useState("2026-01-04");
  const [referencia, setReferencia] = useState("");

  useEffect(() => {
    const valor = parseFloat(montoUsd);
    setMontoBs(isNaN(valor) ? "" : (valor * tasa).toFixed(2));
  }, [montoUsd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/api/users/reporte-pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ montoUsd, montoBs, bancoOrigen, cuentaDestino, cedula, fecha, referencia }),
    });
    const data = await res.json();
    console.log("Respuesta del backend:", data);
    alert(data.message);
  };

  return (
    <main className="section bg-[var(--color-cavGray)]">
      <h1 className="section-title">Reporta tu pago</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* 🟦 Estado de cuenta */}
        <div className="card bg-white border border-[var(--color-cavenetBlue)] space-y-4">
          <h2 className="title-lg">Mi estado de cuenta</h2>
          <p className="text-cavenetIndigo font-semibold">NOVIEMBRE 2025</p>

          <button className="btn-outline w-full">
            Pendiente por pagar: VED Bs. {deudaBs}
          </button>

          <div className="text-sm text-[var(--color-cavDark)]">
            <p>Deuda Total:</p>
            <p>USD ${deudaUsd} / VED Bs. {deudaBs}</p>
          </div>

          <button className="btn-secondary w-full">
            Pagos agregados: USD ${pagosUsd} / VED Bs. {pagosBs}
          </button>
        </div>

        {/* 🟩 Formulario de pago */}
        <form onSubmit={handleSubmit} className="card bg-white border border-[var(--color-cavenetIndigo)] space-y-4">
          <h2 className="title-lg">Información del pago</h2>
          <p className="text-sm">Tasa del día: <strong>1 USD = {tasa} VES</strong></p>

          <input
            type="text"
            placeholder="Monto en USD"
            value={montoUsd}
            onChange={(e) => setMontoUsd(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          {montoBs && (
            <p className="text-sm text-[var(--color-cavDark)]">
              Monto en Bs: VED Bs. {montoBs}
            </p>
          )}

          <input
            type="text"
            placeholder="Banco Origen"
            value={bancoOrigen}
            onChange={(e) => setBancoOrigen(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <select
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Seleccionar cuenta destino</option>
            <option value="Banco A">Banco A</option>
            <option value="Banco B">Banco B</option>
          </select>
          <input
            type="text"
            placeholder="N° de cédula de identidad"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
          <input
            type="text"
            placeholder="Referencia (últimos 6 dígitos)"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex gap-4 pt-4">
            <button type="button" className="btn-primary w-1/2 text-white">
              Agregar pago
            </button>
            <button type="submit" className="btn-secondary w-1/2 text-white">
              Enviar pago, abono
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

