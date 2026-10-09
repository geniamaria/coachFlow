import Link from "next/link";
import { Dumbbell, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* PARTE PRINCIPAL */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* LOGO / DESCRIÇÃO */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-full bg-green-600 p-2 text-white">
                <Dumbbell size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  CoachFlow
                </h2>

                <p className="text-xs text-gray-500">
                  Maria Genia • Personal Trainer
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Uma plataforma simples e inteligente para ajudar
              personal trainers a organizar clientes, treinos,
              agenda e desempenho.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Navegação
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-green-600">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/clients" className="hover:text-green-600">
                  Clientes
                </Link>
              </li>

              <li>
                <Link href="/schedule" className="hover:text-green-600">
                  Agenda
                </Link>
              </li>

              <li>
                <Link href="/training" className="hover:text-green-600">
                  Planos de Treino
                </Link>
              </li>
            </ul>
          </div>

          {/* RECURSOS */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Recursos
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-500">
              <li>
                <Link href="/progress" className="hover:text-green-600">
                  Desempenho
                </Link>
              </li>

              <li>
                <Link href="/payments" className="hover:text-green-600">
                  Pagamentos
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="hover:text-green-600">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/contacts" className="hover:text-green-600">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACTOS */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Contactos
            </h3>

            <div className="mt-4 space-y-4 text-sm text-gray-500">

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-green-600" />
                <span>contacto@coachflow.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-green-600" />
                <span>+258 84 000 0000</span>
              </div>

            </div>
          </div>
        </div>

        {/* LINHA FINAL */}
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 CoachFlow. Todos os direitos reservados.
          </p>

          <p>
            Desenvolvido por{" "}
            <span className="font-semibold text-gray-700">
              Maria Genia
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}