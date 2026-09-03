import {
  Users,
  CalendarDays,
  Dumbbell,
  TrendingUp,
  Target,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Gestão de Clientes",
    description:
      "Cadastre, organize e acompanhe todas as informações dos seus clientes.",
  },
  {
    icon: CalendarDays,
    title: "Gestão da Agenda",
    description:
      "Organize as suas aulas e mantenha os seus horários sempre sob controlo.",
  },
  {
    icon: Dumbbell,
    title: "Planos de Treino",
    description:
      "Crie planos de treino personalizados para cada cliente.",
  },
  {
    icon: TrendingUp,
    title: "Desempenho",
    description:
      "Acompanhe a evolução dos seus clientes através dos seus resultados.",
  },
  {
    icon: Target,
    title: "Metas",
    description:
      "Defina objetivos e acompanhe o progresso de cada cliente.",
  },
  {
    icon: CreditCard,
    title: "Pagamentos",
    description:
      "Registe pagamentos e acompanhe os valores pendentes dos seus clientes.",
  },
];

export default function Features() {
  return (
    <section id="funcionalidades" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* TÍTULO */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Funcionalidades
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Tudo o que precisa para gerir os seus clientes
          </h2>

          <p className="mt-4 text-gray-600">
            O CoachFlow reúne as principais ferramentas para facilitar
            o seu trabalho como Personal Trainer.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* ÍCONE */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Icon size={24} />
                </div>

                {/* TÍTULO */}
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="mt-3 leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}