"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      // 1. Manejo de Errores según Status Code del Backend
      if (res.status === 404) {
        alert("❌ Correo no encontrado o asociado");
      } else if (res.status === 500) {
        alert("💥 Error interno en el servidor. Intente más tarde.");
      } else if (res.ok) {
        // 2. Éxito (Status 200)
        alert("📩 Se ha enviado un enlace con un código de recuperación a tu correo.");
        router.push("/login");
      } else {
        alert(`⚠️ ${data.error || "Ocurrió un error inesperado"}`);
      }
    } catch (err) {
      alert("❌ Error de conexión al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-white">
      <section className="w-1/2 flex items-center justify-center px-8">
        <div className="w-[600px] h-[678px] bg-[#FFFEFE] border border-[#2041E3] rounded-[25px] shadow-lg flex flex-col p-8 relative">
          
          {/* 🔹 CABECERA AJUSTADA (Bajamos a mt-24 y alineamos flecha) */}
          <div className="flex items-center justify-center w-full mt-24 mb-12 relative px-4">
            <button 
              onClick={() => router.push("/login")} 
              className="absolute left-6 -top-1 p-2 hover:scale-110 transition-transform flex items-center"
              type="button"
            >
              <img
                src="/flechaizquierda.png"
                alt="Volver"
                className="w-7 h-7"
                style={{ 
                  filter: "invert(21%) sepia(87%) saturate(3470%) hue-rotate(224deg) brightness(91%) contrast(101%)" 
                }}
              />
            </button>
            
            <h1 className="text-4xl font-bold text-[#2041E3] text-center">
              Recuperar Contraseña
            </h1>
          </div>

          {/* Sección de registro con espaciado optimizado */}
          <div className="text-center text-sm mb-16 space-y-2">
            <p className="text-gray-500 text-base">¿No tienes cuenta?</p>
            <a href="/register" className="text-[#2041E3] hover:underline font-bold text-base">
              Regístrate Aquí
            </a>
          </div>

          {/* Formulario con mayor padding lateral para equilibrio visual */}
          <form onSubmit={handleSubmit} className="w-full space-y-8 px-12">
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-5 focus:ring-2 focus:ring-[#2041E3] outline-none text-lg shadow-sm"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#2041E3] text-white py-5 rounded-xl hover:bg-blue-800 transition-all font-black text-xl shadow-md active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Verificando..." : "Continuar"}
            </button>
          </form>

          {/* Estado de carga animado */}
          {loading && (
            <div className="absolute bottom-16 left-0 right-0 text-center text-[#2041E3] animate-pulse">
              <p className="font-bold text-sm uppercase tracking-[0.3em]">Verificando en base de datos</p>
            </div>
          )}
        </div>
      </section>

      {/* Lado derecho (Banner Informativo) */}
      <section
        className="hidden md:flex w-1/2 flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage: "url('/fondo-azul-pagina-web.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/Vector.png" alt="Logo" className="w-10 h-10" />
            <h2 className="text-6xl font-black">Internet Fibra</h2>
          </div>
          <h2 className="text-6xl font-black mb-6">Óptica</h2>
          <p className="text-2xl font-light tracking-widest uppercase">¡El futuro de la conexión, hoy!</p>
        </div>
      </section>
    </main>
  );
}