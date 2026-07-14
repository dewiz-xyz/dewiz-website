# Auto-Hiding Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide the fixed header during meaningful downward scrolling and reveal it during upward scrolling without compromising navigation, focus, mobile-menu behavior, or reduced-motion preferences.

**Architecture:** Put deterministic threshold and direction logic in a small pure TypeScript state transition, then connect it to the existing `Header` with a passive scroll listener. Apply visibility through a CSS modifier that animates only `transform`; menu-open, route-change, top-of-page, and `:focus-within` rules override hiding.

**Tech Stack:** Next.js Pages Router, React 18 hooks, TypeScript, CSS Modules, Node 24 built-in TypeScript stripping and test runner, Playwright CLI.

---

## File Map

- Create `components/header-scroll-state.ts`: pure, deterministic scroll-state transition.
- Create `tests/header-scroll-state.test.mjs`: Node behavioral tests for top, direction, accumulation, and menu locking.
- Create `tests/header-wiring.test.mjs`: integration contract for React event wiring and CSS accessibility rules.
- Modify `components/header.tsx`: passive listener, route reset, mobile-menu reset, and hidden class.
- Modify `components/header.module.css`: transform transition, focus override, and reduced-motion override.

### Task 1: Build the scroll-state transition test-first

**Files:**
- Create: `tests/header-scroll-state.test.mjs`
- Create: `components/header-scroll-state.ts`

- [ ] **Step 1: Write the failing behavioral tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { getNextHeaderScrollState } from "../components/header-scroll-state.ts";

test("stays visible at and below 80 pixels", () => {
  const next = getNextHeaderScrollState({ lastScrollY: 76, isHidden: true }, 80, false);
  assert.deepEqual(next, { lastScrollY: 80, isHidden: false });
});

test("accumulates four downward pixels before hiding", () => {
  let state = { lastScrollY: 80, isHidden: false };
  state = getNextHeaderScrollState(state, 81, false);
  state = getNextHeaderScrollState(state, 82, false);
  state = getNextHeaderScrollState(state, 83, false);
  assert.deepEqual(state, { lastScrollY: 80, isHidden: false });
  assert.deepEqual(getNextHeaderScrollState(state, 84, false), {
    lastScrollY: 84,
    isHidden: true,
  });
});

test("accumulates four upward pixels before revealing", () => {
  let state = { lastScrollY: 100, isHidden: true };
  state = getNextHeaderScrollState(state, 99, false);
  state = getNextHeaderScrollState(state, 98, false);
  state = getNextHeaderScrollState(state, 97, false);
  assert.deepEqual(state, { lastScrollY: 100, isHidden: true });
  assert.deepEqual(getNextHeaderScrollState(state, 96, false), {
    lastScrollY: 96,
    isHidden: false,
  });
});

test("an open menu forces visibility and resets the baseline", () => {
  assert.deepEqual(
    getNextHeaderScrollState({ lastScrollY: 100, isHidden: true }, 220, true),
    { lastScrollY: 220, isHidden: false },
  );
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/header-scroll-state.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `components/header-scroll-state.ts`.

- [ ] **Step 3: Implement the minimal transition**

```ts
export const SCROLL_TOP_THRESHOLD = 80;
export const SCROLL_DELTA_THRESHOLD = 4;

export interface HeaderScrollState {
  lastScrollY: number;
  isHidden: boolean;
}

export function getNextHeaderScrollState(
  state: HeaderScrollState,
  currentScrollY: number,
  isMenuOpen: boolean,
): HeaderScrollState {
  if (isMenuOpen || currentScrollY <= SCROLL_TOP_THRESHOLD) {
    return { lastScrollY: currentScrollY, isHidden: false };
  }

  const delta = currentScrollY - state.lastScrollY;
  if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return state;

  return { lastScrollY: currentScrollY, isHidden: delta > 0 };
}
```

- [ ] **Step 4: Run the tests and verify GREEN**

Run: `node --test tests/header-scroll-state.test.mjs`

Expected: 4 tests pass, 0 fail.

- [ ] **Step 5: Commit the green transition**

```bash
git add components/header-scroll-state.ts tests/header-scroll-state.test.mjs
git commit -m "Test auto-hiding header scroll state"
```

### Task 2: Connect the transition to the Header

**Files:**
- Modify: `components/header.tsx:1-95`
- Create: `tests/header-wiring.test.mjs`
- Test: `tests/header-scroll-state.test.mjs`

- [ ] **Step 1: Write the failing React/CSS wiring contract**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const header = readFileSync(new URL("../components/header.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../components/header.module.css", import.meta.url), "utf8");

test("Header wires passive scrolling, menu resets, and route cleanup", () => {
  assert.match(header, /addEventListener\("scroll", handleScroll, \{ passive: true \}\)/);
  assert.match(header, /\}, \[isMenuOpen\]\)/);
  assert.match(header, /setIsHeaderHidden\(false\)/);
  assert.match(header, /routeChangeStart/);
  assert.match(header, /routeChangeComplete/);
  assert.match(header, /requestAnimationFrame\(resetHeader\)/);
  assert.match(header, /cancelAnimationFrame\(routeResetFrame\)/);
  assert.match(header, /c\.header_hidden/);
});

test("Header CSS preserves focus and reduced motion", () => {
  assert.match(styles, /\.header_hidden\s*\{[^}]*translateY\(-100%\)/s);
  assert.match(styles, /\.header:focus-within\s*\{[^}]*translateY\(0\)/s);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.header\s*\{[^}]*transition:\s*none\s*!important/s);
});
```

- [ ] **Step 2: Run the wiring contract and verify RED**

Run: `node --test tests/header-wiring.test.mjs`

Expected: 2 tests fail because the React wiring and CSS states do not exist.

- [ ] **Step 3: Add React state and the passive listener**

Import `useRef` and the pure transition. Add:

```ts
const [isHeaderHidden, setIsHeaderHidden] = useState(false);
const scrollState = useRef({ lastScrollY: 0, isHidden: false });

useEffect(() => {
  scrollState.current = { lastScrollY: window.scrollY, isHidden: false };
  setIsHeaderHidden(false);

  const handleScroll = () => {
    const nextState = getNextHeaderScrollState(
      scrollState.current,
      window.scrollY,
      isMenuOpen,
    );
    scrollState.current = nextState;
    setIsHeaderHidden(nextState.isHidden);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [isMenuOpen]);
```

Re-running this effect on menu open and close explicitly clears hidden state and resets the baseline to the current position, so closing cannot reapply stale state.

- [ ] **Step 4: Implement complete route lifecycle handling**

Replace the existing route effect body with:

```ts
useEffect(() => {
  let routeResetFrame: number | undefined;

  const resetHeader = () => {
    setIsHeaderHidden(false);
    scrollState.current = { lastScrollY: window.scrollY, isHidden: false };
  };
  const handleRouteStart = () => {
    setIsMenuOpen(false);
    resetHeader();
  };
  const handleRouteComplete = () => {
    if (routeResetFrame !== undefined) cancelAnimationFrame(routeResetFrame);
    routeResetFrame = requestAnimationFrame(resetHeader);
  };
  const closeMenuOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") setIsMenuOpen(false);
  };

  document.addEventListener("keydown", closeMenuOnEscape);
  router.events.on("routeChangeStart", handleRouteStart);
  router.events.on("routeChangeComplete", handleRouteComplete);

  return () => {
    document.removeEventListener("keydown", closeMenuOnEscape);
    router.events.off("routeChangeStart", handleRouteStart);
    router.events.off("routeChangeComplete", handleRouteComplete);
    if (routeResetFrame !== undefined) cancelAnimationFrame(routeResetFrame);
  };
}, [router.events]);
```

- [ ] **Step 5: Apply the hidden class**

```tsx
<header className={isHeaderHidden && !isMenuOpen ? `${c.header} ${c.header_hidden}` : c.header}>
```

The menu condition reveals the header in the same render that opens the menu; the effect then clears stale hidden state and resets the baseline.

- [ ] **Step 6: Run tests and check the staged GREEN progression**

Run `node --test tests/header-scroll-state.test.mjs` and `node --test tests/header-wiring.test.mjs`.

Expected: four behavioral tests and the React wiring test pass; only the not-yet-implemented CSS test remains failing.

### Task 3: Add motion and accessibility styles

**Files:**
- Modify: `components/header.module.css:1-10`
- Test: `tests/header-wiring.test.mjs`

- [ ] **Step 1: Add transform styles**

```css
.header {
  transform: translateY(0);
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.header_hidden {
  transform: translateY(-100%);
}

.header:focus-within {
  transform: translateY(0);
}
```

- [ ] **Step 2: Disable reduced-motion transitions**

```css
@media (prefers-reduced-motion: reduce) {
  .header {
    transition: none !important;
  }
}
```

- [ ] **Step 3: Run static verification**

Run `node --test tests/header-scroll-state.test.mjs`, `node --test tests/header-wiring.test.mjs`, `npm run lint`, `npx next typegen`, `npx tsc --noEmit`, and `git diff --check`.

Expected: all commands exit 0.

### Task 4: Verify exact behavior in Chromium

**Files:**
- Verify: `components/header.tsx`
- Verify: `components/header.module.css`

- [ ] **Step 1: Start and open the site**

Create `/tmp/dewiz-playwright-config.json` with `apply_patch` using this exact content:

```json
{
  "browser": {
    "browserName": "chromium",
    "isolated": true,
    "launchOptions": {
      "executablePath": "/usr/bin/chromium",
      "headless": true,
      "args": ["--no-sandbox"]
    },
    "contextOptions": { "viewport": { "width": 1440, "height": 1000 } }
  }
}
```

Run `npm run dev`, then:

```bash
PWCLI="$HOME/.codex/skills/playwright/scripts/playwright_cli.sh"
"$PWCLI" --config /tmp/dewiz-playwright-config.json open http://127.0.0.1:3000/about
```

- [ ] **Step 2: Verify initial, accumulated-delta, direction, mounting, and overflow behavior**

```bash
"$PWCLI" run-code "async (page) => {
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const header = page.locator('header');
  const result = {};
  result.initial = await header.evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo(0, 80));
  result.at80 = await header.evaluate(el => getComputedStyle(el).transform);
  for (const y of [81, 82, 83]) await page.evaluate(y => scrollTo(0, y), y);
  result.afterThreeDown = await header.evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo(0, 84));
  await page.waitForTimeout(220);
  result.afterFourDown = await header.evaluate(el => getComputedStyle(el).transform);
  result.mounted = await header.count();
  result.focusableLinks = await header.getByRole('link').count();
  for (const y of [83, 82, 81]) await page.evaluate(y => scrollTo(0, y), y);
  result.afterThreeUp = await header.evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo(0, 80));
  await page.waitForTimeout(220);
  result.afterFourUp = await header.evaluate(el => getComputedStyle(el).transform);
  result.overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  return result;
}"
```

Expected: initial/at80/afterThreeDown/afterFourUp are visible matrices; afterFourDown/afterThreeUp are hidden matrices; mounted is 1, focusableLinks is positive, overflow is 0.

- [ ] **Step 3: Verify focus persistence**

```bash
"$PWCLI" run-code "async (page) => {
  await page.evaluate(() => scrollTo(0, 200));
  await page.waitForTimeout(220);
  await page.locator('header a').first().focus();
  const focused = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo(0, 260));
  const afterScroll = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  return { focused, afterScroll, activeInside: await page.evaluate(() => document.querySelector('header')?.contains(document.activeElement)) };
}"
```

Expected: both transforms are visible and `activeInside` is true.

- [ ] **Step 4: Verify route reset and history restoration**

```bash
"$PWCLI" run-code "async (page) => {
  await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); scrollTo(0, 0); });
  await page.evaluate(() => scrollTo(0, 400));
  await page.waitForTimeout(220);
  const beforeRoute = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  await page.locator('header a[href="/contact"]').first().evaluate(el => el.click());
  await page.waitForURL('**/contact');
  const afterRoute = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  const routeY = await page.evaluate(() => scrollY);
  for (const offset of [1, 2, 3]) await page.evaluate(y => scrollTo(0, y), routeY + offset);
  const afterRouteTinyDelta = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  await page.goBack();
  await page.waitForURL('**/about');
  await page.waitForTimeout(50);
  const afterBack = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  const restoredY = await page.evaluate(() => scrollY);
  for (const offset of [1, 2, 3]) await page.evaluate(y => scrollTo(0, y), restoredY + offset);
  const afterBackTinyDelta = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  return { beforeRoute, afterRoute, afterRouteTinyDelta, afterBack, afterBackTinyDelta };
}"
```

Expected: `beforeRoute` is hidden; all four post-navigation transforms are visible.

- [ ] **Step 5: Verify mobile-menu locking and close recovery**

```bash
"$PWCLI" run-code "async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.evaluate(() => scrollTo(0, 200));
  await page.waitForTimeout(220);
  const beforeOpen = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  await page.getByRole('button', { name: 'Toggle menu' }).evaluate(el => el.click());
  await page.evaluate(() => scrollTo(0, 400));
  const whileOpen = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  await page.getByRole('button', { name: 'Toggle menu' }).click();
  const justClosed = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  const closedY = await page.evaluate(() => scrollY);
  for (const offset of [1, 2, 3]) await page.evaluate(y => scrollTo(0, y), closedY + offset);
  const afterTinyDelta = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  return { beforeOpen, whileOpen, justClosed, afterTinyDelta };
}"
```

Expected: `beforeOpen` is hidden; all three transforms after opening are visible.

- [ ] **Step 6: Verify reduced motion and console**

```bash
"$PWCLI" run-code "async (page) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const duration = await page.locator('header').evaluate(el => getComputedStyle(el).transitionDuration);
  await page.evaluate(() => scrollTo(0, 500));
  const hidden = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo(0, 490));
  const visible = await page.locator('header').evaluate(el => getComputedStyle(el).transform);
  return { duration, hidden, visible };
}"
"$PWCLI" console
```

Expected: duration is `0s`, state changes still occur, and console has no errors.

- [ ] **Step 7: Stop and clean generated artifacts**

Close Playwright, stop the server, delete only `.playwright-cli/` and `output/` if created, and remove `/tmp/dewiz-playwright-config.json`.

### Task 5: Final verification and commit

**Files:**
- Create: `components/header-scroll-state.ts`
- Create: `tests/header-scroll-state.test.mjs`
- Create: `tests/header-wiring.test.mjs`
- Modify: `components/header.tsx`
- Modify: `components/header.module.css`

- [ ] **Step 1: Re-run all verification**

Run `node --test tests/header-scroll-state.test.mjs`, `node --test tests/header-wiring.test.mjs`, `npm run lint`, `npx next typegen`, `npx tsc --noEmit`, `git diff --check`, and `git status --short`.

Expected: all checks pass and status contains only intended files.

- [ ] **Step 2: Commit the implementation**

```bash
git add components/header-scroll-state.ts tests/header-scroll-state.test.mjs tests/header-wiring.test.mjs components/header.tsx components/header.module.css docs/superpowers/plans/2026-07-14-auto-hiding-header.md
git commit -m "Add direction-aware auto-hiding header"
```
