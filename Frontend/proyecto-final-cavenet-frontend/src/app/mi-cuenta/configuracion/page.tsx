"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import UserNav from "@/components/UserNav";

/*

Datos del usuario:

    const userinfo = {
      _id: userSafe._id,
      cedula: userSafe.cedula,
      email: userSafe.email,
      nombre: userSafe.nombre,
      apellido: userSafe.apellido,
      telefono: userSafe.telefono,
      rol: userSafe.rol,
      direccion: {
        sede: userSafe.direccion.sede,
        ciudad: userSafe.direccion.ciudad,
        urbanizacion: userSafe.direccion.urbanizacion,
        calle: userSafe.direccion.calle,
      },
      saldoFavorUSD: userSafe.saldoFavorUSD,
      plan: plan ? {
        _id: plan._id,
        nombre: plan.nombre,
        velocidadMbps: plan.velocidadMbps,
        precioUSD: plan.precioUSD,
        tipo: plan.tipo,
        activo: plan.activo
      } : null
    };

*/

interface UserData {
  _id: string;
  cedula: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
  direccion: {
    sede: string;
    ciudad: string;
    urbanizacion: string;
    calle: string;
  };
  saldoFavorUSD: number;
  plan: {
    _id: string;
    nombre: string;
    velocidadMbps: number;
    precioUSD: number;
    tipo: string;
    activo: boolean;
  } | null;
}

export default function MiCuentaPage() {
  const [datos, setDatos] = useState<any | null>(null); // 🔹 objeto, no array
  const [formData, setFormData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch("/api/users/" + id, { method: "GET" })
      .then((data) => {
        setDatos(data);
        setFormData(data);
      })
      .catch((err) => setError(err));
  }, [router]);

  return (
    <main className="px-6 py-12 mt-12">
      <UserNav userData={datos} />
      <h1 className="title-xl text-center">Configuración de cuenta</h1>

      {error ? (
        <p className="text-center text-red-500 w-full">{error}</p>
      ) : datos ? (
        <div className="max-w-4xl mx-auto">
          <h2>Datos</h2>
          <form className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData?.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={formData?.nombre}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nombre: e.target.value,
                  })
                }
              />
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                name="apellido"
                id="apellido"
                placeholder="Apellido"
                value={formData?.apellido}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    apellido: e.target.value,
                  })
                }
              />
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                name="telefono"
                id="telefono"
                placeholder="Telefono"
                value={formData?.telefono}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefono: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded col-span-2 hover:bg-blue-700 w-32 mt-4"
              onClick={(e) => {
                e.preventDefault();
                apiFetch("/api/users/" + localStorage.getItem("userId"), {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                  },
                  method: "PATCH",
                  body: JSON.stringify({
                    userId: localStorage.getItem("userId"),
                    email: formData?.email,
                    nombre: formData?.nombre,
                    apellido: formData?.apellido,
                    telefono: formData?.telefono,
                  }),
                })
                  .then((data) => {
                    setDatos(data);
                    setFormData(data);
                    router.push("/mi-cuenta");
                  })
                  .catch((err) => setError(err.message));
              }}
            >
              Guardar
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">Cargando datos...</p>
      )}
    </main>
  );
}
