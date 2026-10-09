import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { ReactNode } from "react";

type ComingSoonProps = {
  title: string;
  description: string;
  icon: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export default function ComingSoon({
  title,
  description,
  icon,
  backHref = "/dashboard",
  backLabel = "Voltar ao dashboard",
}: ComingSoonProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          {icon}
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">{title}</h1>

        <p className="mt-2 text-gray-500">{description}</p>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-semibold text-yellow-700">
          <Clock size={16} />
          Em breve
        </span>

        <div className="mt-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
