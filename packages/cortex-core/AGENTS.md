# AGENTS.md

`@tecsinapse/cortex-core` — Tailwind 4 primitives for the active cortex stack. Exports **style definitions, not React
components**: `tailwind-variants` `tv()` definitions (e.g. `buttonStyles`), design tokens, and shared primitives.
`cortex-react` consumes these.

## Layout

- `src/components/<name>/<name>.ts` — `tv()` style variants (e.g. `button.ts` → `buttonStyles`).
  `components/common/common.ts` holds shared style helpers. Naming is `camelCase` export + `kebab-case` file/folder.
- `src/tokens/definitions.ts` — typed design tokens (colors, spacing, radii) used by `default.css` and `tv` definitions.
- `src/provider/` — `DarkThemeContext` (dark mode + `data-contrast` handling).
- `src/default.css` — the design-token source of truth: CSS variables, dark theme via `:root[data-theme='dark']`,
  contrast via `:root[data-contrast='black']`. Consumers must import it (`@tecsinapse/cortex-core/default.css`) or
  tokens/variants render incorrectly; `.storybook/index.css` imports it from `src/` for storybook.

## Building / verifying

- `pnpm --filter @tecsinapse/cortex-core build:dts` — type-check (no test suite, no lint target beyond repo rules).
- `rollup-plugin-copy` copies `src/default.css` → `dist/` — if you add another asset, extend the copy targets in
  `rolldown.config.mjs`.
- No tests and no stories live in this package; component stories live in `packages/cortex-react/docs/`.

## Conventions

- Variant colors reference token CSS variables (`bg-primary-medium` etc.) defined in `default.css` — don't hardcode hex
  in `tv` definitions.
- Always import `tv` from `src/tv.ts` (or `@tecsinapse/cortex-core` in consumers), never from `tailwind-variants`
  directly. The shared `tv` registers the custom typography scale (`text-h1`, `text-label`, `text-micro`, ...) in
  tailwind-merge's `font-size` class group; without it, tailwind-merge misclassifies custom `text-*` sizes as
  text-color classes and silently drops them whenever a color class appears in the same recipe output (e.g.
  `text-h1` + `text-success-medium` → `text-h1` removed, font size lost).
- Peer dependency is `tailwindcss ^4.1.16` only; keep it that way (add new deps as peers if needed — root workspace has
  `autoInstallPeers: false`).
- `cortex-react` picks up source changes in dev via vitest's resolve.alias; a published release requires the
  automatic lerna flow (never bump versions manually).
