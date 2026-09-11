"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dumbbell, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Dumbbell size={28} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            CoachFlow
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Entre na sua conta
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-black font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@coachflow.com"
                required
                className="w-full rounded-lg border px-3 py-2.5 text-black outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-black font-medium text-gray-700">
                Senha
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
                required
                className="w-full rounded-lg border px-3 py-2.5 text-black outline-none focus:border-green-500"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && <Loader2 size={17} className="animate-spin" />}
              {loading ? "A entrar..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-black text-gray-500 hover:text-gray-900"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}