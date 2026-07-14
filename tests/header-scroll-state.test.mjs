import assert from "node:assert/strict";
import test from "node:test";
import { getNextHeaderScrollState } from "../components/header-scroll-state.ts";

test("stays visible at and below 80 pixels", () => {
  const next = getNextHeaderScrollState({ lastScrollY: 76, isHidden: true }, 80, false);
  assert.deepEqual(next, { lastScrollY: 80, isHidden: false });
});

test("accumulates four downward pixels before hiding", () => {
  let state = { lastScrollY: 80, isHidden: false };
  state = getNextHeaderScrollState(state, 81, false);
  state = getNextHeaderScrollState(state, 82, false);
  state = getNextHeaderScrollState(state, 83, false);
  assert.deepEqual(state, { lastScrollY: 80, isHidden: false });
  assert.deepEqual(getNextHeaderScrollState(state, 84, false), {
    lastScrollY: 84,
    isHidden: true,
  });
});

test("accumulates four upward pixels before revealing", () => {
  let state = { lastScrollY: 100, isHidden: true };
  state = getNextHeaderScrollState(state, 99, false);
  state = getNextHeaderScrollState(state, 98, false);
  state = getNextHeaderScrollState(state, 97, false);
  assert.deepEqual(state, { lastScrollY: 100, isHidden: true });
  assert.deepEqual(getNextHeaderScrollState(state, 96, false), {
    lastScrollY: 96,
    isHidden: false,
  });
});

test("an open menu forces visibility and resets the baseline", () => {
  assert.deepEqual(
    getNextHeaderScrollState({ lastScrollY: 100, isHidden: true }, 220, true),
    { lastScrollY: 220, isHidden: false },
  );
});
