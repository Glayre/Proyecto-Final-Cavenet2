// src/lib/api.ts
export async function apiFetch(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${base}${path}`, { ...options, headers });

  // Si la respuesta es exitosa (200-299)
  if (res.ok) {
    return res.json();
  }

  // --- MANEJO DE ERRORES (Si res.ok es false) ---
  
  let errorMessage = `Error ${res.status}`;
  
  // Obtenemos el texto plano primero para evitar bloquear el flujo
  const bodyText = await res.text(); 

  try {
    // Intentamos convertir ese texto a JSON
    const errorData = JSON.parse(bodyText);
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch (e) {
    // Si no era un JSON, usamos el texto plano si existe
    if (bodyText && bodyText.length < 100) { // Solo si no es un HTML gigante
        errorMessage = bodyText;
    }
  }

  // ❌ IMPORTANTE: Eliminamos el console.error de aquí para que no salte el overlay rojo en Next.js
  throw new Error(errorMessage);
}