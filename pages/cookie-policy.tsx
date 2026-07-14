import Layout from "../components/layout";
import c from "../styles/site.module.css";

const googleReferences = [
  {
    label: "GA4 cookie usage",
    href: "https://support.google.com/analytics/answer/11397207",
  },
  {
    label: "Google Analytics data safeguards",
    href: "https://support.google.com/analytics/answer/6004245",
  },
  {
    label: "GA4 automatically collected events",
    href: "https://support.google.com/analytics/answer/9234069",
  },
  {
    label: "GA4 enhanced measurement events",
    href: "https://support.google.com/analytics/answer/9216061",
  },
];

export default function CookiePolicy() {
  return (
    <Layout
      title="Cookie Policy"
      description="Dewiz cookie policy for analytics consent, Google Analytics cookies, and basic website behavior tracking."
    >
      <section className={c.hero}>
        <div className={c.hero__copy}>
          <span className={c.eyebrow}>Cookie Policy</span>
          <h1>How Dewiz uses analytics cookies.</h1>
          <p>
            Last updated: July 9, 2026. This page explains what website behavior
            tracking includes when a visitor chooses Accept in the cookie banner.
          </p>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.policyBody}>
          <article>
            <h2>When analytics loads</h2>
            <p>
              Dewiz uses strict opt-in analytics consent. Analytics tracking loads only after a
              visitor clicks Accept in the banner. If the visitor clicks Reject, analytics does not
              load on future visits in the same browser unless browser storage is cleared or the
              visitor changes the choice through Cookie settings in the footer.
            </p>
          </article>

          <article>
            <h2>Consent storage</h2>
            <p>
              Dewiz stores one local browser value named{" "}
              <code>dewiz_analytics_consent_v1</code>. It stores either <code>accepted</code> or{" "}
              <code>declined</code> and is used only to remember the visitor&apos;s analytics
              choice.
            </p>
          </article>

          <article>
            <h2>Analytics cookies</h2>
            <p>
              If analytics is accepted, Google Analytics 4 may set first-party cookies on this
              website:
            </p>
            <ul>
              <li>
                <code>_ga</code>, with a default expiration of 2 years, used to distinguish users.
              </li>
              <li>
                <code>_ga_&lt;container-id&gt;</code>, with a default expiration of 2 years, used to
                persist session state.
              </li>
            </ul>
          </article>

          <article>
            <h2>Information included in basic tracking</h2>
            <p>Basic analytics tracking can include:</p>
            <ul>
              <li>Pages visited and page URLs.</li>
              <li>Page title and referrer.</li>
              <li>Language and screen resolution.</li>
              <li>Device and browser-related data.</li>
              <li>On-site activity events such as page views, first visit, session start, and user engagement.</li>
              <li>
                IP address may be processed by Google Analytics for service/security and approximate
                location, but Google states Analytics does not log or store IP addresses.
              </li>
            </ul>
          </article>

          <article>
            <h2>Change your choice</h2>
            <p>
              Use Cookie settings in the footer to reopen the banner and change your analytics
              choice. Rejecting prevents analytics from loading on future visits in the same browser
              unless storage is cleared.
            </p>
          </article>

          <article>
            <h2>References</h2>
            <p>These Google references describe GA4 cookies and basic analytics data collection.</p>
            <div className={c.linkGrid}>
              {googleReferences.map((reference) => (
                <a
                  href={reference.href}
                  target="_new"
                  rel="noreferrer noopener"
                  key={reference.href}
                >
                  {reference.label}
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
