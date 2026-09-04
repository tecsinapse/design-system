# AGENTS.md

`@tecsinapse/react-core` — legacy hybrid (web + React Native) core library on emotion CSS-in-JS. Base of the
`react-native-kit` package. **Deprecated in favor of `@tecsinapse/cortex-native`.** Do not add new components here —
new work goes to `cortex-core`/`cortex-react`/`cortex-native`; only touch for legacy fixes.

## Layout

- `src/components/atoms/` and `src/components/molecules/` — components written against RN primitives; web consumes them
  via `react-native-web`.
- `src/hooks/`, `src/styles/` (emotion style definitions), `src/types/`, `src/utils/`.

## Quirks

- `package.json` has `"react-native": "src/index.ts"` — RN consumers bundle the raw TS source directly via Metro (not
  `dist`). Don't put build-only constructs (e.g. web-only imports, rollup aliases) in files reachable from
  `src/index.ts`.
- Uses **date-fns v2** (`~2.30.0`) — legacy API, unlike the cortex stack's date-fns v4.
- Peer deps: `react`, `react-native >=0.74`, `react-native-vector-icons`. Emotion packages are `~11.11.0` pinned
  versions.
- Icons come from `react-native-vector-icons` (peer), used through `@tecsinapse/react-core` helpers.

## Building / verifying

- No tests and no stories in this package (stories for it live in root `docs/` as mdx). Type-check via
  `pnpm --filter @tecsinapse/react-core build:dts`.
- Rollup externals: `react`, `react-native`, `react-native-vector-icons`, emotion, `currency.js`, `date-fns` — new
  runtime deps must be added to the external list in `rollup.config.mjs`.
