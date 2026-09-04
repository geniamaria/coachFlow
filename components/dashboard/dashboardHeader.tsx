import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      
      {/* SAUDAÇÃO */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, Maria 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Aqui está o resumo do seu dia.
        </p>
      </div>

      {/* AÇÕES */}
      <div className="flex items-center gap-4">

        {/* PESQUISA */}
        <button
          className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Pesquisar"
        >
          <Search size={20} />
        </button>

        {/* NOTIFICAÇÕES */}
        <button
          className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Notificações"
        >
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-green-600" />
        </button>

        {/* PERFIL */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
          MG
        </div>

      </div>
    </header>
  );
}