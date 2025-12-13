// src/services/planService.ts

const API_URL = "http://localhost:4000/api/plans"; // Ajusta según tu backend

export interface Plan {
  id: string;
  nombre: string;
  velocidad: string;
  precio: string;
  detalles?: string;
  popular?: boolean;
}

export const planService = {
  /**
   * 🔹 Obtener todos los planes
   */
  async getPlans(): Promise<Plan[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener planes");
    return res.json();
  },

  /**
   * 🔹 Obtener un plan por ID
   */
  async getPlanById(id: string): Promise<Plan> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener el plan");
    return res.json();
  },

  /**
   * 🔹 Crear un nuevo plan
   */
  async createPlan(plan: Omit<Plan, "id">): Promise<Plan> {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });
    if (!res.ok) throw new Error("Error al crear plan");
    return res.json();
  },

  /**
   * 🔹 Actualizar un plan existente
   */
  async updatePlan(id: string, plan: Partial<Plan>): Promise<Plan> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });
    if (!res.ok) throw new Error("Error al actualizar plan");
    return res.json();
  },

  /**
   * 🔹 Eliminar un plan
   */
  async deletePlan(id: string): Promise<{ message: string }> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al eliminar plan");
    return res.json();
  },

  /**
   * 🔹 Contratar un plan
   */
  async contractPlan(id: string): Promise<any> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}/contract`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Error al contratar plan");
    return res.json();
  },
};