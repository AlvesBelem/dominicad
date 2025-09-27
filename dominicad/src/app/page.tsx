import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Shield, Users } from "lucide-react";
import { Header } from "@/components/header";

const features = [
  {
    title: "Caderneta Digital Completa",
    description:
      "Registre presença, ofertas, leitura bíblica, visitantes e observações em uma interface inspirada na caderneta física.",
    icon: CheckCircle2,
  },
  {
    title: "Painel de Métricas Trimestrais",
    description:
      "Visualize gráficos de frequência, ofertas e engajamento de cada turma para decisões rápidas e transparentes.",
    icon: BarChart3,
  },
  {
    title: "Isolamento por Igreja",
    description:
      "Cada conta possui um workspace protegido para garantir que apenas sua equipe veja dados dos alunos e classes.",
    icon: Shield,
  },
];

const steps = [
  {
    title: "1. Cadastre sua igreja",
    description:
      "Informe os dados básicos, defina o primeiro trimestre e convide professores e secretários para colaborar.",
  },
  {
    title: "2. Importe ou cadastre alunos",
    description:
      "Crie turmas, matrículas e organize os alunos conforme faixa etária ou classe ministerial.",
  },
  {
    title: "3. Registre cada domingo",
    description:
      "Use a caderneta digital para marcar presença, visitantes, bíblia e ofertas direto do celular ou computador.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-28 px-4 pb-24 pt-16 sm:px-6">
        <section className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-200">
              <Users className="h-4 w-4" />
              SaaS para Escola Dominical
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              DominiCad – a caderneta digital que centraliza sua Escola Dominical
            </h1>
            <p className="text-lg text-slate-300">
              Simplifique o acompanhamento das turmas, monitore métricas e mantenha a diretoria informada em tempo real.
              DominiCad substitui as planilhas manuais por um painel moderno, seguro e acessível em qualquer dispositivo.
            </p>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-emerald-500/5">
              <form className="flex flex-col gap-4 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seuemail@igreja.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                  required
                />
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Criar conta
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </form>
              <p className="mt-4 text-sm text-slate-400">
                Experimente gratuitamente por 14 dias. Não é necessário cartão de crédito.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-emerald-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-500/10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Resumo do último trimestre</p>
                  <p className="text-2xl font-semibold text-white">Classe Adolescentes</p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  +8% crescimento
                </span>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                  <dt className="text-xs uppercase tracking-wide text-emerald-200">Presença Média</dt>
                  <dd className="text-2xl font-bold text-white">92%</dd>
                  <p className="mt-2 text-xs text-emerald-100/80">+6 pontos vs. trimestre anterior</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-400">Oferta acumulada</dt>
                  <dd className="text-2xl font-bold text-white">R$ 2.840</dd>
                  <p className="mt-2 text-xs text-slate-400">Meta alcançada em 3 dos 4 meses</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-400">Visitantes recebidos</dt>
                  <dd className="text-2xl font-bold text-white">18</dd>
                  <p className="mt-2 text-xs text-slate-400">7 deles permanecem na classe</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-400">Pontualidade da equipe</dt>
                  <dd className="text-2xl font-bold text-white">100%</dd>
                  <p className="mt-2 text-xs text-slate-400">Controle realizado com checagem dupla</p>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="recursos" className="space-y-12">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Recursos pensados para a rotina da Escola Dominical</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <feature.icon className="mb-4 h-10 w-10 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Fluxo simples para equipes voluntárias</h2>
            <p className="text-slate-300">
              DominiCad foi desenhado para secretários e professores que dedicam seu tempo voluntariamente. Em poucos cliques é
              possível registrar o domingo, acompanhar ausentes e enviar relatórios para a liderança.
            </p>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
            <h3 className="text-xl font-semibold text-white">Indicadores principais</h3>
            <div className="mt-8 space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Frequência Geral</span>
                  <span>87%</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[87%] rounded-full bg-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Entrega de lições</span>
                  <span>74%</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[74%] rounded-full bg-emerald-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Média de ofertas</span>
                  <span>R$ 680</span>
                </div>
                <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[68%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Novos membros</span>
                  <span>+12</span>
                </div>
                <div className="mt-2 grid grid-cols-6 gap-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-16 rounded-2xl border border-slate-800 bg-gradient-to-t from-slate-900 to-slate-800 ${
                        index < 4 ? "shadow-inner shadow-emerald-500/30" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="seguranca" className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8">
            <Shield className="h-12 w-12 text-emerald-300" />
            <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Segurança e privacidade em primeiro lugar</h2>
            <p className="mt-4 text-slate-100">
              Cada igreja recebe um workspace exclusivo com autenticação via Firebase ou Auth0. As rotas privadas são protegidas
              por tokens JWT e os dados trafegam sempre criptografados.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-emerald-100">
              <li>• Controle de acesso por perfis: pastor, superintendente, professor e secretário.</li>
              <li>• Logs de auditoria para saber quem alterou registros críticos.</li>
              <li>• Backups automáticos e restauração de turmas em até 30 dias.</li>
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-xl font-semibold text-white">Banco de dados organizado</h3>
              <p className="mt-2 text-sm text-slate-300">
                Estrutura pensada para PostgreSQL ou MongoDB, com coleções e tabelas relacionando usuários, turmas, alunos e
                presenças. Tudo preparado para multi-tenancy utilizando o identificador da igreja.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-xl font-semibold text-white">API REST e Webhooks</h3>
              <p className="mt-2 text-sm text-slate-300">
                Conecte DominiCad a sistemas financeiros e relatórios denominacionais através de endpoints autenticados e
                webhooks para presença, ofertas e novos visitantes.
              </p>
            </div>
          </div>
        </section>

        <section id="precos" className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Planos flexíveis para cada realidade</h2>
            <p className="mt-2 text-slate-300">Comece gratuito e evolua conforme a sua Escola Dominical cresce.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="text-xl font-semibold text-white">Inicial</h3>
              <p className="mt-2 text-sm text-slate-300">Até 50 alunos ativos</p>
              <p className="mt-6 text-3xl font-bold text-white">Gratuito</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>• 1 workspace</li>
                <li>• Dashboard trimestral</li>
                <li>• Exportação em PDF</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-emerald-500/50 bg-emerald-500/10 p-8 shadow-lg shadow-emerald-500/10">
              <h3 className="text-xl font-semibold text-white">Essencial</h3>
              <p className="mt-2 text-sm text-emerald-100">Até 200 alunos e múltiplas turmas</p>
              <p className="mt-6 text-3xl font-bold text-white">R$ 69/mês</p>
              <ul className="mt-6 space-y-3 text-sm text-emerald-100">
                <li>• Relatórios anuais</li>
                <li>• Webhooks e integrações</li>
                <li>• Suporte prioritário</li>
              </ul>
              <Link
                href="/register"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Assinar plano Essencial
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
              <h3 className="text-xl font-semibold text-white">Avançado</h3>
              <p className="mt-2 text-sm text-slate-300">Campanhas personalizadas</p>
              <p className="mt-6 text-3xl font-bold text-white">Sob consulta</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>• Múltiplos campi e congregações</li>
                <li>• API ilimitada</li>
                <li>• SLA dedicado</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-12 text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Pronto para modernizar a sua Escola Dominical?</h2>
          <p className="mt-4 text-lg text-emerald-100">
            DominiCad combina a tradição da caderneta com a inteligência de um software SaaS. Cadastre-se e comece a registrar o
            próximo domingo em poucos minutos.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Criar conta gratuita
            </Link>
            <Link
              href="/caderneta"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 text-base font-semibold text-white transition hover:border-white"
            >
              Ver caderneta demo
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} DominiCad. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#seguranca" className="transition hover:text-emerald-300">
              Segurança
            </a>
            <Link href="/login" className="transition hover:text-emerald-300">
              Acessar plataforma
            </Link>
            <a href="mailto:contato@dominicad.app" className="transition hover:text-emerald-300">
              contato@dominicad.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
