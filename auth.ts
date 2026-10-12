import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },

      async authorize(credentials) {
        // As credenciais vêm das variáveis de ambiente (ver .env.example),
        // nunca do código, para não expor o acesso no repositório.
        if (!adminEmail || !adminPassword) {
          console.error(
            "ADMIN_EMAIL/ADMIN_PASSWORD não estão definidos; login desativado."
          );

          return null;
        }

        if (
          credentials?.email?.trim() === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "1",
            name: process.env.ADMIN_NAME ?? "Personal Trainer",
            email: adminEmail,
          };
        }

        return null;
      },
    }),
  ],
};
