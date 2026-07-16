import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const layout = readFileSync(new URL("../components/layout.tsx", import.meta.url), "utf8");
const background = readFileSync(
  new URL("../components/perspective-background.tsx", import.meta.url),
  "utf8",
);
const siteStyles = readFileSync(new URL("../styles/site.module.css", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../styles/globals.css", import.meta.url), "utf8");

test("layout delegates the decorative scene to PerspectiveBackground", () => {
  assert.match(layout, /import PerspectiveBackground from "\.\/perspective-background";/);
  assert.match(layout, /<PerspectiveBackground \/>/);
});

test("floor uses a responsive WebGL canvas with a static fallback", () => {
  assert.match(background, /createPerspectiveFloorRenderer/);
  assert.match(background, /<canvas ref=\{canvasRef\} className=\{c\.backgroundFloorCanvas\}/);
  assert.match(background, /className=\{c\.backgroundFloorFallback\}/);
  assert.match(background, /canvas\.dataset\.ready = "true"/);
  assert.match(background, /requestAnimationFrame\(renderFrame\)/);
  assert.match(background, /advanceFloorOffset/);
  assert.match(background, /getFloorScrollVelocity\(deltaY\)/);
  assert.match(background, /decayFloorScrollVelocity/);
  assert.match(
    background,
    /addEventListener\("scroll", handleScroll, \{ passive: true \}\)/,
  );
  assert.match(background, /prefers-reduced-motion: reduce/);
  assert.match(background, /new ResizeObserver/);
  assert.match(background, /renderer\.dispose\(\)/);
  assert.match(background, /removeEventListener\("scroll", handleScroll\)/);
  assert.match(background, /cancelAnimationFrame/);
  assert.doesNotMatch(background, /\.animate\(/);
});

test("perspective scene is fixed with the approved 33/67 geometry and wide fades", () => {
  assert.match(
    siteStyles,
    /\.perspectiveBackground\s*\{[^}]*position:\s*fixed;[^}]*inset:\s*0;[^}]*pointer-events:\s*none;/s,
  );
  assert.match(siteStyles, /\.backgroundWall\s*\{[^}]*inset:\s*0 0 67%;/s);
  assert.match(
    siteStyles,
    /\.backgroundWall\s*\{[^}]*mask-image:\s*linear-gradient\(to bottom, #000 0%, #000 22%, transparent 100%\);/s,
  );
  assert.match(siteStyles, /\.backgroundFloorViewport\s*\{[^}]*inset:\s*33% 0 0;/s);
  assert.match(
    siteStyles,
    /\.backgroundFloorGrid\s*\{[^}]*background-size:\s*12px 6px;/s,
  );
  assert.match(
    siteStyles,
    /\.backgroundFloorFallback\s*\{[^}]*transform:\s*rotateX\(58deg\) scale\(1\.05\);/s,
  );
  assert.match(
    siteStyles,
    /\.backgroundFloorCanvas\s*\{[^}]*mask-image:\s*linear-gradient\(\s*to bottom,\s*transparent 0%,\s*rgba\(0, 0, 0, 0\.08\) 18%,\s*#000 55%,\s*#000 82%,\s*rgba\(0, 0, 0, 0\.52\)\s*\);/s,
  );
  assert.doesNotMatch(siteStyles, /\.backgroundWall::after/);
});

test("WebGL canvas fills the floor, keeps the fade, and replaces its fallback", () => {
  assert.match(
    siteStyles,
    /\.backgroundFloorCanvas\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0;[^}]*width:\s*100%;[^}]*height:\s*100%;/s,
  );
  assert.match(
    siteStyles,
    /\.backgroundFloorCanvas\s*\{[^}]*mask-image:\s*linear-gradient\(/s,
  );
  assert.match(
    siteStyles,
    /\.backgroundFloorCanvas\[data-ready="true"\]\s*\+\s*\.backgroundFloorFallback\s*\{[^}]*visibility:\s*hidden;/s,
  );
});

test("floor grid uses crisp 1.5 pixel cyan lines", () => {
  const floorRule =
    siteStyles.match(/\.backgroundFloorGrid\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  const crispLines = floorRule.match(/rgba\(0, 178, 226, 0\.18\) 1\.5px/g) ?? [];

  assert.equal(crispLines.length, 2);
});

test("body keeps only the dark base instead of the old scrolling grid", () => {
  const bodyRules = [...globalStyles.matchAll(/\nbody\s*\{([\s\S]*?)\}/g)];
  const bodyRule = bodyRules.at(-1)?.[1] ?? "";

  assert.match(bodyRule, /background:\s*var\(--bg\);/);
  assert.doesNotMatch(bodyRule, /linear-gradient/);
  assert.doesNotMatch(bodyRule, /background-attachment/);
});
