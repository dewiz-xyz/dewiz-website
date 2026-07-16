# Floor Tile Proportions Design

## Goal

Refine the animated perspective floor so its cells appear approximately square around the vertical midpoint, compress toward the horizon, and stretch only mildly near the bottom. The grid must continue across the full viewport width without diagonal lane boundaries.

## Selected Direction

Use the approved near-uniform projection from visual option C. Let `floorY = 1 - v_uv.y`, `depth = 1 / max(floorY, 0.015)`, exponent `p = 0.4`, and depth scale `k = 26.525`. Horizontal grid position is:

```glsl
worldZ = pow(depth, 0.4) * 26.525 + u_offset;
```

The projected cell height-to-width ratio at a floor-local vertical position `y` is `14 * pow(y, p) / (k * p)`. This calibration yields:

- `y = 0.50`: ratio `1.00`, accepted within `±0.03`.
- `y = 1.00`: ratio `1.32`, accepted within `±0.04`.
- `y = 0.10`: ratio `0.53`, accepted within `±0.04` and strictly shorter than the midpoint cells.

Additional constraints:

- Keep the existing infinite analytic X grid. Shader-generated vertical lines already extend beyond the viewport and must remain visible across the entire width.
- Replace the linear depth relationship for horizontal lines with the exact power curve above.
- Calibrate the depth scale so cells are approximately square at the floor viewport midpoint.
- Meet the numerical midpoint, bottom, and horizon ratios above.
- Preserve the current cyan, horizon fade, bottom fade, 33/67 wall-floor split, animation timing, scroll response, and reduced-motion behavior.

## Line Weight Revision

The floor grid must sit closer to the wall grid's visual weight. The wall uses 7% cyan at one CSS pixel; perspective antialiasing and fading require the floor to remain slightly stronger:

- Set floor peak alpha to exactly `0.10` before the existing horizon and bottom fades.
- Set vertical analytic half-width to exactly `0.28`.
- Set horizontal analytic half-width to exactly `0.36`.
- Remove the previous `0.24`, `0.55`, and `0.72` values.
- Preserve the current cyan color and all fade functions.

## Implementation Boundary

Change only the WebGL projection constants and expressions required for horizontal grid spacing, the three approved line-weight values, and the four approved motion constants. Do not alter page layout, typography, content, navigation, wall grid, fades, color, integration logic, or animation architecture.

## Motion Revision

Keep the continuous idle motion slow but make scroll interaction clearly more dramatic:

- Increase ambient speed by exactly 10%, from `0.08` to `0.088` world units per second.
- Change scroll sensitivity from one velocity unit per `160px` to one per `70px`.
- Clamp both forward and reverse scroll impulses symmetrically at `±4.0`.
- Extend exponential scroll decay from `180ms` to `240ms`.
- Preserve the existing time-based offset integration, modulo wrapping, frame-time cap, passive scroll listener, visibility handling, and reduced-motion behavior.

## Verification

- Add a regression test that calculates the projected ratios at `y = 0.10`, `0.50`, and `1.00` and enforces the stated tolerances; do not limit coverage to source-text constant matching.
- Add regression coverage for the exact approved line widths and peak alpha, including rejection of the previous stronger values.
- Add behavioral regression coverage for the `0.088` idle speed, `1/70` scroll sensitivity, `±4.0` clamps, and `240ms` decay.
- Run the focused WebGL test, full Node test suite, ESLint, TypeScript, and `npx next build --webpack`.
- Verify in a real browser at `1440 × 900` and `390 × 844`.
- At both viewport sizes, confirm measured ratios remain within tolerance, horizon cells are shorter than midpoint cells, vertical lines reach both viewport edges, and no diagonal lane boundaries appear.
- Confirm floor strokes remain legible but no longer overpower the 7% wall grid in desktop, mobile, and reduced-motion screenshots.
- Confirm the live shader resolution uniform matches the canvas backing size.
- Keep all changes local and uncommitted until explicit approval.
