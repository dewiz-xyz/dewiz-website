export interface LitePsmMetrics {
  displayTvl: string;
  currentTvlValue: string;
  displayTradedVolume: string;
  allTimeTradedVolumeValue: string;
  firstEventDate: string;
  firstEventDateDisplay: string;
  lastEventDate: string;
  lastEventDateDisplay: string;
  eventCount: number;
  tvlSourceUrl: string;
  activitySourceUrl: string;
  isFallback: boolean;
}

interface LitePsmCurrentResponse {
  ilk?: unknown;
  collateral_usd?: unknown;
}

interface LitePsmEvent {
  ilk?: unknown;
  datetime?: unknown;
  dart?: unknown;
}

interface LitePsmEventsResponse {
  count?: unknown;
  next?: unknown;
  results?: unknown;
}

const ILK = "LITE-PSM-USDC-A";
const CURRENT_API_URL = `https://info-sky.blockanalitica.com/groups/stablecoins/ilks/${ILK}/?days_ago=1`;
const EVENTS_API_URL = `https://info-sky.blockanalitica.com/groups/stablecoins/ilks/${ILK}/events/`;
export const LITEPSM_TVL_SOURCE_URL = `https://info.skyeco.com/collateral/stablecoins/${ILK}`;
export const LITEPSM_ACTIVITY_SOURCE_URL = `https://info.skyeco.com/collateral/stablecoins/${ILK}/activity`;
export const LITEPSM_METRICS_SOURCE_ID = "litepsm-metrics-source";

const ONE_BILLION = 1_000_000_000;
const MIN_TVL = 100_000_000;
const MAX_TVL = 20_000_000_000;
const MIN_TRADED_VOLUME = 1_000_000_000;
const MAX_TRADED_VOLUME = 1_000_000_000_000;
const PAGE_SIZE = 1000;
const MAX_EVENT_PAGES = 20;
const REQUEST_TIMEOUT_MS = 8000;

export const FALLBACK_LITEPSM_METRICS: LitePsmMetrics = {
  displayTvl: "$4.4B",
  currentTvlValue: "4405866614.048126000000000000000000000000000000",
  displayTradedVolume: "$328.2B",
  allTimeTradedVolumeValue: "328162593965.14",
  firstEventDate: "2024-07-30T20:30:11",
  firstEventDateDisplay: "July 30, 2024",
  lastEventDate: "2026-07-08T00:15:59",
  lastEventDateDisplay: "July 8, 2026",
  eventCount: 4010,
  tvlSourceUrl: LITEPSM_TVL_SOURCE_URL,
  activitySourceUrl: LITEPSM_ACTIVITY_SOURCE_URL,
  isFallback: true,
};

function parseFiniteNumber(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

function parsePositiveNumber(value: unknown) {
  const parsed = parseFiniteNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
}

function parseNonNegativeInteger(value: unknown) {
  const parsed = parseFiniteNumber(value);
  return parsed !== null && Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

function isIsoDateTime(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function formatBillions(value: number) {
  return `$${(value / ONE_BILLION).toFixed(1)}B`;
}

function formatDateLabel(value: string) {
  const normalizedValue = /(?:z|[+-]\d{2}:?\d{2})$/i.test(value) ? value : `${value}Z`;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(normalizedValue));
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeCurrentTvl(data: LitePsmCurrentResponse | null) {
  if (!data || data.ilk !== ILK) {
    return null;
  }

  const currentTvl = parsePositiveNumber(data.collateral_usd);
  if (currentTvl === null || currentTvl < MIN_TVL || currentTvl > MAX_TVL) {
    return null;
  }

  return {
    currentTvl,
    currentTvlValue: String(data.collateral_usd),
  };
}

async function fetchAllTimeTradedVolume() {
  let expectedCount: number | null = null;
  let eventCount = 0;
  let allTimeTradedVolume = 0;
  let firstEventDate: string | null = null;
  let lastEventDate: string | null = null;
  let hasNext = true;

  for (let page = 1; page <= MAX_EVENT_PAGES && hasNext; page += 1) {
    const data = await fetchJson<LitePsmEventsResponse>(
      `${EVENTS_API_URL}?p=${page}&p_size=${PAGE_SIZE}&order=order_index`,
    );

    if (!data || !Array.isArray(data.results)) {
      return null;
    }

    const parsedCount = parseNonNegativeInteger(data.count);
    if (parsedCount === null) {
      return null;
    }

    expectedCount ??= parsedCount;
    if (expectedCount !== parsedCount || expectedCount > PAGE_SIZE * MAX_EVENT_PAGES) {
      return null;
    }

    for (const event of data.results as LitePsmEvent[]) {
      if (event.ilk !== ILK || !isIsoDateTime(event.datetime)) {
        return null;
      }

      const dart = parseFiniteNumber(event.dart);
      if (dart === null) {
        return null;
      }

      firstEventDate ??= event.datetime;
      lastEventDate = event.datetime;
      allTimeTradedVolume += Math.abs(dart);
      eventCount += 1;
    }

    hasNext = typeof data.next === "string" && data.next.length > 0;
  }

  if (
    hasNext ||
    eventCount === 0 ||
    eventCount !== expectedCount ||
    allTimeTradedVolume < MIN_TRADED_VOLUME ||
    allTimeTradedVolume > MAX_TRADED_VOLUME ||
    firstEventDate === null ||
    lastEventDate === null
  ) {
    return null;
  }

  return {
    allTimeTradedVolume,
    allTimeTradedVolumeValue: allTimeTradedVolume.toFixed(2),
    firstEventDate,
    firstEventDateDisplay: formatDateLabel(firstEventDate),
    lastEventDate,
    lastEventDateDisplay: formatDateLabel(lastEventDate),
    eventCount,
  };
}

export async function getLitePsmMetrics(): Promise<LitePsmMetrics> {
  if (process.env.FORCE_LITEPSM_METRICS_FALLBACK === "1") {
    return FALLBACK_LITEPSM_METRICS;
  }

  const [current, tradedVolume] = await Promise.all([
    fetchJson<LitePsmCurrentResponse>(CURRENT_API_URL).then(normalizeCurrentTvl),
    fetchAllTimeTradedVolume(),
  ]);

  if (!current || !tradedVolume) {
    return FALLBACK_LITEPSM_METRICS;
  }

  return {
    displayTvl: formatBillions(current.currentTvl),
    currentTvlValue: current.currentTvlValue,
    displayTradedVolume: formatBillions(tradedVolume.allTimeTradedVolume),
    allTimeTradedVolumeValue: tradedVolume.allTimeTradedVolumeValue,
    firstEventDate: tradedVolume.firstEventDate,
    firstEventDateDisplay: tradedVolume.firstEventDateDisplay,
    lastEventDate: tradedVolume.lastEventDate,
    lastEventDateDisplay: tradedVolume.lastEventDateDisplay,
    eventCount: tradedVolume.eventCount,
    tvlSourceUrl: LITEPSM_TVL_SOURCE_URL,
    activitySourceUrl: LITEPSM_ACTIVITY_SOURCE_URL,
    isFallback: false,
  };
}
