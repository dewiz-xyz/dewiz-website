export const FLOOR_AMBIENT_SPEED = 0.088;

const FLOOR_SCROLL_SCALE = 70;
const FLOOR_MAX_FORWARD_VELOCITY = 4;
const FLOOR_MAX_REVERSE_VELOCITY = -4;
const FLOOR_SCROLL_DECAY_MS = 240;
const FLOOR_MAX_FRAME_MS = 50;

export function getFloorScrollVelocity(deltaY: number): number {
  return Math.max(
    FLOOR_MAX_REVERSE_VELOCITY,
    Math.min(deltaY / FLOOR_SCROLL_SCALE, FLOOR_MAX_FORWARD_VELOCITY),
  );
}

export function decayFloorScrollVelocity(velocity: number, elapsedMs: number): number {
  return velocity * Math.exp(-elapsedMs / FLOOR_SCROLL_DECAY_MS);
}

export function advanceFloorOffset(
  offset: number,
  elapsedMs: number,
  scrollVelocity: number,
): number {
  const frameSeconds = Math.min(Math.max(elapsedMs, 0), FLOOR_MAX_FRAME_MS) / 1000;
  const nextOffset = offset + (FLOOR_AMBIENT_SPEED + scrollVelocity) * frameSeconds;

  return ((nextOffset % 1) + 1) % 1;
}
