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
      <table className="min-w-full bg-white shadow-card rounded-xl">
        <thead>
          <tr className="bg-cavenetBlue text-white">
            <th className="px-4 py-2 text-left"># Factura</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Monto</th>
            <th className="px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b hover:bg-cavGray">
              <td className="px-4 py-2 font-medium">{invoice.id}</td>
              <td className="px-4 py-2">{invoice.fecha}</td>
              <td className="px-4 py-2">{invoice.monto}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    invoice.estado === "Pagada"
                      ? "bg-green-100 text-green-700"
                      : invoice.estado === "Pendiente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
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
