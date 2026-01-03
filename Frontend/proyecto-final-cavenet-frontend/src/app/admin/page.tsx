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
      {/* 🔹 Título principal usando estilos globales */}
      <UserNav />
        <h1 className="title-xl text-center">Panel de Administración</h1>

      {error ? (
        <p className="text-center text-red-500 w-full">{error}</p>
      ) : (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center justify-center">
          <h2>Facturas Pendientes</h2>
          <InvoiceTable invoices={facturasPendientes} />
          <h2>Usuarios</h2>
          <h2>Contratos</h2>
          <h2>Sedes</h2>
        </div>
      )}
    </main>
  );
}

