"use client";

import Link from "next/link";
import { ArrowLeft, Edit, Mail, Phone, CalendarDays, Target, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ClientDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");

    if (!savedClients) {
      return;
    }

    const clients = JSON.parse(savedClients);

    const foundClient = clients.find(
      (client: any) => client.id === id
    );

    setClient(foundClient);
  }, [id]);

  if (!client) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Cliente não encontrado
          </h1>

          <Link
            href="/clients"
            className="mt-4 inline-block text-sm font-semibold text-green-600 hover:text-green-700"
          >
            Voltar para clientes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">

          <Link
            href="/clients"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Voltar para clientes
          </Link>

        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-5xl px-6 py-8">

        {/* PERFIL */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
                {client.name
                  .split(" ")
                  .map((name: string) => name[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {client.name}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {client.email}
                </p>
              </div>

            </div>

            <Link
              href={`/clients/edit/${client.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              <Edit size={18} />
              Editar cliente
            </Link>

          </div>

        </div>

        {/* INFORMAÇÕES */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* INFORMAÇÕES PESSOAIS */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-gray-900">
              Informações pessoais
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-3">
                <Mail className="text-green-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {client.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-green-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">
                    Telefone
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {client.phone || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="text-green-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">
                    Data de nascimento
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {client.birthDate || "Não informado"}
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* INFORMAÇÕES DO TREINO */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-gray-900">
              Informações do treino
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-3">
                <Target className="text-green-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">
                    Objetivo
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {client.goal || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="text-green-600" size={20} />

                <div>
                  <p className="text-xs text-gray-500">
                    Plano
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {client.plan || "Não informado"}
                  </p>
                </div>
              </div>

              <div>

                <p className="text-xs text-gray-500">
                  Estado
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    client.status === "Ativo"
                      ? "bg-green-100 text-green-700"
                      : client.status === "Pendente"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {client.status}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* OBSERVAÇÕES */}
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-900">
            Observações
          </h2>

          <p className="mt-4 leading-relaxed text-gray-600">
            {client.notes || "Nenhuma observação adicionada."}
          </p>

        </div>

      </div>

    </main>
  );
}