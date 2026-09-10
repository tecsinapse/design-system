# AGENTS.md

`@tecsinapse/react-charts` — legacy SVG charts for React and React Native, built on `react-native-svg-charts` + emotion.
Do not add new components here — only touch for legacy fixes.

## Layout

- `src/components/` — one folder per chart (`PieChart/`, `Dot/`, `Label/`, ...), plus `src/styles/` (emotion style
  definitions) and `src/types/`.
- Charts are written against RN primitives; web support comes from `react-native-svg`/`react-native-web` in consumers.

## Quirks

- `react-native-svg-charts` is a runtime dep; `react-native-svg` is a **devDep + peer** (`>=12.0.0`) — consumers must
  supply it.
- Emotion `~11.11.0` pinned.

## Building / verifying

- No tests and no stories in this package. Type-check via `pnpm --filter @tecsinapse/react-charts build:dts`.
- New runtime deps must be added to `external` in `rollup.config.mjs` (`react`, `react-native`, emotion are there).
