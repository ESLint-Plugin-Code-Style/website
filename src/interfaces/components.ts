import type { ResolvedThemeType, ThemeType } from "@/types";

export interface CategoryPagePropsInterface { params: Promise<{ category: string }> }

export interface ErrorBoundaryPropsInterface {
    error: Error & { digest?: string },
    reset: () => void,
}

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
