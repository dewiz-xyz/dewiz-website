import Link from "next/link";
import { ReactNode } from "react";
import { CONTACT_EMAIL, SOCIAL_LINKS, mailto } from "../data/site";
import LogoDiscord from "../public/logo-discord.svg";
import LogoGithub from "../public/logo-github.svg";
import LogoParagraph from "../public/logo-paragraph.svg";
import LogoX from "../public/logo-x.svg";
import c from "./footer.module.css";

const iconByLabel = {
  Discord: <LogoDiscord aria-hidden="true" role="img" />,
  Paragraph: <LogoParagraph aria-hidden="true" role="img" />,
  X: <LogoX aria-hidden="true" role="img" />,
  GitHub: <LogoGithub aria-hidden="true" role="img" />,
};

interface Props {
  sourceNote?: ReactNode;
}

export default function Footer({ sourceNote }: Props) {
  return (
    <footer className={c.footer}>
      <div className={c.footer__top}>
        <div>
          <strong>Dewiz</strong>
          <p>DeFi infrastructure engineering, solver operations, and protocol GovOps.</p>
        </div>
        <a className={c.footer__cta} href={mailto("Dewiz partnership inquiry")}>
          {CONTACT_EMAIL}
        </a>
      </div>
      {sourceNote ? (
        <div className={c.footer__source} id="sky-protocol-value-source">
          {sourceNote}
        </div>
      ) : null}
      <div className={c.footer__bottom}>
        <nav aria-label="Footer navigation">
          <Link href="/dsolver">dSolver</Link>
          <Link href="/smart-contract-development">Smart Contracts & Consulting</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav className={c.social} aria-label="Social links">
          {SOCIAL_LINKS.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer noopener" key={link.label}>
              {iconByLabel[link.label as keyof typeof iconByLabel]}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <span>© {new Date().getFullYear()} Dewiz. All rights reserved.</span>
      </div>
    </footer>
  );
}
