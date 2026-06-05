import type { ResolvedThemeType, ThemeType } from "@/types";

export interface CategoryPagePropsInterface { params: Promise<{ category: string }> }

export interface HeadingInterface {
    id: string,
    level: number,
    text: string,
}

export interface SearchRuleEntryInterface {
    category: string,
    description: string,
    isConfigurable: boolean,
    isFixable: boolean,
    name: string,
    slug: string,
}

export interface ThemeContextValueInterface {
    onSetTheme: (theme: ThemeType) => void,
    resolvedTheme: ResolvedThemeType,
    theme: ThemeType,
}
