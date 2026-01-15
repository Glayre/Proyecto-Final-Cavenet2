"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getTasaCambio } from "@/services/tasaDolar";

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
  const [token, setToken] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 👈 1. Nuevo estado para evitar el flash

  const [factura, setFactura] = useState<ReportePagoPageProps>({});
  const [datos, setDatos] = useState<any>({});
  const [montoBs, setMontoBs] = useState("");
  const [bancoOrigen, setBancoOrigen] = useState("");
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [fecha, setFecha] = useState("2026-01-04");
  const [referencia, setReferencia] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tasaCambio, setTasaCambio] = useState<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const t = localStorage.getItem("authToken");
    const u = localStorage.getItem("userId");
    
    if (!t) {
      // 👈 2. Usamos replace en lugar de push para limpiar el historial
      router.replace("/login");
      return;
    }

    setToken(t);
    setUserid(u);
    setLoading(false); // 👈 3. Solo si hay token, permitimos ver la página

    const id = searchParams.get("id");
    
    apiFetch("/api/users/" + u, { method: "GET" })
      .then((data) => setDatos(data))
      .catch((err) => setError(err.message));

    apiFetch("/api/invoices/und/" + id, { method: "GET" })
      .then((data) => setFactura(data))
      .catch((err) => setError(err.message));

    getTasaCambio()
      .then((tasa) => setTasaCambio(tasa || 0))
      .catch((err) => console.error("Error al obtener la tasa de cambio:", err));
  }, [router, searchParams]);

  // 👈 4. BLOQUEO ANTIFLASH: Si está cargando o no hay token, no renderiza nada
  if (loading) {
    return null; 
  }

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

    try {
        const res = await fetch("http://localhost:4000/api/users/reporte-pago", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(datosReporte),
        });
        const data = await res.json();
        alert(data.message);
        router.push("/mi-cuenta");
    } catch (err) {
        alert("Error al enviar el reporte");
    }
  };

  return (
    <main className="section bg-cavGray relative min-h-screen pt-16">
      <button
        onClick={cerrar}
        className="absolute top-6 right-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 shadow-sm transition-all duration-300 z-50"
        title="Cerrar"
      >
        <span className="text-2xl font-light">✕</span>
      </button>

      <h1 className="section-title">Reporta tu pago</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {/* Estado de cuenta */}
        <div className="card bg-white border border-cavenetBlue space-y-4 shadow-sm">
          {factura && (
            <>
              <h2 className="title-lg border-b pb-2">Estado de Cuenta</h2>
              <h2 className="title-md text-cavenetBlue">Mes: {factura.fecha}</h2>
              <p className="text-sm">
                Factura N°: <strong>{factura.id}</strong>
              </p>
              <p className="text-sm">
                Monto Total: <strong>USD {factura.monto} / VED Bs. {tasaCambio > 0 ? ((factura.monto || 0) * tasaCambio).toFixed(2) : "Cargando..."}</strong>
              </p>
              <p className="text-sm">
                Monto Abonado: <strong>USD {factura.montoAbonado} / VED Bs. {tasaCambio > 0 ? ((factura.montoAbonado || 0) * tasaCambio).toFixed(2) : "Cargando..."}</strong>
              </p>
              <p className="text-sm">
                Estado: <span className="font-bold uppercase text-blue-600">{factura.estado}</span>
              </p>
              <p className="text-sm italic text-gray-500">
                Detalle: {factura.detalle}
              </p>
            </>
          )}
        </div>

        {/* Formulario de pago */}
        <form onSubmit={handleSubmit} className="card bg-white border border-cavenetIndigo space-y-4 shadow-sm">
          <h2 className="title-lg text-cavenetIndigo">Información del pago</h2>
          <p className="text-xs bg-blue-50 p-2 rounded text-blue-800">Tasa del día: <strong>1 USD = {tasaCambio} VES</strong></p>

          <input
            type="text"
            placeholder="Monto en Bs"
            value={montoBs}
            onChange={(e) => setMontoBs(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Banco Origen"
            value={bancoOrigen}
            onChange={(e) => setBancoOrigen(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Seleccionar cuenta destino</option>
            <option value="Banco A">Banco A</option>
            <option value="Banco B">Banco B</option>
          </select>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Referencia (últimos 6 dígitos)"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="flex gap-4 pt-4 justify-center">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all animate-pulse w-full md:w-3/4"
            >
              Enviar pago, abono
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}