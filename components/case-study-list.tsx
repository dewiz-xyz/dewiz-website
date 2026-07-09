import { CASE_STUDIES } from "../data/site";
import {
  LITEPSM_METRICS_SOURCE_ID,
  type LitePsmMetrics,
} from "../lib/litepsm-metrics";
import SourceNoteLink from "./source-note-link";
import c from "../styles/site.module.css";

interface Props {
  litePsmMetrics?: LitePsmMetrics;
}

export default function CaseStudyList({ litePsmMetrics }: Props) {
  return (
    <div className={c.cardGrid}>
      {CASE_STUDIES.map((study) => (
        <article className={c.caseCard} key={study.title}>
          <a className={c.caseCardMain} href={study.href} target="_blank" rel="noreferrer noopener">
            <span className={c.eyebrow}>{study.eyebrow}</span>
            <h3>{study.title}</h3>
            <p>{study.description}</p>
          </a>
          {litePsmMetrics && study.title === "LitePSM Technical Deep Dive" ? (
            <p className={c.caseMetricLine}>
              Current TVL: {litePsmMetrics.displayTvl} · est. all-time traded volume:{" "}
              {litePsmMetrics.displayTradedVolume}
              <SourceNoteLink
                className={c.sourceAsterisk}
                sourceId={LITEPSM_METRICS_SOURCE_ID}
                ariaLabel="View LitePSM metric source note"
              >
                †
              </SourceNoteLink>
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
