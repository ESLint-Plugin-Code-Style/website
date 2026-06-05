import { LintAccentNameEnum } from "@/enums";
import type { LintAccentNameType, LintAccentType } from "@/types";

const lintAccentTokensData: Record<LintAccentNameType, LintAccentType> = {
    [LintAccentNameEnum.ERROR]: {
        background: "var(--lint-error-bg)",
        color: "var(--lint-error)",
    },
    [LintAccentNameEnum.INFO]: {
        background: "var(--lint-info-bg)",
        color: "var(--lint-info)",
    },
    [LintAccentNameEnum.PASS]: {
        background: "var(--lint-pass-bg)",
        color: "var(--lint-pass)",
    },
    [LintAccentNameEnum.VIOLET]: {
        background: "var(--accent-violet-bg)",
        color: "var(--accent-violet)",
    },
    [LintAccentNameEnum.WARN]: {
        background: "var(--lint-warn-bg)",
        color: "var(--lint-warn)",
    },
};

export const getLintAccentHandler = (name: LintAccentNameType): LintAccentType => lintAccentTokensData[name];
