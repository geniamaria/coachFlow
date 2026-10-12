# 🚀 Guia de Deploy — CoachFlow

Passos para colocar o CoachFlow em produção.

## 1. Requisitos

- Node.js **>= 20.9.0**
- Uma base de dados **PostgreSQL** hospedada (Prisma Postgres, Neon, Supabase, Railway, …)
- Um hosting compatível com Next.js (ex.: **Vercel**) ou um servidor Node

## 2. Variáveis de ambiente

Copiar `.env.example` e preencher. Em produção, configurar estas variáveis **no painel do hosting** (nunca no código):

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `DATABASE_URL` | Ligação ao Postgres de produção | `postgresql://user:pass@host:5432/coachflow?sslmode=require` |
| `NEXTAUTH_URL` | URL pública da aplicação | `https://coachflow.exemplo.com` |
| `NEXTAUTH_SECRET` | Segredo forte do NextAuth | gerar com `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Email de acesso (login) | `admin@coachflow.com` |
| `ADMIN_PASSWORD` | Password de acesso (login) | uma password forte |
| `ADMIN_NAME` | Nome mostrado na sessão (opcional) | `Maria Genia` |

> ⚠️ Sem `ADMIN_EMAIL`/`ADMIN_PASSWORD` definidos, o login fica **desativado** de propósito.

## 3. Base de dados

Aplicar as migrações existentes à base de dados de produção:

```bash
npx prisma migrate deploy
```

O cliente Prisma é gerado automaticamente no `postinstall` (`prisma generate`). Se o teu hosting não correr `postinstall`, garante que `prisma generate` corre antes do build.

## 4. Build e arranque

```bash
npm install
npm run build
npm start
```

## 5. Vercel (recomendado)

1. Importar o repositório na Vercel.
2. Em **Settings → Environment Variables**, adicionar todas as variáveis da secção 2.
3. **Build Command**: `npm run build` (o `postinstall` gera o cliente Prisma).
4. Antes do primeiro acesso, correr `npx prisma migrate deploy` contra a BD de produção (localmente com o `DATABASE_URL` de produção, ou num passo de release).
5. Fazer deploy.

## 6. Checklist antes de ir ao ar

- [ ] `DATABASE_URL` aponta para uma BD **hospedada** (não `localhost`)
- [ ] `NEXTAUTH_URL` com o domínio real (https)
- [ ] `NEXTAUTH_SECRET` forte e diferente do de desenvolvimento
- [ ] `ADMIN_EMAIL` / `ADMIN_PASSWORD` definidos e fortes
- [ ] `npx prisma migrate deploy` executado em produção
- [ ] `npm run build` passa sem erros
- [ ] Login testado em produção
- [ ] Módulos em falta (*Pagamentos*, *Contactos*) — completar ou assumir como "em breve"
