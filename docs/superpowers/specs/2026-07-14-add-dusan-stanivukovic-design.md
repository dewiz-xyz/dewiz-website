# Add Dušan Stanivuković to the Team Roster

## Goal

Add Dušan Stanivuković to the Dewiz team section using the supplied profile details and avatar.

## Design

- Import `public/avatar-dusan.jpeg` in `pages/index.tsx`.
- Add one `TeamMemberCard` as the final card in the team grid because the roster follows team join order.
- Use the name `Dušan Stanivuković`, role `Backend Engineer`, description “Rust engineer building DeFi execution systems for 5+ years. Enjoys Dota, craft beer, and code that compiles on the first try.”, and profile URL `https://x.com/_sunce86`.
- Reuse the existing card component and styling without changing layout or behavior.
- Preserve all unrelated working-tree changes.

## Verification

- Confirm the new import and card reference the supplied avatar and profile data.
- Confirm Dušan is the final team card.
- Run `npx tsc --noEmit`.
