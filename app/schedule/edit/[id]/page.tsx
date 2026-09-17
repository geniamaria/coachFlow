"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditSchedulePage() {
  const params = useParams();
  const id = Number(params.id);

  const [clients, setClients] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any>(null);

  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Agendado");
  const [notes, setNotes] = useState("");

  useEffect(() => {
  async function loadData() {
    try {
      const clientsResponse = await fetch("/api/clients");
      const scheduleResponse = await fetch(`/api/schedules/${id}`);

      if (!clientsResponse.ok) {
        throw new Error("Erro ao buscar clientes");
      }

      if (!scheduleResponse.ok) {
        throw new Error("Erro ao buscar agendamento");
      }

      const clientsData = await clientsResponse.json();
      const scheduleData = await scheduleResponse.json();

      setClients(clientsData);
      setSchedule(scheduleData);

      setClientId(String(scheduleData.clientId));
      setDate(scheduleData.date);
      setTime(scheduleData.time);
      setType(scheduleData.type);
      setStatus(scheduleData.status);
      setNotes(scheduleData.notes || "");
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  loadData();
}, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  try {
    const response = await fetch(`/api/schedules/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: Number(clientId),
        date,
        time,
        type,
        status,
        notes,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar agendamento");
    }

    const data = await response.json();

    console.log("Agendamento atualizado:", data);

    alert("Agendamento atualizado com sucesso!");

    window.location.href = "/schedule";
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);

    alert("Não foi possível atualizar o agendamento.");
  }
}

  if (!schedule) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Agendamento não encontrado
          </h1>

          <Link
            href="/schedule"
            className="mt-4 inline-block text-black font-semibold text-green-600 hover:text-green-700"
          >
            Voltar para agenda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 text-black font-medium text-gray-500 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Voltar para agenda
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <CalendarDays size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Editar Agendamento
              </h1>

              <p className="mt-1 text-black text-gray-500">
                Atualize os dados do treino
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* Cliente */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Cliente
              </label>

              <select
                value={clientId}
                onChange={(event) =>
                  setClientId(event.target.value)
                }
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
              >
                <option value="">
                  Selecione um cliente
                </option>

                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                  >
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Data e hora */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-black font-medium text-gray-700">
                  Data
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-black font-medium text-gray-700">
                  Hora
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Tipo */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Tipo de treino
              </label>

              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
              >
                <option value="">
                  Selecione o tipo de treino
                </option>

                <option value="Musculação">
                  Musculação
                </option>

                <option value="Cardio">
                  Cardio
                </option>

                <option value="Treino funcional">
                  Treino funcional
                </option>

                <option value="Avaliação física">
                  Avaliação física
                </option>

                <option value="Alongamento">
                  Alongamento
                </option>
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Estado
              </label>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
              >
                <option value="Agendado">
                  Agendado
                </option>

                <option value="Concluído">
                  Concluído
                </option>

                <option value="Cancelado">
                  Cancelado
                </option>
              </select>
            </div>

            {/* Observações */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Observações
              </label>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-3 text-black font-semibold text-white transition hover:bg-green-700"
            >
              Guardar alterações
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}