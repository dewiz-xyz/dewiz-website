import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import Header from "../components/header";
import Main from "../components/main";
import Footer from "../components/footer";
import TeamMemberCard from "../components/team-member-card";
import ContactCard from "../components/contact-card";
import LogoHatL from "../public/logo-hat-l.svg";
import avatarAmusingaxl from "../public/avatar-amusingaxl.png";
import avatar0x3phemeralsoul from "../public/avatar-0x3phemeralsoul.png";
import avatar0xdecr1pto from "../public/avatar-0xdecr1pto.png";
import avatar0xp3th1um from "../public/avatar-0xp3th1um.png";
import avatarOddaf from "../public/avatar-oddaf.png";
import LogoDiscord from "../public/logo-discord.svg";
import LogoTwitter from "../public/logo-twitter.svg";
import LogoGithub from "../public/logo-github.svg";
import c from "./index.module.css";

export default function Home() {
  return (
    <div className={c.root}>
      <Head>
        <title>Dewiz | DeFi Engineering Services</title>
        <meta name="description" content="Dewiz | DeFi Engineering Services" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00b2e2" />
        <meta name="msapplication-TileColor" content="#001a1a" />
        <meta name="theme-color" content="#001a1a" />
      </Head>
      <Header />
      <Main className={c.main}>
        <section className={c.section}>
          <span className={c.anchor} id="home"></span>
          <div className={c.section__content}>
            <div className={c.content}>
              <div className={c.home_logo__wrapper}>
                <LogoHatL />
              </div>
              <h1 className="srOnly">Dewiz</h1>
              <h2 className={c.section__title}>DeFi Engineering Services</h2>
              <p>
                We believe that financial inclusion is a basic human right.
                Dewiz’s mission is to help “de-wizarding” DeFi, making it more
                accessible to the “commoners”.
              </p>
              <p>
                Dewiz provides engineering services to impactful DeFi projects.
                We enable DeFi innovators to build on top of the main DeFi
                protocols, providing technical expertise on both on-chain and
                off-chain integrations that can save 1000s of hours in
                engineering resources and put your project on the fast-track of
                the new financial world.
              </p>
            </div>
          </div>
        </section>
        <section className={c.section}>
          <span className={c.anchor} id="about-us"></span>
          <div className={c.section__content}>
            <h2 className={c.section__title}>About Us</h2>
            <p>
              We are buidlers! Dewiz co-founders are former MakerDAO Core Unit
              contributors, with 2+ years of hands-on experience with the Maker
              Protocol &ndash; helping to keep the OG DeFi protocol, with 5B+
              USD TVL, secure &ndash; and and 5+ years of experience in the
              broader Ethereum ecosystem.
            </p>
            <p>
              Our team has expertise in smart contract engineering for EVM
              chains, front-end engineering, on-chain/off-chain integrations and
              supporting services and agile project management.
            </p>
            <p>
              We chose to conceal our identities and build our reputation around
              pseudonyms to protect our privacy and ourselves from authoritarian
              people, entities and governments.
            </p>
          </div>
        </section>
        <section className={c.section}>
          <h2 className={c.section__title}>The Team</h2>
          <div className={clsx(c.grid, c.team_grid)}>
            <TeamMemberCard
              className={c.grid__item}
              img={avatarAmusingaxl}
              url="https://twitter.com/amusingaxl"
              name="@amusingaxl"
              companyRole="Co-Founder"
              description="9+ years of experience in software engineering and architecture.
                  Previously in banking, startups and web3 projects. Metal Head."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0x3phemeralsoul}
              url="https://twitter.com/0x3phemeralsoul"
              name="@0x3phemeralsoul"
              companyRole="Co-Founder"
              description="11+ years of experience in product management. Previously in e-commerce, product manager at MakerDAO.
                  DeFi addict."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xdecr1pto}
              url="https://twitter.com/0xdecr1pto"
              name="0xdecr1pto"
              companyRole="Co-Founder"
              description="8+ years of experience in software engineering, previously in web3 projects. Car Flipper."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xp3th1um}
              url="https://github.com/0xp3th1um"
              name="0xp3th1um"
              companyRole="Smart Contracts Engineer"
              description="6+ years of experience in software/smart-contract engineering for DeFi projects. Previously in academia. Music elitist."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatarOddaf}
              url="https://twitter.com/0x0ddaf"
              name="Oddaf"
              companyRole="Smart Contracts Engineer"
              description="Solidity auditor/dev since 2017. DeFi builder. Previously in infosec for web2 companies. Avid motorcyclist."
            />
          </div>
        </section>
        <section className={c.section}>
          <span className={c.anchor} id="contact"></span>
          <div className={c.section__content}>
            <h2 className={c.section__title}>Contact</h2>
            <div className={clsx(c.grid, c.contact_grid)}>
              <ContactCard
                className={c.grid__item}
                logo={<LogoDiscord />}
                url="https://discord.gg/Bem5R8TKQP"
                text="Dewiz Discord"
              />
              <ContactCard
                className={c.grid__item}
                logo={<LogoTwitter />}
                url="https://twitter.com/dewiz_xyz"
                text="@dewiz_xyz"
              />
              <ContactCard
                className={c.grid__item}
                logo={<LogoGithub />}
                url="https://github.com/dewiz-xyz"
                text="/dewiz-xyz"
              />
            </div>
          </div>
        </section>
      </Main>
      <Footer />
    </div>
  );
}
