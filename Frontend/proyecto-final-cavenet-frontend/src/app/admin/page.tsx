"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

// --- COMPONENTES ---
import InvoiceTable from "@/components/InvoiceTable";
import UserTable from "@/components/UserTable";
import ContractTable from "@/components/ContractTable";
import RegistroTable from "@/components/RegistroTable"; 
import UserNav from "@/components/UserNav";

export default function AdminPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [facturasTotal, setFacturasTotal] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [contratos, setContratos] = useState<any[]>([]);
  const [registros, setRegistros] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [tasaBCV, setTasaBCV] = useState<number>(62.50);
  const router = useRouter();

  // --- NUEVOS ESTADOS PARA DETALLE (SIN TOCAR LO ANTERIOR) ---
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirDetalle = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // --- LÓGICA DE PAGINACIÓN ---
  const itemsPerPage = 5;
  const [pageFacturas, setPageFacturas] = useState(1);
  const [pageFacturasTotal, setPageFacturasTotal] = useState(1);
  const [pageUsuarios, setPageUsuarios] = useState(1);
  const [pageContratos, setPageContratos] = useState(1);
  const [pageRegistros, setPageRegistros] = useState(1);

  const paginate = (items: any[], currentPage: number) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPagesFacturas = Math.ceil(facturas.length / itemsPerPage);
  const totalPagesFacturasTotal = Math.ceil(facturasTotal.length / itemsPerPage);
  const totalPagesUsuarios = Math.ceil(usuarios.length / itemsPerPage);
  const totalPagesContratos = Math.ceil(contratos.length / itemsPerPage);
  const totalPagesRegistros = Math.ceil(registros.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch("/api/users/" + id, { method: "GET" })
      .then((data) => setUserData(data))
      .catch((err) => setError(err.message));

    apiFetch("/api/invoices/", { method: "GET" })
      .then((data) => {
        setFacturasTotal(data);
        const facturasAbonadas = data.filter((f: any) =>
          f.estado?.toLowerCase() === "pagada" || f.estado?.toLowerCase() === "pagado"
        );
        setFacturas(facturasAbonadas);
      })
      .catch((err) => setError(err.message));

    apiFetch("/api/users/", { method: "GET" })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message));

    apiFetch("/api/contrato/", { method: "GET" })
      .then((data) => setContratos(data))
      .catch((err) => setError(err.message));

    apiFetch("/api/registro", { method: "GET" })
      .then((data) => setRegistros(data))
      .catch((err) => setError(err.message));

  }, [router]);

  return (
    <main className="px-6 py-12 mt-12 bg-white min-h-screen relative">
      <UserNav userData={userData} />

      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => router.push("/mi-cuenta")}
          className="flex items-center gap-2 px-6 py-2 border-2 border-[#2041E3] text-[#2041E3] font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
        >
          <span className="text-xl">←</span> Volver a Mi Cuenta
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800 uppercase">
        Panel de Administración
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* --- NUEVA SECCIÓN: SOLICITUDES DE REGISTRO --- */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-orange-600 border-b-2 pb-2 uppercase">
            Nuevas Solicitudes de Registro
          </h2>
          {registros.length > 0 ? (
            <>
              <RegistroTable 
                router={router} 
                registros={paginate(registros, pageRegistros)} 
              />
              {totalPagesRegistros > 1 && (
                <div className="flex gap-4 justify-center mt-4">
                  <button onClick={() => setPageRegistros(p => Math.max(p - 1, 1))} disabled={pageRegistros === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 font-bold">Anterior</button>
                  <span className="text-sm self-center font-bold">Página {pageRegistros} de {totalPagesRegistros}</span>
                  <button onClick={() => setPageRegistros(p => Math.min(p + 1, totalPagesRegistros))} disabled={pageRegistros === totalPagesRegistros} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 font-bold">Siguiente</button>
                </div>
              )}
            </>
          ) : <p className="text-center text-gray-500 italic">No hay solicitudes de registro pendientes.</p>}
        </section>

        {/* --- FACTURAS ABONADAS --- */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-green-700 border-b-2 pb-2 uppercase">
            Facturas Abonadas (Pagadas)
          </h2>
          {facturas.length > 0 ? (
            <InvoiceTable
              router={router}
              invoices={paginate(facturas, pageFacturas)}
              tasaVED={tasaBCV}
              currentPage={pageFacturas}
              totalPages={totalPagesFacturas}
              onPrevPage={() => setPageFacturas(p => Math.max(p - 1, 1))}
              onNextPage={() => setPageFacturas(p => Math.min(p + 1, totalPagesFacturas))}
            />
          ) : <p className="text-center text-gray-500 italic">No hay facturas pagadas.</p>}
        </section>

        {/* --- FACTURAS TOTALES --- */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-blue-700 border-b-2 pb-2 uppercase">
            Historial de Facturas Totales
          </h2>
          {facturasTotal.length > 0 ? (
            <InvoiceTable
              router={router}
              invoices={paginate(facturasTotal, pageFacturasTotal)}
              tasaVED={tasaBCV}
              currentPage={pageFacturasTotal}
              totalPages={totalPagesFacturasTotal}
              onPrevPage={() => setPageFacturasTotal(p => Math.max(p - 1, 1))}
              onNextPage={() => setPageFacturasTotal(p => Math.min(p + 1, totalPagesFacturasTotal))}
            />
          ) : <p className="text-center text-gray-500">No hay historial de facturas.</p>}
        </section>

        {/* --- USUARIOS --- */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 border-b-2 pb-2 uppercase">
            Usuarios Registrados
          </h2>
          {usuarios.length > 0 ? (
            <>
              {/* NOTA: Asegúrate de que UserTable reciba onVerDetalle */}
              <UserTable 
                router={router} 
                Users={paginate(usuarios, pageUsuarios)} 
                onVerDetalle={abrirDetalle} 
              />
              {totalPagesUsuarios > 1 && (
                <div className="flex gap-4 justify-center mt-4">
                  <button onClick={() => setPageUsuarios(p => p - 1)} disabled={pageUsuarios === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 font-bold">Anterior</button>
                  <span className="text-sm self-center font-bold">Página {pageUsuarios} de {totalPagesUsuarios}</span>
                  <button onClick={() => setPageUsuarios(p => p + 1)} disabled={pageUsuarios === totalPagesUsuarios} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 font-bold">Siguiente</button>
                </div>
              )}
            </>
          ) : <p className="text-center text-gray-500">No hay usuarios registrados.</p>}
        </section>

        {/* --- CONTRATOS --- */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 border-b-2 pb-2 uppercase">
            Gestión de Contratos
          </h2>
          {contratos.length > 0 ? (
            <>
              <ContractTable router={router} Contracts={paginate(contratos, pageContratos)} />
              {totalPagesContratos > 1 && (
                <div className="flex gap-4 justify-center mt-4">
                  <button onClick={() => setPageContratos(p => p - 1)} disabled={pageContratos === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 font-bold">Anterior</button>
                  <span className="text-sm self-center font-bold">Página {pageContratos} de {totalPagesContratos}</span>
                  <button onClick={() => setPageContratos(p => p + 1)} disabled={pageContratos === totalPagesContratos} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 font-bold">Siguiente</button>
                </div>
              )}
            </>
          ) : <p className="text-center text-gray-500">No hay contratos registrados.</p>}
        </section>

        {error && <p className="p-4 bg-red-100 text-red-700 rounded-md text-center font-bold">{error}</p>}
      </div>

      {/* --- MODAL DE DETALLE DE USUARIO (SOLO SE MUESTRA SI isModalOpen ES TRUE) --- */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center bg-cavenetBlue text-white rounded-t-xl">
              <h3 className="text-xl font-bold uppercase tracking-tight">Detalles del Usuario</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl hover:text-gray-300">✕</button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500 font-bold uppercase text-[10px]">Nombres y Apellidos</p>
                <p className="text-lg font-bold text-gray-800 capitalize">{selectedUser.nombre || selectedUser.nombres} {selectedUser.apellido || selectedUser.apellidos}</p>
              </div>
              <div>
                <p className="text-gray-500 font-bold uppercase text-[10px]">Cédula / RIF</p>
                <p className="text-lg font-bold text-gray-800">{selectedUser.cedula}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-500 font-bold uppercase text-[10px]">Correo Electrónico</p>
                <p className="font-medium">{selectedUser.correo || selectedUser.email}</p>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-500 font-bold uppercase text-[10px]">Teléfono</p>
                <p className="font-medium">{selectedUser.telefono || "No registrado"}</p>
              </div>
              <div className="md:col-span-2 border-t pt-4 bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-700 font-bold uppercase text-[10px] mb-2">Dirección Registrada</p>
                <p className="text-gray-700">
                  {selectedUser.ciudad}, {selectedUser.callePrincipal} {selectedUser.numeroCasa ? `- Casa N° ${selectedUser.numeroCasa}` : ""}
                </p>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex justify-end rounded-b-xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-cavenetBlue text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-800 transition-all uppercase text-xs"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}