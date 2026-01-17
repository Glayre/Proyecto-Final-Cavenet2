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
    <div className="w-full">
      <div className="overflow-x-auto md:overflow-visible">
        <table className="min-w-full bg-white md:shadow-sm md:rounded-xl border-separate border-spacing-y-4 md:border-spacing-y-0">
          {/* Header Desktop - Azul Profesional */}
          <thead className="hidden md:table-header-group">
            <tr className="bg-cavenetBlue text-white">
              <th className="px-5 py-4 text-left rounded-tl-xl font-semibold"># Factura</th>
              <th className="px-5 py-4 text-left font-semibold">Fecha</th>
              <th className="px-5 py-4 text-center font-semibold">Monto</th>
              <th className="px-5 py-4 text-left font-semibold">Estado</th>
              <th className="px-5 py-4 text-center font-semibold">Detalle</th>
              <th className="px-5 py-4 text-left font-semibold">Aviso</th>
              <th className="px-5 py-4 text-center rounded-tr-xl font-semibold">Acción</th>
            </tr>
          </thead>
          
          <tbody className="block md:table-row-group">
            {invoices.map((invoice) => {
              const totalUSD = typeof invoice.monto === "number" ? invoice.monto : Number(invoice.monto) || 0;
              const abonadoUSD = typeof invoice.montoAbonado === "number" ? invoice.montoAbonado : Number(invoice.montoAbonado) || 0;
              const pendienteUSD = typeof invoice.montoPendiente === "number" ? invoice.montoPendiente : totalUSD - abonadoUSD;

              const totalBs = tasaVED ? (totalUSD * tasaVED).toFixed(2) : "N/A";
              const abonadoBs = tasaVED ? (abonadoUSD * tasaVED).toFixed(2) : "N/A";
              const pendienteBs = tasaVED ? (pendienteUSD * tasaVED).toFixed(2) : "N/A";

              const estadoNormalizado = invoice.estado?.toLowerCase() === "pagado" ? "Pagada" : invoice.estado;

              return (
                <tr
                  key={invoice.id}
                  className="block md:table-row border border-slate-200 md:border-b bg-white mb-5 md:mb-0 shadow-sm md:shadow-none rounded-xl overflow-hidden hover:bg-slate-50 transition-colors"
                >
                  {/* Celda: Título Móvil Azul (Menos redondeado) */}
                  <td className="block md:table-cell px-5 py-3 bg-cavenetBlue md:bg-transparent border-b border-cavenetBlue md:border-none">
                    <div className="flex justify-between items-center md:block">
                      <span className="text-xs font-bold text-white md:hidden"># Factura:</span>
                      <span className="text-sm font-bold text-white md:text-slate-700">{invoice.id}</span>
                    </div>
                  </td>

                  {/* Celda: Fecha */}
                  <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                    <div className="flex justify-between items-center md:block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Fecha</span>
                      <span className="text-sm text-slate-600">{invoice.fecha}</span>
                    </div>
                  </td>

                  {/* Celda: Monto (Centrado) */}
                  <td className="block md:table-cell px-5 py-3 md:py-4 border-b border-slate-50 md:border-none">
                    <div className="flex flex-col items-center md:items-center text-center p-2 md:p-0 bg-slate-50 md:bg-transparent rounded-lg md:rounded-none border border-slate-100 md:border-none">
                      <span className="text-[11px] text-slate-500">Total: ${totalUSD.toFixed(2)} / Bs. {totalBs}</span>
                      <span className="text-[11px] text-slate-500">Abonado: ${abonadoUSD.toFixed(2)} / Bs. {abonadoBs}</span>
                      <span className="text-blue-600 font-bold text-xs md:text-sm mt-0.5">
                        Pendiente: ${pendienteUSD.toFixed(2)} / Bs. {pendienteBs}
                      </span>
                    </div>
                  </td>

                  {/* Celda: Estado */}
                  <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                    <div className="flex justify-between items-center md:block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden">Estado</span>
                      <span className={`estado-${estadoNormalizado.toLowerCase()} inline-block px-3 py-1 rounded text-[10px] font-bold uppercase`}>
                        {estadoNormalizado}
                      </span>
                    </div>
                  </td>

                  {/* Celda: Detalle (Centrado) */}
                  <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none text-center">
                    <div className="flex flex-col items-center md:block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 md:hidden mb-1">Detalle</span>
                      <span className="text-xs text-slate-500">{invoice.detalle ?? "—"}</span>
                    </div>
                  </td>

                  {/* Celda: Aviso */}
                  <td className="block md:table-cell px-5 py-2 md:py-4 border-b border-slate-50 md:border-none">
                    <p className="text-[10px] italic text-slate-400">
                      {estadoNormalizado === "pendiente" ? "Pagar antes del día 10" : "—"}
                    </p>
                  </td>

                  {/* Celda: Acción (Botón pequeño y Pagada Oscuro) */}
                  <td className="block md:table-cell px-5 py-4 md:py-4 text-center">
                    <div className="flex justify-center items-center w-full">
                      {estadoNormalizado === "pendiente" ? (
                        <button
                          onClick={() => reportarPago(invoice.id)}
                          className="bg-cavenetBlue text-white text-[11px] font-medium py-2 px-4 rounded hover:bg-[#1a36b0] transition-all shadow-sm"
                        >
                          Reportar pago
                        </button>
                      ) : (
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          estadoNormalizado === 'Pagada' ? 'text-green-900' : 'text-slate-400'
                        }`}>
                          {estadoNormalizado}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages && totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 px-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest order-last md:order-first">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded border border-slate-200 text-xs font-semibold text-slate-600 bg-white" onClick={onPrevPage} disabled={currentPage === 1}>Anterior</button>
            <button className="px-4 py-2 rounded bg-slate-800 text-white text-xs font-semibold" onClick={onNextPage} disabled={currentPage === totalPages}>Siguiente</button>
          </div>
        </div>
      )}
    </div>
  );
}