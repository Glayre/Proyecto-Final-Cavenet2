"use client";
import { useState } from "react";

// --- Tipado para los inputs de datos ---
type DatoProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Dato = ({ label, value, onChange, placeholder = "" }: DatoProps) => (
  <div className="flex flex-col w-full">
    <label className="text-[16px] font-semibold text-gray-700 mb-2">{label}</label>
    <input
      className="w-full h-10 mb-4 px-4 bg-white border border-[#2041E3] rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition-all"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default function Page() {
  const planesHogar = [
    "Plan Hogar Básico",
    "Plan Hogar Pro",
    "Plan Hogar Gamer",
    "Plan Prueba Cliente"
  ];

  // MANTENEMOS TU LÓGICA DE ESTADO ORIGINAL
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cedula: "",
    fechaNacimiento: "",
    correo: "",
    ciudad: "",
    callePrincipal: "",
    calleSecundaria: "",
    numeroCasa: "",
    plan: "",
    telefono: "",
    otroContacto: "",
    correoAlternativo: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // MANTENEMOS TU FUNCIÓN SUBMIT ORIGINAL
  const handleSubmit = async () => {
    if (!formData.nombres || !formData.apellidos || !formData.cedula || !formData.correo || !formData.plan || !formData.telefono) {
      alert("⚠️ Por favor, complete los campos obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Solicitud enviada con éxito.");
        setFormData({
          nombres: "", apellidos: "", cedula: "", fechaNacimiento: "",
          correo: "", ciudad: "", callePrincipal: "", calleSecundaria: "",
          numeroCasa: "", plan: "", telefono: "", otroContacto: "", correoAlternativo: ""
        });
      } else {
        alert("❌ Error: " + (data.error || "No se pudo procesar"));
      }
    } catch (err) {
      alert("❌ Error de conexión");
    }
  };

  return (
    // mt-12 y pt-20 aseguran que el formulario baje y no sea tapado por el Navbar
    <main className="flex flex-col items-center w-full min-h-screen bg-gray-50 text-black pt-20 pb-20 px-4 mt-12">
      
      {/* Contenedor Principal */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl items-stretch justify-center gap-8">
        
        {/* 🔹 Sección del Formulario */}
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full flex-1 border border-gray-100 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-center text-[#2041E3] mb-10">
              Registro para Hogares
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <h2 className="text-2xl font-bold mt-4 col-span-full border-b pb-2 mb-6 text-gray-800">Selección de Plan</h2>
              <div className="col-span-full mb-6">
                <Select
                  label="Plan de Navegación Disponible"
                  options={planesHogar}
                  value={formData.plan}
                  onChange={(v) => handleChange("plan", v)}
                />
              </div>

              <h2 className="text-2xl font-bold mt-4 col-span-full border-b pb-2 mb-6 text-gray-800">Datos Personales</h2>
              <Dato label="Nombres *" value={formData.nombres} onChange={(v) => handleChange("nombres", v)} />
              <Dato label="Apellidos *" value={formData.apellidos} onChange={(v) => handleChange("apellidos", v)} />
              <Dato label="Cédula *" value={formData.cedula} onChange={(v) => handleChange("cedula", v)} />
              <Dato label="Fecha de Nacimiento" placeholder="DD/MM/AAAA" value={formData.fechaNacimiento} onChange={(v) => handleChange("fechaNacimiento", v)} />
              <div className="col-span-full">
                <Dato label="Correo Electrónico *" value={formData.correo} onChange={(v) => handleChange("correo", v)} />
              </div>

              <h2 className="text-2xl font-bold mt-4 col-span-full border-b pb-2 mb-6 text-gray-800">Ubicación y Contacto</h2>
              <Dato label="Ciudad" value={formData.ciudad} onChange={(v) => handleChange("ciudad", v)} />
              <Dato label="Teléfono *" value={formData.telefono} onChange={(v) => handleChange("telefono", v)} />
              <Dato label="Calle Principal" value={formData.callePrincipal} onChange={(v) => handleChange("callePrincipal", v)} />
              <Dato label="Número de Casa/Apto" value={formData.numeroCasa} onChange={(v) => handleChange("numeroCasa", v)} />
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={handleSubmit}
              className="w-full md:w-80 h-14 bg-[#2041E3] text-white font-bold text-xl rounded-2xl hover:bg-[#1a36b0] hover:shadow-2xl transition-all active:scale-95 shadow-lg"
            >
              Finalizar Registro
            </button>
          </div>
        </section>

        {/* 🔹 Aside de Imágenes */}
        <aside className="hidden lg:flex flex-col gap-6 w-[450px]">
          <ImageBlock
            src="/conexionhogar.png"
            alt="Hogar Conectado"
            text="Conexión rápida en tu hogar."
          />
          <ImageBlock
            src="/conexionnavegacion.jpg"
            alt="Streaming"
            text="Streaming sin interrupciones."
          />
          <ImageBlock
            src="/trabajoremoto.jpg"
            alt="Home Office"
            text="Estabilidad para teletrabajo."
          />
        </aside>
      </div>
    </main>
  );
}

// --- Componentes Internos ---

function Select({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-medium mb-2 text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 px-4 bg-white border border-[#2041E3] rounded-md focus:ring-2 focus:ring-blue-300 outline-none cursor-pointer"
      >
        <option value="">Seleccione el plan deseado</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function ImageBlock({ src, alt, text }: { src: string, alt: string, text: string }) {
  return (
    <div className="flex-1 flex flex-col group min-h-0">
      <div className="flex-1 overflow-hidden rounded-3xl shadow-lg border border-gray-200">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x250?text=Cavenet"; }}
        />
      </div>
      <p className="mt-3 text-sm font-semibold text-gray-500 text-center">{text}</p>
    </div>
  );
}