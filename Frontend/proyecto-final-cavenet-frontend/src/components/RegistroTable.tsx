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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background shadow-card rounded-xl">
        <thead>
          <tr className="bg-cavenetBlue text-white">
            <th className="px-4 py-2 text-left font-bold uppercase text-xs">Cliente</th>
            <th className="px-4 py-2 text-left font-bold uppercase text-xs">Cédula</th>
            <th className="px-4 py-2 text-left font-bold uppercase text-xs">Plan</th>
            <th className="px-4 py-2 text-left font-bold uppercase text-xs">Ubicación</th>
            <th className="px-4 py-2 text-left font-bold uppercase text-xs">Contacto</th>
            <th className="px-4 py-2 text-center font-bold uppercase text-xs">Estado</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((reg) => (
            <tr key={reg._id} className="border-b hover:bg-cavGray transition-colors">
              <td className="px-4 py-3">
                <div className="font-bold text-cavDark capitalize">{reg.nombres} {reg.apellidos}</div>
              </td>
              <td className="px-4 py-3 text-foreground text-sm">{reg.cedula}</td>
              <td className="px-4 py-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase">
                  {reg.plan}
                </span>
              </td>
              <td className="px-4 py-3 text-foreground text-sm capitalize">{reg.ciudad}</td>
              <td className="px-4 py-3 text-foreground text-sm">{reg.telefono}</td>
              <td className="px-4 py-3 text-center">
                <span className={`estado-${reg.estado?.toLowerCase()} px-2 py-1 rounded-full text-[10px] font-bold uppercase`}>
                  {reg.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}