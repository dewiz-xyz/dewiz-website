import Layout from "../components/layout";
import ProofMetrics from "../components/proof-metrics";
import CaseStudyList from "../components/case-study-list";
import { mailto } from "../data/site";
import c from "../styles/site.module.css";

const capabilities = [
  "EVM protocol architecture and smart contract implementation",
  "Specification-driven development for capital-sensitive systems",
  "Governance on-chain vote design, review, and execution support",
  "Security-focused test suites, reviews, formal verification coordination, and audit readiness",
  "On-chain and off-chain integrations for protocol operations",
  "Operational support for production DeFi systems after launch",
];

export default function SmartContractDevelopment() {
  return (
    <Layout
      title="Smart Contracts & Consulting"
      description="Dewiz provides EVM smart contract development, DeFi protocol consulting, and GovOps execution support."
    >
      <section className={c.hero}>
        <div className={c.hero__copy}>
          <span className={c.eyebrow}>Smart Contracts & Consulting</span>
          <h1>EVM engineering for protocols where correctness is not optional.</h1>
          <p>
            Dewiz has grown from smart contract development and consultancy for Sky, MakerDAO, and
            other DeFi protocols. We build and operate systems that govern stablecoin liquidity,
            token rewards, stability parameters, and executive-vote execution.
          </p>
          <div className={c.actions}>
            <a className={c.buttonPrimary} href={mailto("Smart contract development inquiry")}>
              Discuss an engagement
            </a>
            <a
              className={c.buttonSecondary}
              href="https://paragraph.com/@dewiz.xyz/exploring-makerdao-s-psm-and-the-advent-of-litepsm-a-technical-deep-dive"
              target="_blank"
              rel="noreferrer noopener"
            >
              Read LitePSM case study
            </a>
          </div>
        </div>
        <div className={c.heroPanel}>
          <span className={c.eyebrow}>Selected delivery</span>
          <ul>
            <li>LitePSM for multi-billion stablecoin liquidity</li>
            <li>Sky Endgame token rewards architecture</li>
            <li>SP-BEAM for bounded stability parameter updates</li>
            <li>GovOps execution support for Sky executive votes</li>
          </ul>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Capabilities</span>
          <h2>Engineering support from design through production operations.</h2>
        </div>
        <div className={c.checkGrid}>
          {capabilities.map((capability) => (
            <article key={capability}>
              <span aria-hidden="true">+</span>
              <p>{capability}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Proof of execution</span>
          <h2>Protocol work with visible on-chain consequences.</h2>
        </div>
        <ProofMetrics />
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Case studies</span>
          <h2>Representative work across protocol engineering and GovOps.</h2>
        </div>
        <CaseStudyList />
      </section>

      <section className={c.ctaBand}>
        <span className={c.eyebrow}>Smart Contracts & Consulting</span>
        <h2>Bring Dewiz into your protocol architecture, launch, or GovOps workflow.</h2>
        <a className={c.buttonPrimary} href={mailto("Smart contract development inquiry")}>
          Contact partnerships
        </a>
      </section>
    </Layout>
  );
}
