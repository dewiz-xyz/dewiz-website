export const GTM_ID = "GTM-MZKZPD6M";
export const ANALYTICS_CONSENT_STORAGE_KEY = "dewiz_analytics_consent_v1";
export const ANALYTICS_CONSENT_OPEN_EVENT = "dewiz:open-analytics-consent";

export type AnalyticsConsentValue = "accepted" | "declined";

type GtmWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function loadGoogleTagManager() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (document.getElementById("dewiz-gtm-script")) {
    return;
  }

  const gtmWindow = window as GtmWindow;
  gtmWindow.dataLayer = gtmWindow.dataLayer || [];
  gtmWindow.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const firstScript = document.getElementsByTagName("script")[0];
  const script = document.createElement("script");
  script.async = true;
  script.id = "dewiz-gtm-script";
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

  if (firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
    return;
  }

  document.head.appendChild(script);
}

export function unloadGoogleTagManager() {
  if (typeof document === "undefined") {
    return;
  }

  document.getElementById("dewiz-gtm-script")?.remove();
}
