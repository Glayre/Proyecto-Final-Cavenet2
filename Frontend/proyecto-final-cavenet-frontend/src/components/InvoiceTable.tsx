"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Invoice {
  id: string;
  fecha: string;
  estado: string; // 🔧 aceptamos cualquier string y lo normalizamos
  detalle?: string;
  moneda?: string;
  monto?: string; // compatibilidad con formato anterior
  montoUSD?: number;
  montoBs?: string | number;
  montoAbonado?: number;
  montoPendiente?: number;
  tasaVED?: number;
}

interface Props {
  invoices: Invoice[];
  router: AppRouterInstance;
}

export default function InvoiceTable({ invoices, router }: Props) {
  const reportarPago = async (id: string) => {
    console.log("📤 Reportar pago de factura:", id);
    router.push("reporte-pago?id=" + id);
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
            <th className="px-4 py-2 text-left">Acción</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const totalUSD = typeof invoice.montoUSD === "number" ? invoice.montoUSD : 0;
            const abonadoUSD = typeof invoice.montoAbonado === "number" ? invoice.montoAbonado : 0;
            const pendienteUSD =
              typeof invoice.montoPendiente === "number"
                ? invoice.montoPendiente
                : totalUSD - abonadoUSD;

            const pendienteBs =
              invoice.tasaVED && pendienteUSD
                ? (pendienteUSD * invoice.tasaVED).toLocaleString("es-VE", {
                    minimumFractionDigits: 2,
                  })
                : "0.00";

            // 🔧 Normalizar estado
            const estadoNormalizado =
              invoice.estado?.toLowerCase() === "pagado" ? "Pagada" : invoice.estado;

            return (
              <tr key={invoice.id} className="border-b hover:bg-[var(--color-cavGray)]">
                <td className="px-4 py-2 font-medium text-[var(--color-cavDark)]">{invoice.id}</td>
                <td className="px-4 py-2 text-[var(--foreground)]">{invoice.fecha}</td>
                <td className="px-4 py-2 text-[var(--foreground)]">
                  <div className="flex flex-col">
                    <span>Total: USD $ {totalUSD.toFixed(2)}</span>
                    <span>Abonado: USD $ {abonadoUSD.toFixed(2)}</span>
                    <span className="text-blue-600 font-semibold">
                      Pendiente: USD $ {pendienteUSD.toFixed(2)} / Bs. {pendienteBs}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className={`estado-${estadoNormalizado.toLowerCase()}`}>
                    {estadoNormalizado}
                  </span>
                </td>
                <td className="px-4 py-2 text-[var(--foreground)]">
                  {invoice.detalle ?? "—"} <br />
                  {invoice.moneda ?? ""}
                </td>
                <td className="px-4 py-2 text-[var(--foreground)]">
                  {estadoNormalizado === "pendiente"
                    ? "Debe pagar antes del 10"
                    : estadoNormalizado === "Vencida"
                    ? "Factura vencida"
                    : estadoNormalizado === "reportado"
                    ? "Pago en revisión"
                    : estadoNormalizado === "Pagada"
                    ? "Factura pagada"
                    : "—"}
                </td>
                <td className="px-4 py-2">
                  {estadoNormalizado === "pendiente" && (
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
                  {estadoNormalizado === "Pagada" && (
                    <span className="text-green-600 font-semibold">Pagado</span>
                  )}
                  {estadoNormalizado === "Vencida" && (
                    <span className="text-red-600">Factura vencida</span>
                  )}
                  {estadoNormalizado === "reportado" && (
                    <span className="text-blue-600">Factura reportada</span>
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
