import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const styles = readFileSync(new URL("../styles/site.module.css", import.meta.url), "utf8");

test("text grid reuses the full-width-first case-study composition", () => {
  assert.match(
    styles,
    /\.textGrid\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s,
  );
  assert.match(
    styles,
    /\.textGrid\s*>\s*:first-child\s*\{[^}]*grid-column:\s*1\s*\/\s*-1[^}]*grid-row:\s*auto/s,
  );
});

test("text grid collapses to one column at the mobile breakpoint", () => {
  assert.match(
    styles,
    /@media \(max-width: 767\.98px\)[\s\S]*?\.textGrid,[\s\S]*?grid-template-columns:\s*1fr/,
  );
});
