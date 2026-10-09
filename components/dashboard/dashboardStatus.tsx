import { Users, CalendarDays, Dumbbell, CalendarClock } from "lucide-react";

type DashboardStatsProps = {
  clientsCount: number;
  activeClientsCount: number;
  todaySessionsCount: number;
  trainingsCount: number;
  upcomingSessionsCount: number;
};

export default function DashboardStats({
  clientsCount,
  activeClientsCount,
  todaySessionsCount,
  trainingsCount,
  upcomingSessionsCount,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Clientes",
      value: String(clientsCount),
      description: `${activeClientsCount} ativos`,
      icon: Users,
    },
    {
      title: "Aulas hoje",
      value: String(todaySessionsCount),
      description: "Sessões agendadas para hoje",
      icon: CalendarDays,
    },
    {
      title: "Planos de treino",
      value: String(trainingsCount),
      description: "Planos criados",
      icon: Dumbbell,
    },
    {
      title: "Sessões futuras",
      value: String(upcomingSessionsCount),
      description: "A partir de hoje",
      icon: CalendarClock,
    },
  ];

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
