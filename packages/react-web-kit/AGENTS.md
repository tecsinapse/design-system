# AGENTS.md

`@tecsinapse/react-web-kit` — legacy web-only emotion CSS-in-JS component library, built on `@tecsinapse/react-core`. Do
not add new components here — new work goes to `cortex-react`; only touch for legacy fixes.

## Layout

- `src/components/atoms/`, `molecules/`, `organisms/` — components are written against **React Native primitives**, even
  though this is the web package.
- `src/hooks/` — web-specific logic hooks.

## Quirks

- `rollup.config.mjs` aliases `react-native` → `react-native-web` **at build time** — that's how RN-style components
  become DOM. Never import `react-native-web` directly in source; write RN imports and let the alias work.
- Depends on `@tecsinapse/react-core` (workspace) — dev/watch builds of both packages needed (`pnpm dev` from root).
- Uses **date-fns v2** (`~2.30.0`), `react-transition-group` `~4.4.5`, emotion `~11.11.0`.
- Peer deps: `react`, `react-dom`, `react-native-web >=0.18 <1`.

## Building / verifying

- No tests and no stories in this package (mdx docs live in root `docs/setup/react-web-kit.mdx`). Type-check via
  `pnpm --filter @tecsinapse/react-web-kit build:dts`.
- New runtime deps must be added to `external` in `rollup.config.mjs`.
