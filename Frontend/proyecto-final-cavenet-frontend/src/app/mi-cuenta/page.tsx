"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import InvoiceTable from "../../components/InvoiceTable";
import UserNav from "@/components/UserNav";
import { getTasaCambio } from "@/services/tasaDolar";

export default function MiCuentaPage() {
  const [facturas, setFacturas] = useState<any[]>([]);
  const [datos, setDatos] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tasaVED, setTasaVED] = useState<number | undefined>(undefined); // Anexo: inicializado en null para validación
  const router = useRouter();

  // 🔹 Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("userId");

    if (!token && !id) {
      router.replace("/login"); // Anexo: replace para evitar volver atrás
      return;
    }

    apiFetch("/api/users/" + id, { method: "GET" })
      .then((data) => {
        setDatos(data);
        const parsedUser = data;
        return parsedUser;
      })
      .then((parsedUser) => {
        apiFetch("/api/invoices/" + parsedUser._id, { method: "GET" })
          .then((data) => setFacturas(data))
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));

    const fetchTasa = async () => {
      try {
        const tasa = await getTasaCambio();
        setTasaVED(tasa);
        console.log("Tasa de cambio actualizada:", tasa);
      } catch (err) {
        console.error("Error al obtener la tasa de cambio:", err);
      }
    };

    fetchTasa();
  }, [router]);

  // 🔹 Normalizar estados y considerar "reportado"
  const facturasPendientes = facturas.filter(
    (f) =>
      ["pendiente", "vencido", "reportado"].includes(f.estado?.toLowerCase())
  );

  // 🔹 Usar montoPendiente en lugar de montoUSD
  const totalUSD = facturasPendientes.reduce(
    (sum, f) => sum + (f.montoPendiente || 0),
    0
  );

  // 🔹 Recalcular Bs con montoPendiente
  const totalBs = facturasPendientes.reduce(
    (sum, f) => sum + ((f.montoPendiente || 0) * (f.tasaVED || 0)),
    0
  );

  // 🔹 Calcular facturas de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(facturas.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <main className="px-6 py-12 mt-12">
      <UserNav userData={datos} />
      <h1 className="title-xl text-center">Mi Cuenta</h1>

      {error ? (
        <p className="text-center text-red-500 w-full">{error}</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {datos?.plan && (
            <div>
              <h2 className="title-lg mb-2">Mi plan, {datos.plan.nombre}</h2>
              <div className="text-black mb-6">
                <p><strong>Velocidad:</strong> {datos.plan.velocidadMbps}</p>
                <p><strong>Mensualidad:</strong> USD {datos.plan.precioUSD}</p>
                <p><strong>Estado del plan:</strong> {datos.plan.activo ? "Activo" : "Suspendido"}</p>
              </div>
            </div>
          )}

          <h2 className="title-lg mb-6">Mis Facturas</h2>

          <div className="card shadow-card mb-8">
            <h3 className="title-md mb-2">Aviso</h3>
            <p className="text-black">
              Recuerda que las facturas pendientes deben ser pagadas antes del día 10 de cada mes.
            </p>
          </div>

          {/* 🔹 Resumen de estado de cuenta con anexos de protección */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="card shadow-card">
              <h3 className="title-md mb-2">Saldo a favor</h3>
              {datos && datos.saldoFavorUSD > 0 ? (
                <div>
                  <p className="text-green-600 text-xl font-semibold">
                    USD {datos.saldoFavorUSD.toFixed(2)}
                  </p>
                  <p className="text-green-600 text-sm">
                    Bs. {tasaVED ? (datos.saldoFavorUSD * tasaVED).toFixed(2) : "..."}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700 text-lg font-medium">No tienes saldo a favor</p>
              )}
            </div>

            {datos && (
              <div className="card shadow-card">
                <h3 className="title-md mb-2">Monto a pagar</h3>
                <p className="text-blue-600 text-xl font-semibold">
                  {/* Anexo: Math.abs para mostrar monto positivo aunque el saldo sea negativo */}
                  USD {Math.abs(datos.saldoFavorUSD || 0).toFixed(2)}
                </p>
                <p className="text-blue-600 text-xl font-semibold">
                  {/* Anexo: Validación de tasaVED para evitar errores matemáticos */}
                  Bs. {tasaVED ? (Math.abs(datos.saldoFavorUSD || 0) * tasaVED).toFixed(2) : "Cargando..."}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Tasa: {tasaVED ? `${tasaVED.toFixed(2)} Bs/USD` : "---"}
                </p>
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <button
              className="btn-primary"
              onClick={() => router.push("/reporte-pago")}
            >
              Reportar pago
            </button>
          </div>

          {facturas.length === 0 ? (
            <p className="text-center text-gray-500">
              No tienes facturas registradas.
            </p>
          ) : (
            <InvoiceTable
              invoices={currentInvoices}
              tasaVED={tasaVED}
              router={router}
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          )}
        </div>
      )}
    </main>
  );
}