"use client";

import Link from "next/link";
import {
  Dumbbell,
  Plus,
  ClipboardList,
  MoreHorizontal,
  Trash,
  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TrainingPage() {
  const [trainings, setTrainings] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [trainingsResponse, clientsResponse] = await Promise.all([
          fetch("/api/trainings"),
          fetch("/api/clients"),
        ]);

        if (!trainingsResponse.ok || !clientsResponse.ok) {
          throw new Error("Erro ao carregar dados");
        }

        const trainingsData = await trainingsResponse.json();
        const clientsData = await clientsResponse.json();

        setTrainings(trainingsData);
        setClients(clientsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    loadData();
  }, []);

  function getClientName(clientId: number) {
    const client = clients.find((client) => client.id === clientId);

    return client ? client.name : "Cliente não encontrado";
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja eliminar este plano de treino?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/trainings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao eliminar plano");
      }

      setTrainings((currentTrainings) =>
        currentTrainings.filter((training) => training.id !== id),
      );

      setOpenMenu(null);
    } catch (error) {
      console.error("Erro ao eliminar plano:", error);

      alert("Não foi possível eliminar o plano de treino.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Planos de Treino
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Crie e gerencie os planos de treino dos seus clientes
            </p>
          </div>

          <Link
            href="/training/new"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Novo plano
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Meus planos de treino
            </h2>
          </div>

          {trainings.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Dumbbell size={28} />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                Nenhum plano de treino
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                Crie o primeiro plano de treino e associe-o a um cliente.
              </p>

              <Link
                href="/training/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                <ClipboardList size={18} />
                Criar primeiro plano
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {trainings.map((training) => (
                <div
                  key={training.id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Dumbbell size={21} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {training.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {getClientName(training.clientId)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {training.goal}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {training.duration}
                    </p>
                  </div>

                  <div className="relative self-end sm:self-auto">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === training.id ? null : training.id,
                        )
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      aria-label={`Ações para ${training.name}`}
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {openMenu === training.id && (
                      <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border bg-white py-1 shadow-lg">
                        <button
                          onClick={() => {
                            window.location.href = `/training/${training.id}`;
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Ver detalhes
                        </button>

                        <Link
                          href={`/training/edit/${training.id}`}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil size={17} />
                          Editar
                        </Link>

                        <button
                          onClick={() => handleDelete(training.id)}
                          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
