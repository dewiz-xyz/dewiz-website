export const CONTACT_EMAIL = "partnerships@dewiz.xyz";

export const SOCIAL_LINKS = [
  {
    label: "Discord",
    href: "https://discord.gg/Bem5R8TKQP",
  },
  {
    label: "Paragraph",
    href: "https://paragraph.com/@dewiz.xyz",
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
    label: "Sky Protocol (former MakerDAO) engineering",
    description:
      "Dewiz contributors have supported core protocol work for Sky Protocol (former MakerDAO) across engineering, integrations, and governance execution.",
  },
  {
    value: "Multi-billion",
    label: "LitePSM stablecoin liquidity",
    description:
      "Dewiz built LitePSM, a capital-efficient stablecoin module serving multi-billion dollar liquidity for the Sky Protocol (former MakerDAO) ecosystem.",
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
];

export const PROTOCOL_ROADMAP = [
  { name: "CoW Swap", status: "Enabled now" },
  { name: "1inch Fusion", status: "Coming soon" },
  { name: "UniswapX", status: "Coming soon" },
  { name: "Velora/Portus", status: "Coming soon" },
  { name: "Across", status: "Coming soon" },
  { name: "Li.fi", status: "Coming soon" },
  { name: "Relay.fi", status: "Coming soon" },
];

export function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
