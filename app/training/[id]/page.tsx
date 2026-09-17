"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Dumbbell, Pencil } from "lucide-react";
import { useParams } from "next/navigation";

export default function TrainingDetailsPage() {
  const params = useParams();

  const [training, setTraining] = useState<any>(null);
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
  async function loadTraining() {
    try {
      const trainingResponse = await fetch(
        `/api/trainings/${params.id}`
      );

      if (!trainingResponse.ok) {
        throw new Error("Plano de treino não encontrado");
      }

      const trainingData = await trainingResponse.json();

      setTraining(trainingData);

      const clientsResponse = await fetch("/api/clients");

      if (!clientsResponse.ok) {
        throw new Error("Erro ao buscar clientes");
      }

      const clientsData = await clientsResponse.json();

      const foundClient = clientsData.find(
        (item: any) => item.id === trainingData.clientId
      );

      setClient(foundClient);
    } catch (error) {
      console.error("Erro ao carregar plano:", error);
      setTraining(null);
    }
  }

  loadTraining();
}, [params.id]);

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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <Link
              href="/training"
              className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>

            <h1 className="text-2xl font-bold text-gray-900">
              {training.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {client?.name || "Cliente não encontrado"}
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            {/* <link //href="/training/newTraning"> */}
            <Pencil size={17} />
            Editar
            
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Objetivo</p>
            <p className="mt-1 font-semibold text-gray-900">
              {training.goal}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Duração</p>
            <p className="mt-1 font-semibold text-gray-900">
              {training.duration}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">Exercícios</p>
            <p className="mt-1 font-semibold text-gray-900">
              {training.exercises?.length || 0}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-white">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Exercícios do plano
            </h2>
          </div>

          {training.exercises?.length === 0 ? (
            <div className="p-8 text-center">
              <Dumbbell className="mx-auto text-gray-400" size={32} />

              <p className="mt-3 text-sm text-gray-500">
                Nenhum exercício adicionado a este plano.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {training.exercises.map(
                (exercise: any, index: number) => (
                  <div key={exercise.id} className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-sm font-semibold text-green-600">
                        {index + 1}
                      </div>

                      <h3 className="font-semibold text-gray-900">
                        {exercise.name || "Exercício sem nome"}
                      </h3>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-gray-500">
                          Séries
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {exercise.sets || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Repetições
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {exercise.repetitions || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Carga
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {exercise.weight || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Descanso
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {exercise.rest || "-"}
                        </p>
                      </div>
                    </div>

                    {exercise.notes && (
                      <div className="mt-4 rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">
                          Observações
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {exercise.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {training.notes && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold text-gray-900">
              Observações do plano
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {training.notes}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}