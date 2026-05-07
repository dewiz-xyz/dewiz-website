import Layout from "../components/layout";
import { CONTACT_EMAIL, SOCIAL_LINKS, mailto } from "../data/site";
import c from "../styles/site.module.css";

const contactRoutes = [
  {
    title: "dSolver partnerships",
    description:
      "For institutions, protocols, and liquidity partners interested in solver operations, inventory infrastructure, or intent settlement.",
    href: mailto("dSolver partnership inquiry"),
  },
  {
    title: "Smart Contracts & Consulting",
    description:
      "For protocols, DAOs, and companies that need EVM engineering, reviews, integrations, or GovOps execution support.",
    href: mailto("Smart contract development inquiry"),
  },
  {
    title: "Institutional partnerships",
    description:
      "For broader strategic conversations across DeFi infrastructure, Sky ecosystem work, and protocol operations.",
    href: mailto("Institutional partnership inquiry"),
  },
];

export default function Contact() {
  return (
    <Layout
      title="Contact"
      description="Contact Dewiz for dSolver partnerships, smart contract development, GovOps, and institutional DeFi infrastructure work."
    >
      <section className={c.hero}>
        <div className={c.hero__copy}>
          <span className={c.eyebrow}>Contact</span>
          <h1>Start with the work. We will route the conversation from there.</h1>
          <p>
            Dewiz works with professional institutions, protocols, companies, and DAOs. Email is
            the primary contact route for new partnerships and client engagements.
          </p>
          <div className={c.actions}>
            <a className={c.buttonPrimary} href={mailto("Dewiz partnership inquiry")}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className={c.heroPanel}>
          <span className={c.eyebrow}>Response focus</span>
          <p>
            Please include the protocol or organization, the desired business line, timeline, and
            whether the discussion involves dSolver, smart contracts, GovOps, or institutional
            liquidity.
          </p>
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Inquiry routes</span>
          <h2>Choose the closest path.</h2>
        </div>
        <div className={c.cardGrid}>
          {contactRoutes.map((route) => (
            <a className={c.caseCard} href={route.href} key={route.title}>
              <h3>{route.title}</h3>
              <p>{route.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className={c.section}>
        <div className={c.sectionHeader}>
          <span className={c.eyebrow}>Current links</span>
          <h2>Follow Dewiz and review public work.</h2>
        </div>
        <div className={c.linkGrid}>
          {SOCIAL_LINKS.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer noopener" key={link.label}>
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}
