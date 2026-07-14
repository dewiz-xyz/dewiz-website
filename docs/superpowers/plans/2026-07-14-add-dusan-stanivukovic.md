# Add Dušan Stanivuković and 0x5varog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Dušan Stanivuković followed by 0x5varog in team join order.

**Architecture:** Reuse the existing `TeamMemberCard` in `pages/index.tsx`. Import the supplied static avatars and append two cards without changing component behavior or styling.

**Tech Stack:** Next.js, React, TypeScript

---

### Task 1: Append Dušan and 0x5varog to the team roster

**Files:**
- Modify: `pages/index.tsx`
- Use: `public/avatar-dusan.jpeg`
- Use: `public/avatar-0x5varog.png`

- [ ] **Step 1: Run a failing content check**

Run:

```bash
node -e 'const s=require("fs").readFileSync("pages/index.tsx","utf8"); const cards=[...s.matchAll(/<TeamMemberCard[\s\S]*?\/>/g)].map(m=>m[0]); const dusan=["img={avatarDusan}","url=\"https://x.com/_sunce86\"","name=\"Dušan Stanivuković\"","companyRole=\"Backend Engineer\"","description=\"Rust engineer building DeFi execution systems for 5+ years. Enjoys Dota, craft beer, and code that compiles on the first try.\""]; const svarog=["img={avatar0x5varog}","url=\"https://github.com/0x5varog\"","name=\"0x5varog\"","companyRole=\"Smart Contracts Engineer\"","description=\"10+ years Solidity native. Relentless crafter and forge-smith of things that shouldn\x27t be possible to build onchain. EVM, nature, tinkering, and engineering.\""]; if(!s.includes("import avatarDusan from \"../public/avatar-dusan.jpeg\";")||!s.includes("import avatar0x5varog from \"../public/avatar-0x5varog.png\";")) throw Error("missing avatar import"); if(!dusan.every(v=>cards.at(-2)?.includes(v))||!svarog.every(v=>cards.at(-1)?.includes(v))) throw Error("team cards are missing exact content or join order");'
```

Expected: FAIL because Dušan and 0x5varog are not yet present.

- [ ] **Step 2: Add the minimal roster entries**

Add these imports alongside the other avatar imports:

```tsx
import avatarDusan from "../public/avatar-dusan.jpeg";
import avatar0x5varog from "../public/avatar-0x5varog.png";
```

Append these cards after the current final member:

```tsx
<TeamMemberCard
  className={c.grid__item}
  img={avatarDusan}
  url="https://x.com/_sunce86"
  name="Dušan Stanivuković"
  companyRole="Backend Engineer"
  description="Rust engineer building DeFi execution systems for 5+ years. Enjoys Dota, craft beer, and code that compiles on the first try."
/>
<TeamMemberCard
  className={c.grid__item}
  img={avatar0x5varog}
  url="https://github.com/0x5varog"
  name="0x5varog"
  companyRole="Smart Contracts Engineer"
  description="10+ years Solidity native. Relentless crafter and forge-smith of things that shouldn't be possible to build onchain. EVM, nature, tinkering, and engineering."
/>
```

- [ ] **Step 3: Run the content check again**

Expected: PASS, including the exact Dušan-then-0x5varog order.

- [ ] **Step 4: Type-check the site**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 5: Review and stage the requested working tree**

Review `git -c core.fsmonitor=false diff` and then stage:

```bash
git add pages/index.tsx public/avatar-dusan.jpeg public/avatar-0x5varog.png public/avatar-0xcentur1on.png docs/superpowers/specs/2026-07-14-add-dusan-stanivukovic-design.md docs/superpowers/plans/2026-07-14-add-dusan-stanivukovic.md
```

Run `git diff --cached --name-status` and confirm it contains the roster page, both new avatars, removed 0xCentur1on avatar, updated spec, and plan.

- [ ] **Step 6: Commit**

Run:

```bash
git commit -m "Add Dušan and 0x5varog to team"
```

Afterward, run `git -c core.fsmonitor=false status --short` and confirm there are no pending changes.
