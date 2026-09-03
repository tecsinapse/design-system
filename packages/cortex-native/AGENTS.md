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

- `pnpm --filter @tecsinapse/cortex-native test` — **jest + @testing-library/react-native** (vitest cannot render RN
  components). Local `jest.config.js` (preset `react-native`, `moduleNameMapper` for `@tecsinapse/cortex-core` → its
  `src`); test files are co-located as `*.test.ts{x}` in `src/`. Single test:
  `pnpm --filter @tecsinapse/cortex-native test -t '<name>'`.
- `pnpm --filter @tecsinapse/cortex-native build:dts` — type-check + emit `dist/types` (test files are excluded via
  `**/*.test.*`).
- `pnpm --filter @tecsinapse/cortex-native build:es` — rolldown ESM build to `dist/esm`.
- `pnpm lint:ts` (root) — non-fixing eslint check.
- `pnpm dev:cortex` (root) — watch-builds cortex-core + cortex-native; cortex-react picks up core source changes via
  vitest's resolve.alias, cortex-native via Metro source-resolution.

## Conventions

- Always import styles from `@tecsinapse/cortex-core` (the `tv()` variants) — never copy class strings or import from
  `dist`.
- Always import `tv` from `@tecsinapse/cortex-core`, never from `tailwind-variants` directly. The shared `tv` registers
  the custom typography scale (`text-h1`, `text-label`, ...) in tailwind-merge's `font-size` class group; using the
  bare `tailwind-variants` `tv` makes tailwind-merge treat custom `text-*` sizes as text-color classes and silently
  drop them when a color class is present in the same recipe output (font sizes lost).
- Compose a component root's `className` with `cn` from `@tecsinapse/cortex-core` (a `tailwind-merge`-backed
  merger, not `clsx`) — pass recipe/variant classes first and the consumer's `className` prop LAST, so a
  consumer class wins Tailwind conflicts against the component's own classes.
- **No `@emotion/*` imports anywhere in this package** — this is the Uniwind stack, not the legacy emotion stack.
- New components: create a `docs/<Name>.stories.tsx` and re-export from `src/index.ts` (components, hooks, provider,
  styles).
- `uniwind` is peer + devDep (root workspace has `autoInstallPeers: false`): the consumer owns the runtime. Consumers
  must set up Uniwind's Metro plugin and import `@tecsinapse/cortex-core/tokens.css` (web) / `tokens-native.css`
  (native) for tokens to render.
- `rolldown.config.mjs` externals must match **subpaths** for packages imported with them (e.g.
  `react-native-vector-icons` is imported as `react-native-vector-icons/MaterialCommunityIcons`, so its external is a
  regex `/^react-native-vector-icons(\/|$)/`, not the bare string) — otherwise rolldown tries to parse the dep's JSX
  and `build:es` fails.
