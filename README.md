This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🏋️ CoachFlow — Plataforma de Gestão para Personal Trainers

O **CoachFlow** é uma plataforma web desenvolvida para ajudar personal trainers e profissionais de fitness a gerir os seus clientes, organizar aulas, acompanhar agendas e monitorizar a evolução dos seus alunos de forma simples e centralizada.

O projeto foi criado como forma de aplicar e desenvolver conhecimentos em **desenvolvimento Front-end, Back-end, bases de dados, autenticação e construção de aplicações web modernas**.

---

## 🎯 Objetivo

O objetivo do CoachFlow é oferecer ao profissional uma ferramenta que permita substituir o controlo manual de clientes, aulas e desempenho por uma plataforma digital organizada.

A plataforma permite centralizar informações como:

* 👥 Clientes
* 📅 Agendamento de aulas
* 🏋️ Treinos e exercícios
* 📈 Evolução e desempenho
* 🎯 Objetivos dos clientes
* 💰 Pagamentos
* 📊 Estatísticas

---

## ✨ Funcionalidades

### 👤 Gestão de Clientes

O profissional pode:

* Cadastrar novos clientes
* Consultar informações dos clientes
* Editar dados dos clientes
* Visualizar o histórico de aulas
* Consultar o desempenho individual

### 📅 Gestão de Agenda

* Visualização das aulas agendadas
* Criação de novos agendamentos
* Alteração de horários
* Cancelamento de aulas
* Consulta da agenda por dia, semana ou mês

### 🏋️ Gestão de Treinos

* Criar treinos
* Adicionar exercícios
* Definir séries e repetições
* Associar treinos a clientes
* Consultar histórico de treinos

### 📈 Acompanhamento de Desempenho

O profissional pode acompanhar a evolução de cada cliente através de:

* Histórico de desempenho
* Metas definidas
* Frequência das aulas
* Evolução dos exercícios
* Gráficos de progresso

### 🎯 Gestão de Objetivos

Permite definir objetivos individuais para cada cliente e acompanhar o seu progresso ao longo do tempo.

### 💰 Gestão de Pagamentos

* Registo de pagamentos
* Identificação de pagamentos pendentes
* Histórico de pagamentos
* Resumo financeiro

### 🔐 Autenticação e Perfis

A plataforma possui diferentes tipos de utilizadores:

**Personal Trainer**

* Gerir clientes
* Gerir aulas
* Criar treinos
* Acompanhar desempenho
* Gerir pagamentos

**Cliente**

* Consultar agenda
* Visualizar treinos
* Acompanhar o próprio progresso
* Consultar objetivos

---

## 🖥️ Tecnologias

### Front-end

* [Next.js](https://nextjs.org/)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React

### Back-end

* Node.js
* Express.js
* API REST

### Base de Dados

* PostgreSQL
* Prisma ORM

### Ferramentas

* Git
* GitHub
* VS Code
* Figma

---

## 🏗️ Arquitetura

```text
                    ┌─────────────────────┐
                    │      CoachFlow      │
                    │      Front-end      │
                    │  Next.js + React    │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        API          │
                    │   Node.js/Express   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Prisma        │
                    │        ORM          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘
```

---

## 🗂️ Estrutura do Projeto

```text
coachflow/
│
├── app/
│   ├── dashboard/
│   ├── clients/
│   ├── schedule/
│   ├── workouts/
│   ├── progress/
│   └── payments/
│
├── components/
│   ├── ui/
│   ├── clients/
│   ├── schedule/
│   ├── workouts/
│   └── dashboard/
│
├── lib/
│   ├── db/
│   ├── auth/
│   └── utils/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── types/
│
├── package.json
└── README.md
```

---

## 📊 Principais módulos

```text
                 CoachFlow
                    │
       ┌────────────┼────────────┐
       │            │            │
   Clientes       Agenda       Treinos
       │            │            │
       └────────────┼────────────┘
                    │
             Desempenho
                    │
             ┌──────┴──────┐
             │             │
          Objetivos     Pagamentos
```

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/coachflow.git
```

### 2. Entrar na pasta

```bash
cd coachflow
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Criar um ficheiro `.env.local`:

```env
DATABASE_URL="sua_connection_string"
AUTH_SECRET="seu_secret"
```

### 5. Configurar a base de dados

```bash
npx prisma migrate dev
```

### 6. Executar o projeto

```bash
npm run dev
```

Depois aceder a:

```text
http://localhost:3000
```

---

## 📱 Interface

### Dashboard

O dashboard apresenta um resumo das principais informações do profissional:

* Total de clientes
* Aulas do dia
* Próximos agendamentos
* Pagamentos
* Desempenho dos clientes

### Perfil do Cliente

Cada cliente possui uma página própria com:

* Informações pessoais
* Agenda
* Treinos
* Objetivos
* Histórico
* Desempenho

---

## 🔮 Melhorias futuras

Algumas funcionalidades que poderão ser adicionadas futuramente:

* [ ] Sistema de notificações
* [ ] Lembretes de aulas
* [ ] Integração com calendário
* [ ] Relatórios em PDF
* [ ] Exportação de dados
* [ ] Sistema de mensagens entre treinador e cliente
* [ ] Aplicação mobile
* [ ] Integração com pagamentos
* [ ] Dashboard com estatísticas avançadas
* [ ] Sistema de avaliações
* [ ] Gestão de vários personal trainers
* [ ] Sistema de subscrição

---

## 🎓 Objetivos de aprendizagem

Este projeto tem como objetivo colocar em prática conhecimentos de:

* Desenvolvimento de interfaces modernas
* React e Next.js
* TypeScript
* Design responsivo
* Gestão de estado
* Consumo e criação de APIs
* Autenticação
* Bases de dados relacionais
* ORM com Prisma
* CRUD
* Git e GitHub
* Organização de projetos
* UX/UI Design

---

## 👩‍💻 Autora

**Maria Genia**

Estudante de Engenharia em Tecnologia e Sistemas de Comunicação e desenvolvedora web interessada em criar soluções digitais para problemas reais.

### Tecnologias e áreas de interesse

* Front-end Development
* Back-end Development
* UI/UX Design
* JavaScript
* TypeScript
* React
* Next.js
* Node.js
* Tailwind CSS

---

## 📄 Licença

Este projeto foi desenvolvido para fins de aprendizagem, prática e construção de portfólio.

---

⭐ **Se este projeto foi útil ou interessante, considere deixar uma estrela no repositório.**
