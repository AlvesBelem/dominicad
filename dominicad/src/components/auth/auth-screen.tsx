"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightCircle, Lock, Mail, UserPlus } from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface AuthScreenProps {
  defaultMode?: "login" | "register";
}

const ERROR_DICTIONARY: Record<string, string> = {
  "Invalid email or password": "E-mail ou senha incorretos.",
  "Invalid email": "Informe um e-mail válido.",
  "Password too short": "A senha precisa ter pelo menos 8 caracteres.",
  "Password too long": "A senha ultrapassou o limite permitido.",
  "User already exists. Use another email.": "Já existe um cadastro com este e-mail.",
  "Failed to create user": "Não foi possível concluir o cadastro. Tente novamente.",
  "Failed to create session": "Não foi possível iniciar a sessão. Tente novamente.",
  "Email not verified": "Confirme seu e-mail para continuar.",
  "User not found": "Credenciais não encontradas.",
};

const DEFAULT_ERROR_MESSAGE = "Não foi possível concluir sua solicitação. Tente novamente.";

const PLAN_OPTIONS = [
  { value: "free", label: "Inicial – Gratuito" },
  { value: "essential", label: "Essencial – R$ 69/mês" },
  { value: "advanced", label: "Avançado – Sob consulta" },
];

function translateError(message?: string | null) {
  if (!message) return DEFAULT_ERROR_MESSAGE;
  return ERROR_DICTIONARY[message] ?? message;
}

export function AuthScreen({ defaultMode = "login" }: AuthScreenProps) {
  const router = useRouter();
  const sessionState = authClient.useSession();
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLogin = mode === "login";

  useEffect(() => {
    if (sessionState.data?.session) {
      router.replace("/dashboard");
    }
  }, [sessionState.data, router]);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  useEffect(() => {
    setErrorMessage(null);
  }, [mode]);

  const planOptions = useMemo(() => PLAN_OPTIONS, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const churchName = String(formData.get("church") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const plan = String(formData.get("plan") ?? "free");

    if (!email || !password || (!isLogin && !name)) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (!result.data) {
          setErrorMessage(translateError(result.error?.message ?? result.error?.statusText));
          setIsSubmitting(false);
          return;
        }
      } else {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
          churchName: churchName || undefined,
          teacherName: name,
          plan,
        });

        if (!result.data) {
          setErrorMessage(translateError(result.error?.message ?? result.error?.statusText));
          setIsSubmitting(false);
          return;
        }
      }

      form.reset();
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(translateError(error.message));
      } else {
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

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
              disabled={isSubmitting}
            >
              Entrar
            </button>
            <button
              className={`flex-1 rounded-full py-2 transition ${
                !isLogin ? "bg-slate-950 text-white shadow-inner shadow-emerald-500/20" : "hover:text-white"
              }`}
              onClick={() => setMode("register")}
              type="button"
              disabled={isSubmitting}
            >
              Criar conta
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-emerald-500/10">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {!isLogin && (
                <div>
                  <label htmlFor="church" className="mb-2 block text-sm font-medium text-slate-200">
                    Nome da igreja
                  </label>
                  <input
                    id="church"
                    name="church"
                    type="text"
                    placeholder="Igreja Batista Esperança"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    disabled={isSubmitting}
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
                    name="email"
                    type="email"
                    placeholder="seuemail@igreja.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    required
                    disabled={isSubmitting}
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
                      name="name"
                      type="text"
                      placeholder="Maria Andrade"
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      required
                      disabled={isSubmitting}
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
                    name="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    minLength={8}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-10 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    required
                    disabled={isSubmitting}
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
                    name="plan"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    defaultValue="free"
                    disabled={isSubmitting}
                  >
                    {planOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isSubmitting}
              >
                {isSubmitting ? (isLogin ? "Entrando..." : "Criando conta...") : isLogin ? "Entrar" : "Criar conta"}
                <ArrowRightCircle className="h-4 w-4" />
              </button>
              {errorMessage && (
                <p className="text-center text-xs font-medium text-rose-300" role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
            {isLogin ? (
              <p className="mt-6 text-center text-xs text-slate-400">
                Ainda não possui conta?{" "}
                <Link href="/register" className="font-semibold text-emerald-300 hover:text-emerald-200">
                  Cadastre-se gratuitamente
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-center text-xs text-slate-400">
                Ao criar a conta você concorda com nossos{" "}
                <a href="#" className="font-semibold text-emerald-300 hover:text-emerald-200">
                  termos de uso
                </a>{" "}
                e{" "}
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
