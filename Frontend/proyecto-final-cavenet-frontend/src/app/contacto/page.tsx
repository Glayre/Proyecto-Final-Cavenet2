"use client";
import { useState } from "react";

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

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
        alert("¡Mensaje enviado con éxito! ✅");
        setNombre("");
        setEmail("");
        setMensaje("");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("No se pudo conectar con el servidor.");
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
        className="flex flex-col justify-start items-center w-full max-w-[405px]"
      >
        {/* Título centrado */}
        <h1 className="text-[35px] font-light mb-6 text-cavenetBlue w-full text-center">
          Contáctanos
        </h1>

        {/* Etiquetas y campos con texto centrado */}
        <label className="text-[20px] lg:text-[25px] font-light text-black mb-2 w-full text-center">
          Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Tu nombre"
          className="w-full h-[51px] mb-4 px-4 bg-white/60 border border-[#2041E3] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-center"
        />

        <label className="text-[20px] lg:text-[25px] font-light text-black mb-2 w-full text-center">
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Tu correo"
          className="w-full h-[51px] mb-4 px-4 bg-white/60 border border-[#2041E3] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-center"
        />

        <label className="text-[20px] lg:text-[25px] font-light text-black mb-2 w-full text-center">
          Mensaje
        </label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          placeholder="Escribe aquí..."
          className="w-full h-[180px] lg:h-[208px] mb-6 px-4 py-2 bg-white/60 border border-[#2041E3] rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 text-center"
        />

        {/* Botón ENVIAR totalmente centrado (se eliminó lg:self-start) */}
        <button 
          type="submit"
          disabled={enviando}
          className="w-full lg:w-[231px] h-[48px] bg-[#2041E3] text-white font-bold text-[20px] rounded-md hover:bg-[#1a36b0] transition self-center text-center"
        >
          {enviando ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </form>
    </main>
  );
}