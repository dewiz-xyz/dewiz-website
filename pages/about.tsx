import Layout from "../components/layout";
import TeamMemberCard from "../components/team-member-card";
import { TEAM_MEMBERS } from "../data/team";
import { mailto } from "../data/site";
import c from "../styles/site.module.css";

const values = [
  {
    title: "Security before scale",
    description:
      "We work on systems where mistakes can move markets. Design clarity, reviews, and operational discipline come before speed theater.",
  },
  {
    title: "Protocol-native execution",
    description:
      "Dewiz does not only write contracts. We understand governance processes, keeper operations, integrations, and the realities of production DeFi.",
  },
  {
    title: "Public verifiability",
    description:
      "We prefer infrastructure that can be inspected, monitored, and reasoned about on-chain by clients, governance, and users.",
  },
  {
    title: "Independent builders",
    description:
      "The team builds its reputation through deep technical contribution, public work, and long-term alignment with decentralized finance.",
  },
];

export default function About() {
  return (
    <Layout
      title="About"
      description="About Dewiz, its values, and the team behind Dewiz DeFi infrastructure engineering."
    >
      <section className={c.hero}>
        <div className={c.hero__copy}>
          <span className={c.eyebrow}>About Dewiz</span>
          <h1>A DeFi engineering team built around high-consequence systems.</h1>
          <p>
            Dewiz co-founders are former MakerDAO Core Unit contributors who have contributed to
            Sky and MakerDAO protocol work since 2021 and to the broader Ethereum ecosystem since
            2018. The team combines smart contract engineering, backend systems, product delivery,
            integrations, and governance operations.
          </p>
          <div className={c.actions}>
            <a className={c.buttonPrimary} href={mailto("Dewiz partnership inquiry")}>
              Contact Dewiz
            </a>
          </div>
        </div>
        <div className={c.heroPanel}>
          <span className={c.eyebrow}>Operating principle</span>
          <p>
            We build for protocols, institutions, and DAOs that need careful execution rather than
            disposable software.
          </p>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Values</span>
          <h2>The standards that shape our work.</h2>
        </div>
        <div className={c.cardGrid}>
          {values.map((value) => (
            <article className={c.featureCard} key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Team</span>
          <h2>The builders behind Dewiz.</h2>
        </div>
        <div className={c.teamGrid}>
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard className={c.teamItem} key={member.name} {...member} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
