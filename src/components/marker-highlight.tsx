import type { ReactNode } from "react";

import { lintStatusValuesEnumsData } from "@/data";
import { joinClassesHandler } from "@/lib";
import type { LintStatusType } from "@/types";

const colorByStatus: Record<LintStatusType, string> = {
    error: "var(--lint-error)",
    info: "var(--lint-info)",
    pass: "var(--lint-pass)",
    warn: "var(--lint-warn)",
};

export const MarkerHighlight = ({
    children,
    className,
    status,
}: {
    children: ReactNode,
    className?: string,
    status?: LintStatusType,
}) => {
    const resolvedStatus: LintStatusType = status ?? lintStatusValuesEnumsData.warn;

    const color = colorByStatus[resolvedStatus];

    return (
        <span
            className={joinClassesHandler(
                "relative inline-block",
                className,
            )}
        >
            <svg
                aria-hidden="true"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 200 40"
                xmlns="http://www.w3.org/2000/svg"
                className="
                    absolute
                    inset-0
                    -z-0
                    h-full
                    w-full
                "
            >
                <path
                    d="M4 16 Q10 6 60 8 Q140 10 196 12 Q198 24 190 30 Q100 34 20 32 Q2 30 4 16 Z"
                    fill={color}
                    opacity="0.22"
                />
            </svg>
            <span className="relative z-10">{children}</span>
        </span>
    );
};
