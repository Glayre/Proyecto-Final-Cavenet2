"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";

export default function MiCuentaPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }

    // ✅ Usamos apiFetch en lugar de fetch directo
    apiFetch("/api/invoices", { method: "GET" })
      .then((data) => setFacturas(data))
      .catch((err) => setError(err.message));
  }, [router]);

  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Mi Cuenta
      </h1>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
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
