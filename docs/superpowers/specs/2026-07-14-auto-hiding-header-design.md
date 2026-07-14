# Auto-Hiding Header Design

## Objective

Make the fixed site header leave the viewport while the user scrolls down and return as soon as the user scrolls up, increasing usable reading space without making navigation difficult to recover.

## Behavior

- Keep the header visible while `scrollY <= 80`; hiding may begin only above 80 pixels.
- Hide the header when the user scrolls down beyond that threshold.
- Reveal the header after 4 accumulated pixels of upward movement, which is perceptually immediate while filtering sub-pixel movement.
- Keep the header visible whenever the mobile navigation menu is open.
- Reset the header to visible when navigation begins.
- Ignore movement below 4 pixels. Ignored deltas accumulate because the comparison baseline is retained until the threshold is reached.
- Keep the header visible while keyboard focus is anywhere within it.

## Implementation

The existing `Header` component will track whether the fixed header is hidden. A passive `scroll` listener will compare the current vertical position with the last accepted position and update state when the absolute accumulated delta reaches 4 pixels. The listener initializes its baseline from `window.scrollY` when mounted.

The header element will receive a hidden modifier class. CSS will move it fully above the viewport with `transform: translateY(-100%)`; the visible state will use `translateY(0)`. The transition will animate only `transform`, preserving compositor-friendly rendering.

When the mobile menu opens, the component will force the header visible and suspend hiding until the menu closes. Closing the menu resets the comparison baseline to the current `window.scrollY`, preventing a stale delta from immediately hiding the header.

Route-change start closes the menu and restores the header. Route-change completion schedules a baseline reset from the browser's restored `window.scrollY` and keeps the header visible, so navigation and browser scroll restoration cannot inherit the previous page's direction.

## Accessibility and Motion

- The header remains in the document and accessibility tree while visually hidden.
- CSS `:focus-within` will override the hidden transform, so the header remains visible for as long as any header control retains keyboard focus, including during scrolling.
- Under `prefers-reduced-motion: reduce`, the state change remains functional but a component-level media rule sets the header transition to `none`.

## Verification

- At the top of the page, the header is visible.
- At exactly 80 pixels, the header remains visible; after at least 4 downward pixels above 80, it is translated out of view.
- One-pixel scroll events do not toggle the header until their retained delta totals 4 pixels.
- Four accumulated upward pixels reveal the header.
- Opening the mobile menu keeps the header visible during further scrolling.
- Closing the mobile menu resets the baseline and does not immediately hide the header.
- Focusing a header control reveals it and scrolling while that control retains focus does not hide it.
- Route changes and restored scroll positions begin with the header visible and a fresh baseline.
- Emulated reduced motion produces no header transition while preserving hide and reveal state changes.
- Run `npm run lint`, `npx next typegen`, `npx tsc --noEmit`, and `git diff --check`.
- Exercise the desktop and mobile scenarios in a real browser and confirm the browser console has no errors.
