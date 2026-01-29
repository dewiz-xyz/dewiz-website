import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import Header from "../components/header";
import Main from "../components/main";
import Footer from "../components/footer";
import TeamMemberCard from "../components/team-member-card";
import SocialCard from "../components/social-card";
import LogoHatL from "../public/logo-hat-l.svg";
import LogoHatM from "../public/logo-hat-m.svg";
import avatarAmusingaxl from "../public/avatar-amusingaxl.png";
import avatar0x3phemeralsoul from "../public/avatar-0x3phemeralsoul.png";
import avatar0xdecr1pto from "../public/avatar-0xdecr1pto.png";
import avatarOddaf from "../public/avatar-oddaf.png";
import avatar0xbasset from "../public/avatar-0xbasset.png";
import avatar0xpedro from "../public/avatar-0xpedro.jpg";
import avatar0xlaz3r from "../public/avatar-0xlaz3r.png";
import avatarRiccardo from "../public/avatar-riccardo.png";
import avatar0xcentur1on from "../public/avatar-0xcentur1on.png";
import LogoDiscord from "../public/logo-discord.svg";
import LogoTwitter from "../public/logo-twitter.svg";
import LogoX from "../public/logo-x.svg";
import LogoGithub from "../public/logo-github.svg";
import LogoMirror from "../public/logo-mirror.svg";
import c from "./index.module.css";

export default function Home() {
  return (
    <div className={c.root}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
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
      <Main className={c.main} id="main-content">
        <section className={c.section}>
          <span className={c.anchor} id="home"></span>
          <div className={c.section__content}>
            <div className={c.content}>
              <div className={c.home_logo__wrapper}>
                <LogoHatL aria-label="Dewiz company logo" role="img" />
              </div>
              <div className={c.mobile_logo__wrapper}>
                <LogoHatM aria-label="Dewiz company logo" role="img" />
              </div>
              <h1 className="srOnly">Dewiz</h1>
              <h2 className={c.section__title}>DeFi Engineering Services</h2>
              <p>
                We believe that financial inclusion is a basic human right.
                Dewiz’s mission is to help “de-wizardrying” DeFi, making it more
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
              url="https://x.com/amusingaxl"
              name="AmusingAxl"
              companyRole="Co-Founder"
              description="11+ years of experience in software engineering and architecture.
                  Previously in banking, startups and web3 projects. Metal Head."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0x3phemeralsoul}
              url="https://x.com/0x3phemeralsoul"
              name="Ephy"
              companyRole="Co-Founder"
              description="13+ years of experience in product management. Previously in e-commerce, product manager at MakerDAO.
                  DeFi addict."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xdecr1pto}
              url="https://x.com/0xdecr1pto"
              name="0xdecr1pto"
              companyRole="Co-Founder"
              description="10+ years of experience in software engineering, previously in web3 projects. Car Flipper."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatarOddaf}
              url="https://x.com/0x0ddaf"
              name="Oddaf"
              companyRole="Smart Contracts Engineer"
              description="Solidity auditor/dev since 2017. DeFi builder. Previously in infosec for web2 companies. Avid motorcyclist."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xbasset}
              url="https://x.com/0xbasset"
              name="0xbasset"
              companyRole="Smart Contracts Engineer"
              description="7+ years of experience in Solidity development and blockchain engineering. Pioneer in fully on-chain games during NFT boom. Fitness enthusiast."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xpedro}
              url="https://x.com/0xpedro_eth"
              name="0xpedro"
              companyRole="Smart Contracts / Backend Engineer"
              description="5+ years shipping smart contracts that secured $1b+ of TVL on the Ethereum ecosystem. Rust, Solidity, DeFi. Manga, anime and RPG lover."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xlaz3r}
              url="https://github.com/0xlaz3r"
              name="0xLaz3r"
              companyRole="Smart Contracts Engineer"
              description="Shipping Solidity smart contracts for DeFi protocols since 2020. Background in robotics and former chess coach. The truth is… I am Iron Man."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatarRiccardo}
              url="https://github.com/riccardopersiani"
              name="Riccardo"
              companyRole="Smart Contracts Engineer"
              description="8+ years in smart contracts. Polyhedric builder with no trust. Previously, solving problems across the web3 space. Voracious reader."
            />
            <TeamMemberCard
              className={c.grid__item}
              img={avatar0xcentur1on}
              url="https://github.com/0xcentur1on"
              name="0xCentur1on"
              companyRole="Smart Contracts / Backend Engineer"
              description="30+ years in software engineering. Previously in e-commerce and banking services. Shipping DeFi smart contracts since 2018. Golang, Solidity and Rust. &quot;Audentes Fortuna iuvat&quot;"
            />
          </div>
        </section>
        <section className={c.section}>
          <span className={c.anchor} id="social"></span>
          <div className={c.section__content}>
            <h2 className={c.section__title}>Social</h2>
            <div className={clsx(c.grid, c.social_grid)}>
              <SocialCard
                className={c.grid__item}
                logo={<LogoDiscord aria-label="Discord" role="img" />}
                url="https://discord.gg/Bem5R8TKQP"
                text="Dewiz Discord"
              />
              <SocialCard
                className={c.grid__item}
                logo={<LogoMirror aria-label="Mirror Blog" role="img" />}
                url="https://mirror.xyz/dewiz.xyz"
                text="Dewiz Blog"
              />
              <SocialCard
                className={c.grid__item}
                logo={<LogoX aria-label="X (formerly Twitter)" role="img" />}
                url="https://x.com/dewiz_xyz"
                text="@dewiz_xyz"
              />
              <SocialCard
                className={c.grid__item}
                logo={<LogoGithub aria-label="GitHub" role="img" />}
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
