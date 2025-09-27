# DominiCad – Caderneta Digital SaaS

DominiCad é um aplicativo SaaS pensado para igrejas evangélicas digitalizarem a tradicional caderneta da Escola Dominical. O objetivo do projeto é oferecer uma base completa com landing page, telas internas, rotas de API e documentação para evoluir o produto rumo a produção.

![DominiCad hero](public/dominicad-hero.svg)

> **Status**: interface navegável com caderneta completa. APIs mockadas para prototipagem com opção de conexão real via Prisma ORM. Ideal para validação de UX, definição de requisitos com a liderança e demonstrações para igrejas parceiras.

## ✨ Principais recursos

- Landing page institucional com chamada para cadastro, descrição de recursos e planos.
- Tela de autenticação com formulário unificado de login e registro.
- Dashboard com cartões de métricas, tabelas e gráficos em CSS para acompanhamento trimestral e anual.
- Caderneta digital interativa que replica todas as seções da caderneta física (orientações, frequência trimestral, relatórios anuais e rol da classe).
- Rotas de API disponíveis com mock ou integração via Prisma ORM.
- Design responsivo inspirado na caderneta física, com identidade moderna em tons de esmeralda e ardósia.

## 🧱 Arquitetura da solução

| Camada          | Tecnologia                     | Observações |
|-----------------|--------------------------------|-------------|
| Front-end       | Next.js 15 (App Router) + React 19 | Componentização com Tailwind CSS 4 (classes utilitárias) e fontes Geist. |
| Autenticação    | Firebase Auth ou Auth0 (planejado) | Telas e rotas preparadas para emissão e validação de JWT com `workspaceId`. |
| Back-end / API  | Next.js Route Handlers + Prisma ORM | Endpoints funcionam com mocks por padrão, mas podem se conectar ao banco real. |
| Banco de dados  | SQLite (dev) ou PostgreSQL/MongoDB | Multi-tenant por `workspaceId`. Migração inicial via Prisma. |

### Modelagem de dados (Prisma)

```mermaid
erDiagram
    users {
      string id PK
      string email
      string passwordHash
      string churchName
      string teacherName
      string superintendent
      string plan
      string workspaceId
      timestamp createdAt
    }
    classes {
      string id PK
      string userId FK
      string workspaceId FK
      string name
      int year
      int quarter
      string professorName
      string superintendent
      string churchName
    }
    students {
      string id PK
      string classId FK
      string workspaceId FK
      string fullName
      int age
      string address
      string enrollment
      timestamp createdAt
    }
    attendances {
      string id PK
      string classId FK
      string studentId FK
      string workspaceId FK
      date sunday
      bool present
      bool bible
      bool lesson
      bool reviewed
      decimal offering
      int visitors
      text notes
    }
    personal_reports {
      string id PK
      string studentId FK
      int year
      float attendanceScore
      float behaviorScore
      float punctuality
      float bibleKnowledge
      float finalScore
    }
    class_reports {
      string id PK
      string classId FK
      int year
      int quarter
      int enrolled
      int presences
      int absences
      float percentPresent
      int visitors
      int totalAssistances
      int bibles
      decimal offerings
      float quarterlyGrade
      float annualClassGrade
    }

    users ||--o{ classes : "gerencia"
    classes ||--o{ students : "possui"
    classes ||--o{ attendances : "registra"
    students ||--o{ attendances : "participa"
    students ||--|| personal_reports : "avalia"
    classes ||--o{ class_reports : "sintetiza"
📂 Estrutura de pastas
bash
Copiar código
src/
├── app/
│   ├── api/               # Rotas REST (mock ou Prisma)
│   ├── caderneta/         # Tela de registro semanal
│   ├── dashboard/         # Painel com métricas
│   ├── login/ e register/ # Fluxos de autenticação
│   └── page.tsx           # Landing page institucional
├── components/            # Componentes compartilhados
└── data/                  # Dados mockados para UI
🔐 Rotas de API disponíveis
Método	Rota	Descrição
POST	/api/auth/register	Cria usuário/workspace (mock ou Prisma).
POST	/api/auth/login	Retorna token mockado + dados do workspace.
GET/POST	/api/classes	CRUD de turmas isoladas por usuário/workspace.
GET/POST	/api/students	CRUD de alunos com classId e workspaceId.
GET/POST	/api/attendances	Registra presenças (upsert) e consulta por classe.
GET	/api/dashboard	Consolida métricas de frequência e desempenho.

Para produção, substitua os mocks por chamadas reais e configure corretamente o DATABASE_URL.

🚀 Como executar localmente
Usando banco de dados real com Prisma
bash
Copiar código
cp .env.example .env
# Ajuste DATABASE_URL (por exemplo, SQLite local):
DATABASE_URL="file:./prisma/dev.db"

npm install

# Executa as migrações (baixa engines do Prisma)
npx prisma migrate deploy

npm run dev
O servidor será iniciado em http://localhost:3000.

Se estiver offline e quiser testar apenas o mock:

bash
Copiar código
npm install
npm run dev