# cortex-native-migration skill — Design

Date: 2026-08-19
Status: Approved

## Purpose

A skill for coding agents that migrates a consumer app from the legacy emotion React Native stack
(`@tecsinapse/react-native-kit`, `@tecsinapse/react-core`, `@tecsinapse/react-charts`) to
`@tecsinapse/cortex-native`, including one-time setup, per-component import/prop mapping, and the intentional API
divergences — then verifies the result.

## Location

`.agents/skills/cortex-native-migration/` (alongside `expo-upgrade`; shipped with the design-system repo).

## Files

```
.agents/skills/cortex-native-migration/
  SKILL.md                        # workflow + rules (~350 words, scannable)
  references/component-mapping.md # legacy → cortex mapping table (~25 components)
```

## Decisions (approved)

- **Scope:** all three legacy packages (react-native-kit + react-core + react-charts) → cortex-native.
- **Delivery:** guidance + step-by-step workflow (no automated codemod tooling).
- **Location:** repo `.agents/skills/`.
- **Testing:** full RED-GREEN-REFACTOR (writing-skills Iron Law — no skill without a failing baseline test).
- **Structure:** SKILL.md + a separate references/component-mapping.md for the large mapping table.

## SKILL.md contents

- Frontmatter: `name: cortex-native-migration`; description starting "Use when..." (migrate from the legacy emotion
  stack to cortex-native; remove emotion deps), third person, no workflow summary.
- Overview: one-sentence core principle (cortex-native is the drop-in for the deprecated legacy RN stack).
- Workflow (ordered checklist):
  1. **Install + setup** — add `@tecsinapse/cortex-native uniwind react-native-svg react-native-vector-icons
     react-native-safe-area-context`; wrap Metro with `withUniwindConfig`; create `global.css` (tailwindcss + uniwind +
     tokens.css + tokens-native.css + `@source`); import it in the entry; wrap app in native `ThemeProvider`.
  2. **Audit imports** — find all legacy imports; map each via `references/component-mapping.md`.
  3. **Apply intentional divergences** — fontColor/fontWeight renames; `Native*Props` folded into base names;
     DatePicker/DateTimePicker self-contained (drop `renderCalendar`/`request*`); PieChart import swap; RFValue dropped
     → fixed tokens; date-fns v2→v4 token audit; no `@emotion/*` imports.
  4. **Remove legacy deps** — uninstall react-native-kit/react-core/react-charts; remove emotion.
  5. **Verify** — typecheck, build, run, confirm theme flips light/dark.
- Common mistakes / red flags (e.g. copying `var(--color…)` strings into a `color` prop; hardcoding hex; expecting
  web-only `hover:`/`active:` classes to apply statefully on RN).
- Cross-refs to `docs/setup/cortex-native.mdx` and rn-playground.

## references/component-mapping.md

Table: legacy package + component/prop → cortex-native component/prop, intentional renames called out inline.

## Testing (writing-skills)

- RED: baseline subagent migration of a consumer snippet WITHOUT the skill; capture mistakes.
- GREEN: write the skill; re-run same scenario WITH the skill.
- REFACTOR: close loopholes the test exposes.
