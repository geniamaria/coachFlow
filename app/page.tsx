import Link from "next/link";
import { Dumbbell } from "lucide-react";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Features from "@/components/features";
import HowItWorks from "@/components/howItworks";
import CallToAction from "@/components/callToAction";

export default function Home() {
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

            <Link href="/workouts" className="transition hover:text-green-600">
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
      <Hero />

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
