"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";
import UserTable from "@/components/UserTable";
import UserNav from "@/components/UserNav";

export default function AdminPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 🔹 Estados para paginación de facturas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔹 Calcular facturas de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(facturas.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }

    apiFetch("/api/invoices/", { method: "GET" })
      .then((data) => setFacturas(data))
      .catch((err) => setError(err.message));

    apiFetch("/api/users/", { method: "GET" })
      .then((data) => {
        setUsuarios(data);
        console.log("Usuarios cargados:", data);
      })
      .catch((err) => setError(err.message));
  }, [router]);

  return (
    <main className="px-6 py-12 mt-12">
      <UserNav />
      <h1 className="title-xl text-center">Panel de Administración</h1>

      <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center justify-center">
        <h2 className="title-lg">Facturas Pendientes</h2>

        {facturas.length > 0 ? (
          <InvoiceTable
            router={router}
            invoices={currentInvoices}   // 🔹 solo facturas de la página actual
            currentPage={currentPage}    // 🔹 nuevo
            totalPages={totalPages}      // 🔹 nuevo
            onPrevPage={handlePrevPage}  // 🔹 nuevo
            onNextPage={handleNextPage}  // 🔹 nuevo
          />
        ) : (
          <p className="text-gray-500">No hay facturas registradas.</p>
        )}

        <h2 className="title-lg">Usuarios</h2>
        {usuarios.length > 0 ? (
          <UserTable router={router} Users={usuarios} />
        ) : (
          <p className="text-gray-500">No hay usuarios registrados.</p>
        )}

        {error && (
          <p className="text-center text-red-500 w-full">{error}</p>
        )}
      </div>
    </main>
  );
}
