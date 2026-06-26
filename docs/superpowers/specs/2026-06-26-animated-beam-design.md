# AnimatedBeam Component — Design Spec

**Date:** 2026-06-26
**Status:** Approved
**Goal:** Port Magic UI's `@magicui/animated-beam` into basuicn — an animated SVG gradient
beam connecting two DOM nodes — following basuicn conventions (`cn()`, `forwardRef`,
explicit prop defaults). Reuses the already-installed `motion` dependency.

## Decisions (from brainstorming)

- **Default gradient:** Kraken purple theme — `gradientStartColor="#7132f5"`,
  `gradientStopColor="#a78bfa"` (instead of Magic UI's orange→purple).
- **API:** prop-based only (component needs consumer-created refs; no compound form).
- **Demo:** integrations hub + simple 2-node + bidirectional examples.
- **Deterministic default `duration`** (5s) instead of Magic UI's `Math.random()` default;
  the demo varies duration per beam for a natural desync.

## Architecture

- Props: `containerRef`, `fromRef`, `toRef` (`RefObject<HTMLElement | null>`), plus
  `curvature`, `reverse`, `duration`, `delay`, `pathColor`, `pathWidth`, `pathOpacity`,
  `gradientStartColor`, `gradientStopColor`, `start/end X/Y offsets`, `className`.
- A `useEffect` computes the SVG quadratic-curve `path` between the centers of `fromRef`
  and `toRef`, relative to `containerRef`, and stores svg width/height.
- A `ResizeObserver` on the container (+ recompute on dep change) redraws on layout change.
- Two stacked `<path>`s: a static faint base path + a gradient-stroked path whose
  `<motion.linearGradient>` coordinates animate (looping) to create the travelling beam;
  `reverse` flips direction.
- `forwardRef<SVGSVGElement>` + `displayName`. Overlay is `pointer-events-none absolute`.
- No `tv()` — no variants, so inline `cn()` per basuicn guidelines.

## Files

In `src/`:
- `src/components/ui/animated-beam/AnimatedBeam.tsx` (new)
- `src/components/ui/animated-beam/AnimatedBeam.test.tsx` (new)
- `src/components/ui/animated-beam/index.ts` (new)
- `src/components/ui/index.ts` (export)
- `src/pages/AnimatedBeamPage.tsx` (new showcase)
- `src/constants/Routes.constant.ts` (add `GENERAL.ANIMATED_BEAM`)

Outside `src/` (already approved pattern):
- `routes.tsx` — import + register page
- `registry.json` via `npm run registry:build`

## Testing
jsdom returns zeroed `getBoundingClientRect`, so tests assert structure/props, not path
geometry: renders an `<svg>`, applies `pathColor`/`pathWidth`, unique gradient id, and that
it mounts without throwing given refs.

## Non-goals (v1)
- Multi-segment beams, particles along the path, click interactions.
