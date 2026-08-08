# Migrate cortex-react tests from Jest to Vitest — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Jest 29 + ts-jest with Vitest in `packages/cortex-react` (single big-bang swap) so the repo runs tests on the Vite 8 toolchain already used by Storybook.

**Architecture:** Swap `jest.config.ts` for `vitest.config.ts` (jsdom, globals, alias to `@tecsinapse/cortex-core` src), rename the root setup file to `vitest.setup.ts` with the jest-dom vitest entry, codemod all `jest.*` test APIs to `vi.*`, then delete the jest toolchain. No behavioral changes to tests beyond the mechanical rename.

**Tech Stack:** Vitest 4.x (pairs with Vite 8), jsdom, @testing-library/jest-dom, pnpm 11.17.0 monorepo.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-07-jest-to-vitest-design.md` (approved).
- `vitest` must be `^4.1.0` (first line whose deps accept Vite 8; repo has Vite `^8.2.1`). Node 22, pnpm 11.17.0.
- Test environment: **jsdom** (not happy-dom). `globals: true` (tests never import `describe`/`it`/`expect`).
- The 68 test files in `packages/cortex-react/src/tests/` are the only test suite in the repo.
- Keep root `pnpm test` (`pnpm --filter '@tecsinapse/*' run test`), `test:watch`, and the CI gate (`pnpm test` → `pnpm lint:fix` → `pnpm build:storybook`) working unchanged.
- Root tsconfig `types: ["react"]` must not change. Cortex-react `tsconfig.build.json` `types` becomes `["react", "vitest/globals", "@testing-library/jest-dom/vitest"]`.
- Remove from root devDeps: `jest`, `ts-jest`, `jest-environment-jsdom`, `@types/jest`, `ts-node`. Add: `vitest`, `jsdom`.
- `autoInstallPeers: false` — new peers (jsdom, vitest) must be declared explicitly.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` (root) | Modify | devDeps: add `vitest`/`jsdom`, remove jest toolchain |
| `packages/cortex-react/vitest.config.ts` | Create | Vitest config (jsdom, globals, alias, setup) |
| `packages/cortex-react/jest.config.ts` | Delete | Obsolete |
| `jest.setup.ts` (root) | Rename + edit → `vitest.setup.ts` | jest-dom vitest entry + ResizeObserver polyfill |
| `packages/cortex-react/package.json` | Modify | `test`/`test:watch` scripts |
| `packages/cortex-react/tsconfig.build.json` | Modify | `types` array |
| `packages/cortex-react/src/tests/**` (30 files) | Modify | `jest.*` → `vi.*` codemod |
| `AGENTS.md` (root), `packages/cortex-react/AGENTS.md` | Modify | Testing docs |

---

### Task 1: Install vitest and jsdom

**Files:**
- Modify: `package.json` (root devDependencies)

**Interfaces:** Produces installed `vitest`/`jsdom` binaries and types for Task 2. Jest deps stay installed until Task 4 so the suite can be run under both runners during the swap.

- [ ] **Step 1: Add devDependencies to root `package.json`**

In the `devDependencies` block (alphabetical, next to `vite`):

```json
"jsdom": "^26.0.0",
"vitest": "^4.1.0",
```

- [ ] **Step 2: Install**

Run: `pnpm install`

Expected: lockfile updates, no peer warnings (`autoInstallPeers: false` means jsdom must be declared — it is).

- [ ] **Step 3: Verify binaries**

Run: `pnpm exec vitest --version && pnpm exec jsdom --version`

Expected: `vitest/4.x.y` and `jsdom/26.x.y` print. If vitest prints `3.x` or fails with a Vite 8 peer error, bump to `^4.1.0` and reinstall.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: add vitest and jsdom devDependencies"
```

---

### Task 2: Vitest config, setup file, tsconfig types, scripts

**Files:**
- Create: `packages/cortex-react/vitest.config.ts`
- Modify: `packages/cortex-react/package.json` (scripts)
- Modify: `packages/cortex-react/tsconfig.build.json` (types)
- Rename + edit: `jest.setup.ts` → `vitest.setup.ts`

**Interfaces:** Produces the `test`/`test:watch` scripts, `vitest.setup.ts`, and config that Task 3's codemod runs against. `@testing-library/jest-dom/vitest` augments vitest's `expect` (the bare package's types only augment jest — do not use it here).

- [ ] **Step 1: Create `packages/cortex-react/vitest.config.ts`**

```ts
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, '../../vitest.setup.ts')],
    maxWorkers: 4,
  },
  resolve: {
    alias: {
      '@tecsinapse/cortex-core': resolve(__dirname, '../cortex-core/src'),
    },
  },
});
```

Note: `resolve.alias` replaces jest's moduleNameMapper; the directory target keeps subpath imports (`@tecsinapse/cortex-core/styles` → `../cortex-core/src/styles`) working via Vite prefix matching.

- [ ] **Step 2: Rename and edit the setup file**

```bash
git mv jest.setup.ts vitest.setup.ts
```

Replace the contents of `vitest.setup.ts` with:

```ts
import '@testing-library/jest-dom/vitest';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
```

(`@testing-library/jest-dom/jest-globals` is dropped — its role is taken by the `/vitest` entry.)

- [ ] **Step 3: Update `packages/cortex-react/package.json` scripts**

```diff
-    "test": "jest",
-    "test:watch": "jest --watch"
+    "test": "vitest run",
+    "test:watch": "vitest"
```

- [ ] **Step 4: Update `packages/cortex-react/tsconfig.build.json` types**

```diff
-    "types": ["react", "jest", "@testing-library/jest-dom"]
+    "types": ["react", "vitest/globals", "@testing-library/jest-dom/vitest"]
```

- [ ] **Step 5: Run vitest — expect RED (proves config wiring)**

Run: `pnpm --filter @tecsinapse/cortex-react test`

Expected: tests run under vitest and fail with `jest is not defined` / `vi is not defined`-style `ReferenceError`s (tests still use `jest.*`, which vitest does not provide). This is expected — it proves the config, setup file, and alias load. Do not fix anything yet.

- [ ] **Step 6: Smoke-check the setup file runs**

Run: `pnpm --filter @tecsinapse/cortex-react test -t 'nothing-will-match'`

Expected: a filtered run executes with zero test matches and **no setup-time errors** (jest-dom matchers registered, ResizeObserver polyfill installed). Any error here means the setup file is broken — fix before proceeding.

- [ ] **Step 7: Commit**

```bash
git add packages/cortex-react/vitest.config.ts packages/cortex-react/package.json packages/cortex-react/tsconfig.build.json vitest.setup.ts
git commit -m "chore(cortex-react): add vitest config and swap jest scripts"
```

---

### Task 3: Codemod tests `jest.*` → `vi.*`

**Files:**
- Modify: all 30 test files under `packages/cortex-react/src/tests/` that use `jest.*`
- Add import: `import type { Mock } from 'vitest';` to 6 files using `as jest.Mock`

**Interfaces:** Consumes Task 2's vitest run. Produces a green suite under vitest; jest must still run too (not yet removed).

**Codemod inventory (verified complete):** `jest.fn` 106×, `jest.mock` 22×, `jest.mocked` 3×, `jest.Mock` (type cast) 6×, `jest.clearAllMocks` 8×, `jest.useFakeTimers` 1×, `jest.useRealTimers` 1×, `jest.advanceTimersByTime` 2×. No `jest.spyOn`/`jest.requireActual`/`jest.requireMock`.

- [ ] **Step 1: Run the token codemod**

Run from repo root:

```bash
for f in $(rg -l 'jest\.' packages/cortex-react/src/tests -g '*.ts*'); do
  perl -pi -e '
    s/\bjest\.mocked\b/vi.mocked/g;
    s/\bjest\.mock\b/vi.mock/g;
    s/\bjest\.clearAllMocks\b/vi.clearAllMocks/g;
    s/\bjest\.useFakeTimers\b/vi.useFakeTimers/g;
    s/\bjest\.useRealTimers\b/vi.useRealTimers/g;
    s/\bjest\.advanceTimersByTime\b/vi.advanceTimersByTime/g;
    s/\bjest\.fn\b/vi.fn/g;
    s/\bjest\.Mock\b/Mock/g;
  ' "$f"
done
```

Order matters: `jest.mocked` must run before `jest.mock` (prefix overlap).

- [ ] **Step 2: Verify the codemod is exhaustive**

Run: `rg -n 'jest\.' packages/cortex-react/src/tests`

Expected: no output. (Files using `jest.Mock` now use bare `Mock`.)

- [ ] **Step 3: Add the `Mock` type import to the 6 affected files**

```bash
for f in $(rg -l 'as Mock' packages/cortex-react/src/tests -g '*.ts*'); do
  perl -0pi -e 's/^(import .*;\n)/$1import type { Mock } from '\''vitest'\'';\n/m' "$f"
done
```

Expected files: `DateRangePickerInput.test.tsx`, `useCalendarCell.test.ts`, `Uploader.test.tsx`, `RangeCalendar.test.tsx`, `Calendar.test.tsx`, `DatePickerInput.test.tsx`.

- [ ] **Step 4: Run vitest — expect GREEN**

Run: `pnpm --filter @tecsinapse/cortex-react test`

Expected: all suites pass. If failures remain, fix each individually (see Step 5 guidance), keeping changes minimal.

- [ ] **Step 5: Fix remaining failures (only if any)**

Known risk spots and their remedies:

1. **`vi.mock` factory hoisting** — vitest hoists `vi.mock` like jest; factories that reference outer variables still need `vi.hoisted()`. All 15 existing factories are self-contained, so this should not fire. If a failure points at a factory, wrap shared values: `const { mockX } = vi.hoisted(() => ({ mockX: vi.fn() }));`.
2. **Fake timers** (`useDebouncedState.test.ts`) — vitest's default fake-timer set covers `setTimeout`/`setInterval`/`Date` like jest. If a timing test flakes, verify with `vi.useFakeTimers()` unchanged before touching assertions.
3. **CJS/ESM interop** — `vi.mock('react-aria', ...)` and similar external modules. If a mock "doesn't apply", the module may be loaded before the mock is registered; use the same `vi.mock` placement as the original `jest.mock` (top-level) — placement is preserved by the codemod.
4. **Async `waitFor`/`user-event` timing** — if an async test flakes under esbuild transform, increase nothing; run the single file: `pnpm --filter @tecsinapse/cortex-react test -t '<name>'` and compare against `pnpm --filter @tecsinapse/cortex-react exec jest <file> --runInBand` (jest still installed) to isolate whether vitest changed behavior.

- [ ] **Step 6: Prove jest still passes (parity checkpoint)**

Run: `pnpm --filter @tecsinapse/cortex-react exec jest`

Expected: all suites pass under jest too — proves the codemod was behavior-preserving. (If jest fails here, revert the affected file and redo its codemod manually.)

- [ ] **Step 7: Commit**

```bash
git add packages/cortex-react/src/tests
git commit -m "test(cortex-react): migrate jest APIs to vi"
```

---

### Task 4: Remove the jest toolchain and update docs

**Files:**
- Modify: `package.json` (root devDependencies)
- Delete: `packages/cortex-react/jest.config.ts`
- Modify: `AGENTS.md` (root), `packages/cortex-react/AGENTS.md`

**Interfaces:** Consumes the green vitest suite from Task 3. Produces a repo with a single test runner.

- [ ] **Step 1: Remove jest devDependencies from root `package.json`**

Remove from `devDependencies`: `@types/jest`, `jest`, `jest-environment-jsdom`, `ts-jest`, `ts-node`.

- [ ] **Step 2: Delete `packages/cortex-react/jest.config.ts`**

```bash
git rm packages/cortex-react/jest.config.ts
```

- [ ] **Step 3: Install**

Run: `pnpm install`

Expected: lockfile drops the jest/ts-jest/ts-node graph. Verify: `pnpm exec jest --version` → `command not found`.

- [ ] **Step 4: Update root `AGENTS.md`**

Replace jest references (lines ~18, 31, 37) with:

```markdown
- `pnpm test` — vitest only runs in `@tecsinapse/cortex-react` (the only package with tests). Single test:
  `pnpm --filter @tecsinapse/cortex-react test -t '<name>'`; watch: `pnpm --filter @tecsinapse/cortex-react test:watch`.
- Root `tsconfig.json` paths map `@tecsinapse/*` → `packages/*/src`; vitest aliases `@tecsinapse/cortex-core` to its `src`.
- Tests: vitest + jsdom, `globals: true`; shared setup in root `vitest.setup.ts` (ResizeObserver polyfill).
```

- [ ] **Step 5: Update `packages/cortex-react/AGENTS.md`**

Replace:
- ``- `src/tests/` — jest tests, one file per component.`` → ``- `src/tests/` — vitest tests, one file per component.``
- ``  `toHaveClass('bg-primary-medium')`), not computed styles. `ResizeObserver` is polyfilled in root `jest.setup.ts`.`` → ``  `toHaveClass('bg-primary-medium')`), not computed styles. `ResizeObserver` is polyfilled in root `vitest.setup.ts`.``
- The Testing section: update "Jest rootDir is the repo root; `@tecsinapse/cortex-core` resolves to its `src` via moduleNameMapper." → "Vitest aliases `@tecsinapse/cortex-core` to its `src` via `resolve.alias` in `packages/cortex-react/vitest.config.ts`."

- [ ] **Step 6: Verify no jest traces remain in code**

Run: `rg -n 'jest' package.json packages/cortex-react --glob '!dist/**' --glob '!node_modules/**'`

Expected: matches only in the updated AGENTS.md documentation prose (no config, scripts, deps, or `jest.` API usage). Confirm `vitest` and `jsdom` are present in root `package.json` and `vitest` is in cortex-react scripts.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove jest toolchain, migrate docs to vitest"
```

---

### Task 5: Full verification (CI gate)

**Files:** none (verification only)

**Interfaces:** Consumes Tasks 1-4. Terminal state of the migration — must match the CI gate order exactly.

- [ ] **Step 1: Root test gate**

Run: `pnpm test`

Expected: `@tecsinapse/cortex-react` passes under vitest, no other package runs tests.

- [ ] **Step 2: Lint gate**

Run: `pnpm lint:fix`

Expected: eslint + prettier apply (may auto-edit; `pnpm lint:ts` afterward must be clean). Codemod output must be lint-clean (e.g. import ordering of the `Mock` type import — adjust if the linter reorders).

- [ ] **Step 3: Type gate**

Run: `pnpm --filter @tecsinapse/cortex-react build:dts`

Expected: tsc passes with the new `types` array (vitest/globals + jest-dom vitest entry). If matcher types fail to resolve, confirm `vitest` is installed and the `types` entries are spelled `vitest/globals` and `@testing-library/jest-dom/vitest`.

- [ ] **Step 4: Storybook gate**

Run: `pnpm build:storybook`

Expected: build emits `sbdocs/` (gitignored). Storybook already runs on Vite 8 — no interaction with vitest.

- [ ] **Step 5: Watch-mode smoke check**

Run: `pnpm --filter @tecsinapse/cortex-react test:watch -- --run`

Expected: `vitest` starts, runs, and exits green (this proves the watch script is wired, without hanging the terminal).

- [ ] **Step 6: Final sweep**

Run: `git status --short` and `git log --oneline -5`

Expected: only the 4 migration commits on `feat/jest-to-vitest`; no stray files.

---

## Self-Review

- **Spec coverage:** deps (Task 1, 4), config (Task 2), setup file (Task 2), types (Task 2), codemod table (Task 3), scripts (Task 2), verification list (Task 5). The spec's `as jest.Mock → as Mock` + import requirement is in Task 3. ✓
- **Placeholder scan:** no TBD/TODO; failure handling in Task 3 Step 5 gives concrete remedies rather than "fix as needed". ✓
- **Type consistency:** `Mock` imported once per file from `'vitest'` (Task 3 Step 3); `vitest.setup.ts` referenced in both config and docs consistently; `vitest/globals` + `@testing-library/jest-dom/vitest` spelled identically in Task 2 and Task 5. ✓
- **Spec deviation (documented):** tsconfig `types` uses `@testing-library/jest-dom/vitest` (not the bare package) — the bare entry augments jest matchers only; spec updated to match.
