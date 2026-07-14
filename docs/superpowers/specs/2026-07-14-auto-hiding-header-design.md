# Auto-Hiding Header Design

## Objective

Make the fixed site header leave the viewport while the user scrolls down and return as soon as the user scrolls up, increasing usable reading space without making navigation difficult to recover.

## Behavior

- Keep the header visible while the page is within 80 pixels of the top.
- Hide the header when the user scrolls down beyond that threshold.
- Reveal the header immediately when the user scrolls up.
- Keep the header visible whenever the mobile navigation menu is open.
- Reset the header to visible when navigation begins.
- Ignore tiny scroll changes so sub-pixel or layout movement does not cause jitter.

## Implementation

The existing `Header` component will track whether the fixed header is hidden. A passive `scroll` listener will compare the current vertical position with the last observed position and update that state only when the direction meaningfully changes.

The header element will receive a hidden modifier class. CSS will move it fully above the viewport with `transform: translateY(-100%)`; the visible state will use `translateY(0)`. The transition will animate only `transform`, preserving compositor-friendly rendering.

When the mobile menu opens, the component will force the header visible and suspend hiding until the menu closes. Route changes will also restore the visible state.

## Accessibility and Motion

- The header remains in the document and accessibility tree while visually hidden.
- Keyboard focus entering the header will reveal it.
- Under `prefers-reduced-motion: reduce`, the state change remains functional but the CSS transition is disabled by the site's existing reduced-motion rule.

## Verification

- At the top of the page, the header is visible.
- After scrolling down beyond 80 pixels, the header is translated out of view.
- Scrolling upward reveals it.
- Opening the mobile menu keeps the header visible during further scrolling.
- Focusing a header control reveals it.
- Lint, route type generation, TypeScript, and browser console checks pass.
