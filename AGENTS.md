# AGENTS.md

pnpm monorepo (`packages/*`) publishing independent npm packages via lerna-lite. Requires Node 22, pnpm 11.17.0 (
`autoInstallPeers: false` — add new peers explicitly).

## Packages

- `cortex-core`, `cortex-react`, `cortex-native` — the actively developed stack: Tailwind 4, web/HTML (react-aria) and
  React Native (uniwind). New components belong here.
- `react-core`, `react-native-kit` — legacy emotion CSS-in-JS packages (react-native-web), **deprecated** in favor of
  `@tecsinapse/cortex-native` (npm `deprecated` field). Only touch for legacy fixes. `react-web-kit` and
  `react-charts` were removed — their consumers migrate to `cortex-react` / `cortex-native` (see
  `docs/setup/cortex-native.mdx` for migration notes).
- `rn-playground` — RN demo app, excluded from publishing. Demo app for the cortex-native stack (Uniwind setup
  reference: `metro.config.js` `withUniwindConfig` + `global.css`).

## Commands (run from root)

- `pnpm dev` — watch-builds all packages (`rolldown` for cortex-*, rollup + tsc for legacy); `pnpm dev:cortex` for
  cortex-* only. Prefer this after changing `cortex-core` so `cortex-react` picks up source changes.
- `pnpm test` — fans out the `test` script of every `@tecsinapse/*` package. **Two test stacks:**
  - `@tecsinapse/cortex-react` runs **vitest** (+ jsdom). Single test:
    `pnpm --filter @tecsinapse/cortex-react test -t '<name>'`; watch: `pnpm --filter @tecsinapse/cortex-react test:watch`.
  - `@tecsinapse/cortex-native` runs **jest + @testing-library/react-native** (vitest cannot render RN components).
    Single test: `pnpm --filter @tecsinapse/cortex-native test -t '<name>'`.
- No typecheck script exists — type-check via `pnpm --filter <pkg> build:dts` (tsc) or the full build.
- `pnpm lint` runs eslint **with `--fix --quiet` (auto-edits files)**; `pnpm lint:ts` is the non-fixing check. CI gate
  is `pnpm lint:fix`.
- `pnpm storybook` — dev server on port 7007; `pnpm build:storybook` emits gitignored `sbdocs/` (deployed to GitHub
  Pages). Build output requires `STORYBOOK_FONT_URL` set (scripts handle this).
- `pnpm i` triggers `prepare` → husky + full build of all packages.

CI (`check.yml`) order: `pnpm test` → `pnpm lint:fix` → `pnpm build:storybook`. Verify with these before finishing.

## Architecture

- Root `tsconfig.json` paths map `@tecsinapse/*` → `packages/*/src`; vitest aliases `@tecsinapse/cortex-core` to its `src`.
  Import `@tecsinapse/cortex-core` (not `dist`) from cortex-react.
- Cortex packages build with rolldown (`preserveModules` → `dist/esm`, ESM-only). Legacy packages build with rollup
  (`preserveModules` → `dist/esm` + `dist/cjs`). All use `tsc --project tsconfig.build.json` → `dist/types`. `dist` is
  gitignored.
- Stories/docs live in `packages/cortex-react/docs/*.stories.tsx`, `packages/cortex-core/docs/*`, and root `docs/*.mdx`.
  Files matching `*.stories.*` are excluded from tsconfig and eslint.
- Tests: **two stacks** — cortex-react uses vitest + jsdom (`globals: true`, shared setup in root `vitest.setup.ts`,
  ResizeObserver polyfill; test files in `packages/cortex-react/src/tests/`); cortex-native uses jest +
  `@testing-library/react-native` (local `jest.config.js`, test files co-located as `*.test.ts{x}` in `src/`).

## Conventions

- Pre-commit hook: lint-staged runs `eslint --fix` + `prettier --write` on staged `.ts/.tsx`; root `.prettierrc` applies
  to json/md/mdx.
- Releases are automatic on PR merge: `develop` → canary `beta` dist-tag, `master` → stable (exact versions),
  `legacy/*` → `legacy` tag. Never bump versions manually; commit with conventional commits (e.g.
  `fix(component): ...`).
