"use client";
import { useAuth } from "@/context/AuthContext";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Debes iniciar sesión para acceder a esta página.</p>
        <a href="/login" className="text-blue-600 underline">Ir al login</a>
      </div>
    );
  }

  return <>{children}</>;
}
