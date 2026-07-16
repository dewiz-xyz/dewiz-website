# Floor Tile Proportions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the animated floor cells square around the floor viewport midpoint, shorter near the horizon, only mildly taller at the bottom, and visibly infinite across the full viewport width.

**Architecture:** Keep the existing one-pass WebGL renderer and infinite analytic X grid. Replace only the horizontal grid's linear depth mapping with the approved power curve, expose the projection constants and ratio calculation for behavioral regression tests, and preserve all motion, fade, layout, and fallback behavior.

**Tech Stack:** TypeScript, WebGL2/GLSL ES 3.00, React 18, Next.js 16, Node test runner, Playwright CLI

**Local-only constraint:** Do not commit or push. The user requires explicit approval before any commit.

---

## File Map

- Modify `components/perspective-floor-webgl.ts`: own the projection constants, ratio helper, GLSL depth equation, and renderer.
- Modify `tests/perspective-floor-webgl.test.mjs`: verify actual projection ratios and shader wiring.
- Do not modify layout, motion, wall-grid, typography, content, or navigation files.

### Task 1: Add Behavioral Projection Coverage

**Files:**
- Modify: `tests/perspective-floor-webgl.test.mjs`
- Test: `tests/perspective-floor-webgl.test.mjs`

- [ ] **Step 1: Import the renderer module for behavioral checks**

Add a dynamic module import alongside the existing source read:

```js
let rendererModule = {};

try {
  rendererModule = await import("../components/perspective-floor-webgl.ts");
} catch {
  // The red phase intentionally starts before projection exports exist.
}
```

- [ ] **Step 2: Write the failing ratio test**

Add a test that exercises the projection helper rather than merely matching constants:

```js
test("floor cells are square at midpoint and only mildly stretch at the bottom", () => {
  const ratioAt = rendererModule.getProjectedFloorCellRatio;

  assert.equal(typeof ratioAt, "function");
  assert.ok(Math.abs(ratioAt(0.1) - 0.53) <= 0.04);
  assert.ok(Math.abs(ratioAt(0.5) - 1) <= 0.03);
  assert.ok(Math.abs(ratioAt(1) - 1.32) <= 0.04);
  assert.ok(ratioAt(0.1) < ratioAt(0.5));
});
```

- [ ] **Step 3: Write the failing shader-wiring test**

Extend the analytic-line test with:

```js
assert.match(renderer, /pow\(depth, FLOOR_DEPTH_EXPONENT\)/);
assert.match(renderer, /\$\{FLOOR_DEPTH_SCALE\}/);
assert.doesNotMatch(renderer, /float worldZ = depth \* 4\.0 \+ u_offset/);
```

- [ ] **Step 4: Run the focused test and confirm RED**

Run:

```bash
node tests/perspective-floor-webgl.test.mjs
```

Expected: FAIL because `getProjectedFloorCellRatio`, `FLOOR_DEPTH_EXPONENT`, and `FLOOR_DEPTH_SCALE` are not implemented and the shader still uses linear depth.

### Task 2: Implement the Approved Projection

**Files:**
- Modify: `components/perspective-floor-webgl.ts`
- Test: `tests/perspective-floor-webgl.test.mjs`

- [ ] **Step 1: Add exact projection constants and the ratio helper**

Near the top of `components/perspective-floor-webgl.ts`, add:

```ts
export const FLOOR_LATERAL_SCALE = 14;
export const FLOOR_DEPTH_EXPONENT = 0.4;
export const FLOOR_DEPTH_SCALE = 26.525;

export function getProjectedFloorCellRatio(floorY: number): number {
  return (
    (FLOOR_LATERAL_SCALE * floorY ** FLOOR_DEPTH_EXPONENT) /
    (FLOOR_DEPTH_SCALE * FLOOR_DEPTH_EXPONENT)
  );
}
```

- [ ] **Step 2: Wire the constants into the shader source**

Replace the hard-coded lateral and linear-depth expressions with template interpolation:

```glsl
float worldX = (v_uv.x - 0.5) * depth * aspect * ${FLOOR_LATERAL_SCALE}.0;
float worldZ = pow(depth, FLOOR_DEPTH_EXPONENT) * ${FLOOR_DEPTH_SCALE} + u_offset;
```

Define the GLSL exponent within the template before `main`:

```glsl
const float FLOOR_DEPTH_EXPONENT = ${FLOOR_DEPTH_EXPONENT};
```

Do not change `gridLine`, `u_offset`, derivative-based antialiasing, fades, alpha, color, or renderer lifecycle.

- [ ] **Step 3: Run the focused test and confirm GREEN**

Run:

```bash
node tests/perspective-floor-webgl.test.mjs
```

Expected: all WebGL renderer tests PASS, including the calculated ratios.

- [ ] **Step 4: Run TypeScript validation**

Run:

```bash
npx tsc --noEmit
```

Expected: exit 0 with no type errors.

### Task 3: Match Floor Line Weight to the Wall

**Files:**
- Modify: `tests/perspective-floor-webgl.test.mjs`
- Modify: `components/perspective-floor-webgl.ts`

- [ ] **Step 1: Add a failing line-weight regression test**

Require exact approved values and reject the previous heavy rendering:

```js
test("floor lines stay close to the wall grid's visual weight", () => {
  assert.match(renderer, /gridLine\(worldX, abs\(dFdx\(worldX\)\), 0\.28\)/);
  assert.match(renderer, /gridLine\(worldZ, abs\(dFdy\(worldZ\)\), 0\.36\)/);
  assert.match(renderer, /\* 0\.10 \* horizonFade \* bottomFade/);
  assert.doesNotMatch(renderer, /0\.55|0\.72|\* 0\.24 \*/);
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run `node tests/perspective-floor-webgl.test.mjs`.

Expected: FAIL because the shader still uses `0.55`, `0.72`, and `0.24`.

- [ ] **Step 3: Apply the approved values**

Change only the two `gridLine` half-width arguments and the peak alpha multiplier to `0.28`, `0.36`, and `0.10`. Preserve color, fades, projection, motion, and renderer lifecycle.

- [ ] **Step 4: Run the focused test and TypeScript validation**

Run:

```bash
node tests/perspective-floor-webgl.test.mjs
npx tsc --noEmit
```

Expected: PASS with no type errors.

### Task 4: Strengthen Scroll Motion

**Files:**
- Modify: `tests/perspective-floor-motion.test.mjs`
- Modify: `components/perspective-floor-motion.ts`

- [ ] **Step 1: Update motion expectations and confirm RED**

Require ambient speed `0.088`, `80px` impulses of `±(8/7)`, clamping at `±4`, and exponential decay measured at `240ms`. For both positive and negative velocities, assert `decayFloorScrollVelocity(velocity, 240)` equals `velocity / Math.E` within `1e-12`; directional inequalities alone are insufficient. Update the offset integration expectation for a 50ms idle frame from `0.004` to `0.0044`.

Run `node tests/perspective-floor-motion.test.mjs`.

Expected: FAIL against the previous `0.08`, `1/160`, `+1.25/-1`, and `180ms` profile.

- [ ] **Step 2: Apply the approved motion constants**

Set:

```ts
export const FLOOR_AMBIENT_SPEED = 0.088;
const FLOOR_SCROLL_SCALE = 70;
const FLOOR_MAX_FORWARD_VELOCITY = 4;
const FLOOR_MAX_REVERSE_VELOCITY = -4;
const FLOOR_SCROLL_DECAY_MS = 240;
```

Do not change integration, wrapping, frame cap, event wiring, or reduced motion.

- [ ] **Step 3: Run focused motion and TypeScript checks**

Run:

```bash
node tests/perspective-floor-motion.test.mjs
npx tsc --noEmit
```

Expected: PASS with no type errors.

### Task 5: Verify Rendering and Guard Against Regression

**Files:**
- Verify only; no planned source changes.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
node --test tests/*.test.mjs
npm run lint
npx tsc --noEmit
git -c core.fsmonitor=false diff --check
```

Expected: all test files pass; ESLint and TypeScript exit 0; diff check produces no output. The existing stale browser-data warning is informational only.

- [ ] **Step 2: Run the production webpack build**

Run:

```bash
npx next build --webpack
```

Expected: compilation and static page generation complete successfully for all routes.

- [ ] **Step 3: Start the local site and browser session**

In one terminal, run:

```bash
npm run dev
```

Create `/tmp/floor-proportions-playwright.json` with `apply_patch` using this exact content so the CLI uses the installed Chromium binary rather than its unavailable default channel and writes only to a task-specific temporary directory:

```json
{
  "browser": {
    "browserName": "chromium",
    "isolated": true,
    "launchOptions": {
      "executablePath": "/usr/bin/chromium",
      "args": ["--no-sandbox"],
      "headless": true
    }
  },
  "outputDir": "/tmp/floor-proportions-playwright",
  "outputMode": "file"
}
```

In another terminal, set the CLI path and open the site with that config:

```bash
export PWCLI="$HOME/.codex/skills/playwright/scripts/playwright_cli.sh"
"$PWCLI" --config /tmp/floor-proportions-playwright.json --session floor-proportions open http://127.0.0.1:3000
```

Expected: the homepage loads without console errors.

- [ ] **Step 4: Verify desktop projection metrics and full-width coverage**

Resize and query the live WebGL program:

```bash
"$PWCLI" --session floor-proportions resize 1440 900
"$PWCLI" --session floor-proportions eval "() => new Promise(resolve => requestAnimationFrame(() => { const canvas=document.querySelector('canvas'); const gl=canvas.getContext('webgl2'); const program=gl.getParameter(gl.CURRENT_PROGRAM); const shaders=gl.getAttachedShaders(program) || []; const source=shaders.map(shader => gl.getShaderSource(shader) || '').join('\n'); const exponent=Number(source.match(/FLOOR_DEPTH_EXPONENT = ([0-9.]+)/)?.[1]); const scale=Number(source.match(/pow\(depth, FLOOR_DEPTH_EXPONENT\) \* ([0-9.]+)/)?.[1]); const lateral=Number(source.match(/aspect \* ([0-9.]+)/)?.[1]); const ratio=y => lateral * Math.pow(y, exponent) / (scale * exponent); const resolutionLocation=gl.getUniformLocation(program,'u_resolution'); const resolution=Array.from(gl.getUniform(program,resolutionLocation)); const pixels=new Uint8Array(canvas.width*canvas.height*4); gl.readPixels(0,0,canvas.width,canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,pixels); const segmentRange=(y,x0,x1)=>{const row=Math.round((1-y)*(canvas.height-1));let min=255,max=0;for(let x=Math.round(x0*canvas.width);x<Math.round(x1*canvas.width);x++){const alpha=pixels[(row*canvas.width+x)*4+3];min=Math.min(min,alpha);max=Math.max(max,alpha);}return max-min;}; const ys=[.45,.47,.49,.51,.53,.55]; const ranges=[[0,.1],[.45,.55],[.9,1]].map(([x0,x1])=>Math.max(...ys.map(y=>segmentRange(y,x0,x1)))); resolve({ratios:[ratio(.1),ratio(.5),ratio(1)],ranges,resolution,canvas:[canvas.width,canvas.height]}); }))"
```

Expected:

- ratios fall within `0.53 ± 0.04`, `1.00 ± 0.03`, and `1.32 ± 0.04`;
- each of the left, center, and right alpha ranges is at least `8`, proving vertical-line variation exists across the full width;
- left and right ranges are each at least half the center range, ruling out diagonal lane boundaries;
- `resolution` exactly equals `canvas`.

Capture the repeatable visual artifact:

```bash
"$PWCLI" --session floor-proportions screenshot --filename=/tmp/floor-proportions-desktop.png
```

Inspect the screenshot once to confirm the numerical coverage check corresponds to the intended edge-to-edge floor rather than unrelated pixels.

Line-weight acceptance: the floor must remain clearly legible over the hero, but its strokes must read close to the 7% wall grid and must not compete with the body text or heading. Reject the result if the floor again reads as the dominant visual layer.

- [ ] **Step 5: Verify narrow projection metrics**

Run:

```bash
"$PWCLI" --session floor-proportions resize 390 844
```

Repeat the exact `eval` command from Step 4. Expected: the same ratio tolerances and range thresholds pass; `resolution` equals `canvas`.

Capture `/tmp/floor-proportions-mobile.png` with:

```bash
"$PWCLI" --session floor-proportions screenshot --filename=/tmp/floor-proportions-mobile.png
```

Inspect the mobile screenshot with the same line-weight acceptance rule: the floor remains legible, stays visually close to the wall, and does not reduce text or button prominence.

Check page overflow:

```bash
"$PWCLI" --session floor-proportions eval "() => ({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})"
```

Expected: `scrollWidth === clientWidth`.

- [ ] **Step 6: Verify animation continuity under normal motion**

Reset the viewport to desktop and explicitly use normal motion:

```bash
"$PWCLI" --session floor-proportions resize 1440 900
"$PWCLI" --session floor-proportions run-code "await page.emulateMedia({ reducedMotion: 'no-preference' }); await page.reload();"
"$PWCLI" --session floor-proportions eval "() => new Promise(resolve => { const canvas=document.querySelector('canvas'); const gl=canvas.getContext('webgl2'); const program=gl.getParameter(gl.CURRENT_PROGRAM); const location=gl.getUniformLocation(program,'u_offset'); const samples=[]; const step=t=>{samples.push([t,gl.getUniform(program,location)]); if(samples.length<60) requestAnimationFrame(step); else resolve(samples);}; requestAnimationFrame(step); })"
```

Expected: all 59 consecutive offset deltas are non-zero and forward, excluding the modulo wrap; frame timestamps are strictly increasing. Record a short Playwright video while scrolling once in each direction and confirm visually that lines retain constant apparent thickness and the fixed background does not move with document content:

```bash
"$PWCLI" --session floor-proportions video-start /tmp/floor-proportions-motion.webm
"$PWCLI" --session floor-proportions mousewheel 0 600
"$PWCLI" --session floor-proportions mousewheel 0 -600
"$PWCLI" --session floor-proportions video-stop
```

- [ ] **Step 7: Verify reduced motion**

Run:

```bash
"$PWCLI" --session floor-proportions run-code "await page.emulateMedia({ reducedMotion: 'reduce' }); await page.reload();"
"$PWCLI" --session floor-proportions eval "() => new Promise(resolve => { const canvas=document.querySelector('canvas'); const gl=canvas.getContext('webgl2'); const program=gl.getParameter(gl.CURRENT_PROGRAM); const location=gl.getUniformLocation(program,'u_offset'); const values=[]; const step=()=>{values.push(gl.getUniform(program,location)); if(values.length<10) requestAnimationFrame(step); else resolve({ready:canvas.dataset.ready,values});}; requestAnimationFrame(step); })"
```

Expected: `ready === "true"` and all 10 offset values are identical. Under reduced motion, inspect the live shader source and uniforms using the Step 4 command but omit `readPixels`: the three calculated ratios must remain within tolerance and `u_resolution` must still equal the canvas backing dimensions.

Because reduced motion performs one static draw with `preserveDrawingBuffer: false`, do not use a delayed framebuffer read as evidence. Capture the composited page instead:

```bash
"$PWCLI" --session floor-proportions screenshot --filename=/tmp/floor-proportions-reduced.png
```

Inspect this screenshot and confirm the static grid remains visible across both viewport edges with no diagonal lane boundaries. This screenshot is the reduced-motion coverage artifact; the normal-motion framebuffer test remains the objective pixel-level coverage gate.

Also apply the line-weight acceptance rule to the reduced-motion screenshot: the static floor remains legible but secondary to the page content and close in visual weight to the wall grid.

- [ ] **Step 8: Inspect final local state and clean browser artifacts**

Close the browser session and remove only its generated screenshots/video/logs before status inspection:

```bash
"$PWCLI" --session floor-proportions close
rm -f /tmp/floor-proportions-playwright.json /tmp/floor-proportions-desktop.png /tmp/floor-proportions-mobile.png /tmp/floor-proportions-reduced.png /tmp/floor-proportions-motion.webm
rm -rf /tmp/floor-proportions-playwright
```

Stop the dedicated `npm run dev` terminal with `Ctrl-C` and confirm it exits before continuing.

Run:

```bash
git -c core.fsmonitor=false status --short
```

Expected: only the intended existing background work, the projection change, tests, and local design/plan artifacts are present. Do not stage, commit, or push anything.
