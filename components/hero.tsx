
import Link from "next/link";
import { ArrowRight, CalendarDays, Users, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">

        {/* CONTEÚDO */}
        <div>
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Gestão inteligente para Personal Trainers
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Organize os seus treinos.
            <span className="block text-green-600">
              Acompanhe os seus clientes.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            O CoachFlow ajuda personal trainers a gerir clientes,
            organizar aulas, acompanhar o desempenho e manter
            tudo num só lugar.
          </p>

          {/* BOTÕES */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Começar Agora
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#funcionalidades"
              className="rounded-full border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Ver Funcionalidades
            </Link>
          </div>

          {/* PEQUENOS INDICADORES */}
          <div className="mt-10 flex flex-wrap gap-8">

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 text-green-600">
                <Users size={20} />
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Clientes
                </p>
                <p className="text-sm text-gray-500">
                  Organizados
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 text-green-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Agenda
                </p>
                <p className="text-sm text-gray-500">
                  Sempre organizada
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 text-green-600">
                <TrendingUp size={20} />
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Desempenho
                </p>
                <p className="text-sm text-gray-500">
                  Acompanhe a evolução
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* VISUAL DO DASHBOARD */}
        <div className="relative">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">

            {/* TOPO */}
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <p className="text-sm text-gray-500">
                  Dashboard
                </p>

                <h2 className="text-xl font-bold text-gray-900">
                  Olá, Maria 👋
                </h2>
              </div>

              <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Online
              </div>
            </div>

            {/* ESTATÍSTICAS */}
            <div className="mt-6 grid grid-cols-3 gap-4">

              <div className="rounded-xl bg-gray-50 p-4">
                <Users className="text-green-600" size={20} />
                <p className="mt-3 text-2xl font-bold text-gray-900">
                  24
                </p>
                <p className="text-xs text-gray-500">
                  Clientes
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <CalendarDays className="text-green-600" size={20} />
                <p className="mt-3 text-2xl font-bold text-gray-900">
                  8
                </p>
                <p className="text-xs text-gray-500">
                  Aulas hoje
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <TrendingUp className="text-green-600" size={20} />
                <p className="mt-3 text-2xl font-bold text-gray-900">
                  86%
                </p>
                <p className="text-xs text-gray-500">
                  Progresso
                </p>
              </div>

            </div>

            {/* PRÓXIMAS AULAS */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">
                  Próximas aulas
                </h3>

                <span className="text-sm text-green-600">
                  Ver todas
                </span>
              </div>

              <div className="mt-4 space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Ana Paulo
                    </p>
                    <p className="text-sm text-gray-500">
                      Treino de força
                    </p>
                  </div>

                  <span className="font-semibold text-green-600">
                    09:00
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      João Manuel
                    </p>
                    <p className="text-sm text-gray-500">
                      Treino funcional
                    </p>
                  </div>

                  <span className="font-semibold text-green-600">
                    11:00
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Carlos Silva
                    </p>
                    <p className="text-sm text-gray-500">
                      Cardio
                    </p>
                  </div>

                  <span className="font-semibold text-green-600">
                    15:00
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

