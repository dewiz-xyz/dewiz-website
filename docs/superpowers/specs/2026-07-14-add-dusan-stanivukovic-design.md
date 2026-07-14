# Add Dušan Stanivuković and 0x5varog to the Team Roster

## Goal

Add Dušan Stanivuković and 0x5varog to the Dewiz team section using their supplied profile details and avatars.

## Design

- Import `public/avatar-dusan.jpeg` and `public/avatar-0x5varog.png` in `pages/index.tsx`.
- Append two `TeamMemberCard` entries because the roster follows team join order: Dušan first, then 0x5varog as the final card.
- Use the name `Dušan Stanivuković`, role `Backend Engineer`, description “Rust engineer building DeFi execution systems for 5+ years. Enjoys Dota, craft beer, and code that compiles on the first try.”, and profile URL `https://x.com/_sunce86`.
- Use the name `0x5varog`, role `Smart Contracts Engineer`, description “10+ years Solidity native. Relentless crafter and forge-smith of things that shouldn't be possible to build onchain. EVM, nature, tinkering, and engineering.”, and profile URL `https://github.com/0x5varog`.
- Reuse the existing card component and styling without changing layout or behavior.
- Preserve all unrelated working-tree content while including the previously requested removal of the 0xCentur1on card, avatar import, and `public/avatar-0xcentur1on.png` asset in the final commit.

## Verification

- Confirm the new imports and cards reference the supplied avatars and profile data.
- Confirm Dušan is followed by 0x5varog and that 0x5varog is the final team card.
- Run `npx tsc --noEmit`.
