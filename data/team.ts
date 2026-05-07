import { StaticImageData } from "next/image";
import avatarAmusingaxl from "../public/avatar-amusingaxl.png";
import avatar0x3phemeralsoul from "../public/avatar-0x3phemeralsoul.png";
import avatar0xdecr1pto from "../public/avatar-0xdecr1pto.png";
import avatarOddaf from "../public/avatar-oddaf.png";
import avatar0xbasset from "../public/avatar-0xbasset.png";
import avatar0xpedro from "../public/avatar-0xpedro.jpg";
import avatar0xlaz3r from "../public/avatar-0xlaz3r.png";
import avatarRiccardo from "../public/avatar-riccardo.png";
import avatar0xcentur1on from "../public/avatar-0xcentur1on.png";

export interface TeamMember {
  img: StaticImageData;
  url: string;
  name: string;
  companyRole: string;
  description: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    img: avatarAmusingaxl,
    url: "https://x.com/amusingaxl",
    name: "AmusingAxl",
    companyRole: "Co-Founder",
    description:
      "11+ years of experience in software engineering and architecture. Previously in banking, startups and web3 projects. Metal Head.",
  },
  {
    img: avatar0x3phemeralsoul,
    url: "https://x.com/0x3phemeralsoul",
    name: "Ephy",
    companyRole: "Co-Founder",
    description:
      "13+ years of experience in product management. Previously in e-commerce, product manager at MakerDAO. DeFi addict.",
  },
  {
    img: avatar0xdecr1pto,
    url: "https://x.com/0xdecr1pto",
    name: "0xdecr1pto",
    companyRole: "Co-Founder",
    description:
      "10+ years of experience in software engineering, previously in web3 projects. Car Flipper.",
  },
  {
    img: avatarOddaf,
    url: "https://x.com/0x0ddaf",
    name: "Oddaf",
    companyRole: "Smart Contracts Engineer",
    description:
      "Solidity auditor/dev since 2017. DeFi builder. Previously in infosec for web2 companies. Avid motorcyclist.",
  },
  {
    img: avatar0xbasset,
    url: "https://x.com/0xbasset",
    name: "0xbasset",
    companyRole: "Smart Contracts Engineer",
    description:
      "7+ years of experience in Solidity development and blockchain engineering. Pioneer in fully on-chain games during NFT boom. Fitness enthusiast.",
  },
  {
    img: avatar0xpedro,
    url: "https://x.com/0xpedro_eth",
    name: "0xpedro",
    companyRole: "Smart Contracts / Backend Engineer",
    description:
      "5+ years shipping smart contracts that secured $1b+ of TVL on the Ethereum ecosystem. Rust, Solidity, DeFi. Manga, anime and RPG lover.",
  },
  {
    img: avatar0xlaz3r,
    url: "https://github.com/0xlaz3r",
    name: "0xLaz3r",
    companyRole: "Smart Contracts Engineer",
    description:
      "Shipping Solidity smart contracts for DeFi protocols since 2020. Background in robotics and former chess coach. The truth is... I am Iron Man.",
  },
  {
    img: avatarRiccardo,
    url: "https://github.com/riccardopersiani",
    name: "Riccardo",
    companyRole: "Smart Contracts Engineer",
    description:
      "8+ years in smart contracts. Polyhedric builder with no trust. Previously, solving problems across the web3 space. Voracious reader.",
  },
  {
    img: avatar0xcentur1on,
    url: "https://github.com/0xcentur1on",
    name: "0xCentur1on",
    companyRole: "Smart Contracts / Backend Engineer",
    description:
      '30+ years in software engineering. Previously in e-commerce and banking services. Shipping DeFi smart contracts since 2018. Golang, Solidity and Rust. "Audentes Fortuna iuvat"',
  },
];
