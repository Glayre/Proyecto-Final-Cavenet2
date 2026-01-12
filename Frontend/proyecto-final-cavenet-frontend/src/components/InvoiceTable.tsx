"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Invoice {
  id: string;
  fecha: string;
  estado: string;
  detalle?: string;
  monto?: number | string;
  montoAbonado?: number | string;
  montoPendiente?: number | string;
  moneda?: string;
}

interface Props {
  invoices: Invoice[];
  router: AppRouterInstance;
  currentPage?: number;
  totalPages?: number;
  tasaVED?: number;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

export default function InvoiceTable({
  invoices,
  router,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  tasaVED
}: Props) {
  const reportarPago = async (id: string) => {
    console.log("📤 Reportar pago de factura:", id);
    router.push("reporte-pago?id=" + id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background shadow-card rounded-xl">
        <thead>
          <tr className="bg-cavenetBlue text-white">
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
            const totalUSD =
              typeof invoice.monto === "number"
                ? invoice.monto
                : Number(invoice.monto) || 0;

            const abonadoUSD =
              typeof invoice.montoAbonado === "number"
                ? invoice.montoAbonado
                : Number(invoice.montoAbonado) || 0;

            const pendienteUSD =
              typeof invoice.montoPendiente === "number"
                ? invoice.montoPendiente
                : totalUSD - abonadoUSD;

            const totalBs = tasaVED
              ? (totalUSD * tasaVED).toFixed(2)
              : "N/A";

            const abonadoBs = tasaVED
              ? (abonadoUSD * tasaVED).toFixed(2)
              : "N/A";

            const pendienteBs = tasaVED
              ? (pendienteUSD * tasaVED).toFixed(2)
              : "N/A";

            const estadoNormalizado =
              invoice.estado?.toLowerCase() === "pagado"
                ? "Pagada"
                : invoice.estado;

            return (
              <tr
                key={invoice.id}
                className="border-b hover:bg-cavGray"
              >
                <td className="px-4 py-2 font-medium text-cavDark">
                  {invoice.id}
                </td>
                <td className="px-4 py-2 text-foreground">
                  {invoice.fecha}
                </td>
                <td className="px-4 py-2 text-foreground">
                  <div className="flex flex-col">
                    <span>Total: USD $ {totalUSD.toFixed(2)} / Bs. {totalBs}</span>
                    <span>Abonado: USD $ {abonadoUSD.toFixed(2)} / Bs. {abonadoBs}</span>
                    <span className="text-blue-600 font-semibold">
                      Pendiente: USD $ {pendienteUSD.toFixed(2)} / Bs. {pendienteBs}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`estado-${estadoNormalizado.toLowerCase()}`}
                  >
                    {estadoNormalizado}
                  </span>
                </td>
                <td className="px-4 py-2 text-foreground">
                  {invoice.detalle ?? "—"} <br />
                  {invoice.moneda ?? ""}
                </td>
                <td className="px-4 py-2 text-foreground">
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
                        className="text-cavenetBlue"
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

      {totalPages && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="btn-secondary"
            onClick={onPrevPage}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          <span className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="btn-secondary"
            onClick={onNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
