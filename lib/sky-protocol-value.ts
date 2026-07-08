export interface SkyProtocolValue {
  displayValue: string;
  collateralValue: string;
  stablecoinSupplyValue: string;
  combinedValue: string;
  asOfDate: string;
  sourceUrl: string;
  isFallback: boolean;
}

interface SkyOverallResponse {
  date?: unknown;
  total_collateral?: unknown;
  total?: unknown;
}

const API_URL = "https://info-sky.blockanalitica.com/overall/?days_ago=1";
export const SKY_INFO_SOURCE_URL = "https://info.skyeco.com/collateral";
const ONE_BILLION = 1_000_000_000;
const MIN_PROTOCOL_VALUE = 5_000_000_000;
const MAX_PROTOCOL_VALUE = 100_000_000_000;

export const FALLBACK_SKY_PROTOCOL_VALUE: SkyProtocolValue = {
  displayValue: "$25.0B",
  collateralValue: "13976344825.217355760199357262",
  stablecoinSupplyValue: "10982805661.968980383882567066",
  combinedValue: "24959150487.186336144081924328",
  asOfDate: "2026-07-08",
  sourceUrl: SKY_INFO_SOURCE_URL,
  isFallback: true,
};

function parsePositiveNumber(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function isPlainDecimal(value: unknown): value is string {
  return typeof value === "string" && /^\d+(\.\d+)?$/.test(value);
}

function addDecimalStrings(a: string, b: string) {
  const [aInt, aFrac = ""] = a.split(".");
  const [bInt, bFrac = ""] = b.split(".");
  const scale = Math.max(aFrac.length, bFrac.length);
  const left = BigInt(`${aInt}${aFrac.padEnd(scale, "0")}`);
  const right = BigInt(`${bInt}${bFrac.padEnd(scale, "0")}`);
  const sum = `${left + right}`.padStart(scale + 1, "0");

  if (scale === 0) {
    return sum;
  }

  return `${sum.slice(0, -scale)}.${sum.slice(-scale)}`.replace(/\.?0+$/, "");
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

function formatBillions(value: number) {
  return `$${(value / ONE_BILLION).toFixed(1)}B`;
}

function normalizeSkyProtocolValue(data: SkyOverallResponse): SkyProtocolValue | null {
  const collateral = parsePositiveNumber(data.total_collateral);
  const stablecoinSupply = parsePositiveNumber(data.total);

  if (
    collateral === null ||
    stablecoinSupply === null ||
    !isPlainDecimal(data.total_collateral) ||
    !isPlainDecimal(data.total) ||
    !isIsoDate(data.date)
  ) {
    return null;
  }

  const combined = collateral + stablecoinSupply;
  if (combined < MIN_PROTOCOL_VALUE || combined > MAX_PROTOCOL_VALUE) {
    return null;
  }

  const collateralValue = String(data.total_collateral);
  const stablecoinSupplyValue = String(data.total);

  return {
    displayValue: formatBillions(combined),
    collateralValue,
    stablecoinSupplyValue,
    combinedValue: addDecimalStrings(collateralValue, stablecoinSupplyValue),
    asOfDate: data.date,
    sourceUrl: SKY_INFO_SOURCE_URL,
    isFallback: false,
  };
}

export async function getSkyProtocolValue(): Promise<SkyProtocolValue> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return FALLBACK_SKY_PROTOCOL_VALUE;
    }

    const data = (await response.json()) as SkyOverallResponse;
    return normalizeSkyProtocolValue(data) ?? FALLBACK_SKY_PROTOCOL_VALUE;
  } catch {
    return FALLBACK_SKY_PROTOCOL_VALUE;
  }
}
