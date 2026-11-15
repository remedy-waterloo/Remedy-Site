import type { Metadata } from "next";
import Link from "next/link";

import LegalPage from "@/app/components/LegalPage";
import { CONTACT_EMAIL } from "@/app/lib/contact";

export const metadata: Metadata = {
  title: "Terms of Service — Remedy",
  description: "The terms that apply to using Remedy, the Remedy dashboard and Remedy Zero",
};

/* DRAFT — have a lawyer review before general availability. */
export default function TermsPage() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

  return (
    <LegalPage title="Terms of Service" effectiveDate="November 15, 2026">
      <p>
        These terms are an agreement between you and Remedy Technologies Inc.
        (&quot;Remedy&quot;, &quot;we&quot;, &quot;us&quot;). They apply when
        you use myremedy.app, the Remedy dashboard and Remedy Zero devices
        (together, the &quot;Service&quot;). By creating an account or using
        the Service, you agree to these terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>1. Not medical advice</h2>
      <p>
        <strong>
          Remedy is a medication management tool. It does not provide medical
          advice, diagnosis or treatment, and it does not replace your
          physician, pharmacist or other healthcare provider.
        </strong>
      </p>
      <ul>
        <li>Always follow the directions of the person who prescribed your medication</li>
        <li>
          Check that medications are loaded correctly and match the
          prescription
        </li>
        <li>
          Keep a backup plan in case a device is offline, out of stock or not
          working
        </li>
        <li>In a medical emergency, call 911 or your local emergency number</li>
      </ul>

      <h2>2. The pilot program</h2>
      <p>
        Remedy is currently available by invitation only as part of a pilot.
        Features may change, and we may add, modify or discontinue parts of
        the Service as we develop it. If you receive a Remedy Zero device
        through the pilot, any separate written agreement about that device
        applies alongside these terms.
      </p>

      <h2>3. Who can use Remedy</h2>
      <p>
        You must have reached the age of majority where you live to create an
        account. If you set up Remedy for someone else, such as a parent,
        patient or resident, you confirm that you have their consent or the
        legal authority to act on their behalf. Care facilities are
        responsible for the accounts they create for their staff and for
        obtaining any consents their residents must give.
      </p>

      <h2>4. Your account</h2>
      <ul>
        <li>Provide accurate information and keep it up to date</li>
        <li>Keep your password confidential and do not share your account</li>
        <li>Tell us right away at {mail} if you suspect unauthorized access</li>
      </ul>
      <p>You are responsible for activity that happens under your account.</p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for anything unlawful</li>
        <li>
          Access or attempt to access accounts, data or systems you are not
          authorized to use
        </li>
        <li>Interfere with or disrupt the Service or its security</li>
        <li>
          Tamper with a Remedy Zero device in a way that bypasses its locks or
          identity verification
        </li>
      </ul>

      <h2>6. Your information</h2>
      <p>
        You own the information you put into Remedy. You give us permission to
        store and process it only as needed to provide the Service, as
        described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>7. Our intellectual property</h2>
      <p>
        The Service, including its software, design and the Remedy name and
        logo, belongs to Remedy and its licensors. These terms do not give you
        any rights to them beyond using the Service as intended.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        Because Remedy is in a pilot, the Service is provided &quot;as is&quot;
        and &quot;as available&quot;. To the extent permitted by law, we do not
        promise that it will be uninterrupted, error-free or suitable for any
        particular purpose. Some jurisdictions do not allow these disclaimers,
        so they may not all apply to you.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, Remedy is not liable for indirect,
        incidental, special or consequential damages arising from your use of
        the Service. Nothing in these terms limits liability that cannot be
        limited under applicable law, including consumer protection law.
      </p>

      <h2>10. Ending your use</h2>
      <p>
        You can stop using Remedy at any time and ask us to delete your account
        by emailing {mail}. We may suspend or close an account that violates
        these terms or puts other users or the Service at risk, and we will
        tell you why unless the law prevents it.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms as the Service changes. We will post the new
        version on this page with a new effective date, and notify account
        holders by email of any material change before it takes effect.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of the Province of Ontario and
        the federal laws of Canada that apply there.
      </p>

      <h2>13. Contact us</h2>
      <p>
        Remedy Technologies Inc., Waterloo, Ontario, Canada. Email {mail}.
      </p>
    </LegalPage>
  );
}
