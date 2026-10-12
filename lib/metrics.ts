export type MetricKey =
  | "weight"
  | "bodyFat"
  | "chest"
  | "waist"
  | "hip"
  | "arm"
  | "thigh";

export type MetricDefinition = {
  key: MetricKey;
  label: string;
  unit: string;
};

export const METRICS: MetricDefinition[] = [
  { key: "weight", label: "Peso", unit: "kg" },
  { key: "bodyFat", label: "% Gordura", unit: "%" },
  { key: "chest", label: "Peito", unit: "cm" },
  { key: "waist", label: "Cintura", unit: "cm" },
  { key: "hip", label: "Quadril", unit: "cm" },
  { key: "arm", label: "Braço", unit: "cm" },
  { key: "thigh", label: "Coxa", unit: "cm" },
];

export function getMetric(key: string | null | undefined) {
  return METRICS.find((metric) => metric.key === key) ?? null;
}
