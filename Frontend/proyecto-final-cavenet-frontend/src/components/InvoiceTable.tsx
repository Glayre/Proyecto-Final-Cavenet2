interface Invoice {
  id: string;
  fecha: string;
  monto: string;
  estado: "Pagada" | "Pendiente" | "Vencida";
}

interface Props {
  invoices: Invoice[];
}

export default function InvoiceTable({ invoices }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-(--background) shadow-cav rounded-xl">
        <thead>
          <tr className="bg-(--cavenet-blue) text-white">
            <th className="px-4 py-2 text-left"># Factura</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Monto</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b hover:bg-(--cav-gray)">
              <td className="px-4 py-2 font-medium text-(--cav-dark)">{invoice.id}</td>
              <td className="px-4 py-2 text-(--foreground)">{invoice.fecha}</td>
              <td className="px-4 py-2 text-(--foreground)">{invoice.monto}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    invoice.estado === "Pagada"
                      ? "bg-green-200 text-green-800"
                      : invoice.estado === "Pendiente"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {invoice.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
