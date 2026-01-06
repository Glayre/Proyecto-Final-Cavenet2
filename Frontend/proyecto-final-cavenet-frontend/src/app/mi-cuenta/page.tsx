"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";
import UserNav from "@/components/UserNav";

export default function MiCuentaPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    const datos = user ? JSON.parse(user) : null;

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }

    if (!datos?._id) {
      setError("No se encontró el usuario en localStorage");
      return;
    }

    apiFetch("/api/invoices/" + datos._id, { method: "GET" })
      .then((data) => setFacturas(data))
      .catch((err) => setError(err.message));
  }, [router]);

  // 🔹 Calcular totales de facturas pendientes/vencidas
  const facturasPendientes = facturas.filter(
    (f) => f.estado === "Pendiente" || f.estado === "Vencida"
  );

  const totalUSD = facturasPendientes.reduce(
    (sum, f) => sum + (f.montoUSD || 0),
    0
  );

  const totalBs = facturasPendientes.reduce(
    (sum, f) => sum + parseFloat(f.montoBs || 0),
    0
  );

  return (
    <main className="px-6 py-12 mt-12">
      <UserNav />
      <h1 className="title-xl text-center">Mi Cuenta</h1>

      {error ? (
        <p className="text-center text-red-500 w-full">{error}</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="title-lg mb-6">Mis Facturas</h2>

          <div className="card shadow-card mb-8">
            <h3 className="title-md mb-2">Aviso</h3>
            <p className="text-black">
              Recuerda que las facturas pendientes deben ser pagadas antes del día 10 de cada mes.
            </p>
          </div>

          {/* 🔹 Resumen de estado de cuenta */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="card shadow-card">
              <h3 className="title-md mb-2">Saldo a favor</h3>
              <p className="text-green-600 text-xl font-semibold">Bs. 0,00</p>
            </div>
            <div className="card shadow-card">
              <h3 className="title-md mb-2">Monto a pagar</h3>
              <p className="text-blue-600 text-xl font-semibold">
                VED Bs.{" "}
                {totalBs.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-gray-700 text-lg font-medium">
                USD $ {totalUSD.toFixed(2)}
              </p>
            </div>
          </div>

          {/* 🔹 Botón de acción: Reportar pago */}
          <div className="text-center mb-8">
            <button
              className="btn-primary"
              onClick={() => router.push("/reporte-pago")}
            >
              Reportar pago
            </button>
          </div>

          {/* 🔹 Tabla de facturas */}
          {facturas.length === 0 ? (
            <p className="text-center text-gray-500">
              No tienes facturas registradas.
            </p>
          ) : (
            <InvoiceTable invoices={facturas} router={router} />
          )}
        </div>
      )}
    </main>
  );
}
