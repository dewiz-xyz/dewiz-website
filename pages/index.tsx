import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/layout";
import ProofMetrics from "../components/proof-metrics";
import CaseStudyList from "../components/case-study-list";
import LitePsmMetricsSourceNote from "../components/litepsm-metrics-source-note";
import SkyProtocolValueSourceNote from "../components/sky-protocol-value-source-note";
import SourceNoteLink from "../components/source-note-link";
import { mailto } from "../data/site";
import { getLitePsmMetrics, type LitePsmMetrics } from "../lib/litepsm-metrics";
import {
  getSkyProtocolValue,
  SKY_PROTOCOL_VALUE_SOURCE_ID,
  type SkyProtocolValue,
} from "../lib/sky-protocol-value";
import c from "../styles/site.module.css";

interface Props {
  skyProtocolValue: SkyProtocolValue;
  litePsmMetrics: LitePsmMetrics;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [skyProtocolValue, litePsmMetrics] = await Promise.all([
    getSkyProtocolValue(),
    getLitePsmMetrics(),
  ]);

  return {
    props: {
      skyProtocolValue,
      litePsmMetrics,
    },
    revalidate: 60 * 60,
  };
};

export default function Home({ skyProtocolValue, litePsmMetrics }: Props) {
  return (
    <Layout
      title="Dewiz"
      description="Dewiz builds DeFi infrastructure across intent solver operations, EVM smart contracts, and protocol governance operations."
      footerSourceNote={
        <>
          <SkyProtocolValueSourceNote skyProtocolValue={skyProtocolValue} />
          <LitePsmMetricsSourceNote litePsmMetrics={litePsmMetrics} />
        </>
      }
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
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Proof of execution</span>
          <h2>
            Securing{" "}
            <span className={c.valueCounter}>{skyProtocolValue.displayValue}</span> of Sky
            protocol value since 2021
            <SourceNoteLink
              className={c.sourceAsterisk}
              sourceId={SKY_PROTOCOL_VALUE_SOURCE_ID}
              ariaLabel="View Sky protocol value source note"
            >
              *
            </SourceNoteLink>
          </h2>
        </div>
        <ProofMetrics litePsmMetrics={litePsmMetrics} />
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
        <CaseStudyList litePsmMetrics={litePsmMetrics} />
      </section>

      <section className={c.ctaBand}>
        <span className={c.eyebrow}>Institutional DeFi infrastructure</span>
        <h2>Bring Dewiz into your next protocol, liquidity execution, or governance initiative.</h2>
        <a className={c.buttonPrimary} href={mailto("Dewiz partnership inquiry")}>
          Contact partnerships
        </a>
      </section>
    </Layout>
  );
}
