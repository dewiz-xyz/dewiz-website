import type { GetStaticProps } from "next";
import { useEffect, useRef } from "react";
import Layout from "../components/layout";
import ProofMetrics from "../components/proof-metrics";
import CaseStudyList from "../components/case-study-list";
import LitePsmMetricsSourceNote from "../components/litepsm-metrics-source-note";
import SkyProtocolValueSourceNote from "../components/sky-protocol-value-source-note";
import SourceNoteLink from "../components/source-note-link";
import { PROTOCOL_ROADMAP, mailto } from "../data/site";
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

export default function DSolver({ skyProtocolValue, litePsmMetrics }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      const video = videoRef.current;
      if (!video) return;

      if (mediaQuery.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch(() => undefined);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <Layout
      title="dSolver"
      description="dSolver is Dewiz's institutional solver and inventory infrastructure business line for intent-based DeFi markets."
      footerSourceNote={
        <>
          <SkyProtocolValueSourceNote skyProtocolValue={skyProtocolValue} />
          <LitePsmMetricsSourceNote litePsmMetrics={litePsmMetrics} />
        </>
      }
    >
      <section className={`${c.hero} ${c.solverHero}`}>
        <div className={c.hero__copy}>
          <span className={c.eyebrow}>Solver infrastructure</span>
          <h1>dSolver brings institutional inventory discipline to intent settlement.</h1>
          <p>
            dSolver is Dewiz&apos;s solver business line, launching first around CoW-style intent flow
            and expanding toward other swap and cross-chain intent protocols. The objective is to
            win competitive order flow through stronger routing, disciplined inventory management,
            and protocol-native execution.
          </p>
          <div className={c.actions}>
            <a className={c.buttonPrimary} href={mailto("dSolver partnership inquiry")}>
              Discuss dSolver
            </a>
          </div>
        </div>
        <div className={`${c.hero__visual} ${c.heroVisualClean}`}>
          <video
            ref={videoRef}
            className={c.heroDiagram}
            aria-label="dSolver liquidity execution engine animated diagram"
            loop
            muted
            playsInline
            poster="/dsolver-execution-engine.png"
          >
            <source src="/dsolver-center-hero-transparent-alpha.webm" type="video/webm" />
            <source src="/dsolver-execution-engine.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Why inventory matters</span>
          <h2>Routing quality is only one side of the solver battleground.</h2>
        </div>
        <div className={c.textGrid}>
          <article>
            <h3>Internal inventory as a competitive edge</h3>
            <p>
              Intent protocols reward solvers that can quote quickly, settle reliably, and improve
              user outcomes. dSolver is built around the view that internal inventory is as
              important as routing logic, because balance-sheet depth allows better quotes without
              depending entirely on public AMM liquidity.
            </p>
          </article>
          <article>
            <h3>Opening the field for independent solvers</h3>
            <p>
              Dewiz is working toward an on-chain protocol that lets independent solvers use
              on-chain liquidity as internal inventory priced against centralized exchange
              references. The goal is to help smaller solver teams compete against large private
              market makers that are centralizing intent volume.
            </p>
          </article>
          <article>
            <h3>Institutional liquidity partners</h3>
            <p>
              The dSolver business line is positioned for institutions that want exposure to real
              DeFi settlement activity as liquidity partners, including future vault-based
              structures and potential integrations with Sky Stars.
            </p>
          </article>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Roadmap</span>
          <h2>From swap intents to cross-chain settlement.</h2>
        </div>
        <div className={c.tokenList}>
          {PROTOCOL_ROADMAP.map((protocol) => (
            <span
              className={protocol.status === "Enabled now" ? c.tokenList__active : c.tokenList__soon}
              key={protocol.name}
            >
              <strong>{protocol.name}</strong>
              <small>{protocol.status}</small>
            </span>
          ))}
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
          <span className={c.eyebrow}>Reference materials</span>
          <h2>Case studies.</h2>
        </div>
        <CaseStudyList litePsmMetrics={litePsmMetrics} />
      </section>
    </Layout>
  );
}
