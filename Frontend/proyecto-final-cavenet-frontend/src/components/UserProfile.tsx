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
    <div className="max-w-md mx-auto bg-white shadow-card rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-cavenetBlue mb-4 text-center">
        Perfil de Usuario
      </h2>

      <div className="space-y-2 text-gray-700">
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

      <button className="w-full bg-cavenetBlue text-white py-2 rounded-lg hover:bg-cavenetIndigo transition">
        Editar Perfil
      </button>
    </div>
  );
}
