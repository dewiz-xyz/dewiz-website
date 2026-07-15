import { StaticImageData } from "next/image";
import avatarAmusingaxl from "../public/avatar-amusingaxl.png";
import avatar0x3phemeralsoul from "../public/avatar-0x3phemeralsoul.png";
import avatar0xdecr1pto from "../public/avatar-0xdecr1pto.png";
import avatar0xpedro from "../public/avatar-0xpedro.jpg";
import avatar0xlaz3r from "../public/avatar-0xlaz3r.png";
import avatarRiccardo from "../public/avatar-riccardo.png";
import avatar0xjoao from "../public/avatar-0xjoao.jpg";
import avatarDusan from "../public/avatar-dusan.jpeg";
import avatar0x5varog from "../public/avatar-0x5varog.png";
import avatar0xSantiago from "../public/avatar-0xsantiago.png";

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
      "Shipping Solidity smart contracts for DeFi protocols since 2020. Background in robotics and former chess coach. The truth is… I am Iron Man.",
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
    img: avatar0xjoao,
    url: "https://x.com/0xjoao_eth",
    name: "0xjoao",
    companyRole: "Smart Contracts Engineer",
    description:
      "Onchain since 2017, building Web3 systems for 5+ years. Experienced in DeFi protocol systems across real production environments. EVM, anime, superheroes, and football.",
  },
  {
    img: avatarDusan,
    url: "https://x.com/_sunce86",
    name: "Dušan Stanivuković",
    companyRole: "Backend Engineer",
    description:
      "Rust engineer building DeFi execution systems for 5+ years. Enjoys Dota, craft beer, and code that compiles on the first try.",
  },
  {
    img: avatar0x5varog,
    url: "https://github.com/0x5varog",
    name: "0x5varog",
    companyRole: "Smart Contracts Engineer",
    description:
      "10+ years Solidity native. Relentless crafter and forge-smith of things that shouldn't be possible to build onchain. EVM, nature, tinkering, and engineering.",
  },
  {
    img: avatar0xSantiago,
    url: "https://github.com/0xsanti1",
    name: "0xSantiago",
    companyRole: "Product & Technical Project Manager",
    description:
      "6+ years building and shipping technical products across Web3 and fintech. Previously on institutional crypto products, EVM dapps and Rust-based blockchain protocols. BJJ and cars.",
  },
];
