"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import UserNav from "@/components/UserNav";

export default function MiCuentaPage() {
  const [datos, setDatos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");
    const datos = user ? JSON.parse(user) : null;

    if (!token) {
      router.push("/login"); // 🔹 Redirige si no hay token
      return;
    }

    if (!datos?._id) {
      // Avoid calling setState synchronously inside an effect — defer to the next tick
      setTimeout(() => setError("No se encontró el usuario en localStorage"), 0);
      return;
    }

    apiFetch("/api/users/" + datos._id, { method: "GET" })
      .then((data) => setDatos(data))
      .catch((err) => setError(err.message));
  }, [router]);

  return (
    <main className="px-6 py-12 mt-12">
      {/* 🔹 Título principal usando estilos globales */}
      <UserNav />
        <h1 className="title-xl text-center">Configuración de cuenta</h1>

      {error ? (
        <p className="text-center text-red-500 w-full">{error}</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2>Datos</h2>
          <div className="text-black">
            <p><strong>Nombre:</strong> {datos.nombre}</p>
            <p><strong>Email:</strong> {datos.email}</p>
            <p><strong>Telefono:</strong> {datos.telefono}</p>
          </div>
        </div>
      )}
    </main>
  );
}
