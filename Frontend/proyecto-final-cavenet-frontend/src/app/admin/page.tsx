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

  // --- ESTADOS PARA DETALLE ---
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
          className="flex items-center gap-2 px-6 py-2 border-2 border-cavenetBlue text-cavenetBlue font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
        >
          <span className="text-xl">←</span> Volver a Mi Cuenta
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-16 text-slate-800 uppercase tracking-tight">
        Panel de Administración
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        
        {/* --- NUEVA SECCIÓN: SOLICITUDES DE REGISTRO --- */}
        <section className="flex flex-col gap-6">
          <div className="text-center w-full">
            <h2 className="text-xl font-bold text-cavenetBlue uppercase tracking-wide inline-block border-b-2 border-slate-100 pb-2 px-8">
              Nuevas Solicitudes de Registro
            </h2>
          </div>
          {registros.length > 0 ? (
            <>
              <RegistroTable 
                router={router} 
                registros={paginate(registros, pageRegistros)} 
              />
              {totalPagesRegistros > 1 && (
                <div className="flex gap-4 justify-center mt-4">
                  <button onClick={() => setPageRegistros(p => Math.max(p - 1, 1))} disabled={pageRegistros === 1} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-50 font-bold text-xs uppercase transition-all">Anterior</button>
                  <span className="text-xs self-center font-bold text-slate-400 uppercase">Página {pageRegistros} de {totalPagesRegistros}</span>
                  <button onClick={() => setPageRegistros(p => Math.min(p + 1, totalPagesRegistros))} disabled={pageRegistros === totalPagesRegistros} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-50 font-bold text-xs uppercase transition-all">Siguiente</button>
                </div>
              )}
            </>
          ) : <p className="text-center text-gray-400 italic py-8 border-2 border-dashed border-slate-100 rounded-xl">No hay solicitudes pendientes.</p>}
        </section>

        {/* --- FACTURAS ABONADAS --- */}
        <section className="flex flex-col gap-6">
          <div className="text-center w-full">
            <h2 className="text-xl font-bold text-cavenetBlue uppercase tracking-wide inline-block border-b-2 border-slate-100 pb-2 px-8">
              Facturas Abonadas (Pagadas)
            </h2>
          </div>
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
          ) : <p className="text-center text-gray-400 italic py-8 border-2 border-dashed border-slate-100 rounded-xl">No hay facturas pagadas.</p>}
        </section>

        {/* --- FACTURAS TOTALES --- */}
        <section className="flex flex-col gap-6">
          <div className="text-center w-full">
            <h2 className="text-xl font-bold text-cavenetBlue uppercase tracking-wide inline-block border-b-2 border-slate-100 pb-2 px-8">
              Historial de Facturas Totales
            </h2>
          </div>
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
          <div className="text-center w-full">
            <h2 className="text-xl font-bold text-cavenetBlue uppercase tracking-wide inline-block border-b-2 border-slate-100 pb-2 px-8">
              Usuarios Registrados
            </h2>
          </div>
          {usuarios.length > 0 ? (
            <>
              <UserTable 
                router={router} 
                Users={paginate(usuarios, pageUsuarios)} 
                onVerDetalle={abrirDetalle} 
              />
              {totalPagesUsuarios > 1 && (
                <div className="flex gap-4 justify-center mt-4">
                  <button onClick={() => setPageUsuarios(p => p - 1)} disabled={pageUsuarios === 1} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-50 font-bold text-xs uppercase">Anterior</button>
                  <span className="text-xs self-center font-bold text-slate-400 uppercase">Página {pageUsuarios} de {totalPagesUsuarios}</span>
                  <button onClick={() => setPageUsuarios(p => p + 1)} disabled={pageUsuarios === totalPagesUsuarios} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-50 font-bold text-xs uppercase">Siguiente</button>
                </div>
              )}
            </>
          ) : <p className="text-center text-gray-500">No hay usuarios registrados.</p>}
        </section>

        {/* --- CONTRATOS --- */}
        <section className="flex flex-col gap-6">
          <div className="text-center w-full">
            <h2 className="text-xl font-bold text-cavenetBlue uppercase tracking-wide inline-block border-b-2 border-slate-100 pb-2 px-8">
              Gestión de Contratos
            </h2>
          </div>
          {contratos.length > 0 ? (
            <>
              <ContractTable router={router} Contracts={paginate(contratos, pageContratos)} />
              {totalPagesContratos > 1 && (
                <div className="flex gap-4 justify-center mt-4">
                  <button onClick={() => setPageContratos(p => p - 1)} disabled={pageContratos === 1} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-50 font-bold text-xs uppercase">Anterior</button>
                  <span className="text-xs self-center font-bold text-slate-400 uppercase">Página {pageContratos} de {totalPagesContratos}</span>
                  <button onClick={() => setPageContratos(p => p + 1)} disabled={pageContratos === totalPagesContratos} className="px-5 py-2 bg-slate-100 text-slate-600 rounded-lg disabled:opacity-50 font-bold text-xs uppercase">Siguiente</button>
                </div>
              )}
            </>
          ) : <p className="text-center text-gray-500">No hay contratos registrados.</p>}
        </section>

        {error && <p className="p-4 bg-red-50 text-red-600 rounded-lg text-center font-bold border border-red-100">{error}</p>}
      </div>

      {/* --- MODAL DE DETALLE DE USUARIO (SIN CAMBIOS EN LÓGICA) --- */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100">
            <div className="p-6 border-b flex justify-between items-center bg-cavenetBlue text-white rounded-t-2xl">
              <h3 className="text-lg font-bold uppercase tracking-widest">Información del Cliente</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl hover:text-white/70 transition-colors">✕</button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Nombres y Apellidos</p>
                <p className="text-lg font-bold text-slate-800 capitalize">{selectedUser.nombre || selectedUser.nombres} {selectedUser.apellido || selectedUser.apellidos}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Documento de Identidad</p>
                <p className="text-lg font-bold text-slate-800">{selectedUser.cedula}</p>
              </div>
              <div className="border-t border-slate-50 pt-4 space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Correo Electrónico</p>
                <p className="font-semibold text-slate-700">{selectedUser.correo || selectedUser.email}</p>
              </div>
              <div className="border-t border-slate-50 pt-4 space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Teléfono Móvil</p>
                <p className="font-semibold text-slate-700">{selectedUser.telefono || "No registrado"}</p>
              </div>
              <div className="md:col-span-2 border-t border-slate-50 pt-4">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <p className="text-cavenetBlue font-bold uppercase text-[9px] tracking-widest mb-2">Dirección de Instalación</p>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {selectedUser.ciudad}, {selectedUser.callePrincipal} {selectedUser.numeroCasa ? `- Casa N° ${selectedUser.numeroCasa}` : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-end rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-cavenetBlue text-white px-10 py-3 rounded-xl font-bold hover:brightness-110 transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-blue-900/10"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}