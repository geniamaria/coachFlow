import Link from "next/link";
import { connection } from "next/server";
import { Dumbbell } from "lucide-react";
import Hero, {
  type HeroAppointment,
  type HeroStats,
} from "@/components/hero";
import Footer from "@/components/footer";
import Features from "@/components/features";
import HowItWorks from "@/components/howItworks";
import CallToAction from "@/components/callToAction";
import { prisma } from "@/lib/prisma";

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function formatShortDate(date: string) {
  const [, month, day] = date.split("-");

  return `${day}/${month}`;
}

async function getHeroData() {
  const today = todayISO();
  const fallback = {
    stats: {
      clientsCount: 0,
      todaySessionsCount: 0,
      progressPercent: 0,
    } satisfies HeroStats,
    appointments: [] as HeroAppointment[],
  };

  try {
    // As queries são executadas sequencialmente (e não em Promise.all) porque
    // o pooler de ligações do Prisma Postgres colide os nomes das prepared
    // statements quando várias queries correm em paralelo (erro 42P05).
    const clientsCount = await prisma.client.count();
    const todaySessions = await prisma.schedule.findMany({
      where: { date: today, status: { not: "Cancelado" } },
      orderBy: { time: "asc" },
      include: { client: { select: { name: true } } },
    });
    const upcomingSessions = await prisma.schedule.findMany({
      where: { date: { gte: today }, status: { not: "Cancelado" } },
      orderBy: [{ date: "asc" }, { time: "asc" }],
      take: 3,
      include: { client: { select: { name: true } } },
    });
    const totalSessions = await prisma.schedule.count();
    const completedSessions = await prisma.schedule.count({
      where: { status: "Concluído" },
    });

    const showToday = todaySessions.length > 0;
    const progressPercent =
      totalSessions > 0
        ? Math.round((completedSessions / totalSessions) * 100)
        : 0;

    const appointments: HeroAppointment[] = (
      showToday ? todaySessions : upcomingSessions
    )
      .slice(0, 3)
      .map((schedule) => ({
        id: schedule.id,
        clientName: schedule.client.name,
        type: schedule.type,
        date: formatShortDate(schedule.date),
        time: schedule.time,
        isToday: schedule.date === today,
      }));

    return {
      stats: {
        clientsCount,
        todaySessionsCount: todaySessions.length,
        progressPercent,
      } satisfies HeroStats,
      appointments,
    };
  } catch (error) {
    console.error("Erro ao carregar dados da página inicial:", error);

    return fallback;
  }
}

export default async function Home() {
  await connection();

  const { stats, appointments } = await getHeroData();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo / Nome do treinador */}
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-full bg-green-600 p-2 text-white">
              <Dumbbell size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">CoachFlow</h1>
              <p className="text-sm text-gray-500">
                Maria Genia • Personal Trainer
              </p>
            </div>
          </Link>

          {/* Navegação */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
            <Link href="/" className="transition hover:text-green-600">
              Home
            </Link>

            <Link href="/clients" className="transition hover:text-green-600">
              Clientes
            </Link>

            <Link href="/schedule" className="transition hover:text-green-600">
              Agenda
            </Link>

            <Link href="/training" className="transition hover:text-green-600">
              Planos
            </Link>

            <Link href="/progress" className="transition hover:text-green-600">
              Desempenho
            </Link>

            <Link href="/payments" className="transition hover:text-green-600">
              Pagamentos
            </Link>

            <Link href="/contacts" className="transition hover:text-green-600">
              Contactos
            </Link>
          </nav>

          {/* Botão */}
          <Link
            href="/dashboard"
            className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* HERO  */}
      <Hero stats={stats} appointments={appointments} />

      {/* FUNCIONALIDADES */}
      <Features />

      {/* COMO FUNCIONA */}
      <HowItWorks />

      {/* CALL TO ACTION */}
      <CallToAction />
      
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
