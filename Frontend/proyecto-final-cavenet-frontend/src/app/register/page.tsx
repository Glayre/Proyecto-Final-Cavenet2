"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    cedula: "", // puedes generar o capturar
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmar: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const payload = {
        cedula: formData.cedula || Math.floor(Math.random() * 10000000 + 1000000).toString(),
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password,
        sede: "Caracas", // valores por defecto para pasar validación
        ciudad: "Caracas",
        urbanizacion: "Centro",
        calle: "Principal",
        apartamento: ""
      };

      const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al registrar usuario");
      alert("✅ Usuario registrado correctamente");
    } catch (err) {
      alert("❌ Error: " + (err as Error).message);
    }
  };

  return (
    <main className="flex h-screen">
      {/* Formulario lado izquierdo */}
      <section className="w-1/2 flex items-center justify-center bg-white px-8">
        <div className="w-[600px] h-[678px] bg-[#FFFEFE] border border-[#2041E3] rounded-[25px] shadow-lg flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
            Crear una cuenta
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            <input name="apellido" placeholder="Apellido" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            <input name="telefono" placeholder="Teléfono" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            <input name="confirmar" type="password" placeholder="Confirmar contraseña" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />

            <button type="submit" className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
              Registrarse
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-cavenetIndigo hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </section>

      {/* Bloque azul lado derecho */}
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
