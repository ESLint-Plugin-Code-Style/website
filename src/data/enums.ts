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
