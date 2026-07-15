import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const layout = readFileSync(new URL("../components/layout.tsx", import.meta.url), "utf8");
const siteStyles = readFileSync(new URL("../styles/site.module.css", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../styles/globals.css", import.meta.url), "utf8");

test("layout renders one decorative wall and floor scene", () => {
  assert.match(
    layout,
    /<div className=\{c\.perspectiveBackground\} aria-hidden="true">[\s\S]*?c\.backgroundWall[\s\S]*?c\.backgroundFloorViewport[\s\S]*?c\.backgroundFloor/,
  );
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
    /\.backgroundFloor\s*\{[^}]*transform:\s*rotateX\(58deg\) scale\(1\.05\);/s,
  );
  assert.match(
    siteStyles,
    /\.backgroundFloor\s*\{[^}]*mask-image:\s*linear-gradient\(\s*to bottom,\s*transparent 0%,\s*rgba\(0, 0, 0, 0\.08\) 18%,\s*#000 55%,\s*#000 82%,\s*rgba\(0, 0, 0, 0\.52\)\s*\);/s,
  );
  assert.doesNotMatch(siteStyles, /\.backgroundWall::after/);
});

test("body keeps only the dark base instead of the old scrolling grid", () => {
  const bodyRules = [...globalStyles.matchAll(/\nbody\s*\{([\s\S]*?)\}/g)];
  const bodyRule = bodyRules.at(-1)?.[1] ?? "";

  assert.match(bodyRule, /background:\s*var\(--bg\);/);
  assert.doesNotMatch(bodyRule, /linear-gradient/);
  assert.doesNotMatch(bodyRule, /background-attachment/);
});
