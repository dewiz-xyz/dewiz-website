# dSolver Inventory Section Layout Design

## Objective

Remove the oversized empty area in the dSolver inventory section and restore a clear editorial hierarchy without changing its copy, palette, typography, or retro visual language.

## Layout

- Place the lead story, “Internal inventory as a competitive edge,” across the full content width.
- Keep the lead heading and paragraph stacked, matching the existing full-width case-study card pattern.
- Place the two supporting stories beneath it in equal-width columns with natural, matching row height.
- Preserve the existing cyan left edge and alternating dark surfaces.
- Collapse every story to a single column below 768 pixels.
- Do not introduce fixed or minimum heights; content determines height at every breakpoint.

## Verification

- At 1440 pixels, the lead card spans both grid columns and its height is determined by its heading, paragraph, and padding rather than the supporting row.
- At 1440 pixels, the two supporting cards occupy equal-width columns in one row and resolve to the same row height.
- At 768 pixels, the lead card still spans both columns, the supporting cards remain two equal readable columns, and the document has no horizontal overflow.
- At 767 pixels and below, the three cards retain their source order in one column.
- At 390 and 1440 pixels, document width equals viewport width with no horizontal overflow.
- No copy changes or new dependencies are introduced.
