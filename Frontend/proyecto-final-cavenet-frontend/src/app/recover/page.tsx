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

      if (res.status === 404) {
        alert("❌ Correo no encontrado o asociado");
      } else if (res.status === 500) {
        alert("💥 Error interno en el servidor. Intente más tarde.");
      } else if (res.ok) {
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
    <main className="flex min-h-screen bg-white">
      {/* 🟢 LADO IZQUIERDO: FORMULARIO */}
      <section className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 py-10">
        {/* Cuadro principal: se cambió w-[600px] por w-full max-w-[600px] para ser responsivo */}
        <div className="w-full max-w-[600px] min-h-[600px] bg-[#FFFEFE] border border-[#2041E3] rounded-[25px] shadow-lg flex flex-col p-6 sm:p-8 relative overflow-hidden">
          
          {/* 🔹 CABECERA RESPONSIVA (Flecha y Título alineados con Flexbox) */}
          <div className="flex items-center w-full mt-12 lg:mt-20 mb-10 px-2">
            {/* Contenedor de la flecha */}
            <div className="flex-none w-10">
              <button 
                onClick={() => router.push("/login")} 
                className="p-1 hover:scale-110 transition-transform flex items-center justify-center"
                type="button"
              >
                <img
                  src="/flechaizquierda.png"
                  alt="Volver"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                  style={{ 
                    filter: "invert(21%) sepia(87%) saturate(3470%) hue-rotate(224deg) brightness(91%) contrast(101%)" 
                  }}
                />
              </button>
            </div>
            
            {/* Título: pr-10 compensa el ancho de la flecha para centrado perfecto */}
            <h1 className="flex-grow text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2041E3] text-center pr-10">
              Recuperar Contraseña
            </h1>
          </div>

          {/* Sección de registro */}
          <div className="text-center text-sm mb-12 space-y-1">
            <p className="text-gray-500 text-base">¿No tienes cuenta?</p>
            <a href="/register" className="text-[#2041E3] hover:underline font-bold text-base">
              Regístrate Aquí
            </a>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="w-full space-y-6 px-4 sm:px-12">
            <input
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-4 sm:py-5 focus:ring-2 focus:ring-[#2041E3] outline-none text-base sm:text-lg shadow-sm transition-all"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#2041E3] text-white py-4 sm:py-5 rounded-xl hover:bg-blue-800 transition-all font-black text-lg sm:text-xl shadow-md active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Verificando..." : "Continuar"}
            </button>
          </form>

          {/* Estado de carga animado */}
          {loading && (
            <div className="absolute bottom-10 left-0 right-0 text-center text-[#2041E3] animate-pulse">
              <p className="font-bold text-xs uppercase tracking-[0.2em]">Verificando en base de datos</p>
            </div>
          )}
        </div>
      </section>

      {/* 🔵 LADO DERECHO: BANNER INFORMATIVO */}
      <section
        className="hidden md:flex w-1/2 flex-col items-center justify-center text-white relative"
        style={{
          backgroundImage: "url('/fondo-azul-pagina-web.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 mb-4">
            <img src="/Vector.png" alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10" />
            <h2 className="text-4xl lg:text-6xl font-black">Internet Fibra</h2>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6">Óptica</h2>
          <p className="text-lg lg:text-2xl font-light tracking-widest uppercase text-center">
            ¡El futuro de la conexión, hoy!
          </p>
        </div>
      </section>
    </main>
  );
}