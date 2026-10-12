import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // As rotas de autenticação têm de ficar acessíveis (login/logout).
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    // Com sessão, a raiz vai direto para o dashboard.
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Sem sessão: as APIs respondem 401 em vez de redirecionar.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Sem sessão: todas as páginas privadas (e a raiz) vão para o login.
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/clients/:path*",
    "/schedule/:path*",
    "/training/:path*",
    "/progress/:path*",
    "/goals/:path*",
    "/payments/:path*",
    "/contacts/:path*",
    "/api/:path*",
  ],
};
