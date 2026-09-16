/**
 * Where auth flows send people. Split out so the dashboard deployment can
 * point back at the marketing site for login by setting LOGIN_URL, while the
 * main site keeps using its own /login route.
 *
 * No server-only import here — proxy.ts needs these too.
 */

/** Absolute URL when set (e.g. dash.myremedy.app sending users to the main site). */
export function loginUrl(): string {
  return process.env.LOGIN_URL || "/login";
}

export function dashboardUrl(): string {
  return process.env.DASHBOARD_URL || "https://dash.myremedy.app";
}

/** Where to send someone who is already signed in and lands on /login. */
export function afterLoginUrl(): string {
  return dashboardUrl();
}
