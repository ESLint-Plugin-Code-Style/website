# AGENTS.md

Instructions for AI coding agents working on this codebase.

## Project Overview

This is the **official documentation website** for `eslint-plugin-code-style`, built with Next.js 15 (App Router). The plugin lives in a sibling directory and publishes 81 custom React/JSX formatting rules. This website renders the rule reference, installation docs, configuration guide, and changelog — all **auto-synced** from the plugin's `metadata.json` via a build-time script.

- **Stack:** Next.js 15 + React 19 + TypeScript 5.8 + Tailwind v4 + motion (framer-motion successor)
- **Deploy target:** Static export on Vercel (`next build` → fully prerendered, installable as a PWA)
- **Docs sync:** `scripts/sync-from-plugin.js` regenerates `src/data/rules.ts` from the plugin's metadata on every `pnpm build` (via `prebuild` hook). Do **not** edit `src/data/rules.ts` by hand.

## Folder Structure

```
website/
├── .husky/                      # Git hooks (pre-commit, pre-push, commit-msg)
├── public/
│   ├── banner.svg               # Open-graph + Twitter image (1280×714)
│   ├── manifest.json            # PWA manifest
│   └── sw.js                    # Service worker (cache-first static, network-first HTML)
├── scripts/
│   └── sync-from-plugin.js      # Regenerates rules data from plugin metadata
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── apple-icon.svg       # Auto-served apple-touch-icon
│   │   ├── docs/                # /docs/* routes
│   │   │   ├── rules/[category]/
│   │   │   ├── getting-started/
│   │   │   ├── configuration/
│   │   │   ├── philosophy/
│   │   │   ├── contributing/
│   │   │   ├── changelog/
│   │   │   └── layout.tsx
│   │   ├── offline/             # Offline fallback page (served by service worker)
│   │   ├── error.tsx            # Error boundary
│   │   ├── globals.css          # Design tokens + keyframes + @theme block
│   │   ├── icon.svg             # Auto-served favicon
│   │   ├── layout.tsx           # Root layout + Metadata + Viewport + fonts
│   │   ├── not-found.tsx        # 404 page
│   │   ├── page.tsx             # Homepage (hero + stats + features + categories + quick-start + footer)
│   │   ├── robots.ts            # /robots.txt route handler
│   │   └── sitemap.ts           # /sitemap.xml route handler
│   ├── components/              # Flat (no subfolders) — every *.tsx is a component
│   │   ├── animated-code-fixer.tsx    # Hero auto-fix demo
│   │   ├── *-vignette.tsx             # 6 lint-themed micro-animations
│   │   ├── card.tsx                   # Card primitive (tab / note / notched variants)
│   │   ├── code-block.tsx             # Dark-themed code block with traffic-light dots
│   │   ├── code-rain.tsx              # Background drifting code tokens
│   │   ├── count-up.tsx               # motion useInView counter
│   │   ├── lint-button.tsx            # Button with squiggle-to-check hover gesture
│   │   ├── marker-highlight.tsx       # SVG marker blob behind text
│   │   ├── navbar.tsx
│   │   ├── on-this-page.tsx
│   │   ├── section-divider.tsx        # Hand-drawn zigzag separator
│   │   ├── sidebar.tsx
│   │   ├── signed-sticker.tsx         # Caveat handwriting author signature
│   │   ├── squiggle-icon.tsx          # Reusable SVG squiggle (error / fix variants)
│   │   └── index.ts                   # Barrel export
│   ├── contexts/                # React contexts (theme)
│   ├── data/
│   │   ├── code-samples.ts      # Inline code-display strings from vignettes
│   │   ├── config.ts            # Plugin version + URLs (auto-synced)
│   │   ├── enums.ts             # Magic-value constants as { key: "value" } as const
│   │   ├── navigation.ts        # Docs sidebar tree
│   │   ├── rules.ts             # ⚠ Auto-synced from plugin metadata — do not edit
│   │   ├── strings.ts           # All user-facing text
│   │   └── versions.ts          # Plugin release history
│   ├── hooks/                   # Custom hooks (use-theme)
│   ├── interfaces/              # TypeScript interfaces (components, navigation, rules, versions)
│   ├── lib/
│   │   └── utils.ts             # joinClassesHandler helper
│   ├── providers/               # React providers (theme)
│   └── types/                   # TypeScript type aliases (one file per concern)
├── .browserslistrc
├── .commitlintrc.js
├── eslint.config.js
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Commands

```bash
pnpm dev          # next dev --turbopack, http://localhost:3000
pnpm build        # prebuild (sync-from-plugin) → next build (static export)
pnpm start        # serve built output
pnpm lint         # eslint src/  — enforced by husky pre-commit
pnpm lint:fix     # eslint src/ --fix
pnpm sync         # regenerate src/data/rules.ts from plugin metadata
```

## Conventions

### File & folder naming

- **Files:** `kebab-case.{ts,tsx}` (enforced by `check-file/filename-naming-convention`).
- **Folders:** `kebab-case` — *except* Next.js dynamic-route brackets like `[category]` which are scoped-override'd.
- **`src/components/` is flat** (no subfolders). Every `*.tsx` file there is a single-export component whose name matches the filename in PascalCase (e.g. `auto-fix-vignette.tsx` exports `AutoFixVignette`). The `code-style/folder-structure-consistency` rule enforces this.
- **Vignettes use the `-vignette` suffix** so `folder-based-naming-convention` maps `react-vignette.tsx` → `ReactVignette`.
- **SVG icons use the `-icon` suffix** so `squiggle-icon.tsx` → `SquiggleIcon`, satisfying `svg-icon-naming-convention`.

### Strings & magic values

- **All user-facing strings live in `src/data/strings.ts`**, grouped by feature (`homeStringsData`, `notFoundStringsData`, `redesignStringsData`, `codeSamplesStringsData`, etc.). The `code-style/no-hardcoded-strings` rule forbids inline string literals in JSX and attributes.
- **All magic values live in `src/data/enums.ts`** as `{ key: "value" } as const` objects, named `<topic>ValuesEnumsData` (e.g. `lintStatusValuesEnumsData`, `cardVariantValuesEnumsData`). Referenced as `lintStatusValuesEnumsData.warn` — never the raw string.
- Both files re-export through `src/data/index.ts`. Components import from `@/data` only.

### Types

- One type per file under `src/types/`, aliased through `src/types/index.ts`. File name = kebab-case of the type concern.
- Components generally use **inline type annotations** for props (per `code-style/component-props-inline-type`). Reference types only when the shape is shared/complex (e.g. `LintButtonPropsType` — but even there, inline is preferred when possible).
- Union types with ≤2 members are OK inline; ≥3 members go in a named type (`code-style/no-inline-type-definitions`).

### Components

- **Arrow functions only** (`react/function-component-definition`).
- **Props sorted alphabetically with callbacks last** (`react/jsx-sort-props`).
- **Multiline classnames** (`code-style/classname-multiline`) — every class on its own line inside a template literal.
- **Tailwind class order** (`tailwindcss/classnames-order` + `code-style/classname-order`): layout → sizing → spacing → typography → colors → effects → states.
- **Code order inside a component body** (`code-style/react-code-order`): refs → state → redux → router → context → custom hooks → derived → useMemo → useCallback → handlers → useEffect → return.
- **4-space indentation** for both TS and JSX.
- **Absolute imports via `@/*`** (`code-style/absolute-imports-only`); relative imports only within the same folder tree.
- **Handler functions end in `Handler`** (`code-style/function-naming-convention`) — e.g. `getSitemapHandler`, `onMenuToggleHandler`.
- **Default exports are only allowed in Next.js convention files** (`page/layout/not-found/error/loading/template/route/sitemap/robots/manifest/opengraph-image/apple-icon/icon/twitter-image/default`), plus `next.config.*`, `middleware`, `instrumentation`, `eslint.config.js`, `commitlint.config.js`. The `import-x/no-default-export` rule is scoped-disabled for exactly those paths in `eslint.config.js`.

## Framework extensions in `eslint.config.js`

The project uses `eslint-plugin-code-style` via the plugin's shipped configs, **plus** three Next.js-specific extensions at the tail of the config array:

1. `next-env.d.ts` added to the top-level `ignores` (auto-generated on every `next dev` / `next build`).
2. Scoped override: turns off `import-x/no-default-export` for Next.js file-router convention files (default export required by framework).
3. Scoped override: turns off `check-file/folder-naming-convention` for `src/app/**/[*]/**` (bracket syntax required by framework).

These extensions are baked into the plugin's own recommended configs (so every consumer gets them by default). They are **not** blanket rule disables — they scope the rule off only for the exact paths where the framework demands a different shape.

## PWA + Service Worker

- `public/manifest.json` — valid PWA manifest with `display: standalone`, `display_override`, `launch_handler`, 3 `shortcuts` (Rules, Setup, Changelog), `screenshots`, and both SVG icons.
- `public/sw.js` — cache-first for static assets, network-first for HTML with offline fallback to `/offline`. Precaches all docs routes + icons + banner.
- `src/components/service-worker-register.tsx` registers `/sw.js` in production (skips `localhost`).
- `src/components/offline-indicator.tsx` renders a fixed bottom banner when `navigator.onLine === false`.

## Metadata / SEO

- Root `layout.tsx` exports `metadata: Metadata` (canonical, applicationName, appleWebApp, category, creator, formatDetection, icons, keywords, manifest, openGraph with /banner.svg 1280×714, robots + googleBot directives, title template, twitter card with image) and `viewport: Viewport` (colorScheme, initialScale, dual-mode themeColor, width).
- `src/app/robots.ts` and `src/app/sitemap.ts` are Next.js route handlers that default-export a function returning the config.
- Centralize every metadata string in `metadataStringsData` (`src/data/strings.ts`).

## Git workflow

- **Conventional commits enforced** by husky `commit-msg` + `@commitlint/config-conventional`. Allowed types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `style`, `revert`.
- **`pnpm lint` must pass before every commit** (husky pre-commit). 0 errors is the target.
- **`pnpm build` must succeed before every push** (husky pre-push).
- **Don't bypass hooks** with `--no-verify` unless the user explicitly asks.
- Branch naming: `<type>/<short-kebab-description>` (e.g. `feat/redesign-hero`, `fix/service-worker-cache`).
- The plugin repo's website is auto-synced via a GitHub Action that runs `sync-from-plugin.js` when the plugin's `metadata.json` changes.

## Adding things

- **New string?** Add to the right group in `src/data/strings.ts`, re-export via `src/data/index.ts`, import from `@/data` in your component.
- **New magic value (string literal or key)?** Add to `src/data/enums.ts` as `<topic>ValuesEnumsData`, re-export, import.
- **New type?** `src/types/<concern>.ts`, export via `src/types/index.ts`.
- **New component?** Flat `src/components/<kebab-name>.tsx`, PascalCase single export matching filename, re-exported from `src/components/index.ts`.
- **New docs page?** Add route under `src/app/docs/<slug>/page.tsx` + entry in `src/data/navigation.ts`.
- **New vignette?** `src/components/<topic>-vignette.tsx` exporting `<Topic>Vignette`. Use `motion` for keyframes. Gate heavy animations behind `prefers-reduced-motion`.

## Visual identity (redesign reference)

The redesign intentionally breaks the "AI-template" aesthetic:

- **Palette:** 4-color lint-semantic tokens (`--lint-error` / `--lint-warn` / `--lint-pass` / `--lint-info`) + `--accent-violet` as a secondary accent. Paper-cream light mode + near-black editor dark mode. Subtle paper-grain SVG noise on `body`.
- **Shapes:** mixed card radii via three variants (`.card-tab`, `.card-note`, `.card-notched`). No uniform `rounded-xl` everywhere.
- **Typography:** Inter (body), JetBrains Mono (code + hero eyebrow), Caveat (handwritten annotations only).
- **Animations:** every loop references linting — auto-fix squiggles, imports sorting, JSX tree indentation, dependency satellites collapsing, interface fields re-sorting, `eslint --fix` labels.
- All animations respect `@media (prefers-reduced-motion: reduce)`.

## When in doubt

- Read the plugin's own `AGENTS.md` + `CLAUDE.md` in `../plugin/` for rule-authoring and release workflow context.
- The plugin docs site itself shows every rule's rationale, examples, and options — the best reference for understanding what a rule expects.
