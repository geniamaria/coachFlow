"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CircleCheck,
  PencilLine,
  Plus,
  RotateCcw,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { getMetric, METRICS } from "@/lib/metrics";

type Client = {
  id: number;
  name: string;
  status: string;
};

type Goal = {
  id: number;
  clientId: number;
  title: string;
  metric: string | null;
  startValue: number | null;
  targetValue: number | null;
  currentValue: number | null;
  unit: string | null;
  deadline: string | null;
  status: string;
  notes: string | null;
};

type GoalEntry = {
  id: number;
  clientId: number;
  date: string;
  weight: number | null;
  bodyFat: number | null;
  chest: number | null;
  waist: number | null;
  hip: number | null;
  arm: number | null;
  thigh: number | null;
  notes: string | null;
};

type GoalForm = {
  title: string;
  mode: "auto" | "manual";
  metric: string;
  startValue: string;
  targetValue: string;
  currentValue: string;
  unit: string;
  deadline: string;
  status: string;
  notes: string;
};

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function createEmptyForm(): GoalForm {
  return {
    title: "",
    mode: "auto",
    metric: "weight",
    startValue: "",
    targetValue: "",
    currentValue: "",
    unit: "kg",
    deadline: "",
    status: "Em progresso",
    notes: "",
  };
}

function formatFullDate(iso: string | null) {
  if (!iso) {
    return "—";
  }

  const [year, month, day] = iso.split("-");

  return `${day}/${month}/${year}`;
}

function formatNumber(value: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }

  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function lastMetricValue(entries: GoalEntry[], metric: string | null) {
  if (!metric) {
    return null;
  }

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const value = entries[index][metric as keyof GoalEntry];

    if (typeof value === "number") {
      return value;
    }
  }

  return null;
}

function computeProgress(goal: Goal, entries: GoalEntry[]) {
  if (goal.status === "Concluída") {
    return 100;
  }

  if (goal.status === "Cancelada") {
    return 0;
  }

  const start = goal.startValue;
  const target = goal.targetValue;

  if (start === null || target === null || target === start) {
    return null;
  }

  let current = goal.currentValue;

  if (goal.metric) {
    const latest = lastMetricValue(entries, goal.metric);

    if (latest !== null) {
      current = latest;
    }
  }

  if (current === null) {
    return null;
  }

  const pct = ((current - start) / (target - start)) * 100;

  return Math.max(0, Math.min(100, Math.round(pct)));
}

const STATUS_STYLES: Record<string, string> = {
  "Em progresso": "bg-blue-50 text-blue-700",
  "Concluída": "bg-green-50 text-green-700",
  "Cancelada": "bg-gray-100 text-gray-500",
};

function currentValueLabel(goal: Goal, entries: GoalEntry[]) {
  if (goal.metric) {
    const latest = lastMetricValue(entries, goal.metric);

    if (latest === null) {
      return "sem registo";
    }

    const unit = goal.unit ?? getMetric(goal.metric)?.unit ?? "";

    return `${formatNumber(latest)}${unit ? ` ${unit}` : ""}`;
  }

  if (goal.currentValue !== null) {
    return `${formatNumber(goal.currentValue)}${
      goal.unit ? ` ${goal.unit}` : ""
    }`;
  }

  return "sem valor";
}

export default function GoalsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [entries, setEntries] = useState<GoalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<GoalForm>(createEmptyForm);

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await fetch("/api/clients");

        if (!response.ok) {
          throw new Error("Erro ao buscar clientes");
        }

        const data: Client[] = await response.json();

        setClients(data);

        if (data.length > 0) {
          setSelectedClientId(data[0].id);
        }
      } catch (loadError) {
        console.error("Erro ao carregar clientes:", loadError);
        setError("Não foi possível carregar a lista de clientes.");
      }
    }

    loadClients();
  }, []);

  const loadGoals = useCallback(async (clientId: number) => {
    setLoading(true);

    try {
      const goalsResponse = await fetch(`/api/goals?clientId=${clientId}`);

      if (!goalsResponse.ok) {
        throw new Error("Erro ao buscar metas");
      }

      setGoals((await goalsResponse.json()) as Goal[]);

      const progressResponse = await fetch(
        `/api/progress?clientId=${clientId}`,
      );

      if (progressResponse.ok) {
        setEntries((await progressResponse.json()) as GoalEntry[]);
      }
    } catch (loadError) {
      console.error("Erro ao carregar metas:", loadError);
      setGoals([]);
      setEntries([]);
      setError("Não foi possível carregar as metas deste cliente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedClientId !== null) {
      loadGoals(selectedClientId);
    } else {
      setGoals([]);
      setEntries([]);
    }
  }, [selectedClientId, loadGoals]);

  const selectedClient =
    clients.find((client) => client.id === selectedClientId) ?? null;

  const counts = useMemo(() => {
    return {
      total: goals.length,
      inProgress: goals.filter((goal) => goal.status === "Em progresso").length,
      done: goals.filter((goal) => goal.status === "Concluída").length,
    };
  }, [goals]);

  function openForm(goal?: Goal) {
    setEditingGoal(goal ?? null);

    if (goal) {
      setForm({
        title: goal.title,
        mode: goal.metric ? "auto" : "manual",
        metric: goal.metric ?? "weight",
        startValue: goal.startValue !== null ? String(goal.startValue) : "",
        targetValue: goal.targetValue !== null ? String(goal.targetValue) : "",
        currentValue:
          goal.currentValue !== null ? String(goal.currentValue) : "",
        unit: goal.unit ?? getMetric(goal.metric)?.unit ?? "kg",
        deadline: goal.deadline ?? "",
        status: goal.status,
        notes: goal.notes ?? "",
      });
    } else {
      setForm(createEmptyForm());
    }

    setShowForm(true);
  }

  function handleFormChange(field: keyof GoalForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (selectedClientId === null) {
      return;
    }

    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = {
      title: form.title,
      metric: form.mode === "auto" ? form.metric : null,
      startValue: form.startValue,
      targetValue: form.targetValue,
      currentValue: form.mode === "manual" ? form.currentValue : null,
      unit: form.mode === "auto" ? getMetric(form.metric)?.unit ?? null : form.unit,
      deadline: form.deadline,
      status: form.status,
      notes: form.notes,
    };

    try {
      const response = await fetch(
        editingGoal ? `/api/goals/${editingGoal.id}` : "/api/goals",
        {
          method: editingGoal ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            ...(editingGoal ? {} : { clientId: selectedClientId }),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao guardar meta");
      }

      setShowForm(false);
      setEditingGoal(null);
      await loadGoals(selectedClientId);
    } catch (submitError) {
      console.error("Erro ao guardar meta:", submitError);
      setError("Não foi possível guardar a meta.");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusToggle(goal: Goal) {
    const nextStatus =
      goal.status === "Concluída" ? "Em progresso" : "Concluída";

    try {
      const response = await fetch(`/api/goals/${goal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: goal.title,
          metric: goal.metric,
          startValue: goal.startValue !== null ? String(goal.startValue) : "",
          targetValue: goal.targetValue !== null ? String(goal.targetValue) : "",
          currentValue:
            goal.currentValue !== null ? String(goal.currentValue) : "",
          unit: goal.unit,
          deadline: goal.deadline,
          status: nextStatus,
          notes: goal.notes || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar meta");
      }

      setGoals((current) =>
        current.map((item) =>
          item.id === goal.id ? { ...item, status: nextStatus } : item,
        ),
      );
    } catch (toggleError) {
      console.error("Erro ao atualizar meta:", toggleError);
      setError("Não foi possível atualizar o estado da meta.");
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Tem certeza que deseja eliminar esta meta?")) {
      return;
    }

    try {
      const response = await fetch(`/api/goals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao eliminar meta");
      }

      setGoals((current) => current.filter((goal) => goal.id !== id));
    } catch (deleteError) {
      console.error("Erro ao eliminar meta:", deleteError);
      setError("Não foi possível eliminar a meta.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-black outline-none focus:border-green-500";

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Metas</h1>

            <p className="mt-1 text-sm text-gray-500">
              Defina objetivos concretos para cada cliente e acompanhe o
              progresso.
            </p>
          </div>

          <button
            onClick={() => openForm()}
            disabled={selectedClientId === null}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Fechar" : "Nova meta"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {clients.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Target size={28} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Ainda não há clientes
            </h3>

            <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
              Adicione clientes para começar a definir metas.
            </p>

            <Link
              href="/clients/newClients"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              <Plus size={18} />
              Adicionar cliente
            </Link>
          </div>
        ) : (
          <>
            {/* SELETOR DE CLIENTE */}
            <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cliente
              </label>

              <select
                value={selectedClientId ?? ""}
                onChange={(event) => setSelectedClientId(Number(event.target.value))}
                className={`${inputClass} max-w-md`}
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* FORMULÁRIO */}
            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="mb-6 rounded-2xl border bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-gray-900">
                  {editingGoal ? "Editar meta" : "Nova meta"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedClient?.name}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Título
                    </label>

                    <input
                      type="text"
                      value={form.title}
                      onChange={(event) =>
                        handleFormChange("title", event.target.value)
                      }
                      placeholder="Ex.: Perder 5 kg até dezembro"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Tipo
                    </label>

                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="goalMode"
                          checked={form.mode === "auto"}
                          onChange={() => handleFormChange("mode", "auto")}
                          className="accent-green-600"
                        />
                        Ligada às avaliações
                      </label>

                      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="goalMode"
                          checked={form.mode === "manual"}
                          onChange={() => handleFormChange("mode", "manual")}
                          className="accent-green-600"
                        />
                        Manual
                      </label>
                    </div>
                  </div>

                  {form.mode === "auto" ? (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Métrica
                      </label>

                      <select
                        value={form.metric}
                        onChange={(event) =>
                          handleFormChange("metric", event.target.value)
                        }
                        className={inputClass}
                      >
                        {METRICS.map((metric) => (
                          <option key={metric.key} value={metric.key}>
                            {metric.label} ({metric.unit})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Unidade
                      </label>

                      <input
                        type="text"
                        value={form.unit}
                        onChange={(event) =>
                          handleFormChange("unit", event.target.value)
                        }
                        placeholder="Ex.: kg, cm, %..."
                        className={inputClass}
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Valor inicial
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      value={form.startValue}
                      onChange={(event) =>
                        handleFormChange("startValue", event.target.value)
                      }
                      placeholder="Ex.: 80"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Valor alvo
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      value={form.targetValue}
                      onChange={(event) =>
                        handleFormChange("targetValue", event.target.value)
                      }
                      placeholder="Ex.: 75"
                      required
                      className={inputClass}
                    />
                  </div>

                  {form.mode === "manual" && (
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Valor atual
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        value={form.currentValue}
                        onChange={(event) =>
                          handleFormChange("currentValue", event.target.value)
                        }
                        placeholder="Ex.: 77"
                        className={inputClass}
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Prazo
                    </label>

                    <input
                      type="date"
                      value={form.deadline}
                      onChange={(event) =>
                        handleFormChange("deadline", event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Estado
                    </label>

                    <select
                      value={form.status}
                      onChange={(event) =>
                        handleFormChange("status", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="Em progresso">Em progresso</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Notas
                    </label>

                    <textarea
                      value={form.notes}
                      onChange={(event) =>
                        handleFormChange("notes", event.target.value)
                      }
                      rows={2}
                      placeholder="Observações sobre a meta..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingGoal(null);
                    }}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving
                      ? "A guardar..."
                      : editingGoal
                        ? "Guardar alterações"
                        : "Criar meta"}
                  </button>
                </div>
              </form>
            )}

            {goals.length > 0 && (
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {counts.total}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">
                    Em progresso
                  </p>
                  <p className="mt-1 text-2xl font-bold text-blue-600">
                    {counts.inProgress}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">
                    Concluídas
                  </p>
                  <p className="mt-1 text-2xl font-bold text-green-600">
                    {counts.done}
                  </p>
                </div>
              </div>
            )}

            {/* LISTA DE METAS */}
            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">Metas</h2>
              </div>

              {loading ? (
                <div className="px-6 py-12 text-center text-sm text-gray-500">
                  A carregar...
                </div>
              ) : goals.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Target size={28} />
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    Nenhuma meta
                  </h3>

                  <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                    Defina a primeira meta de {selectedClient?.name} para
                    acompanhar o progresso ao longo do tempo.
                  </p>

                  <button
                    onClick={() => openForm()}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <Plus size={18} />
                    Nova meta
                  </button>
                </div>
              ) : (
                <ul className="divide-y">
                  {goals.map((goal) => {
                    const progress = computeProgress(goal, entries);
                    const isOverdue =
                      goal.status === "Em progresso" &&
                      goal.deadline !== null &&
                      goal.deadline < todayISO();
                    const metricInfo = goal.metric
                      ? getMetric(goal.metric)
                      : null;

                    return (
                      <li
                        key={goal.id}
                        className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {goal.title}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                STATUS_STYLES[goal.status] ?? "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {goal.status}
                            </span>

                            {goal.metric && (
                              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                                {metricInfo?.label ?? goal.metric}
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
                            <span>
                              Atual:{" "}
                              <span className="font-medium text-gray-700">
                                {currentValueLabel(goal, entries)}
                              </span>
                            </span>

                            <span>
                              Alvo:{" "}
                              <span className="font-medium text-gray-700">
                                {formatNumber(goal.targetValue)}
                                {goal.unit ? ` ${goal.unit}` : ""}
                              </span>
                            </span>

                            {goal.deadline && (
                              <span
                                className={`inline-flex items-center gap-1 ${
                                  isOverdue ? "text-red-500" : "text-gray-500"
                                }`}
                              >
                                <CalendarDays size={14} />
                                {isOverdue
                                  ? `Prazo expirado (${formatFullDate(goal.deadline)})`
                                  : `Prazo: ${formatFullDate(goal.deadline)}`}
                              </span>
                            )}
                          </div>

                          {goal.notes && (
                            <p className="mt-2 text-sm text-gray-400">
                              {goal.notes}
                            </p>
                          )}
                        </div>

                        <div className="w-full sm:w-72">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Progresso</span>
                            <span className="font-semibold text-gray-700">
                              {progress === null ? "—" : `${progress}%`}
                            </span>
                          </div>

                          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${progress === null ? 0 : progress}%`,
                                backgroundColor:
                                  progress === 100
                                    ? "#16a34a"
                                    : progress === null
                                      ? "#e5e7eb"
                                      : "#3b82f6",
                              }}
                            />
                          </div>

                          <div className="mt-3 flex justify-end gap-1">
                            {goal.status !== "Cancelada" && (
                              <button
                                onClick={() => handleStatusToggle(goal)}
                                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                                title={
                                  goal.status === "Concluída"
                                    ? "Reabrir meta"
                                    : "Marcar como concluída"
                                }
                              >
                                {goal.status === "Concluída" ? (
                                  <RotateCcw size={15} />
                                ) : (
                                  <CircleCheck size={15} />
                                )}
                                {goal.status === "Concluída"
                                  ? "Reabrir"
                                  : "Concluir"}
                              </button>
                            )}

                            <button
                              onClick={() => openForm(goal)}
                              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                              title="Editar meta"
                            >
                              <PencilLine size={15} />
                              Editar
                            </button>

                            <button
                              onClick={() => handleDelete(goal.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                              title="Eliminar meta"
                            >
                              <Trash2 size={15} />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}