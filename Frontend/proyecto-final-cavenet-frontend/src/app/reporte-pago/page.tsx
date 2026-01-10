 "use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface ReportePagoPageProps {
  fecha?: string;
  id?: string;
  montoUSD?: number;
  montoBs?: number;
  estado?: string;
  detalle?: string;
  tasaVED?: number;
  moneda?: string;
}
export default function ReportePagoPage() {
  const tasa = 303.92; // 🔹 Tasa del día (puedes reemplazar con API)
  const deudaUsd = 26.9;
  const pagosUsd = 10;
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("authUser");
  const datos = user ? JSON.parse(user) : null;
  const deudaBs = (deudaUsd * tasa).toFixed(2);
  const pagosBs = (pagosUsd * tasa).toFixed(2);
  const [factura, setFactura] = useState<ReportePagoPageProps>({});
  const [montoUsd, setMontoUsd] = useState("");
  const [montoBs, setMontoBs] = useState("");
  const [bancoOrigen, setBancoOrigen] = useState("");
  const [cuentaDestino, setCuentaDestino] = useState("");
  const [cedula, setCedula] = useState("");
  const [fecha, setFecha] = useState("2026-01-04");
  const [referencia, setReferencia] = useState("");

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
    useEffect(() => {
      
  
      if (!token) {
        router.push("/login"); // 🔹 Redirige si no hay token
        return;
      }
      // Tomamos la facturaId del parámetro de la URL
      const id = searchParams.get("id");
  
      if (!datos?._id) {
        setError("No se encontró el usuario en localStorage");
        return;
      }
  
      apiFetch("/api/invoices/und/" + id, { method: "GET" })
        .then((data) => setFactura(data))
        .catch((err) => setError(err.message));
    }, [router]);

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
      fecha
    }
    console.log("Enviando datos de reporte de pago:", datosReporte);

        
    const res = await fetch("http://localhost:4000/api/users/reporte-pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" , Authorization: `Bearer ${localStorage.getItem("authToken")}`},
      body: JSON.stringify(datosReporte),
    });
    const data = await res.json();
    console.log("Respuesta del backend:", data);
    alert(data.message);
  };

  return (
    <main className="section bg-cavGray">
      <h1 className="section-title">Reporta tu pago</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* 🟦 Estado de cuenta */}
        <div className="card bg-white border border-cavenetBlue] space-y-4">
          {factura && (<>
          <h2 className="title-lg">Estado de Cuenta</h2>
          <h2 className="title-md">Mes: {factura.fecha}</h2>

          <p className="text-sm">Factura N°: <strong>{factura.id}</strong></p>
          <p className="text-sm">Monto Total: <strong>USD {factura.montoUSD} / VED Bs. {factura.montoBs}</strong></p>
          <p className="text-sm">Estado: <strong>{factura.estado}</strong></p>
          <p className="text-sm">Detalle: <strong>{factura.detalle}</strong></p>
          </>)} 
        </div>

        {/* 🟩 Formulario de pago */}
        <form onSubmit={handleSubmit} className="card bg-white border border-cavenetIndigo] space-y-4">
          <h2 className="title-lg">Información del pago</h2>
          <p className="text-sm">Tasa del día: <strong>1 USD = {tasa} VES</strong></p>

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