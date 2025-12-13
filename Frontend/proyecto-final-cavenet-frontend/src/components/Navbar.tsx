import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-cavenetBlue text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">CAVENET</h1>
      <ul className="flex gap-6 font-medium">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/cobertura">Cobertura</Link></li>
        <li><Link href="/planes">Planes</Link></li>
        <li><Link href="/reportar-pago">Reportar Pago</Link></li>
        <li><Link href="/contacto">Contacto</Link></li>
        <li><Link href="/mi-cuenta">Mi Cuenta</Link></li>
      </ul>
    </nav>
  );
}
