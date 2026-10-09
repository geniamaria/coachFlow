"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useParams } from "next/navigation";

export default function EditTrainingPage() {
  const params = useParams();

  const [training, setTraining] = useState<any>(null);
  const [clients, setClients] = useState<any[]>([]);

  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const [exercises, setExercises] = useState<any[]>([]);

 useEffect(() => {
  async function loadData() {
    try {
      const [trainingResponse, clientsResponse] = await Promise.all([
        fetch(`/api/trainings/${params.id}`),
        fetch("/api/clients"),
      ]);

      if (!trainingResponse.ok) {
        throw new Error("Plano de treino não encontrado");
      }

      if (!clientsResponse.ok) {
        throw new Error("Erro ao buscar clientes");
      }

      const trainingData = await trainingResponse.json();
      const clientsData = await clientsResponse.json();

      setTraining(trainingData);
      setClients(clientsData);

      setClientId(String(trainingData.clientId));
      setName(trainingData.name);
      setGoal(trainingData.goal);
      setDuration(trainingData.duration);
      setNotes(trainingData.notes || "");
      setExercises(trainingData.exercises || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setTraining(null);
    }
  }

  loadData();
}, [params.id]);

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

  function removeExercise(index: number) {
    const updatedExercises = exercises.filter(
      (_, exerciseIndex) => exerciseIndex !== index
    );

    setExercises(updatedExercises);
  }

  function updateExercise(
    index: number,
    field: string,
    value: string
  ) {
    const updatedExercises = [...exercises];

    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    };

    setExercises(updatedExercises);
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const response = await fetch(`/api/trainings/${params.id}`, {
      method: "PUT",
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
      throw new Error("Erro ao atualizar plano de treino");
    }

    await response.json();

    alert("Plano de treino atualizado com sucesso!");

    window.location.href = `/training/${params.id}`;
  } catch (error) {
    console.error("Erro ao atualizar plano:", error);

    alert("Não foi possível atualizar o plano de treino.");
  }
}

  if (!training) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl rounded-xl border bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Plano de treino não encontrado
          </h1>

          <Link
            href="/training"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-600"
          >
            <ArrowLeft size={16} />
            Voltar para planos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <Link
            href={`/training/${params.id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-gray-900">
            Editar plano de treino
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Atualize as informações e os exercícios do plano.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Informações do plano
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Cliente
                </label>

                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                >
                  <option value="">Selecione um cliente</option>

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

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nome do plano
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Objetivo
                </label>

                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                >
                  <option value="">Selecione o objetivo</option>
                  <option value="Emagrecimento">
                    Emagrecimento
                  </option>
                  <option value="Ganho de massa muscular">
                    Ganho de massa muscular
                  </option>
                  <option value="Condicionamento físico">
                    Condicionamento físico
                  </option>
                  <option value="Aumento de força">
                    Aumento de força
                  </option>
                  <option value="Saúde e bem-estar">
                    Saúde e bem-estar
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Duração
                </label>

                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                >
                  <option value="">Selecione a duração</option>
                  <option value="4 semanas">4 semanas</option>
                  <option value="8 semanas">8 semanas</option>
                  <option value="12 semanas">12 semanas</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Observações
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Exercícios
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Edite ou adicione exercícios ao plano.
                </p>
              </div>

              <button
                type="button"
                onClick={addExercise}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                + Adicionar
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {exercises.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <p className="text-sm text-gray-500">
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
                        onClick={() => removeExercise(index)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Nome do exercício
                        </label>

                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Séries
                        </label>

                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              "sets",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Repetições
                        </label>

                        <input
                          type="number"
                          value={exercise.repetitions}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              "repetitions",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Carga
                        </label>

                        <input
                          type="text"
                          value={exercise.weight}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              "weight",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Descanso
                        </label>

                        <input
                          type="text"
                          value={exercise.rest}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              "rest",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Observações
                        </label>

                        <input
                          type="text"
                          value={exercise.notes}
                          onChange={(e) =>
                            updateExercise(
                              index,
                              "notes",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href={`/training/${params.id}`}
              className="rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              <Save size={17} />
              Guardar alterações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}