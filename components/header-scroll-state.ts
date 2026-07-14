export const SCROLL_TOP_THRESHOLD = 80;
export const SCROLL_DELTA_THRESHOLD = 4;

export interface HeaderScrollState {
  lastScrollY: number;
  isHidden: boolean;
}

export function getNextHeaderScrollState(
  state: HeaderScrollState,
  currentScrollY: number,
  isMenuOpen: boolean,
): HeaderScrollState {
  if (isMenuOpen || currentScrollY <= SCROLL_TOP_THRESHOLD) {
    return { lastScrollY: currentScrollY, isHidden: false };
  }

  const delta = currentScrollY - state.lastScrollY;
  if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return state;

  return { lastScrollY: currentScrollY, isHidden: delta > 0 };
}
