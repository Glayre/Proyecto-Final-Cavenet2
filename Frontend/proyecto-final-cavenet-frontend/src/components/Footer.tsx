export default function Footer() {
  return (
    <footer className="bg-cavenetBlue text-white px-6 py-10 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 🔹 Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CAVENET</h2>
          <p className="text-sm leading-6">
            Internet de Alta Velocidad para tu hogar y empresa. 
            Conectamos Venezuela con la mejor tecnología.
          </p>
        </div>

        {/* 🔹 Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-cavenetIndigo">Inicio</a></li>
            <li><a href="/planes" className="hover:text-cavenetIndigo">Planes</a></li>
            <li><a href="/mi-cuenta" className="hover:text-cavenetIndigo">Mi Cuenta</a></li>
            <li><a href="/contacto" className="hover:text-cavenetIndigo">Contacto</a></li>
          </ul>
        </div>

        {/* 🔹 Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="text-sm">📍 Aragua, Venezuela</p>
          <p className="text-sm">📞 +58 000-0000000</p>
          <p className="text-sm">✉️ soporte@cavenet.com</p>
        </div>
      </div>

      {/* 🔹 Derechos reservados */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs">
        © {new Date().getFullYear()} CAVENET. Todos los derechos reservados.
      </div>
    </footer>
  );
}
