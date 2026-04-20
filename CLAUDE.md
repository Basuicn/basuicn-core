# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev              # Start dev server on port 3000
npm run build            # tsc -b + vite build
npm run lint             # ESLint (flat config, v9)
npm run test             # Vitest (watch mode)
npm run test:coverage    # Vitest coverage report
npm run storybook        # Storybook dev server on port 6006

# Maintainer-only
npm run registry:build   # Rebuild registry.json from components
npm run theme:sync       # Regenerate CSS theme variables
npm run build:cli        # Build the CLI (scripts/build-cli.mjs)
npm run version:set      # Bump version via scripts/set-version.mjs
```

Run a single test file: `npx vitest run src/components/ui/button/Button.test.tsx`

## Architecture

This is a **Vite 6 + React 19 + React Router v7 SPA** — a UI component library showcase and CLI tool called `basuicn`. It is not a Next.js project.

**Dual purpose:**
1. Showcase website: each page in `src/pages/` demonstrates a UI component with live previews, props, and code snippets.
2. CLI tool (`npx basuicn`): lets consumers scaffold components from the registry into their own projects. CLI source is in `scripts/`, built via `build:cli`.

**Routing:** Centralized in `src/routes.tsx` as a nested config object. `App.tsx` flattens the tree at runtime into `<Routes>/<Route>` elements. A `standalone: true` flag renders without the shared layout.

**Component structure:** Every UI component in `src/components/ui/<name>/` has:
- `<Name>.tsx` — implementation with `React.forwardRef` and a `tv()` variant config
- `<Name>.test.tsx` — Vitest + Testing Library unit tests
- `index.ts` — barrel export

**Styling:** Tailwind CSS v4 (CSS-first, no `tailwind.config.js`). All theme tokens are CSS custom properties defined in `src/styles/index.css`. Use `tv()` from `tailwind-variants` for variant logic and `cn()` from `src/lib/utils/cn.ts` (`clsx` + `tailwind-merge`) for conditional classes.

**Theming:** `ThemeProvider` in `src/lib/theme/` wraps the app and persists theme selection to localStorage. Themes are defined in `src/lib/theme/themes.ts` as CSS variable overrides. Access via `useTheme()`.

**UI primitives:** Components wrap `@base-ui/react` (headless, accessible). Always wrap third-party libs so replacements don't ripple through the codebase.

**Path aliases (from vite.config.ts):**
- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@lib/` → `src/lib/`
- `@hooks/`, `@utils/`, `@constants/`, `@services/`, `@slices/`, `@configs/`, `@assets/`, `@languages/`

**Testing:** Vitest with two projects — jsdom unit tests and Playwright-based Storybook component tests. Stories live in `src/stories/`.

**Design system:** Kraken-inspired (primary: `#7132f5` Kraken Purple). See `.claude/DESIGN.md` for full token reference.

## Rules

See `.claude/RULE.md` for the full rule set. Key constraints:
- TypeScript strict — never use `any`
- Function components and hooks only
- Keep components under 200 lines; split into smaller components if exceeded
- Always wrap third-party libraries (never import them directly in feature code)
- Write unit tests for all UI components
- Only read/write within `src/` and `public/` — ask the user before touching files outside these directories
- If a requirement is unclear, ask before guessing

## Workflow & Design References

- `.claude/REACT-VITE-WORKFLOW.md` — React SPA architecture, data fetching, performance patterns
- `.claude/FE_WORKFLOW.md` — Frontend design workflow
- `.claude/DESIGN.md` — Design system tokens, typography, spacing
