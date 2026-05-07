import { CASE_STUDIES } from "../data/site";
import c from "../styles/site.module.css";

export default function CaseStudyList() {
  return (
    <div className={c.cardGrid}>
      {CASE_STUDIES.map((study) => (
        <a
          className={c.caseCard}
          href={study.href}
          key={study.title}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className={c.eyebrow}>{study.eyebrow}</span>
          <h3>{study.title}</h3>
          <p>{study.description}</p>
        </a>
      ))}
    </div>
  );
}
