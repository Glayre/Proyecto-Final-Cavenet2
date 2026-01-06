"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";
import UserTable from "@/components/UserTable";
import UserNav from "@/components/UserNav";

export default function MiCuentaPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }
    
    apiFetch("/api/invoices/", { method: "GET" })
      .then((data) => setFacturas(data))
      .catch((err) => setError(err.message));
    apiFetch("/api/users/", { method: "GET" })
      .then((data) => {
        setUsuarios(data)
        console.log("Usuarios cargados:", data);
        
      })
      .catch((err) => setError(err.message));
    
  }, [router]);

  
  return (
    <main className="px-6 py-12 mt-12">
      {/* 🔹 Título principal usando estilos globales */}
      <UserNav />
        <h1 className="title-xl text-center">Panel de Administración</h1>
        <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center justify-center">
          <h2>Facturas Pendientes</h2>

      {facturas &&  (<InvoiceTable router={router} invoices={facturas} />)} 
        <h2>Usuarios</h2>
      {usuarios &&  (<UserTable router={router} Users={usuarios} />)}
      {error && <p className="text-center text-red-500 w-full">{error}</p>}


      </div>
    </main>
  );
}



