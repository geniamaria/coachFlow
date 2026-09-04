import { TrendingUp, Target, ArrowUpRight } from "lucide-react";

export default function DashboardPerformance() {
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

      {/* PROGRESSO */}
      <div className="mt-8">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-green-600" />

            <span className="text-sm font-medium text-gray-700">
              Metas alcançadas
            </span>
          </div>

          <span className="font-bold text-gray-900">
            72%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[72%] rounded-full bg-green-600" />
        </div>

      </div>

      {/* PROGRESSO GERAL */}
      <div className="mt-8">

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Progresso geral
          </span>

          <span className="font-bold text-gray-900">
            86%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-[86%] rounded-full bg-green-600" />
        </div>

      </div>

      {/* RESULTADO */}
      <div className="mt-8 flex items-center justify-between rounded-xl bg-green-50 p-4">

        <div>
          <p className="text-sm font-semibold text-gray-900">
            Evolução positiva
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Os seus clientes estão a progredir bem.
          </p>
        </div>

        <ArrowUpRight className="text-green-600" size={22} />

      </div>

    </div>
  );
}