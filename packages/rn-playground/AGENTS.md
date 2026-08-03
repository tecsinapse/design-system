# AGENTS.md

`@tecsinapse/rn-playground` — private Expo (SDK 51, RN 0.74, React 18) demo app for the legacy RN packages. Excluded
from publishing (lerna `--no-private`; CI paths-ignore) — treat as an app, never a library.

## Commands (run from this directory, or `pnpm --filter @tecsinapse/rn-playground <script>` from root)

- `pnpm android` / `pnpm ios` — regenerate stories, then `expo start -c --android|ios` (installs Expo Go, starts Metro).
- `pnpm run:dev` — `expo start -c` only (Metro), if Expo Go is already installed.
- `pnpm storybook` — `sb-rn-watcher` storybook dev server.
- Requires the root `pnpm dev` watch builds running for `react-native-kit`/`react-charts` changes to appear.

## Quirks

- `stories/` are hand-written; `.rnstorybook/storybook.requires.ts` is **generated** by `update:stories` (
  `sb-rn-get-stories`) — don't edit it by hand.
- Uses `react-native-vector-icons` with a Metro config/asset setup — icon fonts must be linked per the RN env setup
  docs (see README).
- Expo Go can be unstable; restarting the app often resolves stale-bundle issues.
