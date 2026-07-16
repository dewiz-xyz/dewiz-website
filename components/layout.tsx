import Head from "next/head";
import { ReactNode } from "react";
import AnalyticsConsent from "./analytics-consent";
import Header from "./header";
import Footer from "./footer";
import PerspectiveBackground from "./perspective-background";
import c from "../styles/site.module.css";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  footerSourceNote?: ReactNode;
}

export default function Layout({ title, description, children, footerSourceNote }: Props) {
  const pageTitle = title === "Dewiz" ? "Dewiz | DeFi Infrastructure" : `${title} | Dewiz`;

  return (
    <div className={c.app}>
      <PerspectiveBackground />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00b2e2" />
        <meta name="msapplication-TileColor" content="#001a1a" />
        <meta name="theme-color" content="#001a1a" />
      </Head>
      <Header />
      <main className={c.main} id="main-content">
        {children}
      </main>
      <Footer sourceNote={footerSourceNote} />
      <AnalyticsConsent />
    </div>
  );
}
