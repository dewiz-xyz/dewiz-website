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
