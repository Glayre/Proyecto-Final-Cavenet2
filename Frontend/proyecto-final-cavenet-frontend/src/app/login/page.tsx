"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 👈 Importa Link de Next.js

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
      const res = await fetch(`${base}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Credenciales inválidas");

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      console.log("➡️ Token guardado:", data.token);
      console.log("➡️ Usuario guardado:", data.user);

      router.push("/mi-cuenta");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <main className="flex h-screen">
      {/* 🔹 Izquierda: formulario centrado dentro del borde */}
      <section className="w-1/2 flex items-center justify-center bg-white px-8">
        <div
          className="w-[600px] h-[678px] bg-[#FFFEFE] border border-[#2041E3] rounded-[25px] shadow-lg flex flex-col justify-center items-center p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
            Iniciar Sesión
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
            />
            <button
              type="submit"
              className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition"
            >
              Ingresar
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-cavenetIndigo hover:underline">
              Regístrate aquí
            </Link>
          </p>
          <p className="text-center text-sm mt-2">
            ¿Olvidaste tu contraseña?{" "}
            <Link href="/recover" className="text-cavenetIndigo hover:underline">
              Recuperar acceso
            </Link>
          </p>

          {error && (
            <p className="text-center text-red-600 mt-4">
              {error}
            </p>
          )}
        </div>
      </section>

      {/* 🔹 Derecha: fondo promocional centrado */}
      <section
        className="w-1/2 flex flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage: "url('/fondo-azul-pagina-web.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-8">
          {/* Internet Fibra + SVG */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/Vector.png" alt="Decorativo" className="w-6 h-6" />
            <h2 className="text-5xl font-extrabold leading-tight">
              Internet Fibra
            </h2>
          </div>

          {/* Óptica */}
          <h2 className="text-5xl font-extrabold leading-tight mb-4">
            Óptica
          </h2>

          {/* Slogan */}
          <p className="text-2xl font-semibold text-white">
            ¡EL FUTURO DE LA CONEXIÓN, HOY!
          </p>
        </div>
      </section>
    </main>
  );
}