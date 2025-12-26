import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Rotas públicas do admin
  const publicAdminPaths = ["/admin/login"];

  // Se é rota pública, permitir
  if (publicAdminPaths.includes(path)) {
    return NextResponse.next();
  }

  // Se é rota /admin, verificar autenticação
  if (path.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin_auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      // Redirecionar para login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
