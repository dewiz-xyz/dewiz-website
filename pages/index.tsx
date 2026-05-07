import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import ProofMetrics from "../components/proof-metrics";
import CaseStudyList from "../components/case-study-list";
import { mailto } from "../data/site";
import LogoHatL from "../public/logo-hat-l.svg";
import c from "../styles/site.module.css";

export default function Home() {
  return (
    <Layout
      title="Dewiz"
      description="Dewiz builds DeFi infrastructure across intent solver operations, EVM smart contracts, and protocol governance operations."
    >
      <section className={c.hero}>
        <div className={c.hero__copy}>
          <span className={c.eyebrow}>DeFi infrastructure for institutions, protocols, and DAOs</span>
          <h1>Engineering the infrastructure behind institutional DeFi.</h1>
          <p>
            Dewiz operates at the point where smart contracts, liquidity, and governance execution
            meet. We serve professional institutions, companies, and DAOs through two business
            lines: dSolver intent infrastructure and EVM smart contract development.
          </p>
          <div className={c.actions}>
            <a className={c.buttonPrimary} href={mailto("Dewiz partnership inquiry")}>
              Start a conversation
            </a>
            <Link className={c.buttonSecondary} href="/dsolver">
              Explore dSolver
            </Link>
          </div>
        </div>
        <div className={c.hero__visual} aria-label="Dewiz and dSolver brands">
          <div className={c.dewizLogo}>
            <LogoHatL aria-label="Dewiz logo" role="img" />
          </div>
          <Image className={c.dsolverLogo} src="/dsolver-logo.png" alt="dSolver logo" width={512} height={512} priority />
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Proof of execution</span>
          <h2>Built around infrastructure that already carries real risk.</h2>
        </div>
        <ProofMetrics />
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Business lines</span>
          <h2>Two ways Dewiz helps serious DeFi teams move faster.</h2>
        </div>
        <div className={c.splitCards}>
          <article className={c.featureCard}>
            <span className={c.eyebrow}>dSolver</span>
            <h3>Execution Engine: Intent settlement and inventory infrastructure</h3>
            <p>
              dSolver is Dewiz&apos;s solver business line for intent-based swap protocols. It combines
              routing algorithms with internal inventory strategy so independent solver operations
              can compete with large professional market makers.
            </p>
            <Link href="/dsolver">View dSolver</Link>
          </article>
          <article className={c.featureCard}>
            <span className={c.eyebrow}>Smart Contracts & Consulting</span>
            <h3>EVM engineering, consulting, and protocol GovOps</h3>
            <p>
              Dewiz designs, implements, reviews, and executes critical smart contract systems for
              Sky and other DeFi protocols, including governance operations for executive votes.
            </p>
            <Link href="/smart-contract-development">View smart contract work</Link>
          </article>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Case studies</span>
          <h2>Selected public work and reference materials.</h2>
        </div>
        <CaseStudyList />
      </section>

      <section className={c.ctaBand}>
        <span className={c.eyebrow}>Institutional DeFi infrastructure</span>
        <h2>Bring Dewiz into your next protocol, solver, or governance initiative.</h2>
        <a className={c.buttonPrimary} href={mailto("Dewiz partnership inquiry")}>
          Contact partnerships
        </a>
      </section>
    </Layout>
  );
}
