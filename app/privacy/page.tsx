import type { Metadata } from "next";
import Link from "next/link";

import LegalPage from "@/app/components/LegalPage";
import { CONTACT_EMAIL } from "@/app/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Policy — Remedy",
  description: "How Remedy Technologies Inc. collects, uses and protects personal information",
};

/*
 * DRAFT — have a lawyer review before real patient data flows through the
 * product. Keep this in sync with the code: if you add analytics, new cookies,
 * new processors or change where data is stored, update the matching section.
 */
export default function PrivacyPage() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

  return (
    <LegalPage title="Privacy Policy" effectiveDate="November 15, 2026">
      <p>
        Remedy Technologies Inc. (&quot;Remedy&quot;, &quot;we&quot;,
        &quot;us&quot;) builds Remedy Zero, a countertop medication dispenser,
        and the Remedy dashboard. This policy explains what personal
        information we collect through myremedy.app, the dashboard and Remedy
        Zero devices, how we use it, and the choices you have. We handle
        personal information in accordance with Canada&apos;s Personal
        Information Protection and Electronic Documents Act (PIPEDA).
      </p>
      <p>
        Remedy is currently in an invite-only pilot. We will update this policy
        as the product changes.
      </p>

      <h2>Information we collect</h2>

      <h3>Account information</h3>
      <ul>
        <li>Your name and email address</li>
        <li>
          Your password, which we never store in readable form. We keep only a
          salted, one-way hash of it.
        </li>
      </ul>

      <h3>Session information</h3>
      <p>
        When you log in we create a session record containing a random
        identifier, your account ID and the times the session was created and
        expires. We do not record your IP address or browser details as part
        of your session.
      </p>

      <h3>Information from Remedy Zero and the dashboard</h3>
      <p>When you or your care team use Remedy Zero, we process:</p>
      <ul>
        <li>Profiles for the people who use the device, such as their names</li>
        <li>Medication schedules and the medications loaded into the device</li>
        <li>Records of doses dispensed, taken or missed, with timestamps</li>
        <li>Device status, such as whether it is online and its stock levels</li>
        <li>
          Biometric information captured by the device&apos;s infrared sensor,
          used only to confirm a person&apos;s identity before a dose is
          dispensed
        </li>
      </ul>
      <p>
        Medication and dose records are personal health information. We use
        them only to provide the service to you and the people you authorize.
        We never use biometric information for any purpose other than identity
        verification at the device.
      </p>

      <h3>Information you send us</h3>
      <p>
        If you email us, for example to request early access, we receive your
        email address and anything you include in your message.
      </p>

      <h3>What we do not collect</h3>
      <p>
        Our website does not use analytics, advertising or tracking tools, and
        we do not build profiles of visitors.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To create and secure your account and keep you logged in</li>
        <li>To run Remedy Zero, including dispensing doses on schedule</li>
        <li>
          To show adherence information to you and to the caregivers, family
          members, clinicians or care home staff you authorize
        </li>
        <li>To respond to your messages and requests</li>
        <li>To keep the service secure and fix problems</li>
        <li>To meet our legal obligations</li>
      </ul>
      <p>
        We do not sell personal information, and we do not use it for
        advertising.
      </p>

      <h2>Consent</h2>
      <p>
        We collect, use and disclose personal information with your consent,
        except where the law allows otherwise. By creating an account you
        consent to the uses described in this policy. You may withdraw consent
        at any time by contacting us, although this may mean we can no longer
        provide the service.
      </p>
      <p>
        If you add information about another person, such as a parent or a
        resident of your care home, you must have that person&apos;s consent or
        the legal authority to act on their behalf.
      </p>

      <h2>Who we share information with</h2>
      <ul>
        <li>
          <strong>People you authorize.</strong> Adherence and device
          information is visible to the people you give access to.
        </li>
        <li>
          <strong>Service providers.</strong> We use Amazon Web Services (AWS)
          to store data and a cloud hosting provider to run our website. They
          process information only on our instructions.
        </li>
        <li>
          <strong>Legal requirements.</strong> We may disclose information when
          required by law, such as in response to a valid court order.
        </li>
        <li>
          <strong>Business transfers.</strong> If Remedy is involved in a
          merger or acquisition, information may be transferred as part of
          that transaction, subject to this policy.
        </li>
      </ul>

      <h2>Where your information is stored</h2>
      <p>
        Our data is stored with AWS in the United States (US East region).
        Information stored outside Canada is subject to the laws of that
        country and may be accessible to its courts, law enforcement and
        national security authorities.
      </p>

      <h2>How long we keep information</h2>
      <ul>
        <li>
          Account, device and dose records are kept while your account is
          active
        </li>
        <li>
          Sessions expire after 30 minutes of inactivity, and no later than 7
          days after you log in
        </li>
        <li>Emails are kept as long as needed to respond and follow up</li>
      </ul>
      <p>
        When you ask us to delete your account, we delete your information
        within 30 days unless the law requires us to keep it.
      </p>

      <h2>How we protect information</h2>
      <p>
        All traffic to Remedy is encrypted in transit with HTTPS, and our
        database is encrypted at rest. Passwords are stored only as salted
        hashes. Session cookies cannot be read by scripts on the page, and
        access to production data is restricted to the people who need it to
        run the service. No system is perfectly secure, but we take reasonable
        measures appropriate to the sensitivity of the information.
      </p>

      <h2>Cookies</h2>
      <p>
        We use one cookie, <strong>remedy_session</strong>, to keep you logged
        in. It is strictly necessary for the dashboard to work, so it does not
        require a consent banner. It is cleared when you close your browser, or
        after 7 days if you choose &quot;Keep me signed in&quot;. We do not use
        analytics or advertising cookies.
      </p>

      <h2>Children</h2>
      <p>
        Our website and accounts are not intended for children, and account
        holders must have reached the age of majority where they live. A parent
        or guardian may add a child&apos;s medication schedule to a Remedy Zero
        device on that child&apos;s behalf.
      </p>

      <h2>Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>Tell you what personal information we hold about you</li>
        <li>Correct information that is inaccurate</li>
        <li>Delete your account and information</li>
        <li>Withdraw your consent</li>
      </ul>
      <p>
        Email {mail} with your request. We will respond within 30 days. If you
        are not satisfied with our response, you can contact the{" "}
        <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">
          Office of the Privacy Commissioner of Canada
        </a>
        .
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We will post any changes on this page and update the effective date.
        If a change materially affects how we use your information, we will
        notify account holders by email before it takes effect.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy or your information can be sent to our
        Privacy Officer at {mail}. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
