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
        <link rel="icon" href="/favicon.ico" />
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
              <h1 className={c.title_1}>DeFi Engineering Services</h1>
              <p>
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
            <h1 className={c.title_1}>About Us</h1>
            <p>
              We are buidlers! Dewiz co-founders are former MakerDAO Core Unit
              contributors, with more than 1 year of hands-on experience with
              the Maker Protocol and and 4+ years of experience in the broader
              Ethereum ecosystem.
            </p>
            <p>
              Our team has expertise in smart contract engineering for EVM
              chains, front-end engineering, on-chain/off-chain integrations and
              supporting services and agile project management.
            </p>
            <p style={{ marginBlockEnd: "var(--spacing-16)" }}>
              We chose to conceal our identities and build our reputation around
              pseudonyms to protect our privacy and ourselves from authoritarian
              people, entities and governments.
            </p>
            <h2 className={c.title_2}>The Team</h2>
            <div className={clsx(c.grid, c.team_grid)}>
              <TeamMemberCard
                className={c.grid__item}
                img={avatarAmusingaxl}
                url="https://twitter.com/amusingaxl"
                name="@amusingaxl"
                companyRole="Co-Founder"
                description="8+ years of experience in software engineering and architecture.
                  Previously in banking, startups and web3 projects. Metal Head."
              />
              <TeamMemberCard
                className={c.grid__item}
                img={avatar0x3phemeralsoul}
                url="https://twitter.com/0x3phemeralsoul"
                name="@0x3phemeralsoul"
                companyRole="Co-Founder"
                description="10+ years of experience in product management. Previously in e-commerce, product manager at MakerDAO.
                  DeFi addict."
              />
              <TeamMemberCard
                className={c.grid__item}
                img={avatar0xdecr1pto}
                url="https://twitter.com/0xdecr1pto"
                name="0xdecr1pto"
                companyRole="Co-Founder"
                description="7+ years of experience in software engineering, previously in web3 projects. 
                Car Flipper."
              />
            </div>
          </div>
        </section>
        <section className={c.section}>
          <span className={c.anchor} id="contact"></span>
          <div className={c.section__content}>
            <h1 className={c.title_1}>Contact</h1>
            <div className={clsx(c.grid, c.contact_grid)}>
              <ContactCard
                className={c.grid__item}
                logo={<LogoTwitter />}
                url="https://twitter.com/dewiz_xzy"
                text="@dewiz_xzy"
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

// import LogoDiscord from "../public/logo-discord.svg";
// <ContactCard
//   className={c.grid__item}
//   logo={<LogoDiscord />}
//   url="#"
//   title="Discord"
// />
