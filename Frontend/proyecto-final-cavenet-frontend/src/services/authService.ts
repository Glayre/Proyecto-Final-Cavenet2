// src/services/authServices.ts
// Servicio de autenticación para consumir el backend de CAVENET
// Ajusta las rutas según tu API real

const API_URL = "http://localhost:4000/api"; // 🔹 Base general

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export const authServices = {
  /**
   * 🔹 Iniciar sesión
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data: LoginResponse = await res.json();
    localStorage.setItem("token", data.token); // 🔹 Guardar token automáticamente
    return data;
  },

  /**
   * 🔹 Registrar usuario
   */
  async register(data: RegisterData): Promise<{ message: string }> {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al registrar usuario");
    }

    return res.json();
  },

  /**
   * 🔹 Validar token
   */
  async validateToken(): Promise<any> {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token almacenado");

    const res = await fetch(`${API_URL}/auth/validate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Token inválido o expirado");
    }

    return res.json();
  },

  /**
   * 🔹 Cerrar sesión
   */
  logout() {
    localStorage.removeItem("token");
  },
};
