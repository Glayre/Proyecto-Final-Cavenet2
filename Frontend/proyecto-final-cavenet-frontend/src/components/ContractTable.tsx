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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background shadow-card rounded-xl">
        <thead>
          <tr className="bg-cavenetBlue text-white">
            <th className="px-4 py-2 text-left">Cliente</th>
            <th className="px-4 py-2 text-left">Cédula</th>
            <th className="px-4 py-2 text-left">Plan</th>
            <th className="px-4 py-2 text-left">Precio (USD)</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Fecha Inicio</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Contracts.map((contract) => (
            <tr key={contract._id} className="border-b hover:bg-color-cavGray">
              {/* CORRECCIÓN FINAL: Usamos 'clienteId' tal como viene en tu JSON de Insomnia */}
              <td className="px-4 py-2 text-foreground">
                {contract.clienteId?.nombre ? `${contract.clienteId.nombre} ${contract.clienteId.apellido}` : "Sin Nombre"}
              </td>
              <td className="px-4 py-2 text-foreground">
                {contract.clienteId?.cedula || "S/C"}
              </td>
              <td className="px-4 py-2 font-bold text-foreground">
                {contract.planId?.nombre || "Sin Plan"}
              </td>
              <td className="px-4 py-2 text-foreground">
                ${contract.planId?.precioUSD || "0"}
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                  contract.estado === "activo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {contract.estado}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {contract.fechaInicio ? new Date(contract.fechaInicio).toLocaleDateString() : "No definida"}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleToggleEstado(contract._id, contract.estado)}
                  className={`font-bold py-1 px-4 rounded text-[11px] uppercase transition-colors shadow-sm ${
                    contract.estado === "activo" 
                      ? "bg-red-600 text-white hover:bg-red-800" 
                      : "bg-green-600 text-white hover:bg-green-800"
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
  );
}