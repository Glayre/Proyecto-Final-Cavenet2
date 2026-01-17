"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  Contracts: any[];
  router: AppRouterInstance;
}

export default function ContractTable({ Contracts, router }: Props) {
  const handleToggleEstado = async (contratoId: string, estadoActual: string) => {
    const nuevoEstado = estadoActual === "activo" ? "suspendido" : "activo";
    const confirmar = confirm(`¿Estás seguro de cambiar el estado a: ${nuevoEstado.toUpperCase()}?`);
    if (confirmar) {
      try {
        const response = await fetch(`http://localhost:4000/api/contrato/${contratoId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          },
          body: JSON.stringify({ estado: nuevoEstado })
        });
        if (response.ok) {
          alert(`Contrato ${nuevoEstado} con éxito`);
          window.location.reload(); 
        } else {
          alert("Error al actualizar el estado");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full bg-white md:shadow-sm md:rounded-xl border-separate border-spacing-y-4 md:border-spacing-y-0">
          <thead className="hidden md:table-header-group">
            <tr className="bg-cavenetBlue text-white text-xs uppercase">
              <th className="px-5 py-4 text-left rounded-tl-xl">Cliente / Cédula</th>
              <th className="px-5 py-4 text-center">Plan Contratado</th>
              <th className="px-5 py-4 text-center">Precio (USD)</th>
              <th className="px-5 py-4 text-left">Estado</th>
              <th className="px-5 py-4 text-left">Fecha Inicio</th>
              <th className="px-5 py-4 text-center rounded-tr-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {Contracts.map((contract) => (
              <tr key={contract._id} className="block md:table-row border border-slate-200 md:border-b bg-white mb-5 md:mb-0 shadow-sm md:shadow-none rounded-xl overflow-hidden">
                <td className="block md:table-cell px-5 py-3 bg-cavenetBlue md:bg-transparent">
                  <div className="flex flex-col md:block">
                    <span className="text-sm font-bold text-white md:text-slate-800">
                      {contract.clienteId?.nombre ? `${contract.clienteId.nombre} ${contract.clienteId.apellido}` : "Sin Nombre"}
                    </span>
                    <span className="text-[10px] text-blue-100 md:text-slate-400 font-medium">
                       ID: {contract.clienteId?.cedula || "S/C"}
                    </span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-center">
                  <span className="text-sm font-bold text-slate-700">{contract.planId?.nombre || "Sin Plan"}</span>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-center">
                  <span className="text-sm font-medium text-slate-600">${contract.planId?.precioUSD || "0"}</span>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    contract.estado === "activo" ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"
                  }`}>
                    {contract.estado}
                  </span>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-sm text-slate-500">
                  {contract.fechaInicio ? new Date(contract.fechaInicio).toLocaleDateString() : "No definida"}
                </td>
                <td className="block md:table-cell px-5 py-5 text-center">
                  <button
                    onClick={() => handleToggleEstado(contract._id, contract.estado)}
                    className={`text-[10px] font-bold py-2 px-5 rounded-lg uppercase transition-all shadow-sm text-white ${
                      contract.estado === "activo" ? "bg-red-600 hover:bg-red-800" : "bg-green-600 hover:bg-green-800"
                    }`}
                  >
                    {contract.estado === "activo" ? "Suspender" : "Reactivar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}