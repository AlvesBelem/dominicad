export type QuarterKey = "1º Trimestre" | "2º Trimestre" | "3º Trimestre" | "4º Trimestre";

export interface MonthDefinition {
  name: string;
  sundays: string[];
}

export interface StudentFrequency {
  orderNumber: number;
  name: string;
  observation?: string;
  frequency: Record<QuarterKey, Record<string, boolean[]>>;
}

export interface PersonalReportEntry {
  name: string;
  attendance: number;
  behavior: number;
  punctuality: number;
  bibleKnowledge: number;
}

export interface ClassRollEntry {
  orderNumber: number;
  name: string;
  birthDay: number;
  birthMonth: number;
  age: number;
  enrollmentDate: string;
  address: string;
  notes?: string;
}

export interface ClassQuarterSummary {
  quarter: QuarterKey;
  enrolled: number;
  presents: number;
  absences: number;
  visitors: number;
  totalAssistances: number;
  bibles: number;
  magazines: number;
  review: number;
  offerings: number;
  quarterlyGrade: number;
  annualGrade?: number;
  className: string;
  professor: string;
  observations: string;
}

export const monthsByQuarter: Record<QuarterKey, MonthDefinition[]> = {
  "1º Trimestre": [
    { name: "Janeiro", sundays: ["05/01", "12/01", "19/01", "26/01"] },
    { name: "Fevereiro", sundays: ["02/02", "09/02", "16/02", "23/02"] },
    { name: "Março", sundays: ["02/03", "09/03", "16/03", "23/03", "30/03"] },
  ],
  "2º Trimestre": [
    { name: "Abril", sundays: ["06/04", "13/04", "20/04", "27/04"] },
    { name: "Maio", sundays: ["04/05", "11/05", "18/05", "25/05"] },
    { name: "Junho", sundays: ["01/06", "08/06", "15/06", "22/06", "29/06"] },
  ],
  "3º Trimestre": [
    { name: "Julho", sundays: ["06/07", "13/07", "20/07", "27/07"] },
    { name: "Agosto", sundays: ["03/08", "10/08", "17/08", "24/08", "31/08"] },
    { name: "Setembro", sundays: ["07/09", "14/09", "21/09", "28/09"] },
  ],
  "4º Trimestre": [
    { name: "Outubro", sundays: ["05/10", "12/10", "19/10", "26/10"] },
    { name: "Novembro", sundays: ["02/11", "09/11", "16/11", "23/11", "30/11"] },
    { name: "Dezembro", sundays: ["07/12", "14/12", "21/12", "28/12"] },
  ],
};

export const cadernetaGeneralInfo = {
  school: "Escola Bíblica Dominical Esperança Viva",
  church: "Igreja Evangélica Esperança Viva",
  className: "Adolescentes",
  professor: "Maria Andrade",
  superintendent: "Pr. João Costa",
  referenceYear: 2025,
};

export const teacherOrientation = [
  "Prepare a lição com oração, buscando direção do Espírito Santo para ministrar aos alunos.",
  "Assuma o compromisso com a pontualidade: chegue antes da turma para acolher cada aluno.",
  "Ofereça atenção individual, percebendo necessidades emocionais, espirituais e familiares.",
  "Incentive decisões por Cristo entre visitantes e alunos que ainda não professaram fé.",
  "Registre imediatamente novos alunos para não perder nenhum histórico de acompanhamento.",
  "Observe constantemente conhecimento bíblico, pontualidade, comportamento e envolvimento nos trabalhos.",
];

export const secretaryOrientation = [
  "Registrar novos alunos sempre que ingressarem na turma, associando-os ao trimestre vigente.",
  "Atualizar a caderneta ao final de cada trimestre, garantindo que todos os campos estejam completos.",
  "Organizar relatórios trimestrais e anuais, encaminhando-os para o pastor ou superintendência.",
  "Realizar a transferência de alunos entre classes no início de cada ano letivo.",
];

export const studentsFrequency: StudentFrequency[] = [
  {
    orderNumber: 1,
    name: "Ana Souza",
    observation: "Intercessora da turma",
    frequency: {
      "1º Trimestre": {
        Janeiro: [true, true, true, true],
        Fevereiro: [true, true, true, true],
        Março: [true, true, true, true, true],
      },
      "2º Trimestre": {
        Abril: [true, true, true, false],
        Maio: [true, true, true, true],
        Junho: [true, true, true, true, true],
      },
      "3º Trimestre": {
        Julho: [true, true, false, true],
        Agosto: [true, true, true, true, true],
        Setembro: [true, true, true, true],
      },
      "4º Trimestre": {
        Outubro: [true, true, true, true],
        Novembro: [true, true, true, true, true],
        Dezembro: [true, true, true, true],
      },
    },
  },
  {
    orderNumber: 2,
    name: "Bruno Oliveira",
    observation: "Precisa de reforço na revista",
    frequency: {
      "1º Trimestre": {
        Janeiro: [true, true, false, true],
        Fevereiro: [true, false, true, true],
        Março: [true, true, false, true, true],
      },
      "2º Trimestre": {
        Abril: [true, true, true, true],
        Maio: [true, false, true, true],
        Junho: [true, true, true, false, true],
      },
      "3º Trimestre": {
        Julho: [true, true, true, true],
        Agosto: [true, true, false, true, true],
        Setembro: [true, false, true, true],
      },
      "4º Trimestre": {
        Outubro: [true, true, true, true],
        Novembro: [true, true, true, false, true],
        Dezembro: [true, true, true, true],
      },
    },
  },
  {
    orderNumber: 3,
    name: "Camila Ribeiro",
    observation: "Líder do louvor dos adolescentes",
    frequency: {
      "1º Trimestre": {
        Janeiro: [true, true, true, true],
        Fevereiro: [true, true, true, true],
        Março: [true, true, true, true, true],
      },
      "2º Trimestre": {
        Abril: [true, true, true, true],
        Maio: [true, true, true, true],
        Junho: [true, true, true, true, true],
      },
      "3º Trimestre": {
        Julho: [true, true, true, true],
        Agosto: [true, true, true, true, true],
        Setembro: [true, true, true, true],
      },
      "4º Trimestre": {
        Outubro: [true, true, true, true],
        Novembro: [true, true, true, true, true],
        Dezembro: [true, true, true, true],
      },
    },
  },
  {
    orderNumber: 4,
    name: "Diego Rocha",
    observation: "Chega atrasado em alguns domingos",
    frequency: {
      "1º Trimestre": {
        Janeiro: [true, false, true, true],
        Fevereiro: [true, true, false, true],
        Março: [true, true, true, false, true],
      },
      "2º Trimestre": {
        Abril: [true, true, false, true],
        Maio: [true, true, true, true],
        Junho: [true, false, true, true, true],
      },
      "3º Trimestre": {
        Julho: [true, true, true, false],
        Agosto: [true, true, true, true, true],
        Setembro: [true, true, false, true],
      },
      "4º Trimestre": {
        Outubro: [true, true, true, true],
        Novembro: [true, true, false, true, true],
        Dezembro: [true, true, true, true],
      },
    },
  },
  {
    orderNumber: 5,
    name: "Eduarda Santos",
    observation: "Em processo de integração",
    frequency: {
      "1º Trimestre": {
        Janeiro: [true, true, true, true],
        Fevereiro: [true, true, true, false],
        Março: [true, true, true, true, false],
      },
      "2º Trimestre": {
        Abril: [true, false, true, true],
        Maio: [true, true, true, true],
        Junho: [true, true, false, true, true],
      },
      "3º Trimestre": {
        Julho: [true, true, true, true],
        Agosto: [true, true, false, true, true],
        Setembro: [true, true, true, true],
      },
      "4º Trimestre": {
        Outubro: [true, true, true, true],
        Novembro: [true, true, true, true, true],
        Dezembro: [true, true, true, true],
      },
    },
  },
];

export const personalReport: PersonalReportEntry[] = [
  { name: "Ana Souza", attendance: 9.8, behavior: 9.6, punctuality: 9.0, bibleKnowledge: 9.7 },
  { name: "Bruno Oliveira", attendance: 8.4, behavior: 8.8, punctuality: 8.0, bibleKnowledge: 8.2 },
  { name: "Camila Ribeiro", attendance: 10, behavior: 9.7, punctuality: 9.8, bibleKnowledge: 9.9 },
  { name: "Diego Rocha", attendance: 8.8, behavior: 8.4, punctuality: 7.9, bibleKnowledge: 8.5 },
  { name: "Eduarda Santos", attendance: 8.6, behavior: 8.9, punctuality: 8.2, bibleKnowledge: 8.1 },
];

export const classRoll: ClassRollEntry[] = [
  {
    orderNumber: 1,
    name: "Ana Souza",
    birthDay: 12,
    birthMonth: 2,
    age: 13,
    enrollmentDate: "2023-03-05",
    address: "Rua das Flores, 150",
    notes: "Batizada em 2022",
  },
  {
    orderNumber: 2,
    name: "Bruno Oliveira",
    birthDay: 4,
    birthMonth: 5,
    age: 12,
    enrollmentDate: "2023-01-15",
    address: "Rua Esperança, 45",
  },
  {
    orderNumber: 3,
    name: "Camila Ribeiro",
    birthDay: 30,
    birthMonth: 7,
    age: 14,
    enrollmentDate: "2022-02-12",
    address: "Av. Central, 820",
    notes: "Líder de louvor",
  },
  {
    orderNumber: 4,
    name: "Diego Rocha",
    birthDay: 19,
    birthMonth: 9,
    age: 13,
    enrollmentDate: "2024-01-07",
    address: "Rua da Paz, 33",
    notes: "Família recém-chegada",
  },
  {
    orderNumber: 5,
    name: "Eduarda Santos",
    birthDay: 8,
    birthMonth: 11,
    age: 12,
    enrollmentDate: "2024-02-18",
    address: "Rua Vitória, 210",
    notes: "Participa do coral infantil",
  },
];

export const classQuarterSummaries: ClassQuarterSummary[] = [
  {
    quarter: "1º Trimestre",
    enrolled: 18,
    presents: 172,
    absences: 28,
    visitors: 26,
    totalAssistances: 198,
    bibles: 160,
    magazines: 150,
    review: 12,
    offerings: 1840,
    quarterlyGrade: 9.2,
    annualGrade: 9.4,
    className: "Adolescentes",
    professor: "Maria Andrade",
    observations: "Trimestre com foco em evangelismo e discipulado dos novos alunos.",
  },
  {
    quarter: "2º Trimestre",
    enrolled: 19,
    presents: 180,
    absences: 24,
    visitors: 18,
    totalAssistances: 198,
    bibles: 168,
    magazines: 155,
    review: 11,
    offerings: 1935,
    quarterlyGrade: 9.3,
    className: "Adolescentes",
    professor: "Maria Andrade",
    observations: "Ênfase em missões e visitas aos lares.",
  },
  {
    quarter: "3º Trimestre",
    enrolled: 20,
    presents: 188,
    absences: 20,
    visitors: 22,
    totalAssistances: 210,
    bibles: 174,
    magazines: 160,
    review: 13,
    offerings: 2050,
    quarterlyGrade: 9.5,
    className: "Adolescentes",
    professor: "Maria Andrade",
    observations: "Projeto social envolvendo toda a classe.",
  },
  {
    quarter: "4º Trimestre",
    enrolled: 20,
    presents: 192,
    absences: 18,
    visitors: 28,
    totalAssistances: 220,
    bibles: 180,
    magazines: 170,
    review: 14,
    offerings: 2140,
    quarterlyGrade: 9.6,
    annualGrade: 9.4,
    className: "Adolescentes",
    professor: "Maria Andrade",
    observations: "Preparação para a cantata de Natal e discipulado de novos convertidos.",
  },
];
