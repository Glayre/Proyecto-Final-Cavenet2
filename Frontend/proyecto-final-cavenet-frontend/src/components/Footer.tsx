import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="px-6 py-10 mt-12"
      style={{ backgroundColor: "var(--cavenet-blue)", color: "white" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 🔹 Logo y descripción */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CAVENET</h2>
          <p className="text-sm leading-6 text-(--cav-gray)">
            Internet de Alta Velocidad para tu hogar y empresa. 
            Conectamos Venezuela con la mejor tecnología.
          </p>
        </div>

        {/* 🔹 Enlaces rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-(--cavenet-indigo)">Inicio</a></li>
            <li><a href="/planes" className="hover:text-(--cavenet-indigo)">Planes</a></li>
            <li><a href="/mi-cuenta" className="hover:text-(--cavenet-indigo)">Mi Cuenta</a></li>
            <li><a href="/contacto" className="hover:text-(--cavenet-indigo)">Contacto</a></li>
            <li><a href="/reporte-pago" className="hover:text-(--cavenet-indigo)">Reportar Pago</a></li>
            <li><a href="/cobertura" className="hover:text-(--cavenet-indigo)">Cobertura</a></li>
          </ul>
        </div>

        {/* 🔹 Contacto y redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="text-sm text-(--cav-gray)">📍 Aragua, Venezuela</p>
          <p className="text-sm text-(--cav-gray)">📞 +58 000-0000000</p>
          <p className="text-sm text-(--cav-gray)">✉️ soporte@cavenet.com</p>

          {/* Redes sociales */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--cavenet-indigo)"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--cavenet-indigo)"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--cavenet-indigo)"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Derechos reservados */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs">
        © {new Date().getFullYear()} CAVENET. Todos los derechos reservados.
      </div>
    </footer>
  );
}
