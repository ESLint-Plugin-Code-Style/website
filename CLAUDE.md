# Claude Code Configuration

> For general project instructions, see [AGENTS.md](./AGENTS.md).

## Claude-Specific Behavior

When working on this codebase, Claude Code should:

- Do NOT include `Co-Authored-By` lines in commits
- Do NOT include Claude Code signature or footer in commits
- Keep commit messages clean, conventional, and standard (no AI attribution)
- Commit message types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `style`, `revert`
- Use a `(scope)` when the change targets a single area, e.g. `feat(redesign)`, `chore(lint)`, `chore(tooling)`
- For UI or frontend changes: always start the dev server (`pnpm dev`) and verify the golden path + edge cases before reporting the task as complete
- Before committing: run `pnpm lint` + `pnpm tsc --noEmit` to catch issues early; don't rely on the hooks alone
- Never edit `src/data/rules.ts` — it is auto-generated from the plugin's `metadata.json` via `scripts/sync-from-plugin.js`. To change rule metadata, edit the plugin repo and re-sync.
- Do NOT add `eslint-disable` comments. All lint rules must pass via proper code fixes. If a rule genuinely cannot be satisfied for a specific framework reason, add a scoped config override in `eslint.config.js` with a comment explaining why.
- For git push, use HTTPS URL instead of SSH: `git push https://github.com/ESLint-Plugin-Code-Style/website.git <branch>`. Use `gh` CLI for GitHub API operations (PRs, issues).
