"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  Trash2,
  PencilLine,
} from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("Todos");

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Todos" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja eliminar este cliente?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedClients = clients.filter((client) => client.id !== id);

    setClients(updatedClients);

    localStorage.setItem("clients", JSON.stringify(updatedClients));

    setOpenMenu(null);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>

            <p className="mt-1 text-black text-gray-500">
              Gerencie os seus clientes e acompanhe as suas informações.
            </p>
          </div>

          <Link
            href="/clients/newClients"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-black font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Novo Cliente
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* RESUMO */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-green-100 p-3 text-green-600">
            <Users size={24} />
          </div>

          <div>
            <p className="text-black text-gray-500">Total de clientes</p>

            <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
          </div>
        </div>

        {/* PESQUISA  POR CLIENTE */}
        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="relative max-w-md flex items-center gap-2">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type="text"
              placeholder="Pesquisar cliente..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-black outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black outline-none focus:border-green-500"
            >
              <option value="Todos">Todos os estados</option>
              <option value="Ativo">Ativo</option>
              <option value="Pendente">Pendente</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* TABELA  COM DADOS DOS CLIENTES */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Cliente
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Plano
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Estado
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-black text-gray-500"
                    >
                      Nenhum cliente encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => (
                    <tr key={client.id} className="transition hover:bg-gray-50">
                      {/* CLIENTE */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                            {client.name
                              .split(" ")
                              .map((name: string) => name[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            {/* <p className="font-semibold text-gray-900">
                              {client.name}
                            </p> */}
                            <Link
                              href={`/clients/${client.id}`}
                              className="font-semibold text-gray-900 hover:text-green-600"
                            >
                              {client.name}
                            </Link>

                            <p className="text-black text-gray-500">
                              {client.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PLANO */}
                      <td className="px-6 py-4 text-black text-gray-600">
                        {client.plan}
                      </td>

                      {/* ESTADO */}
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            client.status === "Ativo"
                              ? "bg-green-100 text-green-700"
                              : client.status === "Pendente"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>

                      {/* AÇÕES PARA ELIMINAR  CLIENTES */}
                      <td className="relative px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu === client.id ? null : client.id,
                            )
                          }
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          aria-label={`Ações para ${client.name}`}
                        >
                          <MoreHorizontal size={20} />
                        </button>
                        {/*Ações para editar e eliminar clientes*/}
                        {openMenu === client.id && (
                          <div className="absolute right-4 top-14 z-10 w-30 rounded-lg border bg-white p-1 text-center shadow-lg">
                            <button
                              className="w-full rounded-md px-3 py-2 text-black text-gray-700 hover:bg-gray-50"
                              onClick={() => {
                                window.location.href = `/clients/edit/${client.id}`;
                              }}
                            >
                              <PencilLine />
                            </button>

                            <button
                              className="w-full rounded-md px-3 py-2 text-black text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(client.id)}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
