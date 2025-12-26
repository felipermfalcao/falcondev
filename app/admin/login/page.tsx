"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        const data = await response.json();
        setError(data.error || "Senha incorreta");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Login
          </h1>
          <p className="text-zinc-400">
            Entre com a senha para acessar o painel
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-6">
            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Digite a senha"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Erro */}
              {error && (
                <p className="mt-2 text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Dica em dev */}
              {process.env.NODE_ENV === "development" && (
                <p className="mt-2 text-xs text-zinc-500">
                  💡 Modo desenvolvimento: qualquer senha funciona (configure ADMIN_PASSWORD_HASH em produção)
                </p>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all text-white font-medium disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>
            Esqueceu a senha? Configure ADMIN_PASSWORD_HASH no arquivo .env
          </p>
        </div>
      </div>
    </div>
  );
}
