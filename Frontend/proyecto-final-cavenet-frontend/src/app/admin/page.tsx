"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";
import UserTable from "@/components/UserTable";
import ContractTable from "@/components/ContractTable";
import UserNav from "@/components/UserNav";

export default function AdminPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [facturasTotal, setFacturasTotal] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [contratos, setContratos] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // 🔹 Estados para paginación de facturas
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageTotal, setCurrentPageTotal] = useState(1);
  const itemsPerPage = 5;


  // 🔹 Calcular facturas de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = facturas.slice(indexOfFirstItem, indexOfLastItem);


  const indexOflasItemTotal = currentPageTotal * itemsPerPage;
  const indexOfFirstItemTotal = indexOflasItemTotal - itemsPerPage;
  const currentInvoicesTotal = facturasTotal.slice(indexOfFirstItemTotal, indexOflasItemTotal);

  const totalPages = Math.ceil(facturas.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }

    apiFetch("/api/users/" + id, { method: "GET" }).then((data) => setUserData(data)).catch((err) => setError(err.message));
    apiFetch("/api/invoices/", { method: "GET" })
      .then((data) => {
        // filtrar facturas abonadas
        setFacturasTotal(data);
        const facturasAbonadas = data.filter((factura: any) => factura.montoAbonado > 0);
        setFacturas(facturasAbonadas);
        console.log("Facturas cargadas:", facturasAbonadas);
      })
      .catch((err) => setError(err.message));

    apiFetch("/api/users/", { method: "GET" })
      .then((data) => {
        setUsuarios(data);
        console.log("Usuarios cargados:", data);
      })
      .catch((err) => setError(err.message));
    apiFetch("/api/contrato/", { method: "GET" })
      .then((data) => setContratos(data))
      .catch((err) => setError(err.message));
    
  }, [router]);

  return (
    <main className="px-6 py-12 mt-12">
      <UserNav userData={userData}  />
      <h1 className="title-xl text-center">Panel de Administración</h1>

      <div className="max-w-4xl mx-auto flex flex-col gap-6 items-center justify-center">
        <h2 className="title-lg">Facturas Abonadas</h2>

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
          <p className="text-gray-500">No hay facturas abonadas</p>
        )}

        <h2 className="title-lg">Facturas Totales</h2>
        {facturasTotal.length > 0 ? (
          <InvoiceTable
            router={router}
            invoices={currentInvoicesTotal}   // 🔹 solo facturas de la página actual
            currentPage={currentPageTotal}    // 🔹 nuevo
            totalPages={totalPages}      // 🔹 nuevo
            onPrevPage={handlePrevPage}  // 🔹 nuevo
            onNextPage={handleNextPage}  // 🔹 nuevo
          />
        ) : (
          <p className="text-gray-500">No hay facturas totales</p>
        )}

        <h2 className="title-lg">Usuarios</h2>
        {usuarios.length > 0 ? (
          <UserTable router={router} Users={usuarios} />
        ) : (
          <p className="text-gray-500">No hay usuarios registrados.</p>
        )}

        <h2 className="title-lg">Contratos</h2>
        {contratos.length > 0 ? (
          <ContractTable router={router} Contracts={contratos} />
        ) : (
          <p className="text-gray-500">No hay contratos registrados.</p>
        )}

        {error && (
          <p className="text-center text-red-500 w-full">{error}</p>
        )}
      </div>
    </main>
  );
}
