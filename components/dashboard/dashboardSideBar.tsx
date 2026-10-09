import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Dumbbell,
  TrendingUp,
  Target,
  CreditCard,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Agenda",
    href: "/schedule",
    icon: CalendarDays,
  },
  {
    label: "Planos de Treino",
    href: "/training",
    icon: Dumbbell,
  },
  {
    label: "Desempenho",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    label: "Metas",
    href: "/goals",
    icon: Target,
  },
  {
    label: "Pagamentos",
    href: "/payments",
    icon: CreditCard,
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r bg-white">

      {/* LOGO */}
      <div className="flex h-20 items-center border-b px-6">
        <div>
          <h1 className="text-xl font-bold text-green-600">
            CoachFlow
          </h1>

          <p className="text-xs text-gray-500">
            Personal Trainer
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-600"
              >
                <Icon size={20} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* PERFIL */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
            MG
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              Maria Genia
            </p>

            <p className="text-xs text-gray-500">
              Personal Trainer
            </p>
          </div>
        </div>
      </div>

    </aside>
  );
}