# dSolver Inventory Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stretched two-row dSolver inventory grid with a compact full-width lead story and two balanced supporting stories.

**Architecture:** Reuse the existing case-study composition without changing semantic markup or copy: a two-column grid whose first article spans both columns, followed by two equal supporting articles. The existing mobile breakpoint collapses the outer grid to one column.

**Tech Stack:** Next.js, CSS Modules, Node built-in test runner, Playwright CLI.

---

### Task 1: Define the layout contract test-first

**Files:**
- Create: `tests/text-grid-layout.test.mjs`
- Modify: `styles/site.module.css`

- [ ] Write a source contract asserting that `.textGrid` has two equal columns, its first article spans both columns without spanning rows, and the mobile breakpoint collapses the outer grid.
- [ ] Run `node tests/text-grid-layout.test.mjs` and verify it fails against the current row-spanning CSS.
- [ ] Update `.textGrid` to `repeat(2, minmax(0, 1fr))`.
- [ ] Update `.textGrid > :first-child` to span columns `1 / -1` and use `grid-row: auto`, preserving its existing stacked content.
- [ ] At `max-width: 767.98px`, retain source order while the existing grid collapse produces one column.
- [ ] Run `node tests/text-grid-layout.test.mjs` and verify it passes.

### Task 2: Verify responsive rendering

**Files:**
- Verify: `pages/dsolver.tsx`
- Verify: `styles/site.module.css`

- [ ] Start `npm run dev` and open `/dsolver` with the Playwright CLI using the system-Chromium configuration from the header plan.
- [ ] At each width, call `page.setViewportSize`, scroll the heading “Routing quality is only one side of the solver battleground.” into view, and collect each `.textGrid article` bounding box plus `scrollWidth - clientWidth`.
- [ ] At 1440px, assert the lead width equals the grid width, its bottom precedes the supporting row's top, supporting cards share `y`, width, and height, and overflow is 0.
- [ ] At 768px, assert the lead still spans the grid, supporting cards share `y` and width, every paragraph remains visible, and overflow is 0.
- [ ] At 767px and 390px, assert all card `x` coordinates match, card `y` coordinates preserve source order, and overflow is 0.
- [ ] Run `"$PWCLI" screenshot --filename=output/playwright/dsolver-inventory-final.png` at 1440px and visually confirm the lead card uses normal stacked content without the previous empty region.

### Task 3: Final verification and commit

**Files:**
- Create: `tests/text-grid-layout.test.mjs`
- Modify: `styles/site.module.css`

- [ ] Run both header tests, the text-grid test, ESLint, Next route type generation, TypeScript, and `git diff --check`.
- [ ] Confirm browser console has no errors and remove generated browser artifacts.
- [ ] Commit the inventory layout, its test, and its plan/spec artifacts as a scoped checkpoint before completing the header implementation.
