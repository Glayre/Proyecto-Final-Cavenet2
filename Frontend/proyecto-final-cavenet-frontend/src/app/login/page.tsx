"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();

      // 🔹 Guardar token en localStorage
      localStorage.setItem("token", data.token);

      // 🔹 Redirigir a /mi-cuenta
      router.push("/mi-cuenta");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
  };


  return (
    <main className="px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
        Iniciar Sesión
      </h1>

      <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* 🔹 Correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
        />

        {/* 🔹 Botón */}
        <button 
        type="submit"
        className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
          Ingresar
        </button>
      </form>

      {/* 🔹 Links adicionales */}
      <p className="text-center text-sm mt-4">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="text-cavenetIndigo hover:underline">
          Regístrate aquí
        </a>
      </p>
      <p className="text-center text-sm mt-2">
        ¿Olvidaste tu contraseña?{" "}
        <a href="/mi-cuenta" className="text-cavenetIndigo hover:underline">
          Recuperar acceso
        </a>
      </p>
    </main>
  );
}
