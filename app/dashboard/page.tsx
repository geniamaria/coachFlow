import DashboardHeader from "@/components/dashboard/dashboardHeader";
import DashboardSidebar from "@/components/dashboard/dashboardSideBar";
import DashboardStats from "@/components/dashboard/dashboardStatus";
import DashboardUpcoming from "@/components/dashboard/dashboardUpcoming";
import DashboardPerformance from "@/components/dashboard/dashboardPerformance";

export default function Dashboard() {
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
          <DashboardStats />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <DashboardUpcoming />
            <DashboardPerformance />
          </div>
        </div>
      </div>
    </main>
  );
}
