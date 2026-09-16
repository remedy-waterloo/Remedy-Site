import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/session-token";

/**
 * Optimistic auth checks only.
 *
 * This runs on every matched route, including prefetches, so it verifies the
 * signed cookie and nothing else — no DynamoDB reads. The authoritative check
 * (session still exists, inside the idle/absolute windows) lives in the DAL,
 * next to the data it protects.
 */
const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_ROUTES = ["/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Signed-in users have no reason to see the login or signup forms.
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp)$).*)"],
};
