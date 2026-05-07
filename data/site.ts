export const CONTACT_EMAIL = "partnerships@dewiz.xyz";

export const SOCIAL_LINKS = [
  {
    label: "Discord",
    href: "https://discord.gg/Bem5R8TKQP",
  },
  {
    label: "Mirror",
    href: "https://mirror.xyz/dewiz.xyz",
  },
  {
    label: "X",
    href: "https://x.com/dewiz_xyz",
  },
  {
    label: "GitHub",
    href: "https://github.com/dewiz-xyz",
  },
];

export const PROOF_METRICS = [
  {
    value: "Since 2021",
    label: "Sky/MakerDAO protocol engineering",
    description:
      "Dewiz contributors have supported core Sky and Maker protocol work across engineering, integrations, and governance execution.",
  },
  {
    value: "Multi-billion",
    label: "LitePSM stablecoin liquidity",
    description:
      "Dewiz built LitePSM, a capital-efficient stablecoin module serving multi-billion dollar liquidity for the Sky/Maker ecosystem.",
  },
  {
    value: "GovOps",
    label: "Executive vote execution support",
    description:
      "Dewiz supports on-chain governance operations for executive votes that protect large stablecoin supply and collateral positions.",
  },
  {
    value: "Audited",
    label: "Reviewed and verified modules",
    description:
      "Key modules delivered by Dewiz have undergone expert review, formal verification, and external audits where required.",
  },
];

export const CASE_STUDIES = [
  {
    title: "LitePSM Technical Deep Dive",
    eyebrow: "Stablecoin liquidity",
    href: "https://paragraph.com/@dewiz.xyz/exploring-makerdao-s-psm-and-the-advent-of-litepsm-a-technical-deep-dive",
    description:
      "How Dewiz redesigned MakerDAO's Peg Stability Module for greater gas efficiency, operational decentralization, and strategic partner access.",
  },
  {
    title: "Sky Endgame Token Rewards",
    eyebrow: "Token incentives",
    href: "https://paragraph.com/@dewiz.xyz/dewiz-s-contribution-to-sky-endgame-launch",
    description:
      "A modular rewards architecture for Sky ecosystem campaigns, including staking rewards, vested distributions, keepers, and Merkle claims.",
  },
  {
    title: "SP-BEAM",
    eyebrow: "Governance operations",
    href: "https://paragraph.com/@dewiz.xyz/introducing-sp-beam",
    description:
      "A bounded external access module for safer, smoother, and more frequent stability parameter updates in the Sky Protocol.",
  },
  {
    title: "dSolver Materials",
    eyebrow: "Intent infrastructure",
    href: "https://github.com/dewiz-xyz/dsolver-rfq-prospectus-single-page/blob/master/docs/dSolver_Prospectus.md",
    description:
      "Public reference materials for dSolver, Dewiz's institutional solver and inventory infrastructure business line.",
  },
];

export const PROTOCOL_ROADMAP = [
  "CoW Protocol",
  "1inch Fusion",
  "UniswapX",
  "Velora/Portus",
  "Across",
  "Li.fi",
  "Relay.fi",
];

export function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
