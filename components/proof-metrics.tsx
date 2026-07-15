import type { ReactNode } from "react";
import { PROOF_METRICS } from "../data/site";
import {
  LITEPSM_METRICS_SOURCE_ID,
  type LitePsmMetrics,
} from "../lib/litepsm-metrics";
import SourceNoteLink from "./source-note-link";
import c from "../styles/site.module.css";

interface ProofMetric {
  value: ReactNode;
  label: string;
  description: ReactNode;
}

interface Props {
  litePsmMetrics?: LitePsmMetrics;
}

function getProofMetrics(litePsmMetrics?: LitePsmMetrics): ProofMetric[] {
  return PROOF_METRICS.map((metric) => {
    if (!litePsmMetrics || metric.label !== "LitePSM stablecoin liquidity") {
      return metric;
    }

    return {
      value: (
        <>
          {litePsmMetrics.displayTvl}
          <SourceNoteLink
            className={c.sourceAsterisk}
            sourceId={LITEPSM_METRICS_SOURCE_ID}
            ariaLabel="View LitePSM metric source note"
          >
            †
          </SourceNoteLink>
        </>
      ),
      label: "Current LitePSM TVL",
      description: `Dewiz built LitePSM, a capital-efficient stablecoin module serving ${litePsmMetrics.displayTvl} in current TVL and ${litePsmMetrics.displayTradedVolume} in estimated all-time traded volume for the Sky Protocol (former MakerDAO) ecosystem.`,
    };
  });
}

export default function ProofMetrics({ litePsmMetrics }: Props) {
  const metrics = getProofMetrics(litePsmMetrics);

  return (
    <div className={c.metricGrid}>
      {metrics.map((metric) => (
        <article className={c.metricCard} key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <p>{metric.description}</p>
        </article>
      ))}
    </div>
  );
}
