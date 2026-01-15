"use client";
import { useState } from "react";

export default function ContactoPage() {
  // 1. Definimos el estado para capturar los datos
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  // 2. Función para enviar los datos al servidor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    const datosContacto = { nombre, email, mensaje };

    try {
      const res = await fetch("http://localhost:4000/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosContacto),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto. ✅");
        // Limpiamos los campos
        setNombre("");
        setEmail("");
        setMensaje("");
      } else {
        alert("Error al enviar: " + data.error);
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor para enviar el mensaje.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row w-full min-h-[600px] px-6 py-12 gap-12 justify-center items-center max-w-7xl mx-auto">
      
      {/* 🔹 Mapa a la izquierda */}
      <div
        className="w-full lg:w-[800px] xl:w-[935px] h-[400px] lg:h-[596px] bg-cover bg-center rounded-xl shadow-md border border-gray-100"
        style={{ backgroundImage: "url('/mapacontacto.png')" }}
      />

      {/* 🔹 Formulario a la derecha */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col justify-start items-start w-full max-w-[405px]"
      >
        <h1 className="text-[35px] font-light mb-6 text-cavenetBlue">
          Contáctanos
        </h1>

        <label className="text-[20px] lg:text-[25px] font-light text-black mb-2">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full h-[51px] mb-4 px-4 bg-white/60 border border-[#2041E3] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <label className="text-[20px] lg:text-[25px] font-light text-black mb-2">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-[51px] mb-4 px-4 bg-white/60 border border-[#2041E3] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <label className="text-[20px] lg:text-[25px] font-light text-black mb-2">Mensaje</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          className="w-full h-[180px] lg:h-[208px] mb-6 px-4 py-2 bg-white/60 border border-[#2041E3] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <button 
          type="submit"
          disabled={enviando}
          className="w-full lg:w-[231px] h-[48px] bg-[#2041E3] text-white font-bold text-[20px] rounded-md hover:bg-[#1a36b0] transition self-center lg:self-start disabled:bg-gray-400"
        >
          {enviando ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </form>
    </main>
  );
}