import {
  LITEPSM_METRICS_SOURCE_ID,
  type LitePsmMetrics,
} from "../lib/litepsm-metrics";

interface Props {
  litePsmMetrics: LitePsmMetrics;
}

export default function LitePsmMetricsSourceNote({ litePsmMetrics }: Props) {
  return (
    <p id={LITEPSM_METRICS_SOURCE_ID}>
      † LitePSM TVL uses{" "}
      <a href={litePsmMetrics.tvlSourceUrl} target="_new" rel="noreferrer noopener">
        Sky Info&apos;s reported collateral value
      </a>{" "}
      for LITE-PSM-USDC-A. Estimated all-time traded volume sums absolute dart deltas from{" "}
      <a href={litePsmMetrics.activitySourceUrl} target="_new" rel="noreferrer noopener">
        Sky Info LitePSM events
      </a>{" "}
      since {litePsmMetrics.firstEventDateDisplay}. Traded volume is not presented as TVL.
      {litePsmMetrics.isTvlFallback ? (
        <>
          {" "}Fallback TVL was calculated on July 8, 2026.{" "}
          <a href={litePsmMetrics.tvlSourceUrl} target="_new" rel="noreferrer noopener">
            Visit Sky Info for current TVL
          </a>{" "}
          instead.
        </>
      ) : null}
      {litePsmMetrics.isTradedVolumeFallback ? (
        <>
          {" "}Fallback traded volume was calculated through July 8, 2026.{" "}
          <a href={litePsmMetrics.activitySourceUrl} target="_new" rel="noreferrer noopener">
            Visit Sky Info activity
          </a>{" "}
          for current event data.
        </>
      ) : null}
    </p>
  );
}
