// src/lib/api.ts
export async function apiFetch(path: string, options: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // Construir headers: primero los de options, luego forzar Authorization
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // 🔹 Log para depuración
  console.log("➡️ apiFetch token:", token);
  console.log("➡️ apiFetch headers:", headers);

  const res = await fetch(`${base}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Error de API" }));
    throw new Error(err.message || `Error ${res.status}`);
  }

  return res.json();
}
