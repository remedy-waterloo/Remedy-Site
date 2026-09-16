import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/app/lib/session-token";
import { loginUrl } from "@/app/lib/urls";

/**
 * Optimistic auth checks only.
 *
 * This runs on every matched route, including prefetches, so it verifies the
 * signed cookie and nothing else — no DynamoDB reads. The authoritative check
 * (session still exists, inside the idle/absolute windows) lives in the DAL.
 *
 * Because this check is optimistic it may only ever *deny* access, never grant
 * it and never redirect someone away from signing in. A token can outlive its
 * session — the JWT carries the 7-day absolute expiry while the 30-minute idle
 * timeout is enforced in DynamoDB — so a "valid" token here does not mean the
 * user is actually logged in. Redirecting on that basis previously trapped
 * users: the navbar showed "Log in", but /login bounced them back home, with no
 * way out until the cookie expired. That decision now lives in the login and
 * signup pages, which can consult the database.
 */
const PROTECTED_ROUTES = ["/admin"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    const target = loginUrl();
    const destination = target.startsWith("http")
      ? new URL(target)
      : new URL(target, request.url);
    destination.searchParams.set("next", pathname);
    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp)$).*)"],
};
