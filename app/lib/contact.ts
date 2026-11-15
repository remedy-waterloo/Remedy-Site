export const CONTACT_EMAIL = "smu@myremedy.app";

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

/** Individuals and families. */
export const EARLY_ACCESS_HREF = mailto("Remedy Zero early access");

/** Retirement homes and care facilities. */
export const RETIREMENT_HOME_HREF = mailto("Remedy pilot for our retirement home");
