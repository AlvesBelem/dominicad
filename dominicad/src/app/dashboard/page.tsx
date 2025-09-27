import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, LineChart, NotepadText, PlusCircle, Users } from "lucide-react";
import { classSummary, pendingFollowUps, weeklyAttendance } from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Dashboard • DominiCad",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-base font-bold text-slate-950">
              DC
            </span>
            <div>
              <p className="text-sm font-medium text-emerald-200">DominiCad</p>
              <p className="text-xs text-slate-400">Igreja Batista Esperança • 1º Trimestre/2025</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Link
              href="/caderneta"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 transition hover:border-emerald-400 hover:text-emerald-200"
            >
              <NotepadText className="h-4 w-4" />
              Acessar caderneta
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 transition hover:border-emerald-400 hover:text-emerald-200"
            >
              Voltar à landing
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total de alunos" value="132" description="Somando todos os workspaces de professores" />
          <StatCard title="Presença média" value="89%" description="Últimos 3 meses" highlight />
          <StatCard title="Visitantes no mês" value="22" description="+7 em relação ao mês anterior" />
          <StatCard title="Oferta acumulada" value="R$ 8.450" description="Meta trimestral atingida" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Presença semanal</h2>
                <p className="text-sm text-slate-400">Resumo do mês atual por domingo</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-emerald-400 hover:text-emerald-200">
                <Download className="h-4 w-4" />
                Exportar CSV
              </button>
            </header>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {weeklyAttendance.map((item) => (
                <div key={item.date} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Domingo • {item.date}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.present} presentes</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                    <span>Visitantes: {item.visitors}</span>
                    <span>Oferta: R$ {item.offerings}</span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.min(item.present * 2, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6">
              <h2 className="text-lg font-semibold text-white">Status do plano</h2>
              <p className="mt-2 text-sm text-emerald-100">Essencial – válido até 30/06/2025</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-slate-200">
                <ArrowRight className="h-4 w-4" />
                Gerenciar assinatura
              </button>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">Acompanhamentos pendentes</h2>
              <ul className="mt-4 space-y-4 text-sm text-slate-300">
                {pendingFollowUps.map((follow) => (
                  <li key={follow.student} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-base font-semibold text-white">{follow.student}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{follow.class}</p>
                    <p className="mt-2 text-xs text-slate-400">Última presença: {follow.lastPresence}</p>
                    <p className="mt-1 text-xs text-slate-400">Contato: {follow.contact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Turmas</h2>
                <p className="text-sm text-slate-400">Indicadores do trimestre atual</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-emerald-400 hover:text-emerald-200">
                <PlusCircle className="h-4 w-4" />
                Nova turma
              </button>
            </header>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
              <table className="w-full divide-y divide-slate-800 text-sm">
                <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Classe</th>
                    <th className="px-4 py-3 font-medium">Alunos</th>
                    <th className="px-4 py-3 font-medium">Presença média</th>
                    <th className="px-4 py-3 font-medium">Nota média</th>
                    <th className="px-4 py-3 font-medium">Oferta média</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {classSummary.map((classe) => (
                    <tr key={classe.name} className="transition hover:bg-slate-950/80">
                      <td className="px-4 py-3 font-medium text-white">{classe.name}</td>
                      <td className="px-4 py-3">{classe.students}</td>
                      <td className="px-4 py-3 text-emerald-200">{Math.round(classe.attendanceRate * 100)}%</td>
                      <td className="px-4 py-3">{classe.averageScore.toFixed(1)}</td>
                      <td className="px-4 py-3">R$ {classe.offeringAvg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">Resumo anual</h2>
            <div className="mt-6 space-y-5 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Crescimento de alunos</p>
                <div className="mt-2 flex items-end gap-2">
                  {[60, 72, 80, 92].map((value, index) => (
                    <div key={index} className="flex h-28 flex-1 items-end justify-center">
                      <div className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 via-emerald-400 to-emerald-300" style={{ height: `${value}%` }} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-400">Meta anual concluída em 94%.</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Retenção de visitantes</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">
                    <Users className="h-3 w-3" /> 65% permaneceram após 3 visitas
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-slate-300">
                    <LineChart className="h-3 w-3" /> 12 batismos no ano
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  highlight?: boolean;
}

function StatCard({ title, value, description, highlight }: StatCardProps) {
  return (
    <div
      className={`rounded-3xl border ${
        highlight ? "border-emerald-500/50 bg-emerald-500/10" : "border-slate-800 bg-slate-900/70"
      } p-6`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{description}</p>
    </div>
  );
}
