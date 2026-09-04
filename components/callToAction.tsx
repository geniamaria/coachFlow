import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-green-600 px-6 py-14 text-center shadow-lg md:px-12">

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Tenha tudo sob controlo num só lugar
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-50">
            Organize os seus clientes, planos de treino, agenda e
            desempenho com o CoachFlow.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-gray-100"
          >
            Começar Agora
            <ArrowRight size={18} />
          </Link>

        </div>
      </div>
    </section>
  );
}