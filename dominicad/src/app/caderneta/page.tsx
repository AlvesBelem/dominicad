"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, Save, Users } from "lucide-react";

interface StudentRecord {
  id: number;
  name: string;
  age: number;
}

interface AttendanceRecord {
  studentId: number;
  present: boolean;
  bible: boolean;
  offer: string;
  comment: string;
}


const students: StudentRecord[] = [
  { id: 1, name: "Ana Souza", age: 13 },
  { id: 2, name: "Bruno Oliveira", age: 12 },
  { id: 3, name: "Camila Ribeiro", age: 14 },
  { id: 4, name: "Diego Rocha", age: 13 },
  { id: 5, name: "Eduarda Santos", age: 12 },
];

export default function CadernetaPage() {
  const [date, setDate] = useState("26/01/2025");
  const [records, setRecords] = useState<AttendanceRecord[]>(
    students.map((student) => ({
      studentId: student.id,
      present: true,
      bible: true,
      offer: "5,00",
      comment: "",
    }))
  );
  const [visitors, setVisitors] = useState<{ name: string; age: number }[]>([
    { name: "Pedro Lima", age: 12 },
  ]);
  const [classNote, setClassNote] = useState("Reforçar convite para retiro juvenil em fevereiro.");

  const totals = useMemo(() => {
    const presentCount = records.filter((record) => record.present).length;
    const bibleCount = records.filter((record) => record.bible).length;
    const offeringTotal = records.reduce((sum, record) => {
      const sanitized = Number(record.offer.replace(/[^0-9,.-]/g, "").replace(",", "."));
      return sum + (Number.isFinite(sanitized) ? sanitized : 0);
    }, 0);

    return {
      presentCount,
      bibleCount,
      offeringTotal,
    };
  }, [records]);

  const handleCheckboxChange = (studentId: number, field: "present" | "bible") => {
    setRecords((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, [field]: !record[field] } : record
      )
    );
  };

  const handleOfferChange = (studentId: number, value: string) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, offer: value } : record
      )
    );
  };

  const handleCommentChange = (studentId: number, value: string) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, comment: value } : record
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-200">Caderneta Digital</p>
            <h1 className="text-2xl font-semibold text-white">Classe Adolescentes – 1º Trimestre/2025</h1>
            <p className="mt-1 text-sm text-slate-400">Professor: Maria Andrade • Secretaria: João Costa</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar ao dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Domingo de registro</p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm text-white">
                <CalendarDays className="h-4 w-4 text-emerald-300" />
                <input
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="bg-transparent text-sm focus:outline-none"
                  aria-label="Data"
                />
              </div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
              <Save className="h-4 w-4" />
              Salvar registro
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-300">
            Registre presença, bíblia, ofertas e observações para cada aluno. Os totais são calculados automaticamente e ficam
            disponíveis para o dashboard em tempo real.
          </p>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-950/70 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Aluno</th>
                <th className="px-4 py-3 font-medium">Idade</th>
                <th className="px-4 py-3 font-medium">Presença</th>
                <th className="px-4 py-3 font-medium">Bíblia</th>
                <th className="px-4 py-3 font-medium">Oferta (R$)</th>
                <th className="px-4 py-3 font-medium">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {students.map((student) => {
                const record = records.find((item) => item.studentId === student.id)!;
                return (
                  <tr key={student.id} className="transition hover:bg-slate-950/80">
                    <td className="px-4 py-3 font-semibold text-white">{student.name}</td>
                    <td className="px-4 py-3">{student.age}</td>
                    <td className="px-4 py-3">
                      <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={record.present}
                          onChange={() => handleCheckboxChange(student.id, "present")}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-400"
                        />
                        Presente
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={record.bible}
                          onChange={() => handleCheckboxChange(student.id, "bible")}
                          className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-400"
                        />
                        Trouxe Bíblia
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={record.offer}
                        onChange={(event) => handleOfferChange(student.id, event.target.value)}
                        className="w-24 rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={record.comment}
                        onChange={(event) => handleCommentChange(student.id, event.target.value)}
                        placeholder="Observação opcional"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">Visitantes do dia</h2>
            <p className="mt-2 text-sm text-slate-300">
              Registre visitantes para acompanhar a retenção e gerar relatórios de integração.
            </p>
            <div className="mt-4 space-y-4">
              {visitors.map((visitor, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-base font-semibold text-white">{visitor.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{visitor.age} anos</p>
                </div>
              ))}
              <button
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-emerald-400 hover:text-emerald-200"
                onClick={() => setVisitors((prev) => [...prev, { name: "Novo visitante", age: 11 }])}
              >
                Adicionar visitante
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6">
            <h2 className="text-lg font-semibold text-white">Totais do domingo</h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-100">
              <li className="flex items-center justify-between">
                <span>Alunos presentes</span>
                <span className="font-semibold text-white">{totals.presentCount}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Alunos com Bíblia</span>
                <span className="font-semibold text-white">{totals.bibleCount}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Oferta total</span>
                <span className="font-semibold text-white">R$ {totals.offeringTotal.toFixed(2)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Visitantes</span>
                <span className="font-semibold text-white">{visitors.length}</span>
              </li>
            </ul>
            <div className="mt-6">
              <label className="mb-2 block text-xs uppercase tracking-wide text-emerald-200">Resumo da aula</label>
              <textarea
                value={classNote}
                onChange={(event) => setClassNote(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-white placeholder:text-emerald-100/70 focus:border-white focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-white">Histórico trimestral</h2>
          <p className="mt-2 text-sm text-slate-300">
            Visualize os dados consolidados que alimentam o dashboard. Em breve, relatórios exportáveis por trimestre e ano.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {["Janeiro", "Fevereiro", "Março"].map((month) => (
              <div key={month} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{month}</p>
                <p className="mt-2 text-2xl font-semibold text-white">90% presença</p>
                <p className="mt-1 text-xs text-slate-400">Oferta média: R$ 680</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Dados protegidos por workspace. Somente sua equipe visualiza este registro.</p>
          <p className="inline-flex items-center gap-2 text-emerald-200">
            <Users className="h-4 w-4" /> Sincronizado com dashboard em tempo real
          </p>
        </div>
      </footer>
    </div>
  );
}
