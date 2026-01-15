"use client";

import App from "next/app";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  Users: any[];
  router: AppRouterInstance;
  onVerDetalle: (user: any) => void; // 1. Agregamos esta prop para conectar con el Modal
}

export default function UserTable({ Users, router, onVerDetalle }: Props) {
  
  // Mantenemos tu función original por si quieres navegar luego
  const verUsuario = (user: any) => {
    console.log("📤 Ver usuario detalle:", user._id);
    onVerDetalle(user); // 2. Llamamos a la función que abre el modal
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background shadow-card rounded-xl">
        <thead>
          <tr className="bg-cavenetBlue text-white">
            <th className="px-4 py-2 text-left">Cédula</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Dirección</th>
            <th className="px-4 py-2 text-left">Rol</th>
            <th className="px-4 py-2 text-left">Saldo a Favor (VED)</th>
            <th className="px-4 py-2 text-left">Acciones</th>      
          </tr>
        </thead>
        <tbody>
          {Users.map((user) => {
            console.log("👤 Usuario:", user);
            return (
              <tr key={user._id} className="border-b hover:bg-color-cavGray transition-colors">
                <td className="px-4 py-2 font-medium text-color-cavDark">{user.cedula}</td>
                <td className="px-4 py-2 text-foreground">{user.nombre}</td>
                <td className="px-4 py-2 text-foreground">{user.apellido}</td>
                <td className="px-4 py-2 text-foreground">{user.email}</td>
                <td className="px-4 py-2 text-foreground">{user.telefono}</td>
                <td className="px-4 py-2 text-foreground text-xs">
                  {/* Manejo seguro de la dirección por si algún campo viene nulo */}
                  {user.direccion?.calle}, {user.direccion?.ciudad}, {user.direccion?.sede}
                </td>
                <td className="px-4 py-2 text-foreground">{user.rol}</td>
                <td className="px-4 py-2 text-foreground">{user.saldoFavorVED}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => verUsuario(user)} // 3. Enviamos el objeto completo
                    className="btn-secondary whitespace-nowrap"
                  >
                    Ver Usuario
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>               
      </table>
    </div>
  );
}