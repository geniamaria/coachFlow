import { TrendingUp, Target, ArrowUpRight } from "lucide-react";

type DashboardPerformanceProps = {
  activeClients: number;
  totalClients: number;
  clientsWithPlan: number;
  completedSessions: number;
  totalSessions: number;
};

function percentage(part: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Math.round((part / total) * 100);
}

export default function DashboardPerformance({
  activeClients,
  totalClients,
  clientsWithPlan,
  completedSessions,
  totalSessions,
}: DashboardPerformanceProps) {
  const activePercentage = percentage(activeClients, totalClients);
  const planPercentage = percentage(clientsWithPlan, totalClients);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* CABEÇALHO */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Resumo de desempenho
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Progresso geral dos seus clientes
          </p>
        </div>

        <div className="rounded-xl bg-green-100 p-3 text-green-600">
          <TrendingUp size={22} />
        </div>
      </div>

      {/* CLIENTES ATIVOS */}
      <div className="mt-8">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-green-600" />

            <span className="text-sm font-medium text-gray-700">
              Clientes ativos
            </span>
          </div>

          <span className="font-bold text-gray-900">
            {activePercentage}%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-600"
            style={{ width: `${activePercentage}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-gray-500">
          {activeClients} de {totalClients} clientes ativos
        </p>

      </div>

      {/* COBERTURA DE PLANOS */}
      <div className="mt-8">

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Cobertura de planos de treino
          </span>

          <span className="font-bold text-gray-900">
            {planPercentage}%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-600"
            style={{ width: `${planPercentage}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-gray-500">
          {clientsWithPlan} de {totalClients} clientes com plano
        </p>

      </div>

      {/* RESULTADO */}
      <div className="mt-8 flex items-center justify-between rounded-xl bg-green-50 p-4">

        <div>
          <p className="text-sm font-semibold text-gray-900">
            Sessões concluídas
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {totalSessions > 0
              ? `${completedSessions} de ${totalSessions} sessões concluídas.`
              : "Ainda não há sessões registadas."}
          </p>
        </div>

        <ArrowUpRight className="text-green-600" size={22} />

      </div>

    </div>
  );
}
