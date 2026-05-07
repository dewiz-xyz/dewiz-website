import { PROOF_METRICS } from "../data/site";
import c from "../styles/site.module.css";

export default function ProofMetrics() {
  return (
    <div className={c.metricGrid}>
      {PROOF_METRICS.map((metric) => (
        <article className={c.metricCard} key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
          <p>{metric.description}</p>
        </article>
      ))}
    </div>
  );
}
