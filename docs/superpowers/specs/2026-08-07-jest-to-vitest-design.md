# Migrate cortex-react tests from Jest to Vitest

Date: 2026-08-07
Status: Approved (design)

## Context

The repo runs its only test suite (`packages/cortex-react`) on Jest 29 + ts-jest +
jest-environment-jsdom. The toolchain has already moved to Vite 8 (Storybook uses
`@storybook/react-vite`, `@vitejs/plugin-react` is present). Keeping a second
transformer pipeline (ts-jest) is redundant, and jest + ts-jest startup is slower
than vitest's native ESM + esbuild transform.

Motivation (user-confirmed): consolidate on Vite tooling and gain test speed.

## Goals

- Replace Jest with Vitest in `packages/cortex-react` (single big-bang swap).
- All 68 existing test files pass under vitest with identical assertions.
- Remove jest, ts-jest, jest-environment-jsdom, @types/jest, ts-node from root
  devDependencies.
- Keep root `pnpm test`, watch mode, and CI gate (`pnpm test` → `pnpm lint:fix` →
  `pnpm build:storybook`) working unchanged.

## Non-goals

- No migration of legacy emotion packages (react-core, react-native-kit, etc.) —
  they have no tests.
- No root-level vitest workspace config (only cortex-react tests; add later if a
  second package gains tests).
- No happy-dom (jsdom keeps current behavior).
- No behavioral changes to the tests themselves beyond the mechanical `jest.*` →
  `vi.*` rename.

## Current state inventory

- 68 test files in `packages/cortex-react/src/tests/` (`.test.tsx`/`.test.ts`,
  including `Input/` and `Menubar/` subdirectories).
- `packages/cortex-react/jest.config.ts`: ts-jest preset, jsdom, `rootDir: ../../`,
  `setupFilesAfterEnv` root `jest.setup.ts`, moduleNameMapper
  `@tecsinapse/cortex-core(.*)$` → `packages/cortex-core/src/$1`, `maxWorkers: 4`.
- Root `jest.setup.ts`: `@testing-library/jest-dom` + `@testing-library/jest-dom/jest-globals`
  imports, global `ResizeObserver` polyfill.
- Jest API usage in tests (fully enumerated):
  - `jest.fn` — ~120 occurrences across 30 files
  - `jest.mock` — 15 files (factories are self-contained; no out-of-scope
    references that would break hoisting)
  - `jest.mocked` — 3 files
  - `as jest.Mock` type casts — several files (e.g. DateRangePickerInput,
    useCalendarCell)
  - Fake timers — `useDebouncedState.test.ts` (`useFakeTimers`, `useRealTimers`,
    `advanceTimersByTime`)
  - `jest.clearAllMocks` — 8 files
  - No `jest.requireActual`, `jest.spyOn`, or `jest.requireMock` usage.
- jest-dom matchers in heavy use: `toHaveClass` (100×), `toBeInTheDocument`
  (219×), `toHaveTextContent`, `toHaveAttribute`, `toHaveStyle`, etc.
- Root devDeps to remove: `jest`, `ts-jest`, `jest-environment-jsdom`,
  `@types/jest`, `ts-node` (ts-node is used only by jest.config.ts).
- `tsconfig.build.json` in cortex-react: `types: ["react", "jest",
  "@testing-library/jest-dom"]`.

## Design

### 1. Dependency changes (root package.json)

- Add: `vitest` `^4.1.0` (first release line with full Vite 8 peer support;
  repo has Vite `^8.2.1`), `jsdom` (required as a direct devDependency for the
  jsdom environment).
- Remove: `jest`, `ts-jest`, `jest-environment-jsdom`, `@types/jest`, `ts-node`.

### 2. Vitest config

New `packages/cortex-react/vitest.config.ts` replacing `jest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['../../vitest.setup.ts'],
    maxWorkers: 4,
  },
  resolve: {
    alias: {
      '@tecsinapse/cortex-core': '../cortex-core/src',
    },
  },
});
```

Notes:
- `globals: true` keeps `describe`/`it`/`expect` as globals — tests never import
  them today.
- `vi` is also available as a global; the codemod only needs to rename `jest.` →
  `vi.`.
- The alias resolves `@tecsinapse/cortex-core` to its `src`, matching jest's
  moduleNameMapper behavior.
- `maxWorkers: 4` preserves the current parallelism cap.

### 3. Setup file

Rename root `jest.setup.ts` → `vitest.setup.ts` and change the imports:

```ts
import '@testing-library/jest-dom/vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
```

(The `jest-globals` import is dropped; `@testing-library/jest-dom/vitest` extends
vitest's `expect` with the matchers.)

### 4. TypeScript types

`packages/cortex-react/tsconfig.build.json`:

```diff
- "types": ["react", "jest", "@testing-library/jest-dom"]
+ "types": ["react", "vitest/globals", "@testing-library/jest-dom/vitest"]
```

(`@testing-library/jest-dom`'s bare types entry augments jest's matchers; the
`/vitest` subpath augments `@vitest/expect`'s `Assertion` instead.)

### 5. Codemod: `jest.*` → `vi.*`

Deterministic token-based rename across `packages/cortex-react/src/tests/`:

| From | To |
|---|---|
| `jest.fn` | `vi.fn` |
| `jest.mock` | `vi.mock` |
| `jest.mocked` | `vi.mocked` |
| `jest.clearAllMocks` | `vi.clearAllMocks` |
| `jest.useFakeTimers` | `vi.useFakeTimers` |
| `jest.useRealTimers` | `vi.useRealTimers` |
| `jest.advanceTimersByTime` | `vi.advanceTimersByTime` |
| `as jest.Mock` | `as Mock` (add `import type { Mock } from 'vitest';`) |

The import is added only to files containing `as jest.Mock`. No other changes.

### 6. Package scripts

`packages/cortex-react/package.json`:

```diff
- "test": "jest",
- "test:watch": "jest --watch"
+ "test": "vitest run",
+ "test:watch": "vitest"
```

Root `pnpm test` (`pnpm --filter '@tecsinapse/*' run test`) and CI are unchanged.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| `vi.mock` hoisting semantics differ | Factories are self-contained (verified); vitest hoists like jest. Verify with the 15 mocked files. |
| Fake-timer interactions with jsdom | `vi.useFakeTimers` defaults are compatible; single-file surface (`useDebouncedState`). |
| jest-dom matcher drift | Use `@testing-library/jest-dom/vitest` entry — same matcher implementation as today. |
| Docs (`sbdocs/`) or lint referencing jest types | `@types/jest` removal could break lint if referenced — no jest references found in eslint config; root tsconfig `types: ["react"]` doesn't include jest. |
| Vitest version pairing with Vite 8 | Use `vitest@^4.1.0` — first line whose deps (`@vitest/mocker`) accept Vite 8. |

## Verification

1. `pnpm install` (updates lockfile).
2. `pnpm --filter @tecsinapse/cortex-react test` — all tests pass under vitest.
3. `pnpm --filter @tecsinapse/cortex-react test:watch` smoke check.
4. `pnpm lint:fix` passes (codemod output is lint-clean).
5. `pnpm --filter @tecsinapse/cortex-react build:dts` passes (type changes correct).
6. CI sequence `pnpm test` → `pnpm lint:fix` → `pnpm build:storybook` runs green.
7. `rg "jest\." packages/cortex-react/src/tests` returns no matches (all jest
   API usage migrated to `vi.*`).
