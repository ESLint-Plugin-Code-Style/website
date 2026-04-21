// Badge variants

export const badgeVariantValuesEnumsData = {
    default: "default",
    info: "info",
    lintError: "lintError",
    lintInfo: "lintInfo",
    lintPass: "lintPass",
    lintWarn: "lintWarn",
    purple: "purple",
    success: "success",
    warning: "warning",
} as const;

// Card variants

export const cardVariantValuesEnumsData = {
    notched: "notched",
    note: "note",
    tab: "tab",
} as const;

// Card "as" HTML element values

export const cardAsValuesEnumsData = {
    article: "article",
    div: "div",
    section: "section",
} as const;

// Squiggle variants

export const squiggleVariantValuesEnumsData = {
    error: "error",
    fix: "fix",
} as const;

// Lint status (semantic meaning used across animations/labels)

export const lintStatusValuesEnumsData = {
    error: "error",
    info: "info",
    pass: "pass",
    warn: "warn",
} as const;

// Lint accent names — the 5 accent colors used for per-category / per-item theming

export const lintAccentNameValuesEnumsData = {
    error: "error",
    info: "info",
    pass: "pass",
    violet: "violet",
    warn: "warn",
} as const;

// Lint button size

export const lintButtonSizeValuesEnumsData = {
    lg: "lg",
    md: "md",
    sm: "sm",
} as const;

// Lint button tone

export const lintButtonToneValuesEnumsData = {
    ghost: "ghost",
    primary: "primary",
    secondary: "secondary",
} as const;

// Motion repeat type values (motion library API)

export const motionRepeatTypeValuesEnumsData = {
    loop: "loop",
    mirror: "mirror",
    reverse: "reverse",
} as const;

// Media query values

export const mediaQueryValuesEnumsData = { prefersReducedMotion: "(prefers-reduced-motion: reduce)" } as const;

// Sitemap change frequency values

export const sitemapChangeFrequencyValuesEnumsData = {
    always: "always",
    daily: "daily",
    hourly: "hourly",
    monthly: "monthly",
    never: "never",
    weekly: "weekly",
    yearly: "yearly",
} as const;

// Object keys used at runtime (e.g. prop membership checks)

export const propertyKeyValuesEnumsData = { href: "href" } as const;

// HTML button type attribute values

export const buttonTypeValuesEnumsData = {
    button: "button",
    reset: "reset",
    submit: "submit",
} as const;

// CodeBlock filenames
export const codeFilenameValuesEnumsData = {
    eslintConfig: "eslint.config.js",
    npm: "npm",
    pnpm: "pnpm",
    projectStructure: "project structure",
    rulesArrays: "src/rules/arrays.js",
    terminal: "terminal",
    yarn: "yarn",
} as const;

// CodeBlock languages
export const codeLanguageValuesEnumsData = {
    bash: "bash",
    javascript: "javascript",
    js: "js",
    text: "text",
} as const;

// Event names
export const eventNameValuesEnumsData = {
    change: "change",
    keydown: "keydown",
    mousedown: "mousedown",
    offline: "offline",
    online: "online",
} as const;

// Keyboard keys
export const keyboardKeyValuesEnumsData = { escape: "Escape" } as const;

// HTML input types
export const inputTypeValuesEnumsData = {
    button: "button",
    text: "text",
} as const;

// Local storage keys
export const localStorageKeyValuesEnumsData = { theme: "theme" } as const;

// Method names
export const methodNameValuesEnumsData = { deleteMethod: "delete" } as const;

// Scroll behavior
export const scrollBehaviorValuesEnumsData = { smooth: "smooth" } as const;

// Theme values
export const themeValuesEnumsData = {
    dark: "dark",
    light: "light",
    system: "system",
} as const;
