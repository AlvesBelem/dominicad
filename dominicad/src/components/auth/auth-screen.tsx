"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightCircle, Lock, Mail, UserPlus } from "lucide-react";

interface AuthScreenProps {
  defaultMode?: "login" | "register";
}

export function AuthScreen({ defaultMode = "login" }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-12 px-4 py-16 sm:flex-row sm:px-6">
        <div className="max-w-xl space-y-6 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
            {isLogin ? "Bem-vindo de volta" : "Comece agora"}
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {isLogin ? "Acesse sua caderneta digital" : "Crie sua conta DominiCad"}
          </h1>
          <p className="text-base text-slate-300">
            {isLogin
              ? "Informe suas credenciais para acessar dashboards, cadernetas e relatórios da sua Escola Dominical."
              : "Leva menos de 2 minutos para configurar o workspace da sua igreja e começar a registrar os domingos."}
          </p>
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-6 text-left text-sm text-slate-300">
            <p className="font-semibold text-white">Recursos incluídos:</p>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li>• Cadastramento ilimitado de turmas e alunos.</li>
              <li>• Dashboard com métricas semanais, trimestrais e anuais.</li>
              <li>• Exportação em PDF e compartilhamento com a diretoria.</li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="flex items-center justify-between rounded-full border border-slate-800 bg-slate-900/60 p-1 text-sm font-medium text-slate-400">
            <button
              className={`flex-1 rounded-full py-2 transition ${
                isLogin ? "bg-slate-950 text-white shadow-inner shadow-emerald-500/20" : "hover:text-white"
              }`}
              onClick={() => setMode("login")}
              type="button"
            >
              Entrar
            </button>
            <button
              className={`flex-1 rounded-full py-2 transition ${
                !isLogin ? "bg-slate-950 text-white shadow-inner shadow-emerald-500/20" : "hover:text-white"
              }`}
              onClick={() => setMode("register")}
              type="button"
            >
              Criar conta
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-emerald-500/10">
            <form className="space-y-5">
              {!isLogin && (
                <div>
                  <label htmlFor="church" className="mb-2 block text-sm font-medium text-slate-200">
                    Nome da igreja
                  </label>
                  <input
                    id="church"
                    type="text"
                    placeholder="Igreja Batista Esperança"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    placeholder="seuemail@igreja.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                    Seu nome
                  </label>
                  <div className="relative">
                    <UserPlus className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="name"
                      type="text"
                      placeholder="Maria Andrade"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              {!isLogin && (
                <div>
                  <label htmlFor="plan" className="mb-2 block text-sm font-medium text-slate-200">
                    Plano desejado
                  </label>
                  <select
                    id="plan"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    defaultValue="free"
                  >
                    <option value="free">Inicial – Gratuito</option>
                    <option value="essential">Essencial – R$ 69/mês</option>
                    <option value="advanced">Avançado – Sob consulta</option>
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                {isLogin ? "Entrar" : "Criar conta"}
                <ArrowRightCircle className="h-4 w-4" />
              </button>
            </form>
            {isLogin ? (
              <p className="mt-6 text-center text-xs text-slate-400">
                Ainda não possui conta? {" "}
                <Link href="/register" className="font-semibold text-emerald-300 hover:text-emerald-200">
                  Cadastre-se gratuitamente
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-center text-xs text-slate-400">
                Ao criar a conta você concorda com nossos {" "}
                <a href="#" className="font-semibold text-emerald-300 hover:text-emerald-200">
                  termos de uso
                </a>{" "}
                e {" "}
                <a href="#" className="font-semibold text-emerald-300 hover:text-emerald-200">
                  política de privacidade
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
