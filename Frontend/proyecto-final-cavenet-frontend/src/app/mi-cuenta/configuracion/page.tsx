"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import UserNav from "@/components/UserNav";
import Link from "next/link";

export default function ConfigCuentaPage() {
  const [datos, setDatos] = useState<any | null>(null);
  const [formData, setFormData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch("/api/users/" + id, { method: "GET" })
      .then((data) => {
        setDatos(data);
        setFormData(data);
      })
      .catch((err) => setError(err.message));
  }, [router]);

  // 1️⃣ Actualizar Teléfono
  const handleUpdateTelefono = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const userId = localStorage.getItem("userId");

    try {
      const response = await apiFetch("/api/users/" + userId, {
        method: "PATCH",
        body: JSON.stringify({ telefono: formData?.telefono }),
      });
      setSuccess("✅ Teléfono actualizado correctamente.");
      setDatos(response);
    } catch (err: any) {
      setError(err.message || "Error al actualizar el teléfono.");
    }
  };

  // 2️⃣ Actualizar Contraseña
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const userId = localStorage.getItem("userId");

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError("Por favor, completa todos los campos de contraseña.");
      setLoading(false);
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("La nueva contraseña y la confirmación no coinciden.");
      setLoading(false);
      return;
    }

    try {
      await apiFetch("/api/users/" + userId, {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      setSuccess("✅ Contraseña actualizada correctamente.");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      
    } catch (err: any) {
      
      setError(err.message || "Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-12 mt-12">
      {/* Mantenemos el UserNav intacto con su botón de configuración original */}
      <UserNav userData={datos} />

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* 🔹 NUEVO BOTÓN DE ATRÁS */}
        <div className="flex justify-start">
          <Link 
            href="/mi-cuenta" 
            className="group flex items-center gap-2 text-cavenetBlue font-bold bg-white border-2 border-cavenetBlue py-2 px-4 rounded-lg hover:bg-cavenetBlue hover:text-white transition-all shadow-sm"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            Volver a Mi Cuenta
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-4 uppercase text-gray-800">
            Configuración de cuenta
        </h1>

        {/* Alertas de Feedback */}
        <div className="mb-2 h-12">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center animate-pulse">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
              {success}
            </div>
          )}
        </div>

        {datos ? (
          <div className="flex flex-col gap-12">
            
            {/* SECCIÓN 1: DATOS PERSONALES */}
            <section className="bg-white p-8 shadow-md rounded-xl border border-gray-100">
              <h2 className="font-bold text-xl mb-6 text-gray-800 flex items-center gap-2">
                <span>📱</span> Datos Personales
              </h2>
              <form onSubmit={handleUpdateTelefono} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-500 text-xs font-bold uppercase">Nombre y Apellido</label>
                    <input
                      type="text"
                      className="bg-gray-50 text-gray-400 border rounded-lg p-3 cursor-not-allowed italic"
                      value={`${formData?.nombre} ${formData?.apellido}`}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-500 text-xs font-bold uppercase">Email (Usuario)</label>
                    <input
                      type="text"
                      className="bg-gray-50 text-gray-400 border rounded-lg p-3 cursor-not-allowed italic"
                      value={formData?.email}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col md:col-span-2 gap-1">
                    <label className="font-bold text-sm text-gray-700">Teléfono de contacto</label>
                    <input
                      type="text"
                      className="border-gray-300 border rounded-lg p-3 focus:border-cavenetBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      value={formData?.telefono || ""}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="bg-cavenetBlue hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg self-end transition-all shadow-lg active:scale-95">
                  Guardar Teléfono
                </button>
              </form>
            </section>

            {/* SECCIÓN 2: SEGURIDAD */}
            <section className="bg-white p-8 shadow-md rounded-xl border border-gray-100">
              <h2 className="font-bold text-xl mb-6 text-gray-800 flex items-center gap-2">
                <span>🔒</span> Seguridad
              </h2>
              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Contraseña Actual</label>
                  <input
                    type="password"
                    className={`border rounded-lg p-3 outline-none transition-all ${error?.includes("actual") || error?.includes("inválida") ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={(e) => {
                      setError(null);
                      setPasswordData({ ...passwordData, currentPassword: e.target.value });
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700">Nueva Contraseña</label>
                    <input
                      type="password"
                      className="border-gray-300 border rounded-lg p-3 outline-none focus:border-cavenetBlue focus:ring-2 focus:ring-blue-100"
                      placeholder="Mínimo 6 caracteres"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700">Confirmar Nueva Contraseña</label>
                    <input
                      type="password"
                      className="border-gray-300 border rounded-lg p-3 outline-none focus:border-cavenetBlue focus:ring-2 focus:ring-blue-100"
                      placeholder="Repite la contraseña"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-gray-800 hover:bg-black text-white font-bold py-3 px-8 rounded-lg self-end transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? "Procesando..." : "Actualizar Contraseña"}
                </button>
              </form>
            </section>

          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cavenetBlue"></div>
          </div>
        )}
      </div>
    </main>
  );
}
