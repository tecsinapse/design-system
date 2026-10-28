# AGENTS.md

`@tecsinapse/cortex-react` — HTML/web React components on top of `cortex-core` (Tailwind 4), using `react-aria`/
`react-stately`, `@floating-ui/react`, `tailwind-variants`. The only package in the repo with tests.

## Layout

- `src/components/` — one folder per complex component (e.g. `Select/`, `Calendar/`); simple ones are single files (
  `Button.tsx`, `Badge.tsx`). Complex components split logic into `src/hooks/`, context into `src/provider/` (e.g.
  `MenubarProvider`, `SnackbarProvider`), and style wiring into `src/styles/*.ts`.
- `src/service/` — sonner-based toast wrappers (`SnackbarSonner.tsx`).
- `docs/*.stories.tsx` — storybook stories; **excluded from tsconfig and eslint**, so they are neither typechecked nor
  linted (mocks live alongside, e.g. `selectMocks.ts`).
- `src/tests/` — vitest tests, one file per component.

## Testing

- Run: `pnpm --filter @tecsinapse/cortex-react test` (single: add `-t '<name>'`; watch: `test:watch`). Vitest aliases
  `@tecsinapse/cortex-core` to its `src` via `resolve.alias` in `packages/cortex-react/vitest.config.ts`.
- Tests import components relatively (`../components`) and assert on Tailwind class names (e.g.
  `toHaveClass('bg-primary-medium')`), not computed styles. `ResizeObserver` is polyfilled in root `vitest.setup.ts`.
- `tsconfig.build.json` excludes `src/tests`; keep tests out of the shipped `dist`.

## Conventions

- Always import styles from `@tecsinapse/cortex-core` (the `tv()` variants) — never copy class strings or import from
  `dist`.
- Always import `tv` from `@tecsinapse/cortex-core`, never from `tailwind-variants` directly. The shared `tv` registers
  the custom typography scale (`text-h1`, `text-label`, ...) in tailwind-merge's `font-size` class group; using the
  bare `tailwind-variants` `tv` makes tailwind-merge treat custom `text-*` sizes as text-color classes and silently
  drop them when a color class is present in the same recipe output (font sizes lost).
- New components: create a `docs/<Name>.stories.tsx` and a `src/tests/<Name>.test.tsx`; the CI gate is root
  `pnpm test` → `pnpm lint:fix` → `pnpm build:storybook`.
- Re-export from `src/index.ts` (components, hooks, service, provider). `react-icons` is externalized via the
  `/^react-icons(\/|$)/` regex in `rolldown.config.mjs`, so any `react-icons/<set>` subpath stays unbundled.
