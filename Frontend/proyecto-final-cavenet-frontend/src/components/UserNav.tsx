import Link from "next/link";

const UserNav = () => {
  const user = JSON.parse(localStorage.getItem("authUser") || "null");


  const Salir = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    window.location.href = "/login";
  }
  return (
    <nav className="mb-8 flex justify-end items-center gap-4">
      <button onClick={Salir} className="bg-red-500 px-4 py-2 rounded text-white cursor-pointer">Salir</button>
      <Link href="/mi-cuenta/configuracion" className="bg-gray-500 px-4 py-2 rounded text-white cursor-pointer">
        Configuracion
      </Link>
      {user.rol == "admin" && (
        <Link href="/admin" className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer">
          Admin
        </Link>
      )}
    </nav>
  );
}

export default UserNav