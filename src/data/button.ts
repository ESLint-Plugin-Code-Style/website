import type { LintButtonSizeType, LintButtonToneType, PillColorType } from "@/types";

export const sizeClassesButtonData: Record<LintButtonSizeType, string> = {
    lg: "px-6 py-3 text-base",
    md: "px-5 py-2.5 text-sm",
    sm: "px-4 py-2 text-xs",
};

export const toneClassesButtonData: Record<LintButtonToneType, string> = {
    ghost: "border-transparent hover:bg-[var(--bg-tertiary)]",
    primary: "border-transparent",
    secondary: "border-[var(--border-primary)]",
};

export const toneStylesButtonData: Record<LintButtonToneType, PillColorType> = {
    ghost: {
        background: "transparent",
        color: "var(--text-secondary)",
    },
    primary: {
        background: "var(--bg-button-primary)",
        color: "var(--text-button-primary)",
    },
    secondary: {
        background: "transparent",
        color: "var(--text-primary)",
    },
};
