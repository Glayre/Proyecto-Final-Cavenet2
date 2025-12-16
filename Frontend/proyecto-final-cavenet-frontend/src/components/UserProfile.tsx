interface User {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
}

interface Props {
  user: User;
}

export default function UserProfile({ user }: Props) {
  return (
    <div className="max-w-md mx-auto bg-(--background) shadow-cav rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-(--cavenet-blue) mb-4 text-center">
        Perfil de Usuario
      </h2>

      <div className="space-y-2 text-(--foreground)">
        <p>
          <span className="font-semibold">Nombre:</span> {user.nombre} {user.apellido}
        </p>
        <p>
          <span className="font-semibold">Correo:</span> {user.email}
        </p>
        {user.telefono && (
          <p>
            <span className="font-semibold">Teléfono:</span> {user.telefono}
          </p>
        )}
        {user.direccion && (
          <p>
            <span className="font-semibold">Dirección:</span> {user.direccion}
          </p>
        )}
      </div>

      <button className="w-full py-2 rounded-lg transition-colors bg-(--cavenet-blue) text-white hover:bg-(--cavenet-indigo)">
        Editar Perfil
      </button>
    </div>
  );
}
