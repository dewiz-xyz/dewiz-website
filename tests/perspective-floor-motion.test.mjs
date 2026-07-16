import assert from "node:assert/strict";
import test from "node:test";

let motion = {};

try {
  motion = await import("../components/perspective-floor-motion.ts");
} catch {
  // The red phase intentionally starts before the motion module exists.
}

test("floor motion uses a slow continuous world-space speed", () => {
  assert.equal(motion.FLOOR_AMBIENT_SPEED, 0.088);
});

test("scroll deltas produce directional, clamped velocity impulses", () => {
  assert.equal(motion.getFloorScrollVelocity(0), 0);
  assert.equal(motion.getFloorScrollVelocity(80), 8 / 7);
  assert.equal(motion.getFloorScrollVelocity(400), 4);
  assert.equal(motion.getFloorScrollVelocity(-80), -8 / 7);
  assert.equal(motion.getFloorScrollVelocity(-400), -4);
});

test("scroll velocity decays toward zero", () => {
  const forward = motion.decayFloorScrollVelocity(4, 240);
  const reverse = motion.decayFloorScrollVelocity(-4, 240);

  assert.ok(Math.abs(forward - 4 / Math.E) < 1e-12);
  assert.ok(Math.abs(reverse + 4 / Math.E) < 1e-12);
  assert.equal(motion.decayFloorScrollVelocity(0, 240), 0);
});

test("world offset advances continuously and wraps without growing", () => {
  assert.ok(Math.abs(motion.advanceFloorOffset(0, 50, 0) - 0.0044) < 1e-12);
  assert.ok(Math.abs(motion.advanceFloorOffset(0.99, 50, 0.2) - 0.0044) < 1e-12);
});
