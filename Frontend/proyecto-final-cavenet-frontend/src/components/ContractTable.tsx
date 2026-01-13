"use client";

import App from "next/app";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


/*
Ejemplo de datos de contratos:
{
		"_id": "69658dc8cf5a5ee39c8f6388",
		"clienteId": {
			"_id": "69654243acd8052d094450bc",
			"cedula": "12345679",
			"email": "cliente@example.com",
			"nombre": "Juan",
			"apellido": "Pérez"
		},
		"planId": {
			"_id": "69657341d3ecbf64c20942d1",
			"nombre": "Plan Prueba Cliente",
			"precioUSD": 15
		},
		"correoAlternativo": "cliente@example.com",
		"estado": "activo",
		"fechaInicio": "2026-01-13T00:11:52.047Z",
		"createdAt": "2026-01-13T00:11:52.055Z",
		"updatedAt": "2026-01-13T00:11:52.055Z",
		"__v": 0
	}
]

*/


interface Contract {
  _id: string;
  clienteId: {
    _id: string;
    cedula: string;
    email: string;
    nombre: string;
    apellido: string;
  };
  planId: {
    _id: string;
    nombre: string;
    precioUSD: number;
  };
  correoAlternativo: string;
  estado: string;
  fechaInicio: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props {
  Contracts: any[];
  router: AppRouterInstance;
}

export default function ContractTable({ Contracts, router }: Props) {
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-background  border border-gray-200">
        <thead className="bg-background">
          <tr className="bg-cavenetBlue text-white">
            <th className="py-2 px-4 border-b">ID Contrato</th>
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Plan</th>  
            <th className="py-2 px-4 border-b">Correo Alternativo</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Fecha Inicio</th>
          </tr>
        </thead>
        <tbody>
          {Contracts.map((contract: Contract) => (
            <tr key={contract._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => router.push(`/contracts/${contract._id}`)}>
              <td className="py-2 px-4 border-b">{contract._id}</td>
              <td className="py-2 px-4 border-b">{contract.clienteId.nombre} {contract.clienteId.apellido}</td>
              <td className="py-2 px-4 border-b">{contract.planId.nombre}</td>
              <td className="py-2 px-4 border-b">{contract.correoAlternativo}</td>
              <td className="py-2 px-4 border-b">{contract.estado}</td>
              <td className="py-2 px-4 border-b">{contract.fechaInicio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
        
