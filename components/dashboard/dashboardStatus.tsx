import {
  Users,
  CalendarDays,
  CreditCard,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Clientes",
    value: "24",
    description: "Clientes ativos",
    icon: Users,
  },
  {
    title: "Aulas hoje",
    value: "8",
    description: "Sessões agendadas",
    icon: CalendarDays,
  },
  {
    title: "Pagamentos",
    value: "3",
    description: "Pagamentos pendentes",
    icon: CreditCard,
  },
  {
    title: "Receita",
    value: "45.000 MT",
    description: "Receita este mês",
    icon: DollarSign,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Icon size={22} />
              </div>

            </div>

            <p className="mt-4 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}