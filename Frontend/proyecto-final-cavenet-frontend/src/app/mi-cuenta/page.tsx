"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";
import UserNav from "@/components/UserNav";

export default function MiCuentaPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [datos, setDatos] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!token && !user) {
      router.push("/login");
      return;
    }

    if (!parsedUser?._id) {
      setError("No se encontró el usuario en localStorage");
      return;
    }

    setDatos(parsedUser);

    apiFetch("/api/invoices/" + parsedUser._id, { method: "GET" })
      .then((data) => setFacturas(data))
      .catch((err) => setError(err.message));
  }, [router]);

  // 🔹 Normalizar estados y considerar "reportado"
  const facturasPendientes = facturas.filter(
    (f) =>
      ["pendiente", "vencido", "reportado"].includes(f.estado?.toLowerCase())
  );

  // 🔹 Usar montoPendiente en lugar de montoUSD
  const totalUSD = facturasPendientes.reduce(
    (sum, f) => sum + (f.montoPendiente || 0),
    0
  );

  // 🔹 Recalcular Bs con montoPendiente
  const totalBs = facturasPendientes.reduce(
    (sum, f) => sum + ((f.montoPendiente || 0) * f.tasaVED),
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
          {datos?.planId && (
            <div>
              <h2 className="title-lg mb-2">Mi plan, {datos.planId.nombre}</h2>
              <div className="text-black mb-6">
                <p><strong>velocidadMbps:</strong> {datos.planId.velocidad}</p>
                <p><strong>precioUSD:</strong> USD {datos.planId.precio}</p>
                <p><strong>tipo:</strong> {datos.planId.tipo}</p>
                <p><strong>activo:</strong> {datos.planId.estado}</p>
              </div>
            </div>
          )}

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
              {datos && datos.saldoFavorVED > 0 ? (
                <p className="text-green-600 text-xl font-semibold">
                  VED Bs. {datos.saldoFavorVED}
                </p>
              ) : (
                <p className="text-gray-700 text-lg font-medium">No tienes saldo a favor</p>
              )}
            </div>
            <div className="card shadow-card">
              <h3 className="title-md mb-2">Monto a pagar</h3>
              <p className="text-blue-600 text-xl font-semibold">
                USD {totalUSD.toFixed(2)}
              </p>
              <p className="text-blue-600 text-xl font-semibold">
                Bs. {totalBs.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <button
              className="btn-primary"
              onClick={() => router.push("/reporte-pago")}
            >
              Reportar pago
            </button>
          </div>

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
