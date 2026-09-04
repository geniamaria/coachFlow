"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  PencilLine,
} from "lucide-react";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  // Função para alternar o menu de opções
  useEffect(() => {
    const savedSchedules = localStorage.getItem("schedules");
    const savedClients = localStorage.getItem("clients");

    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    }

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);
  function getClientName(clientId: number) {
    const client = clients.find((client) => client.id === clientId);

    return client ? client.name : "Cliente não encontrado";
  }
  // Função para deletar agendamento
  function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja eliminar este agendamento?",
    );

    if (!confirmDelete) {
      return;
    }

    const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);

    setSchedules(updatedSchedules);

    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

    setOpenMenu(null);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>

            <p className="mt-1 text-sm text-gray-500">
              Gerencie seus treinos e compromissos
            </p>
          </div>

          <Link
            href="/schedule/newSchedule"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Novo agendamento
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Navegação da data */}
        <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
          <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-green-600" />

            <span className="font-semibold text-gray-900">Setembro 2026</span>
          </div>

          <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Agenda */}
        <div className="mt-6 rounded-xl border bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Próximos agendamentos
            </h2>
          </div>

          <div className="divide-y">
            {schedules.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <CalendarDays size={42} className="mx-auto text-gray-300" />

                <h3 className="mt-4 font-semibold text-gray-900">
                  Nenhum agendamento
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Crie um novo agendamento para começar.
                </p>

                <Link
                  href="/schedule/new"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <Plus size={18} />
                  Criar agendamento
                </Link>
              </div>
            ) : (
              schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === schedule.id ? null : schedule.id,
                        )
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      aria-label="Ações do agendamento"
                    >
                      ⋯
                    </button>

                    {openMenu === schedule.id && (
                      <div className="absolute right-0 top-10 z-10 w-36 rounded-lg border bg-white p-1 text-left shadow-lg">
                        <button
                          onClick={() => {
                            window.location.href = `/schedule/edit/${schedule.id}`;
                          }}
                          className="w-full rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <PencilLine
                            size={20}
                            className=" text-sm text-slate-600 hover:bg-slate-50"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.id)}
                          className="w-full rounded-md px-3 py-2 text-sm "
                        >
                          <Trash2
                            size={20}
                            className=" text-sm  text-red-600 hover:bg-red-50"
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {getClientName(schedule.clientId)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {schedule.type}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {schedule.date}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {schedule.time}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      schedule.status === "Agendado"
                        ? "bg-green-100 text-green-700"
                        : schedule.status === "Concluído"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {schedule.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
