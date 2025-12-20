"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InvoiceTable from "../../components/InvoiceTable";

export default function MiCuentaPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }

    fetch("http://localhost:4000/api/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
   
    .then((res) => {
        if (!res.ok) throw new Error("No se pudo obtener las facturas");
        return res.json();
      })
      .then((data) => setFacturas(data))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      });
  }, [router]);
 
  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Mi Cuenta
      </h1>

      {!error ? (
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
 