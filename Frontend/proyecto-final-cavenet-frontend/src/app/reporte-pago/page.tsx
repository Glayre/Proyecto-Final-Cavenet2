"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import {getTasaCambio} from "@/services/tasaDolar";

interface ReportePagoPageProps {
  fecha?: string;
  id?: string;
  mes?: string;
  monto?: number;
  montoAbonado?: number;
  estado?: string;
  detalle?: string;
}

export default function ReportePagoPage() {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("authUser");
  const datos = user ? JSON.parse(user) : null;

  const [factura, setFactura] = useState<ReportePagoPageProps>({});
  const [montoBs, setMontoBs] = useState("");
  const [bancoOrigen, setBancoOrigen] = useState("");
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [fecha, setFecha] = useState("2026-01-04");
  const [referencia, setReferencia] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tasaCambio, setTasaCambio] = useState<number | null>(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    const id = searchParams.get("id");
    if (!datos?._id) {
      setError("No se encontró el usuario en localStorage");
      return;
    }
    apiFetch("/api/invoices/und/" + id, { method: "GET" })
      .then((data) => setFactura(data))
      .catch((err) => setError(err.message));
    // Obtener la tasa de cambio actual
    getTasaCambio()
      .then((tasa) => setTasaCambio(tasa))
      .catch((err) => console.error("Error al obtener la tasa de cambio:", err));
  }, [router]);

  // 🔹 Función para cerrar con ❌
  const cerrar = () => {
    router.push("/mi-cuenta");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const datosReporte = {
      clienteId: datos._id,
      invoiceId: factura.id,
      monto: parseFloat(montoBs),
      montoMoneda: "VED",
      bancoOrigen,
      cuentaDestino,
      referencia,
      fecha,
    };

    const res = await fetch("http://localhost:4000/api/users/reporte-pago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(datosReporte),
    });
    const data = await res.json();
    alert(data.message);
    router.push("/mi-cuenta"); // 🔹 redirección automática
  };

  return (
    <main className="section bg-cavGray relative">
      {/* 🔹 Botón de cerrar arriba */}
      <button
        onClick={cerrar}
        className="absolute top-4 right-4 text-red-600 text-xl font-bold hover:scale-105"
        title="Cerrar"
      >
        ❌
      </button>

      <h1 className="section-title">Reporta tu pago</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Estado de cuenta */}
        <div className="card bg-white border border-cavenetBlue space-y-4">
          {factura && tasaCambio && (
            <>
              <h2 className="title-lg">Estado de Cuenta</h2>
              <h2 className="title-md">Mes: {factura.fecha}</h2>
              <p className="text-sm">
                Factura N°: <strong>{factura.id}</strong>
              </p>
              <p className="text-sm">
                Monto Total: <strong>USD {factura.monto} / VED Bs. {(factura.monto || 0) * tasaCambio}</strong>
              </p>
              <p className="text-sm">
                Monto Abonado: <strong>USD {factura.montoAbonado} / VED Bs. {(factura.montoAbonado || 0) * tasaCambio}</strong>
              </p>
              <p className="text-sm">
                Estado: <strong>{factura.estado}</strong>
              </p>
              <p className="text-sm">
                Detalle: <strong>{factura.detalle}</strong>
              </p>
            </>
          )}
        </div>

        {/* Formulario de pago */}
        <form onSubmit={handleSubmit} className="card bg-white border border-cavenetIndigo space-y-4">
          <h2 className="title-lg">Información del pago</h2>
          <p className="text-sm">Tasa del día: <strong>1 USD = {tasaCambio} VES</strong></p>

          <input
            type="text"
            placeholder="Monto en Bs"
            value={montoBs}
            onChange={(e) => setMontoBs(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
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
            <button type="submit" className="btn-primary w-1/2 text-black">
              Enviar pago, abono
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
