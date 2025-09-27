"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ClipboardList, School, Users } from "lucide-react";

import {
  cadernetaGeneralInfo,
  classQuarterSummaries,
  classRoll,
  monthsByQuarter,
  personalReport,
  secretaryOrientation,
  studentsFrequency,
  teacherOrientation,
  type QuarterKey,
} from "@/data/caderneta";

const quarters: QuarterKey[] = ["1º Trimestre", "2º Trimestre", "3º Trimestre", "4º Trimestre"];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(date: string) {
  const parsed = new Date(date);
  return parsed.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatBirthday(day: number, month: number) {
  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}`;
}

export default function CadernetaPage() {
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterKey>("1º Trimestre");

  const months = monthsByQuarter[selectedQuarter];

  const frequencyRows = useMemo(() => {
    return studentsFrequency.map((student) => {
      const monthSnapshots = months.map((month) => {
        const presences =
          student.frequency[selectedQuarter]?.[month.name] ??
          new Array(month.sundays.length).fill(false);
        const totalPresences = presences.filter(Boolean).length;
        return { month, presences, totalPresences };
      });
      const quarterTotal = monthSnapshots.reduce(
        (sum, snapshot) => sum + snapshot.totalPresences,
        0
      );
      return { student, monthSnapshots, quarterTotal };
    });
  }, [months, selectedQuarter]);

  const monthPresenceTotals = useMemo(() => {
    return months.map((month) => {
      const total = studentsFrequency.reduce((sum, student) => {
        const presences = student.frequency[selectedQuarter]?.[month.name] ?? [];
        return sum + presences.filter(Boolean).length;
      }, 0);
      return { month: month.name, total };
    });
  }, [months, selectedQuarter]);

  const quarterSummary = useMemo(
    () => classQuarterSummaries.find((summary) => summary.quarter === selectedQuarter),
    [selectedQuarter]
  );

  return (
    <div className="min-h-screen bg-slate-950 pb-16">
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-200">
              Caderneta Digital Dominical
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              {cadernetaGeneralInfo.className} – {selectedQuarter} /{" "}
              {cadernetaGeneralInfo.referenceYear}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Professor(a): {cadernetaGeneralInfo.professor} • Superintendência:{" "}
              {cadernetaGeneralInfo.superintendent}
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar ao dashboard
          </Link>
        </div>
      </header>
      {/* resto do componente */}
    </div>
  );
}



      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
              <School className="h-4 w-4 text-emerald-300" />
              Escola
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{cadernetaGeneralInfo.school}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
              <Users className="h-4 w-4 text-emerald-300" />
              Igreja
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{cadernetaGeneralInfo.church}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
              <ClipboardList className="h-4 w-4 text-emerald-300" />
              Professor responsável
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{cadernetaGeneralInfo.professor}</p>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
              <CalendarDays className="h-4 w-4 text-emerald-300" />
              Ano de referência
            </div>
            <p className="mt-2 text-sm font-semibold text-white">{cadernetaGeneralInfo.referenceYear}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">Orientações ao Professor</h2>
            <p className="mt-2 text-sm text-slate-300">
              Conteúdos históricos da caderneta que inspiram cuidado pastoral e excelência no ensino semanal.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {teacherOrientation.map((tip) => (
                <li key={tip} className="flex gap-3 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
                  <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">Orientações ao Secretário</h2>
            <p className="mt-2 text-sm text-slate-300">
              Responsabilidades administrativas para manter registros, relatórios e transferências em dia.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {secretaryOrientation.map((tip) => (
                <li key={tip} className="flex gap-3 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
                  <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Registro de Frequência Trimestral</h2>
              <p className="mt-1 text-sm text-slate-300">
                Espelho fiel da caderneta física com presenças por domingo, totais mensais e consolidação do trimestre.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quarters.map((quarter) => (
                <button
                  key={quarter}
                  type="button"
                  onClick={() => setSelectedQuarter(quarter)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    quarter === selectedQuarter
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                      : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {quarter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th rowSpan={2} className="px-4 py-3 text-left font-semibold">
                    Nº
                  </th>
                  <th rowSpan={2} className="px-4 py-3 text-left font-semibold">
                    Nome
                  </th>
                  <th rowSpan={2} className="px-4 py-3 text-left font-semibold">
                    Obs.
                  </th>
                  {months.map((month) => (
                    <th key={month.name} colSpan={month.sundays.length + 1} className="px-4 py-3 text-center font-semibold">
                      {month.name}
                    </th>
                  ))}
                  <th rowSpan={2} className="px-4 py-3 text-center font-semibold">
                    Total Trimestre
                  </th>
                </tr>
                <tr>
                  {months.map((month) => (
                    <Fragment key={month.name}>
                      {month.sundays.map((sunday) => (
                        <th key={`${month.name}-${sunday}`} className="px-3 py-2 text-center font-medium">
                          {sunday}
                        </th>
                      ))}
                      <th className="px-3 py-2 text-center font-medium">Total</th>
                    </Fragment>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {frequencyRows.map(({ student, monthSnapshots, quarterTotal }) => (
                  <tr key={student.orderNumber} className="bg-slate-950/40 transition hover:bg-slate-950/70">
                    <td className="px-4 py-3 font-semibold text-white">{student.orderNumber}</td>
                    <td className="px-4 py-3 font-semibold text-white">{student.name}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{student.observation ?? "—"}</td>
                    {monthSnapshots.map(({ month, presences, totalPresences }) => (
                      <Fragment key={`${student.orderNumber}-${month.name}`}>
                        {presences.map((present, index) => (
                          <td key={`${student.orderNumber}-${month.name}-${index}`} className="px-3 py-3 text-center">
                            <span
                              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                present ? "bg-emerald-500/20 text-emerald-200" : "bg-rose-500/10 text-rose-200"
                              }`}
                            >
                              {present ? "P" : "A"}
                            </span>
                          </td>
                        ))}
                        <td className="px-3 py-3 text-center font-semibold text-white">
                          {totalPresences}
                        </td>
                      </Fragment>
                    ))}
                    <td className="px-4 py-3 text-center font-semibold text-emerald-200">{quarterTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
              <h3 className="text-sm font-semibold text-white">Totais de presença por mês</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {monthPresenceTotals.map((item) => (
                  <div key={item.month} className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200">
                    <p className="text-xs uppercase tracking-wide text-slate-400">{item.month}</p>
                    <p className="mt-1 text-base font-semibold text-white">{item.total} presenças</p>
                  </div>
                ))}
              </div>
            </div>
            {quarterSummary && (
              <div className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4">
                <h3 className="text-sm font-semibold text-white">Totais da classe ({selectedQuarter})</h3>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-300 sm:grid-cols-3">
                  <div>
                    <dt className="uppercase tracking-wide">Matriculados</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.enrolled}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Presentes</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.presents}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Ausentes</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.absences}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Visitantes</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.visitors}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Total assistências</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.totalAssistances}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Bíblias</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.bibles}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Revistas</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.magazines}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Revisão</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.review}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Ofertas</dt>
                    <dd className="mt-1 text-sm font-semibold text-emerald-200">{formatCurrency(quarterSummary.offerings)}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wide">Nota trimestral</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.quarterlyGrade.toFixed(1)}</dd>
                  </div>
                  {quarterSummary.annualGrade !== undefined && (
                    <div>
                      <dt className="uppercase tracking-wide">Nota anual da classe</dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{quarterSummary.annualGrade.toFixed(1)}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Observações</span>
                  {quarterSummary.observations}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white">Relatório Anual Pessoal</h2>
          <p className="mt-1 text-sm text-slate-300">
            Acompanhamento individual com indicadores clássicos da caderneta: frequência, comportamento, pontualidade e
            conhecimento bíblico.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Aluno</th>
                  <th className="px-4 py-3 text-center font-semibold">Frequência</th>
                  <th className="px-4 py-3 text-center font-semibold">Comportamento e trabalho</th>
                  <th className="px-4 py-3 text-center font-semibold">Pontualidade</th>
                  <th className="px-4 py-3 text-center font-semibold">Conhecimento bíblico</th>
                  <th className="px-4 py-3 text-center font-semibold">Nota atual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {personalReport.map((entry) => {
                  const finalScore = Number(
                    ((entry.attendance + entry.behavior + entry.punctuality + entry.bibleKnowledge) / 4).toFixed(1)
                  );
                  return (
                    <tr key={entry.name} className="bg-slate-950/40">
                      <td className="px-4 py-3 font-semibold text-white">{entry.name}</td>
                      <td className="px-4 py-3 text-center">{entry.attendance.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center">{entry.behavior.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center">{entry.punctuality.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center">{entry.bibleKnowledge.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center font-semibold text-emerald-200">{finalScore.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

          <h2 className="text-lg font-semibold text-white">Rol da Classe</h2>
          <p className="mt-1 text-sm text-slate-300">
            Cadastro completo com dados pessoais, aniversários e observações para integração contínua.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Nº</th>
                  <th className="px-4 py-3 text-left font-semibold">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold">Aniversário</th>
                  <th className="px-4 py-3 text-left font-semibold">Idade</th>
                  <th className="px-4 py-3 text-left font-semibold">Data da matrícula</th>
                  <th className="px-4 py-3 text-left font-semibold">Endereço</th>
                  <th className="px-4 py-3 text-left font-semibold">Observações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {classRoll.map((entry) => (
                  <tr key={entry.orderNumber} className="bg-slate-950/40">
                    <td className="px-4 py-3 font-semibold text-white">{entry.orderNumber}</td>
                    <td className="px-4 py-3 font-semibold text-white">{entry.name}</td>
                    <td className="px-4 py-3">{formatBirthday(entry.birthDay, entry.birthMonth)}</td>
                    <td className="px-4 py-3">{entry.age} anos</td>
                    <td className="px-4 py-3">{formatDate(entry.enrollmentDate)}</td>
                    <td className="px-4 py-3">{entry.address}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{entry.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white">Relatório Anual da Classe</h2>
          <p className="mt-1 text-sm text-slate-300">
            Consolidação dos quatro trimestres com métricas de matriculados, presença, evangelização e notas da turma.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Trimestre</th>
                  <th className="px-4 py-3 text-center font-semibold">Matriculados</th>
                  <th className="px-4 py-3 text-center font-semibold">Presenças</th>
                  <th className="px-4 py-3 text-center font-semibold">Ausências</th>
                  <th className="px-4 py-3 text-center font-semibold">% Matriculados Presentes</th>
                  <th className="px-4 py-3 text-center font-semibold">Visitantes</th>
                  <th className="px-4 py-3 text-center font-semibold">Total de assistências</th>
                  <th className="px-4 py-3 text-center font-semibold">Bíblias</th>
                  <th className="px-4 py-3 text-center font-semibold">Ofertas</th>
                  <th className="px-4 py-3 text-center font-semibold">Nota Trimestral</th>
                  <th className="px-4 py-3 text-center font-semibold">Nota anual da classe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {classQuarterSummaries.map((summary) => {
                  const percent = summary.enrolled === 0 ? 0 : (summary.presents / (summary.enrolled * 13)) * 100;
                  return (
                    <tr key={summary.quarter} className="bg-slate-950/40">
                      <td className="px-4 py-3 font-semibold text-white">{summary.quarter}</td>
                      <td className="px-4 py-3 text-center">{summary.enrolled}</td>
                      <td className="px-4 py-3 text-center">{summary.presents}</td>
                      <td className="px-4 py-3 text-center">{summary.absences}</td>
                      <td className="px-4 py-3 text-center">{percent.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">{summary.visitors}</td>
                      <td className="px-4 py-3 text-center">{summary.totalAssistances}</td>
                      <td className="px-4 py-3 text-center">{summary.bibles}</td>
                      <td className="px-4 py-3 text-center">{formatCurrency(summary.offerings)}</td>
                      <td className="px-4 py-3 text-center">{summary.quarterlyGrade.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center">{summary.annualGrade ? summary.annualGrade.toFixed(1) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

    </div>
  );
}
