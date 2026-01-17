"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Registro {
  _id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  plan: string;
  ciudad: string;
  telefono: string;
  estado: string;
}

interface Props {
  registros: Registro[];
  router: AppRouterInstance;
}

export default function RegistroTable({ registros, router }: Props) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full bg-white md:shadow-sm md:rounded-xl border-separate border-spacing-y-4 md:border-spacing-y-0">
          <thead className="hidden md:table-header-group">
            <tr className="bg-cavenetBlue text-white">
              <th className="px-5 py-4 text-left rounded-tl-xl font-semibold text-xs uppercase">Cliente</th>
              <th className="px-5 py-4 text-left font-semibold text-xs uppercase">Cédula</th>
              <th className="px-5 py-4 text-left font-semibold text-xs uppercase">Plan</th>
              <th className="px-5 py-4 text-left font-semibold text-xs uppercase">Ubicación</th>
              <th className="px-5 py-4 text-left font-semibold text-xs uppercase">Contacto</th>
              <th className="px-5 py-4 text-center rounded-tr-xl font-semibold text-xs uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {registros.map((reg) => (
              <tr key={reg._id} className="block md:table-row border border-slate-200 md:border-b bg-white mb-5 md:mb-0 shadow-sm md:shadow-none rounded-xl overflow-hidden hover:bg-slate-50 transition-colors">
                <td className="block md:table-cell px-5 py-3 bg-cavenetBlue md:bg-transparent">
                  <div className="flex justify-between items-center md:block">
                    <span className="text-xs font-bold text-white md:hidden tracking-tight">Solicitante:</span>
                    <span className="text-sm font-bold text-white md:text-slate-800 capitalize">{reg.nombres} {reg.apellidos}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                  <div className="flex justify-between items-center md:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Cédula</span>
                    <span className="text-sm text-slate-600">{reg.cedula}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                  <div className="flex justify-between items-center md:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Plan</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{reg.plan}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-center">
                  <div className="flex justify-between md:block items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Ubicación</span>
                    <span className="text-sm text-slate-600 capitalize">{reg.ciudad}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-center">
                  <div className="flex justify-between md:block items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Contacto</span>
                    <span className="text-sm text-slate-600">{reg.telefono}</span>
                  </div>
                </td>
                <td className="block md:table-cell px-5 py-4 text-center">
                  <div className="flex justify-center items-center w-full">
                    <span className={`estado-${reg.estado?.toLowerCase()} px-3 py-1 rounded text-[10px] font-bold uppercase`}>
                      {reg.estado}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}