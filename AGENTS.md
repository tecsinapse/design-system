# AGENTS.md

pnpm monorepo (`packages/*`) publishing independent npm packages via lerna-lite. Requires Node 22, pnpm 11.17.0 (
`autoInstallPeers: false` — add new peers explicitly).

## Packages

- `cortex-core`, `cortex-react` — the actively developed stack: Tailwind 4 + react-aria, web/HTML. New components belong
  here.
- `react-core`, `react-web-kit`, `react-native-kit`, `react-charts` — legacy emotion CSS-in-JS packages (
  react-native-web). Only touch for legacy fixes.
- `rn-playground` — RN demo app, excluded from publishing.

## Commands (run from root)

- `pnpm dev` — watch-builds all packages (rollup + tsc); `pnpm dev:cortex` for cortex-* only. Prefer this after changing
  `cortex-core` so `cortex-react` picks up source changes.
- `pnpm test` — jest only runs in `@tecsinapse/cortex-react` (the only package with tests). Single test:
  `pnpm --filter @tecsinapse/cortex-react test -t '<name>'`; watch: `pnpm --filter @tecsinapse/cortex-react test:watch`.
- No typecheck script exists — type-check via `pnpm --filter <pkg> build:dts` (tsc) or the full build.
- `pnpm lint` runs eslint **with `--fix --quiet` (auto-edits files)**; `pnpm lint:ts` is the non-fixing check. CI gate
  is `pnpm lint:fix`.
- `pnpm storybook` — dev server on port 7007; `pnpm build:storybook` emits gitignored `sbdocs/` (deployed to GitHub
  Pages). Build output requires `STORYBOOK_FONT_URL` set (scripts handle this).
- `pnpm i` triggers `prepare` → husky + full build of all packages.

CI (`check.yml`) order: `pnpm test` → `pnpm lint:fix` → `pnpm build:storybook`. Verify with these before finishing.

## Architecture

- Root `tsconfig.json` paths map `@tecsinapse/*` → `packages/*/src`; jest maps `@tecsinapse/cortex-core` to its `src`.
  Import `@tecsinapse/cortex-core` (not `dist`) from cortex-react.
- Each package builds with rollup (`preserveModules` → `dist/esm` + `dist/cjs`) plus
  `tsc --project tsconfig.build.json` → `dist/types`. `dist` is gitignored.
- Stories/docs live in `packages/cortex-react/docs/*.stories.tsx`, `packages/cortex-core/docs/*`, and root `docs/*.mdx`.
  Files matching `*.stories.*` are excluded from tsconfig and eslint.
- Tests: jest + ts-jest, jsdom, `rootDir` is repo root; shared setup in root `jest.setup.ts` (ResizeObserver polyfill).
  Test files live in `packages/cortex-react/src/tests/`.

## Conventions

- Pre-commit hook: lint-staged runs `eslint --fix` + `prettier --write` on staged `.ts/.tsx`; root `.prettierrc` applies
  to json/md/mdx.
- Releases are automatic on PR merge: `develop` → canary `beta` dist-tag, `master` → stable (exact versions),
  `legacy/*` → `legacy` tag. Never bump versions manually; commit with conventional commits (e.g.
  `fix(component): ...`).
