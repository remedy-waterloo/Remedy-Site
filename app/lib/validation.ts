/**
 * Small hand-rolled validators. Deliberately not a schema library — these are
 * two forms, and this keeps the dependency count down.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return "Email is required.";
  if (!EMAIL_PATTERN.test(value.trim())) return "Enter a valid email address.";
  return null;
}

export function validatePassword(value: unknown): string | null {
  if (typeof value !== "string" || !value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (value.length > 200) return "Password is too long.";
  if (!/[a-zA-Z]/.test(value)) return "Password must contain a letter.";
  if (!/[0-9]/.test(value)) return "Password must contain a number.";
  return null;
}

export function validateName(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  if (value.trim().length > 80) return "Name is too long.";
  return null;
}
