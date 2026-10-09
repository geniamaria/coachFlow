"use client";

import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditClientPage() {
  const params = useParams();
  const id = Number(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  async function loadClient() {
    try {
      const response = await fetch(`/api/clients/${id}`);

      if (!response.ok) {
        throw new Error("Cliente não encontrado");
      }

      const client = await response.json();

      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone || "");
      setBirthDate(client.birthDate || "");
      setGoal(client.goal);
      setPlan(client.plan);
      setStatus(client.status);
      setNotes(client.notes || "");
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
    }
  }

  loadClient();
}, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          birthDate,
          goal,
          plan,
          status,
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao atualizar cliente");
      }

      alert("Cliente atualizado com sucesso!");

      window.location.href = "/clients";
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setError("Não foi possível atualizar o cliente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">

          <Link
            href="/clients"
            className="mb-4 inline-flex items-center gap-2 text-black font-medium text-gray-500 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Voltar para clientes
          </Link>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <UserPlus size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Editar Cliente
              </h1>

              <p className="mt-1 text-black text-gray-500">
                Atualize as informações do cliente.
              </p>
            </div>

          </div>

        </div>
      </header>

      {/* FORMULÁRIO */}
      <div className="mx-auto max-w-4xl px-6 py-8">

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
        >

          {/* INFORMAÇÕES PESSOAIS */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Informações pessoais
            </h2>

            <p className="mt-1 text-black text-gray-500">
              Atualize os dados básicos do cliente.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-black font-medium text-gray-700">
                Nome completo
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <div>
              <label className="text-black font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <div>
              <label className="text-black font-medium text-gray-700">
                Telefone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="text-black font-medium text-gray-700">
                Data de nascimento
              </label>

              <input
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

          </div>

          {/* TREINO */}
          <div className="mt-10 border-t pt-8">

            <h2 className="text-lg font-bold text-gray-900">
              Informações do treino
            </h2>

            <p className="mt-1 text-black text-gray-500">
              Atualize os objetivos e o plano do cliente.
            </p>

          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-black font-medium text-gray-700">
                Objetivo
              </label>

              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              >
                <option value="">Selecione o objetivo</option>
                <option value="Emagrecimento">
                  Emagrecimento
                </option>
                <option value="Ganho de massa muscular">
                  Ganho de massa muscular
                </option>
                <option value="Condicionamento físico">
                  Condicionamento físico
                </option>
                <option value="Aumento de força">
                  Aumento de força
                </option>
                <option value="Saúde e bem-estar">
                  Saúde e bem-estar
                </option>
              </select>
            </div>

            <div>
              <label className="text-black font-medium text-gray-700">
                Plano
              </label>

              <select
                value={plan}
                onChange={(event) => setPlan(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              >
                <option value="">Selecione o plano</option>
                <option value="Mensal">Mensal</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div>
              <label className="text-black font-medium text-gray-700">
                Estado
              </label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>

          </div>

          {/* OBSERVAÇÕES */}
          <div className="mt-6">

            <label className="text-black font-medium text-gray-700">
              Observações
            </label>

            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-black outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

          </div>

          {/* BOTÕES */}
          <div className="mt-8 flex justify-end gap-3 border-t pt-6">

            {error && (
              <p className="mr-auto self-center rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <Link
              href="/clients"
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-black font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-black font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "A guardar..." : "Guardar Alterações"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}