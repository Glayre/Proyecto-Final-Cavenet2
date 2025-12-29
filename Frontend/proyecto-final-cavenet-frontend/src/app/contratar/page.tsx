"use client";
import { useState } from "react";

export default function Page() {
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

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/contrato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Contrato creado exitosamente");
        console.log(data);
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      alert("❌ Error de conexión");
    }
  };

  return (
    <main className="flex flex-col lg:flex-row w-full bg-white text-black">
      {/* 🔹 Formulario */}
      <section className="flex flex-col gap-10 px-12 max-w-[425px] mx-auto lg:mx-0 lg:ml-24 mt-12">
        <h1 className="text-[35px] font-semibold text-center">Contrato para Hogares</h1>

        <h2 className="text-[30px] font-semibold">Datos Personales</h2>
        <Input label="Nombres" value={formData.nombres} onChange={(v: string) => handleChange("nombres", v)} />
        <Input label="Apellidos" value={formData.apellidos} onChange={(v: string) => handleChange("apellidos", v)} />
        <Input label="Cédula" value={formData.cedula} onChange={(v: string) => handleChange("cedula", v)} />
        <Input label="Fecha de Nacimiento" placeholder="dd/mm/aaaa" value={formData.fechaNacimiento} onChange={(v: string) => handleChange("fechaNacimiento", v)} />
        <Input label="Correo Electrónico" value={formData.correo} onChange={(v: string) => handleChange("correo", v)} />

        <h2 className="text-[30px] font-semibold mt-6">Dirección</h2>
        <Input label="Ciudad" value={formData.ciudad} onChange={(v: string) => handleChange("ciudad", v)} />
        <Input label="Calle Principal" value={formData.callePrincipal} onChange={(v: string) => handleChange("callePrincipal", v)} />
        <Input label="Calle Secundaria" value={formData.calleSecundaria} onChange={(v: string) => handleChange("calleSecundaria", v)} />
        <Input label="Número de casa o apartamento" value={formData.numeroCasa} onChange={(v: string) => handleChange("numeroCasa", v)} />

        <h2 className="text-[30px] font-semibold mt-6">Plan</h2>
        <Select label="Plan de Navegación" options={["Redes Sociales", "Multimedia", "FullHD"]} value={formData.plan} onChange={(v: string) => handleChange("plan", v)} />

        <h2 className="text-[30px] font-semibold mt-6">Datos de contacto</h2>
        <Input label="Teléfono" value={formData.telefono} onChange={(v: string) => handleChange("telefono", v)} />
        <Input label="Otro número de contacto (Opcional)" value={formData.otroContacto} onChange={(v: string) => handleChange("otroContacto", v)} />
        <Input label="Correo Electrónico alternativo" value={formData.correoAlternativo} onChange={(v: string) => handleChange("correoAlternativo", v)} />

        <button
          onClick={handleSubmit}
          className="w-[238px] h-[48px] bg-[#2041E3] text-white font-bold text-[20px] rounded-md hover:bg-[#1a36b0] transition self-center mt-8"
        >
          Procesar
        </button>
      </section>

      {/* 🔹 Imágenes con texto */}
      <aside className="hidden lg:flex flex-col gap-12 px-8 py-12 w-[600px]">
        <ImageBlock
          src="/conexionhogar.png"
          alt="Conectamos tu hogar"
          text="Conectamos tu hogar con el mundo digital de forma rápida y segura."
        />
        <ImageBlock
          src="/conexionnavegacion.jpg"
          alt="Entretenimiento sin límites"
          text="Disfruta de entretenimiento sin límites con nuestra conexión de alta velocidad."
        />
        <ImageBlock
          src="/trabajoremoto.jpg"
          alt="Estabilidad para trabajar"
          text="Trabaja desde casa con la estabilidad que necesitas en tu conexión."
        />
      </aside>
    </main>
  );
}

// 🔧 Componentes reutilizables tipados
type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function Input({ label, value, onChange, placeholder = "" }: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-[25px] font-light mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[51px] px-4 bg-white/60 border border-[#2041E3] rounded-md"
      />
    </div>
  );
}

type SelectProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <div className="flex flex-col">
      <label className="text-[25px] font-light mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[51px] px-4 bg-white/60 border border-[#2041E3] rounded-md"
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt: string, idx: number) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

type ImageBlockProps = {
  src: string;
  alt: string;
  text: string;
};

function ImageBlock({ src, alt, text }: ImageBlockProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <img src={src} alt={alt} className="rounded-md shadow-md w-full" />
      <p className="mt-4 text-[18px] font-medium text-[#3E3B43]">{text}</p>
    </div>
  );
}
