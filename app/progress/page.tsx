"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Plus,
  Ruler,
  Target,
  Trash2,
  Weight,
  X,
} from "lucide-react";
import ProgressChart from "@/components/progress/progressChart";

type Client = {
  id: number;
  name: string;
  status: string;
};

type MetricKey =
  | "weight"
  | "bodyFat"
  | "chest"
  | "waist"
  | "hip"
  | "arm"
  | "thigh";

type ProgressEntry = {
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

type FormState = {
  date: string;
  weight: string;
  bodyFat: string;
  chest: string;
  waist: string;
  hip: string;
  arm: string;
  thigh: string;
  notes: string;
};

const METRICS: { key: MetricKey; label: string; unit: string }[] = [
  { key: "weight", label: "Peso", unit: "kg" },
  { key: "bodyFat", label: "% Gordura", unit: "%" },
  { key: "chest", label: "Peito", unit: "cm" },
  { key: "waist", label: "Cintura", unit: "cm" },
  { key: "hip", label: "Quadril", unit: "cm" },
  { key: "arm", label: "Braço", unit: "cm" },
  { key: "thigh", label: "Coxa", unit: "cm" },
];

const NUMERIC_FIELDS: { key: Exclude<keyof FormState, "date" | "notes">; label: string; unit: string }[] = [
  { key: "weight", label: "Peso", unit: "kg" },
  { key: "bodyFat", label: "% Gordura", unit: "%" },
  { key: "chest", label: "Peito", unit: "cm" },
  { key: "waist", label: "Cintura", unit: "cm" },
  { key: "hip", label: "Quadril", unit: "cm" },
  { key: "arm", label: "Braço", unit: "cm" },
  { key: "thigh", label: "Coxa", unit: "cm" },
];

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function createEmptyForm(): FormState {
  return {
    date: todayISO(),
    weight: "",
    bodyFat: "",
    chest: "",
    waist: "",
    hip: "",
    arm: "",
    thigh: "",
    notes: "",
  };
}

function formatFullDate(iso: string) {
  const [year, month, day] = iso.split("-");

  return `${day}/${month}/${year}`;
}

function formatShortDate(iso: string) {
  const [, month, day] = iso.split("-");

  return `${day}/${month}`;
}

function formatNumber(value: number | null) {
  if (value === null || value === undefined) {
    return "—";
  }

  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export default function ProgressPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [metric, setMetric] = useState<MetricKey>("weight");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(createEmptyForm);

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

  const loadEntries = useCallback(async (clientId: number) => {
    setLoadingEntries(true);

    try {
      const response = await fetch(`/api/progress?clientId=${clientId}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar progresso");
      }

      const data: ProgressEntry[] = await response.json();

      setEntries(data);
    } catch (loadError) {
      console.error("Erro ao carregar progresso:", loadError);
      setEntries([]);
      setError("Não foi possível carregar o progresso deste cliente.");
    } finally {
      setLoadingEntries(false);
    }
  }, []);

  useEffect(() => {
    if (selectedClientId !== null) {
      loadEntries(selectedClientId);
    } else {
      setEntries([]);
    }
  }, [selectedClientId, loadEntries]);

  const selectedClient =
    clients.find((client) => client.id === selectedClientId) ?? null;

  const availableMetrics = useMemo(
    () =>
      METRICS.filter((item) =>
        entries.some(
          (entry) => entry[item.key] !== null && entry[item.key] !== undefined,
        ),
      ),
    [entries],
  );

  useEffect(() => {
    if (
      availableMetrics.length > 0 &&
      !availableMetrics.some((item) => item.key === metric)
    ) {
      setMetric(availableMetrics[0].key);
    }
  }, [availableMetrics, metric]);

  const chartPoints = useMemo(
    () =>
      entries
        .filter(
          (entry) => entry[metric] !== null && entry[metric] !== undefined,
        )
        .map((entry) => ({
          label: formatShortDate(entry.date),
          value: entry[metric] as number,
        })),
    [entries, metric],
  );

  const activeMetric =
    METRICS.find((item) => item.key === metric) ?? METRICS[0];

  function lastWithValue(key: MetricKey) {
    for (let index = entries.length - 1; index >= 0; index -= 1) {
      const value = entries[index][key];

      if (value !== null && value !== undefined) {
        return value;
      }
    }

    return null;
  }

  function firstWithValue(key: MetricKey) {
    for (let index = 0; index < entries.length; index += 1) {
      const value = entries[index][key];

      if (value !== null && value !== undefined) {
        return value;
      }
    }

    return null;
  }

  const currentWeight = lastWithValue("weight");
  const firstWeight = firstWithValue("weight");
  const weightDelta =
    currentWeight !== null && firstWeight !== null
      ? currentWeight - firstWeight
      : null;

  const summaryCards = [
    {
      label: "Peso atual",
      value: currentWeight !== null ? `${formatNumber(currentWeight)} kg` : "—",
      hint:
        weightDelta !== null
          ? `${weightDelta > 0 ? "+" : ""}${formatNumber(weightDelta)} kg desde o início`
          : "Sem histórico",
      icon: Weight,
    },
    {
      label: "% Gordura",
      value: lastWithValue("bodyFat") !== null
        ? `${formatNumber(lastWithValue("bodyFat"))} %`
        : "—",
      hint: "Último registo",
      icon: Activity,
    },
    {
      label: "Cintura",
      value: lastWithValue("waist") !== null
        ? `${formatNumber(lastWithValue("waist"))} cm`
        : "—",
      hint: "Último registo",
      icon: Ruler,
    },
    {
      label: "Avaliações",
      value: String(entries.length),
      hint: selectedClient ? selectedClient.name : "—",
      icon: Target,
    },
  ];

  function handleFormChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (selectedClientId === null) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, clientId: selectedClientId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao guardar avaliação");
      }

      setForm(createEmptyForm());
      setShowForm(false);
      await loadEntries(selectedClientId);
    } catch (submitError) {
      console.error("Erro ao guardar avaliação:", submitError);
      setError("Não foi possível guardar a avaliação.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Tem certeza que deseja eliminar esta avaliação?")) {
      return;
    }

    try {
      const response = await fetch(`/api/progress/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao eliminar avaliação");
      }

      setEntries((current) =>
        current.filter((entry) => entry.id !== id),
      );
    } catch (deleteError) {
      console.error("Erro ao eliminar avaliação:", deleteError);
      setError("Não foi possível eliminar a avaliação.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-black outline-none focus:border-green-500";

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Desempenho</h1>

            <p className="mt-1 text-sm text-gray-500">
              Acompanhe a evolução física dos seus clientes.
            </p>
          </div>

          <button
            onClick={() => setShowForm((current) => !current)}
            disabled={selectedClientId === null}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Fechar" : "Nova avaliação"}
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
              Adicione clientes para começar a registar avaliações e acompanhar
              o progresso.
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
                onChange={(event) =>
                  setSelectedClientId(Number(event.target.value))
                }
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
                  Nova avaliação
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Preencha apenas os valores que avaliou.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Data
                    </label>

                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        handleFormChange("date", event.target.value)
                      }
                      required
                      className={inputClass}
                    />
                  </div>

                  {NUMERIC_FIELDS.map((field) => (
                    <div key={field.key}>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {field.label}{" "}
                        <span className="text-gray-400">({field.unit})</span>
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={form[field.key]}
                        onChange={(event) =>
                          handleFormChange(field.key, event.target.value)
                        }
                        placeholder="—"
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Notas
                  </label>

                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      handleFormChange("notes", event.target.value)
                    }
                    rows={2}
                    placeholder="Observações sobre a avaliação..."
                    className={inputClass}
                  />
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "A guardar..." : "Guardar avaliação"}
                  </button>
                </div>
              </form>
            )}

            {entries.length > 0 && (
              <>
                {/* CARTÕES DE RESUMO */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {summaryCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <div
                        key={card.label}
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {card.label}
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-900">
                              {card.value}
                            </p>
                          </div>

                          <div className="rounded-xl bg-green-100 p-3 text-green-600">
                            <Icon size={22} />
                          </div>
                        </div>

                        <p className="mt-4 text-xs text-gray-500">
                          {card.hint}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* GRÁFICO */}
                <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Evolução
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {activeMetric.label} ao longo do tempo
                      </p>
                    </div>

                    <select
                      value={metric}
                      onChange={(event) =>
                        setMetric(event.target.value as MetricKey)
                      }
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-black outline-none focus:border-green-500"
                    >
                      {availableMetrics.map((item) => (
                        <option key={item.key} value={item.key}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6">
                    {chartPoints.length > 0 ? (
                      <ProgressChart
                        points={chartPoints}
                        unit={activeMetric.unit}
                      />
                    ) : (
                      <p className="py-10 text-center text-sm text-gray-500">
                        Sem dados de {activeMetric.label.toLowerCase()} para
                        mostrar.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* HISTÓRICO */}
            <div className="mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">
                  Histórico de avaliações
                </h2>
              </div>

              {loadingEntries ? (
                <div className="px-6 py-12 text-center text-sm text-gray-500">
                  A carregar...
                </div>
              ) : entries.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Activity size={28} />
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    Nenhuma avaliação
                  </h3>

                  <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                    Registe a primeira avaliação de {selectedClient?.name} para
                    começar a acompanhar a evolução.
                  </p>

                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <Plus size={18} />
                    Nova avaliação
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px]">
                    <thead className="border-b bg-gray-50">
                      <tr>
                        {[
                          "Data",
                          "Peso (kg)",
                          "% Gordura",
                          "Peito (cm)",
                          "Cintura (cm)",
                          "Quadril (cm)",
                          "Braço (cm)",
                          "Coxa (cm)",
                          "Notas",
                          "",
                        ].map((heading, index) => (
                          <th
                            key={`${heading}-${index}`}
                            className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 ${
                              index === 9 ? "text-right" : "text-left"
                            }`}
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {[...entries].reverse().map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                            {formatFullDate(entry.date)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.weight)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.bodyFat)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.chest)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.waist)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.hip)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.arm)}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-600">
                            {formatNumber(entry.thigh)}
                          </td>

                          <td className="max-w-[200px] px-4 py-4 text-sm text-gray-500">
                            {entry.notes || "—"}
                          </td>

                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                              aria-label="Eliminar avaliação"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
