import { Metadata } from "next";
import Link from "next/link";
import { AuthScreen } from "@/components/auth/auth-screen";

export const metadata: Metadata = {
  title: "Entrar • DominiCad",
};

export default function LoginPage() {
  return (
    <>
      <div className="absolute left-4 top-4 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400 hover:text-emerald-200"
        >
          ← Voltar para a landing
        </Link>
      </div>
      <AuthScreen defaultMode="login" />
    </>
  );
}
