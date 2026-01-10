"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 🔹 Importar router

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 🔹 Inicializar router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/users/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);

      if (!res.ok || data.error) {
        alert("❌ Ocurrió un error\nNo se encontró la información relacionada");
      } else {
        alert("📩 Revisa tu correo para continuar");
      }
    } catch (err) {
      alert("❌ Error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen">
      {/* 🔹 Formulario lado izquierdo */}
      <section className="w-1/2 flex items-center justify-center bg-white px-8">
        <div className="w-[600px] h-[678px] bg-[#FFFEFE] border border-[#2041E3] rounded-[25px] shadow-lg flex flex-col justify-center items-center p-8 relative">
          {/* 🔹 Flecha + título alineados */}
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => router.push("/login")} className="inline-flex items-center">
              <img
                src="/flechaizquierda.png"
                alt="Volver"
                className="w-7 h-7 svg-icon"
              />
            </button>
            <h1 className="text-3xl font-bold text-cavenetBlue">
              Recuperar Contraseña
            </h1>
          </div>

          {/* 🔹 Bloque visual ajustado */}
          <div className="text-center text-sm mb-6 space-y-1">
            <p>¿No tienes cuenta?</p>
            <a href="/register" className="text-cavenetIndigo hover:underline font-medium">
              Regístrate Aquí
            </a>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cavenetIndigo"
              required
            />

            <button
              type="submit"
              className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition"
              disabled={loading}
            >
              {loading ? "Buscando información del cliente..." : "Continuar"}
            </button>
          </form>

          {/* 🔹 Animación de búsqueda */}
          {loading && (
            <div className="absolute bottom-6 text-center text-cavenetIndigo text-sm">
              <p>Buscando información del cliente</p>
              <p>Por favor espere...</p>
            </div>
          )}
        </div>
      </section>

      {/* 🔹 Bloque azul lado derecho */}
      <section
        className="w-1/2 flex flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage: "url('/fondo-azul-pagina-web.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="/Vector.png" alt="Decorativo" className="w-6 h-6" />
            <h2 className="text-5xl font-extrabold leading-tight">Internet Fibra</h2>
          </div>
          <h2 className="text-5xl font-extrabold leading-tight mb-4">Óptica</h2>
          <p className="text-2xl font-semibold text-white">¡EL FUTURO DE LA CONEXIÓN, HOY!</p>
        </div>
      </section>
    </main>
  );
}
