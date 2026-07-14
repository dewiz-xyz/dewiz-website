import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const styles = readFileSync(new URL("../styles/site.module.css", import.meta.url), "utf8");

test("source markers inherit the surrounding text color", () => {
  assert.match(styles, /\.valueCounter\s*\{[^}]*color:\s*var\(--accent-yellow\)/s);
  assert.match(styles, /\.sourceAsterisk\s*\{[^}]*color:\s*inherit/s);
  assert.doesNotMatch(styles, /\.valueCounter,\s*\.sourceAsterisk\s*\{/s);
});
