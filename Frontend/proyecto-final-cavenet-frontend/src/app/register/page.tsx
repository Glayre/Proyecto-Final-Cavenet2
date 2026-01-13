"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Importamos el router

export default function RegisterPage() {
  const router = useRouter(); // 2. Inicializamos el router
  
  const [formData, setFormData] = useState({
    cedula: "",
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
        sede: "Caracas",
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

      // 3. Al dar "Aceptar" en el alert, se ejecuta la redirección
      alert("✅ Usuario registrado correctamente");
      router.push("/login"); 

    } catch (err) {
      // Manejo del error de duplicado que vimos en tu captura
      const errorMessage = (err as Error).message;
      if (errorMessage.includes("E11000")) {
        alert("❌ Error: El correo electrónico ya está registrado.");
      } else {
        alert("❌ Error: " + errorMessage);
      }
    }
  };

  return (
    <main className="flex h-screen">
      <section className="w-1/2 flex items-center justify-center bg-white px-8">
        <div className="w-[600px] h-auto bg-[#FFFEFE] border border-[#2041E3] rounded-[25px] shadow-lg flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-cavenetBlue">
            Crear una cuenta
          </h1>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input name="nombre" value={formData.nombre} placeholder="Nombre" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            <input name="apellido" value={formData.apellido} placeholder="Apellido" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            <input name="email" type="email" value={formData.email} placeholder="Correo electrónico" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            <input name="telefono" value={formData.telefono} placeholder="Teléfono" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            <input name="password" type="password" value={formData.password} placeholder="Contraseña" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />
            <input name="confirmar" type="password" value={formData.confirmar} placeholder="Confirmar contraseña" onChange={handleChange} className="w-full border rounded-lg px-4 py-2" required />

            <button type="submit" className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition font-semibold">
              Registrarse
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-cavenetIndigo hover:underline font-medium">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </section>

      {/* Bloque azul derecho (Mantenido igual) */}
      <section
        className="hidden md:flex w-1/2 flex-col items-center justify-center text-white relative"
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
          <p className="text-2xl font-semibold text-white uppercase tracking-wider">¡El futuro de la conexión, hoy!</p>
        </div>
      </section>
    </main>
  );
}