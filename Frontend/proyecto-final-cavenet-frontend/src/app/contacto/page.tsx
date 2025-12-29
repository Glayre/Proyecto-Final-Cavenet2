export default function ContactoPage() {
  return (
    <main className="flex w-full h-[596px] px-6 py-12 gap-12">
      {/* 🔹 Mapa a la izquierda */}
      <div
        className="w-[935px] h-full bg-cover bg-center rounded-xl shadow-md"
        style={{ backgroundImage: "url('/mapacontacto.png')" }}
      />

      {/* 🔹 Formulario a la derecha */}
      <div className="flex flex-col justify-start items-start w-[405px]">
        <h1 className="text-[35px] font-light mb-6 text-cavenetBlue">
          Contáctanos
        </h1>

        <label className="text-[25px] font-light text-black mb-2">Nombre</label>
        <input
          type="text"
          className="w-full h-[51px] mb-4 px-4 bg-white/60 border border-[#2041E3] rounded-md"
        />

        <label className="text-[25px] font-light text-black mb-2">Correo electrónico</label>
        <input
          type="email"
          className="w-full h-[51px] mb-4 px-4 bg-white/60 border border-[#2041E3] rounded-md"
        />

        <label className="text-[25px] font-light text-black mb-2">Mensaje</label>
        <textarea
          className="w-full h-[208px] mb-6 px-4 py-2 bg-white/60 border border-[#2041E3] rounded-md resize-none"
        />

        <button className="w-[231px] h-[48px] bg-[#2041E3] text-white font-bold text-[20px] rounded-md hover:bg-[#1a36b0] transition self-center">
        ENVIAR
        </button>
      </div>
    </main>
  );
}
