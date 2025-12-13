// src/services/invoiceServices.ts
// Servicio para consumir endpoints de facturas en el backend de CAVENET

const API_URL = "http://localhost:4000/api/invoices"; // 🔹 Ajusta al endpoint real de tu backend

export interface Invoice {
  id: string;
  fecha: string;
  monto: string;
  estado: "Pagada" | "Pendiente" | "Vencida";
  usuarioId?: string;
}

export const invoiceServices = {
  /**
   * 🔹 Obtener todas las facturas
   * @returns Lista de facturas
   */
  async getInvoices(): Promise<Invoice[]> {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Error al obtener facturas");
    }

    return res.json();
  },

  /**
   * 🔹 Crear una nueva factura
   * @param invoice Datos de la factura
   * @returns Factura creada
   */
  async createInvoice(invoice: Omit<Invoice, "id">): Promise<Invoice> {
    const token = localStorage.getItem("token");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new Error("Error al crear factura");
    }

    return res.json();
  },

  /**
   * 🔹 Registrar pago de una factura
   * @param id ID de la factura
   * @returns Factura actualizada
   */
  async payInvoice(id: string): Promise<Invoice> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}/pay`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Error al registrar pago");
    }

    return res.json();
  },

  /**
   * 🔹 Actualizar estado de una factura
   * @param id ID de la factura
   * @param estado Nuevo estado
   * @returns Factura actualizada
   */
  async updateStatus(id: string, estado: Invoice["estado"]): Promise<Invoice> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado }),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar estado de factura");
    }

    return res.json();
  },
};
