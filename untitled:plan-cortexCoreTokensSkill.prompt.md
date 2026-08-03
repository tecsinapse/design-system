## Plan: Create Cortex Core Token Skill Markdown

TL;DR - Create a repository-level markdown document in `docs/` that enumerates every design token exported by `packages/cortex-core/src/tokens/definitions.ts`, with usage guidance for developer agents.

**Steps**

1. Create a new markdown file under `docs/`, such as `docs/cortex-core-tokens-skill.md`.
2. Add an introductory section explaining the purpose: to provide any developer agent with a complete reference for `@tecsinapse/cortex-core` tokens.
3. Document token categories exactly as exported from `packages/cortex-core/src/tokens/definitions.ts`:
   - `colors`
   - `spacing`
   - `borderRadius`
   - `borderWidth`
   - `fontSize`
   - `boxShadow`
   - `borderColor`
   - `fontFamily`
   - `textColor`
   - `zIndex`
4. For each category, list every token name and its corresponding value or structure, preserving nested color shades and font size arrays.
5. Include usage guidance for developer agents, such as how to reference tokens in component styling, theme updates, and CSS variable fallbacks.
6. Add a short implementation note that `cortex-core` exports these tokens from `packages/cortex-core/src/index.ts` and that the token source is `packages/cortex-core/src/tokens/definitions.ts`.

**Relevant files**

- `packages/cortex-core/src/tokens/definitions.ts` — source of all token definitions and values.
- `packages/cortex-core/src/index.ts` — re-exports the token definitions.
- `docs/` — target location for the new skill markdown.

**Verification**

1. Confirm the new markdown contains all token groups and names from `packages/cortex-core/src/tokens/definitions.ts`.
2. Verify the file clearly states it is intended for developer agents and includes usage guidance.
3. Ensure the file path is `docs/cortex-core-tokens-skill.md` or similar within `docs/`.

**Decisions**

- Use a standalone markdown document because the repository has no existing agent skill file format.
- Place the file in `docs/` per the selected location.
- Use the token export names exactly as defined in the source file.

**Further Considerations**

1. If the repository later adds a formal agent skills folder or schema, this document can be migrated into that structure.
2. The document should avoid implementation-specific code snippets and focus on token names, values, and intent.
