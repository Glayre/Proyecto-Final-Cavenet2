// src/lib/api.ts
export async function apiFetch(path: string, options: RequestInit = {}) {
  // Base URL de tu backend (usa variable de entorno para flexibilidad)
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  // Recuperar token desde localStorage (solo disponible en navegador)
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // Construir headers con token si existe
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // Hacer la petición
  const res = await fetch(`${base}${path}`, { ...options, headers });

  // Manejo de errores
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Error de API" }));
    throw new Error(err.message || `Error ${res.status}`);
  }

  // Devolver respuesta JSON
  return res.json();
}
