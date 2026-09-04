import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const appointments = [
  {
    name: "Ana Paulo",
    type: "Treino de força",
    time: "09:00",
  },
  {
    name: "João Manuel",
    type: "Treino funcional",
    time: "11:00",
  },
  {
    name: "Carlos Silva",
    type: "Cardio",
    time: "15:00",
  },
];

export default function DashboardUpcoming() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Próximas aulas
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Aulas agendadas para hoje
          </p>
        </div>

        <div className="rounded-xl bg-green-100 p-3 text-green-600">
          <CalendarDays size={22} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.name}
            className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
          >
            <div>
              <p className="font-semibold text-gray-900">
                {appointment.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {appointment.type}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
              <Clock size={16} />
              {appointment.time}
            </div>
          </div>
        ))}
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