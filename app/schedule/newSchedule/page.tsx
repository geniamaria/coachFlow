"use client";

import Link from "next/link";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function NewSchedulePage() {
  const [clients, setClients] = useState<any[]>([]);

  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Agendado");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedClients = localStorage.getItem("clients");

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newSchedule = {
      id: Date.now(),
      clientId: Number(clientId),
      date,
      time,
      type,
      status,
      notes,
    };

    const savedSchedules = localStorage.getItem("schedules");

    const schedules = savedSchedules
      ? JSON.parse(savedSchedules)
      : [];

    schedules.push(newSchedule);

    localStorage.setItem(
      "schedules",
      JSON.stringify(schedules)
    );

    alert("Agendamento criado com sucesso!");

    window.location.href = "/schedule";
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
              <CalendarPlus size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Novo Agendamento
              </h1>

              <p className="mt-1 text-black text-gray-500">
                Crie um novo treino para um cliente
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
                placeholder="Ex.: Treino focado em membros inferiores..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500"
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-3 text-black font-semibold text-white transition hover:bg-green-700"
            >
              Criar agendamento
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}