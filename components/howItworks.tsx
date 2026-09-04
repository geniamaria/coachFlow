import { UserPlus, Dumbbell, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Cadastre o cliente",
    description:
      "Adicione os dados do cliente e tenha todas as suas informações organizadas num só lugar.",
  },
  {
    number: "02",
    icon: Dumbbell,
    title: "Crie o plano de treino",
    description:
      "Crie planos de treino personalizados de acordo com os objetivos de cada cliente.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Acompanhe o progresso",
    description:
      "Registe resultados e acompanhe a evolução dos seus clientes ao longo do tempo.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* TÍTULO */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Como funciona
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Comece a organizar o seu trabalho em poucos passos
          </h2>

          <p className="mt-4 text-gray-600">
            O CoachFlow foi pensado para tornar a gestão dos seus clientes
            simples, rápida e organizada.
          </p>
        </div>

        {/* PASSOS */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">

                {/* NÚMERO */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                  {step.number}
                </div>

                {/* ÍCONE */}
                <div className="mx-auto mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                  <Icon size={24} />
                </div>

                {/* TÍTULO */}
                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                {/* DESCRIÇÃO */}
                <p className="mx-auto mt-3 max-w-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}