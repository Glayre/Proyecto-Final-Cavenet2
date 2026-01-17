"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  Users: any[];
  router: AppRouterInstance;
  onVerDetalle: (user: any) => void;
}

export default function UserTable({ Users, router, onVerDetalle }: Props) {
  const verUsuario = (user: any) => {
    onVerDetalle(user);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full bg-white md:shadow-sm md:rounded-xl border-separate border-spacing-y-4 md:border-spacing-y-0">
          <thead className="hidden md:table-header-group">
            <tr className="bg-cavenetBlue text-white text-xs uppercase">
              <th className="px-5 py-4 text-left rounded-tl-xl">Cédula</th>
              <th className="px-5 py-4 text-left">Nombre Completo</th>
              <th className="px-5 py-4 text-left">Email / Teléfono</th>
              <th className="px-5 py-4 text-center">Dirección</th>
              <th className="px-5 py-4 text-left">Rol</th>
              <th className="px-5 py-4 text-left">Saldo (VED)</th>
              <th className="px-5 py-4 text-center rounded-tr-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {Users.map((user) => (
              <tr key={user._id} className="block md:table-row border border-slate-200 md:border-b bg-white mb-5 md:mb-0 shadow-sm md:shadow-none rounded-xl overflow-hidden hover:bg-slate-50">
                <td className="block md:table-cell px-5 py-3 bg-cavenetBlue md:bg-transparent">
                  <div className="flex justify-between items-center md:block">
                    <span className="text-xs font-bold text-white md:hidden">Cédula:</span>
                    <span className="text-sm font-bold text-white md:text-slate-800">{user.cedula}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                  <div className="flex justify-between items-center md:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Nombre</span>
                    <span className="text-sm text-slate-600">{user.nombre} {user.apellido}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                  <div className="flex flex-col md:block">
                    <div className="text-xs text-slate-500">{user.email}</div>
                    <div className="text-xs text-slate-400">{user.telefono}</div>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-center">
                  <div className="text-[10px] text-slate-500 italic">
                    {user.direccion?.calle}, {user.direccion?.ciudad}
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none uppercase font-bold text-[10px] text-slate-500">
                  {user.rol}
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none font-bold text-slate-700">
                  {user.saldoFavorVED}
                </td>
                <td className="block md:table-cell px-5 py-4 text-center">
                  <button
                    onClick={() => verUsuario(user)}
                    className="bg-cavenetBlue text-white text-[11px] font-medium py-1.5 px-4 rounded hover:bg-[#1a36b0] transition-colors shadow-sm"
                  >
                    Ver Usuario
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