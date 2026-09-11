# AGENTS.md

`@tecsinapse/react-native-kit` — legacy React Native emotion CSS-in-JS component library, built on
`@tecsinapse/react-core`. **Deprecated in favor of `@tecsinapse/cortex-native`.** Do not add new components here —
new work goes to `cortex-react`/`cortex-native`; only touch for legacy fixes.

## Layout

- `src/components/atoms/` and `molecules/` — genuine RN components (no web alias at build time).
- `src/utils/` — shared helpers.

## Quirks

- Peer deps are runtime-required on the consumer side: `react-native >=0.74`, `react-native-linear-gradient`,
  `react-native-safe-area-context ^4`, `react-native-vector-icons ^9.2`. Gradient/icon/safe-area components assume these
  exist.
- Deps: `react-native-country-flag`, `react-international-phone`, emotion `~11.11.0` — all pinned/legacy versions.
- Consumed by the `rn-playground` Expo demo app (workspace).

## Building / verifying

- No tests and no stories in this package (mdx docs live in root `docs/setup/react-native-kit.mdx`). Type-check via
  `pnpm --filter @tecsinapse/react-native-kit build:dts`.
- New runtime deps must be added to `external` in `rollup.config.mjs`.
