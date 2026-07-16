import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

let renderer = "";
let rendererModule = {};

try {
  renderer = readFileSync(
    new URL("../components/perspective-floor-webgl.ts", import.meta.url),
    "utf8",
  );
} catch {
  // The red phase intentionally starts before the renderer module exists.
}

try {
  rendererModule = await import("../components/perspective-floor-webgl.ts");
} catch {
  // The red phase intentionally starts before projection exports exist.
}

test("renderer uses a transparent high-performance WebGL2 context", () => {
  assert.match(renderer, /getContext\("webgl2",\s*\{/);
  assert.match(renderer, /alpha:\s*true/);
  assert.match(renderer, /antialias:\s*false/);
  assert.match(renderer, /powerPreference:\s*"high-performance"/);
});

test("fragment shader draws analytically antialiased perspective lines", () => {
  assert.match(renderer, /dFdx\(worldX\)/);
  assert.match(renderer, /dFdy\(worldZ\)/);
  assert.doesNotMatch(renderer, /fwidth\(/);
  assert.match(renderer, /smoothstep\(/);
  assert.match(renderer, /u_offset/);
  assert.match(renderer, /worldX/);
  assert.match(renderer, /worldZ/);
  assert.match(renderer, /pow\(depth, FLOOR_DEPTH_EXPONENT\)/);
  assert.match(renderer, /\$\{FLOOR_DEPTH_SCALE\}/);
  assert.doesNotMatch(renderer, /float worldZ = depth \* 4\.0 \+ u_offset/);
});

test("floor cells are square at midpoint and only mildly stretch at the bottom", () => {
  const ratioAt = rendererModule.getProjectedFloorCellRatio;

  assert.equal(typeof ratioAt, "function");
  assert.ok(Math.abs(ratioAt(0.1) - 0.53) <= 0.04);
  assert.ok(Math.abs(ratioAt(0.5) - 1) <= 0.03);
  assert.ok(Math.abs(ratioAt(1) - 1.32) <= 0.04);
  assert.ok(ratioAt(0.1) < ratioAt(0.5));
});

test("fragment shader outputs only the cyan grid and fades sub-pixel lines", () => {
  assert.match(renderer, /frequencyFade/);
  assert.match(renderer, /outColor = vec4\(cyan, alpha\)/);
  assert.doesNotMatch(
    renderer,
    /outColor = vec4\(verticalLine, horizontalLine, 0\.0, 1\.0\)/,
  );
});

test("floor lines stay close to the wall grid's visual weight", () => {
  assert.match(renderer, /gridLine\(worldX, abs\(dFdx\(worldX\)\), 0\.28\)/);
  assert.match(renderer, /gridLine\(worldZ, abs\(dFdy\(worldZ\)\), 0\.36\)/);
  assert.match(renderer, /\* 0\.10 \* horizonFade \* bottomFade/);
  assert.doesNotMatch(renderer, /0\.55|0\.72|\* 0\.24 \*/);
});

test("fragment shader places the horizon at the CSS top edge", () => {
  assert.match(renderer, /float floorY = 1\.0 - v_uv\.y/);
  assert.match(renderer, /smoothstep\(0\.02, 0\.34, floorY\)/);
  assert.doesNotMatch(renderer, /float screenY = max\(v_uv\.y/);
});

test("renderer caps pixel density and draws one fullscreen triangle", () => {
  assert.match(renderer, /Math\.min\(window\.devicePixelRatio \|\| 1, 2\)/);
  assert.match(renderer, /gl\.drawArrays\(gl\.TRIANGLES, 0, 3\)/);
  assert.match(renderer, /dispose\(\)/);
});

test("renderer initializes resolution uniforms even when canvas size is unchanged", () => {
  assert.doesNotMatch(
    renderer,
    /if \(canvas\.width === width && canvas\.height === height\) return/,
  );
  assert.match(
    renderer,
    /if \(canvas\.width !== width \|\| canvas\.height !== height\) \{[\s\S]*?canvas\.height = height;[\s\S]*?\}[\s\S]*?gl\.uniform2f\(resolutionLocation, width, height\)/,
  );
});
