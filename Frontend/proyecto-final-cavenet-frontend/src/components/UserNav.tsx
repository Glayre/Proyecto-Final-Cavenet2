"use client"; // 🔹 MODIFICADO: asegura que este componente solo se renderice en el cliente

import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  userData: any | null;
}

const UserNav = ({ userData }: props) => {
  const [user, setUser] = useState<any | null>(null); // 🔹 MODIFICADO: estado para el usuario

  useEffect(() => {
    setUser(userData); // 🔹 MODIFICADO: asigna los datos del usuario al estado
  }, [userData]);

  const Salir = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <nav className="mb-8 flex justify-end items-center gap-4">
      <button
        onClick={Salir}
        className="bg-red-500 px-4 py-2 rounded text-white cursor-pointer"
      >
        Salir
      </button>
      <Link
        href="/mi-cuenta/configuracion"
        className="bg-gray-500 px-4 py-2 rounded text-white cursor-pointer"
      >
        Configuracion
      </Link>
      {user?.rol === "admin" && (
        <Link
          href="/admin"
          className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer"
        >
          Admin
        </Link>
      )}
    </nav>
  );
};

export default UserNav;
