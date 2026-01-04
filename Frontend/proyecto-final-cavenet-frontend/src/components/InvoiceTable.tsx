"use client";
import React from "react";

interface Invoice {
  id: string;
  fecha: string;
  estado: "Pagada" | "Pendiente" | "Vencida";
  detalle?: string;
  moneda?: string;
  monto?: string; // compatibilidad con formato anterior
  montoUSD?: number;
  montoBs?: string | number;
}

interface Props {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: Props) {
  const reportarPago = async (id: string) => {
    console.log("📤 Reportar pago de factura:", id);
    // Aquí puedes conectar con tu backend para actualizar estado a "pagado"
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[var(--background)] shadow-card rounded-xl">
        <thead>
          <tr className="bg-[var(--color-cavenetBlue)] text-white">
            <th className="px-4 py-2 text-left"># Factura</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Monto</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Detalle</th>
            <th className="px-4 py-2 text-left">Aviso</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const usd = typeof invoice.montoUSD === "number" ? invoice.montoUSD : 0;
            const bs =
              typeof invoice.montoBs === "string"
                ? parseFloat(invoice.montoBs)
                : typeof invoice.montoBs === "number"
                ? invoice.montoBs
                : 0;

            return (
              <tr key={invoice.id} className="border-b hover:bg-[var(--color-cavGray)]">
                <td className="px-4 py-2 font-medium text-[var(--color-cavDark)]">{invoice.id}</td>
                <td className="px-4 py-2 text-[var(--foreground)]">{invoice.fecha}</td>
                <td className="px-4 py-2 text-[var(--foreground)]">
                  <div className="flex flex-col">
                    <span>USD $ {usd.toFixed(2)}</span>
                    <span className="text-blue-600 font-semibold">
                      VED Bs. {bs.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className={`estado-${invoice.estado.toLowerCase()}`}>
                    {invoice.estado}
                  </span>
                </td>
                <td className="px-4 py-2 text-[var(--foreground)]">
                  {invoice.detalle ?? "—"} <br />
                  {invoice.moneda ?? ""}
                </td>
                <td className="px-4 py-2 text-[var(--foreground)]">
                  {invoice.estado === "Pendiente"
                    ? "Debe pagar antes del 10"
                    : invoice.estado === "Vencida"
                    ? "Factura vencida"
                    : ""}
                </td>
                <td className="px-4 py-2">
                  {invoice.estado === "Pendiente" && (
                    <button
                      onClick={() => reportarPago(invoice.id)}
                      className="hover:scale-105 transition-transform"
                      title="Reportar pago"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="text-[var(--color-cavenetBlue)]"
                      >
                        <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h12v2H3v-2z" />
                      </svg>
                    </button>
                  )}
                  {invoice.estado === "Pagada" && (
                    <span className="text-green-600 font-semibold">Pagado</span>
                  )}
                  {invoice.estado === "Vencida" && (
                    <span className="text-red-600">Factura vencida</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
