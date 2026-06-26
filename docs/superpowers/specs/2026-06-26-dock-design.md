# Dock Component — Design Spec

**Date:** 2026-06-26
**Status:** Approved
**Goal:** A macOS-style magnifying Dock for basuicn, recreating Magic UI's `@magicui/dock`
effect within basuicn's conventions (copy-into-project, wrap third-party libs, `tv()` +
`forwardRef` + `cn()`).

## Decisions (from brainstorming)

- **Animation:** Add `motion` (framer-motion). Port Magic UI's spring-based magnification,
  but keep all `motion/react` imports confined to `Dock.tsx` (wrap the lib).
- **API:** Both compound (`Dock` + `DockIcon` + `DockSeparator`) and a prop-based
  convenience (`<Dock items={[...]} />`).
- **Scope v1:** hover tooltip labels, horizontal + vertical orientation, separators,
  showcase page + unit test.
- **Registry:** run `registry:build` so `npx basuicn add dock` works.

## Architecture

### Magnification core
- `Dock` owns a `MotionValue` for the pointer axis (`mouseX` for horizontal, `mouseY` for
  vertical). `onMouseMove` sets it to `e.pageX`/`e.pageY`; `onMouseLeave` resets to `Infinity`.
- Config + the pointer `MotionValue` are passed down via a **React Context** (`DockContext`),
  not `cloneElement` — this allows arbitrary nesting (separators, groups).
- Each `DockIcon`:
  - `useTransform(pointer, val => val - bounds.center)` → distance from icon center.
  - `useTransform(distance, [-distance, 0, distance], [size, magnification, size])` → target size.
  - `useSpring(target, { mass: 0.1, stiffness: 150, damping: 12 })` → smoothed size.
  - Applies smoothed size to `width`+`height` (horizontal) or symmetric for vertical.

### Config props on `Dock`
- `orientation`: `'horizontal'` (default) | `'vertical'`
- `iconSize` (default 40), `iconMagnification` (default 60), `iconDistance` (default 140)
- `items?`: when provided, renders prop-based items instead of `children`
- standard `className`, `...props`

### Sub-components
- `DockIcon` — renders a `<button>` by default; `label` → `aria-label` + wraps in basuicn
  `Tooltip` (single `TooltipProvider` hoisted to `Dock`). Reads pointer/config from context.
- `DockSeparator` — a thin divider, orientation-aware.

### Styling (`tv()`)
- `root`/`panel` slots: rounded-2xl, border, `backdrop-blur`, bg, gap; `orientation` variant
  switches flex direction.
- `DockIcon`: rounded-full, flex center, hover `bg-muted`.

### Accessibility
- Each `DockIcon` is a real `button` with `aria-label`. Decorative icons `aria-hidden`.
- Separators use `role="separator"`.

## Files touched

In `src/`:
- `src/components/ui/dock/Dock.tsx` (new)
- `src/components/ui/dock/Dock.test.tsx` (new)
- `src/components/ui/dock/index.ts` (new)
- `src/components/ui/index.ts` (export)
- `src/pages/DockPage.tsx` (new showcase)
- `src/constants/Routes.constant.ts` (add `GENERAL.DOCK`)

Outside `src/` (user-approved):
- `package.json` — add `motion`
- `routes.tsx` (root) — import + register `DockPage`
- `registry.json` via `npm run registry:build`

## Testing
jsdom can't run spring physics or real `getBoundingClientRect`, so tests assert structure
and behavior, not animated values:
- renders all icons + separators
- `label` becomes `aria-label`
- `onClick` fires
- `orientation` changes container class
- prop-based `items` renders equivalently to compound children

## Non-goals (v1)
- Drag-to-reorder, app "running" indicators, bounce-on-click, magnetic edge docking.
