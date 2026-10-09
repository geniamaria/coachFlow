import { connection } from "next/server";
import DashboardHeader from "@/components/dashboard/dashboardHeader";
import DashboardSidebar from "@/components/dashboard/dashboardSideBar";
import DashboardStats from "@/components/dashboard/dashboardStatus";
import DashboardUpcoming, {
  type UpcomingAppointment,
} from "@/components/dashboard/dashboardUpcoming";
import DashboardPerformance from "@/components/dashboard/dashboardPerformance";
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

async function getDashboardData() {
  const today = todayISO();

  try {
    // As queries são executadas sequencialmente (e não em Promise.all) porque
    // o pooler de ligações do Prisma Postgres colide os nomes das prepared
    // statements quando várias queries correm em paralelo (erro 42P05).
    const clientsCount = await prisma.client.count();
    const activeClientsCount = await prisma.client.count({
      where: { status: "Ativo" },
    });
    const trainingsCount = await prisma.training.count();
    const clientsWithPlan = await prisma.training.findMany({
      distinct: ["clientId"],
      select: { clientId: true },
    });
    const todaySessions = await prisma.schedule.findMany({
      where: { date: today, status: { not: "Cancelado" } },
      orderBy: { time: "asc" },
      include: { client: { select: { name: true } } },
    });
    const upcomingSessions = await prisma.schedule.findMany({
      where: { date: { gte: today }, status: { not: "Cancelado" } },
      orderBy: [{ date: "asc" }, { time: "asc" }],
      take: 4,
      include: { client: { select: { name: true } } },
    });
    const upcomingSessionsCount = await prisma.schedule.count({
      where: { date: { gte: today }, status: { not: "Cancelado" } },
    });
    const totalSessions = await prisma.schedule.count();
    const completedSessions = await prisma.schedule.count({
      where: { status: "Concluído" },
    });

    const showToday = todaySessions.length > 0;

    const appointments: UpcomingAppointment[] = (
      showToday ? todaySessions : upcomingSessions
    )
      .slice(0, 4)
      .map((schedule) => ({
        id: schedule.id,
        clientName: schedule.client.name,
        type: schedule.type,
        date: formatShortDate(schedule.date),
        time: schedule.time,
        isToday: schedule.date === today,
      }));

    return {
      clientsCount,
      activeClientsCount,
      todaySessionsCount: todaySessions.length,
      trainingsCount,
      upcomingSessionsCount,
      appointments,
      upcomingSubtitle: showToday
        ? "Aulas agendadas para hoje"
        : "Próximas aulas agendadas",
      clientsWithPlanCount: clientsWithPlan.length,
      totalSessions,
      completedSessions,
    };
  } catch (error) {
    console.error("Erro ao carregar dados do dashboard:", error);

    return {
      clientsCount: 0,
      activeClientsCount: 0,
      todaySessionsCount: 0,
      trainingsCount: 0,
      upcomingSessionsCount: 0,
      appointments: [] as UpcomingAppointment[],
      upcomingSubtitle: "Aulas agendadas para hoje",
      clientsWithPlanCount: 0,
      totalSessions: 0,
      completedSessions: 0,
    };
  }
}

export default async function Dashboard() {
  await connection();

  const data = await getDashboardData();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* CONTEÚDO */}
      <div className="ml-64">
        {/* HEADER */}
        <DashboardHeader />

        {/* ÁREA PRINCIPAL */}
        <div className="p-8">
          {/* ESTATÍSTICAS */}
          <DashboardStats
            clientsCount={data.clientsCount}
            activeClientsCount={data.activeClientsCount}
            todaySessionsCount={data.todaySessionsCount}
            trainingsCount={data.trainingsCount}
            upcomingSessionsCount={data.upcomingSessionsCount}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <DashboardUpcoming
              appointments={data.appointments}
              subtitle={data.upcomingSubtitle}
            />
            <DashboardPerformance
              activeClients={data.activeClientsCount}
              totalClients={data.clientsCount}
              clientsWithPlan={data.clientsWithPlanCount}
              completedSessions={data.completedSessions}
              totalSessions={data.totalSessions}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
