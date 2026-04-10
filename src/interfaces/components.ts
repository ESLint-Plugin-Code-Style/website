import type { ResolvedThemeType, ThemeType } from "@/types";

export interface CategoryPagePropsInterface { params: Promise<{ category: string }> }

/* eslint-disable code-style/prop-naming-convention -- Next.js error.tsx requires `reset` prop name */
export interface ErrorBoundaryPropsInterface {
    error: Error & { digest?: string },
    reset: () => void,
}
/* eslint-enable code-style/prop-naming-convention */

export interface HeadingInterface {
    id: string,
    level: number,
    text: string,
}

export interface ThemeContextValueInterface {
    onSetTheme: (theme: ThemeType) => void,
    resolvedTheme: ResolvedThemeType,
    theme: ThemeType,
}
