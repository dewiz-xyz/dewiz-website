import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ANALYTICS_CONSENT_OPEN_EVENT,
  ANALYTICS_CONSENT_STORAGE_KEY,
  type AnalyticsConsentValue,
  loadGoogleTagManager,
  unloadGoogleTagManager,
} from "../lib/analytics-consent";
import c from "./analytics-consent.module.css";

type ConsentState = AnalyticsConsentValue | "checking" | "unset";

const BANNER_COPY =
  "Dewiz tracks website behavior to understand site traffic and improve the website. Tracking only starts if you accept.";

function readStoredConsent(): AnalyticsConsentValue | null {
  try {
    const storedValue = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return storedValue === "accepted" || storedValue === "declined" ? storedValue : null;
  } catch {
    return null;
  }
}

function writeStoredConsent(value: AnalyticsConsentValue) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, value);
  } catch {
    // If storage is unavailable, the current-page choice still applies.
  }
}

export default function AnalyticsConsent() {
  const [consentState, setConsentState] = useState<ConsentState>("checking");

  useEffect(() => {
    const storedConsent = readStoredConsent();

    if (storedConsent === "accepted") {
      loadGoogleTagManager();
      setConsentState("accepted");
    } else if (storedConsent === "declined") {
      setConsentState("declined");
    } else {
      setConsentState("unset");
    }

    function openConsentSettings() {
      setConsentState("unset");
    }

    window.addEventListener(ANALYTICS_CONSENT_OPEN_EVENT, openConsentSettings);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_OPEN_EVENT, openConsentSettings);
    };
  }, []);

  function updateConsent(value: AnalyticsConsentValue) {
    writeStoredConsent(value);
    setConsentState(value);

    if (value === "accepted") {
      loadGoogleTagManager();
      return;
    }

    unloadGoogleTagManager();
  }

  if (consentState !== "unset") {
    return null;
  }

  return (
    <aside className={c.banner} aria-label="Analytics consent">
      <p>
        {BANNER_COPY}{" "}
        <Link className={c.policyLink} href="/cookie-policy">
          Cookie Policy
        </Link>
      </p>
      <div className={c.actions}>
        <button className={c.buttonSecondary} type="button" onClick={() => updateConsent("declined")}>
          Reject
        </button>
        <button className={c.buttonPrimary} type="button" onClick={() => updateConsent("accepted")}>
          Accept
        </button>
      </div>
    </aside>
  );
}
