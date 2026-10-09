import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export type UpcomingAppointment = {
  id: number;
  clientName: string;
  type: string;
  date: string;
  time: string;
  isToday: boolean;
};

type DashboardUpcomingProps = {
  appointments: UpcomingAppointment[];
  subtitle?: string;
};

export default function DashboardUpcoming({
  appointments,
  subtitle = "Aulas agendadas para hoje",
}: DashboardUpcomingProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Próximas aulas
          </h2>

          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="rounded-xl bg-green-100 p-3 text-green-600">
          <CalendarDays size={22} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {appointments.length === 0 ? (
          <div className="rounded-xl bg-gray-50 p-8 text-center">
            <p className="text-sm text-gray-500">
              Ainda não há aulas agendadas.{" "}
              <Link
                href="/schedule/new"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Agendar agora
              </Link>
            </p>
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {appointment.clientName}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {appointment.type}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                <Clock size={16} />
                {appointment.isToday ? "Hoje" : appointment.date} ·{" "}
                {appointment.time}
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/schedule"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
      >
        Ver agenda completa
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
