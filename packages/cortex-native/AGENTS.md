# AGENTS.md

`@tecsinapse/cortex-native` — React Native components on top of `@tecsinapse/cortex-core` (Tailwind 4), styled with
`uniwind` (Tailwind v4 for React Native). Metro source-resolution package: `"react-native": "src/index.ts"` lets
rn-playground bundle the raw TS source without watch-builds. No emotion, no legacy react-core/react-native-kit code here.

## Layout

- `src/components/` — one folder per complex component (e.g. `TextField/`, `Picker/`); simple ones are single files
  (`Button.tsx`). Complex components split logic into `src/hooks/`, context into `src/provider/`, and style wiring into
  `src/styles/*.ts`.
- `src/styles/` — `tv()` style recipes imported from cortex-core where shared; uniwind-specific recipes and style maps
  live here too (see Task 5's Text exemplar).
- `src/utils/` — shared helpers (e.g. formatting/parsing).
- `docs/*.stories.tsx` — storybook stories; **excluded from tsconfig and eslint**, so they are neither typechecked nor
  linted.

## Building / verifying

- `pnpm --filter @tecsinapse/cortex-native build:dts` — type-check + emit `dist/types` (no test suite here; vitest
  lives only in cortex-react).
- `pnpm --filter @tecsinapse/cortex-native build:es` — rolldown ESM build to `dist/esm`.
- `pnpm lint:ts` (root) — non-fixing eslint check.
- `pnpm dev:cortex` (root) — watch-builds cortex-core + cortex-native; cortex-react picks up core source changes via
  vitest's resolve.alias, cortex-native via Metro source-resolution.

## Conventions

- Always import styles from `@tecsinapse/cortex-core` (the `tv()` variants) — never copy class strings or import from
  `dist`.
- **No `@emotion/*` imports anywhere in this package** — this is the Uniwind stack, not the legacy emotion stack.
- New components: create a `docs/<Name>.stories.tsx` and re-export from `src/index.ts` (components, hooks, provider,
  styles).
- `uniwind` is peer + devDep (root workspace has `autoInstallPeers: false`): the consumer owns the runtime. Consumers
  must set up Uniwind's Metro plugin and import `@tecsinapse/cortex-core/tokens.css` (web) / `tokens-native.css`
  (native) for tokens to render.
