import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        if (
          credentials?.email === "admin@coachflow.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Maria Genia",
            email: "admin@coachflow.com",
          };
        }

        return null;
      },
    }),
  ],
};