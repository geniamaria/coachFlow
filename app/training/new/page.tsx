"use client";

import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function NewTrainingPage() {
  const [clients, setClients] = useState<any[]>([]);

  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<any[]>([]);

  // funcao para criar exersicios
  function addExercise() {
    const newExercise = {
      id: Date.now(),
      name: "",
      sets: "",
      repetitions: "",
      weight: "",
      rest: "",
      notes: "",
    };

    setExercises([...exercises, newExercise]);
  }

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await fetch("/api/clients");

        if (!response.ok) {
          throw new Error("Erro ao buscar clientes");
        }

        const data = await response.json();

        setClients(data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    }

    loadClients();
  }, []);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/trainings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: Number(clientId),
          name,
          goal,
          duration,
          notes,
          exercises,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar plano de treino");
      }

      await response.json();

      alert("Plano de treino criado com sucesso!");

      window.location.href = "/training";
    } catch (error) {
      console.error("Erro:", error);

      alert("Não foi possível criar o plano de treino.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-6 py-5">
          <Link
            href="/training"
            className="inline-flex items-center gap-2 text-black font-medium text-gray-500 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Voltar para planos
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          {/* TÍTULO */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Dumbbell size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Novo Plano de Treino
              </h1>

              <p className="mt-1 text-black text-gray-500">
                Crie um plano personalizado para o cliente.
              </p>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* CLIENTE */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Cliente
              </label>

              <select
                value={clientId}
                onChange={(event) => setClientId(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">Selecione um cliente</option>

                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* NOME */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Nome do plano
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Plano de hipertrofia"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* OBJETIVO */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Objetivo
              </label>

              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">Selecione o objetivo</option>

                <option value="Emagrecimento">Emagrecimento</option>

                <option value="Ganho de massa muscular">
                  Ganho de massa muscular
                </option>

                <option value="Aumento de força">Aumento de força</option>

                <option value="Condicionamento físico">
                  Condicionamento físico
                </option>

                <option value="Saúde e bem-estar">Saúde e bem-estar</option>
              </select>
            </div>

            {/* DURAÇÃO */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Duração
              </label>

              <select
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">Selecione a duração</option>

                <option value="4 semanas">4 semanas</option>

                <option value="8 semanas">8 semanas</option>

                <option value="12 semanas">12 semanas</option>
              </select>
            </div>

            {/* OBSERVAÇÕES */}
            <div>
              <label className="mb-2 block text-black font-medium text-gray-700">
                Observações
              </label>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Observações sobre o plano..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Exercícios
                  </h2>

                  <p className="mt-1 text-black text-gray-500">
                    Adicione os exercícios deste plano de treino.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addExercise}
                  className="rounded-lg bg-green-600 px-4 py-2 text-black font-semibold text-white hover:bg-green-700"
                >
                  + Adicionar exercício
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {exercises.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="text-black text-gray-500">
                      Nenhum exercício adicionado.
                    </p>
                  </div>
                ) : (
                  exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className="rounded-lg border bg-gray-50 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          Exercício {index + 1}
                        </h3>

                        <button
                          type="button"
                          onClick={() => {
                            const updatedExercises = exercises.filter(
                              (_, exerciseIndex) => exerciseIndex !== index,
                            );

                            setExercises(updatedExercises);
                          }}
                          className="text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-black font-medium text-gray-700">
                            Nome do exercício
                          </label>

                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => {
                              const updatedExercises = [...exercises];
                              updatedExercises[index].name = e.target.value;
                              setExercises(updatedExercises);
                            }}
                            placeholder="Ex.: Agachamento"
                            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-black font-medium text-gray-700">
                            Séries
                          </label>

                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => {
                              const updatedExercises = [...exercises];
                              updatedExercises[index].sets = e.target.value;
                              setExercises(updatedExercises);
                            }}
                            placeholder="Ex.: 3"
                            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-black font-medium text-gray-700">
                            Repetições
                          </label>

                          <input
                            type="number"
                            value={exercise.repetitions}
                            onChange={(e) => {
                              const updatedExercises = [...exercises];
                              updatedExercises[index].repetitions =
                                e.target.value;
                              setExercises(updatedExercises);
                            }}
                            placeholder="Ex.: 12"
                            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-black font-medium text-gray-700">
                            Carga
                          </label>

                          <input
                            type="text"
                            value={exercise.weight}
                            onChange={(e) => {
                              const updatedExercises = [...exercises];
                              updatedExercises[index].weight = e.target.value;
                              setExercises(updatedExercises);
                            }}
                            placeholder="Ex.: 20 kg"
                            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-black font-medium text-gray-700">
                            Descanso
                          </label>

                          <input
                            type="text"
                            value={exercise.rest}
                            onChange={(e) => {
                              const updatedExercises = [...exercises];
                              updatedExercises[index].rest = e.target.value;
                              setExercises(updatedExercises);
                            }}
                            placeholder="Ex.: 60 segundos"
                            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-black font-medium text-gray-700">
                            Observações
                          </label>

                          <input
                            type="text"
                            value={exercise.notes}
                            onChange={(e) => {
                              const updatedExercises = [...exercises];
                              updatedExercises[index].notes = e.target.value;
                              setExercises(updatedExercises);
                            }}
                            placeholder="Ex.: Manter postura correta"
                            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* BOTÃO */}
            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-3 text-black font-semibold text-white transition hover:bg-green-700"
            >
              Criar plano
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
