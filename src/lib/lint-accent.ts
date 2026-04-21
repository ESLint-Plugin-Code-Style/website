import { lintAccentNameValuesEnumsData } from "@/data";
import type { LintAccentNameType, LintAccentType } from "@/types";

const lintAccentTokensData: Record<LintAccentNameType, LintAccentType> = {
    [lintAccentNameValuesEnumsData.error]: {
        background: "var(--lint-error-bg)",
        color: "var(--lint-error)",
    },
    [lintAccentNameValuesEnumsData.info]: {
        background: "var(--lint-info-bg)",
        color: "var(--lint-info)",
    },
    [lintAccentNameValuesEnumsData.pass]: {
        background: "var(--lint-pass-bg)",
        color: "var(--lint-pass)",
    },
    [lintAccentNameValuesEnumsData.violet]: {
        background: "var(--accent-violet-bg)",
        color: "var(--accent-violet)",
    },
    [lintAccentNameValuesEnumsData.warn]: {
        background: "var(--lint-warn-bg)",
        color: "var(--lint-warn)",
    },
};

export const getLintAccentHandler = (name: LintAccentNameType): LintAccentType => lintAccentTokensData[name];
