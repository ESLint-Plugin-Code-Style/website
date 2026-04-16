import type { ReactNode } from "react";

import { joinClassesHandler } from "@/lib";
import type { BadgeVariantType } from "@/types";

const variantStyles: Record<
    BadgeVariantType,
    {
        backgroundColor: string,
        color: string,
    }
> = {
    default: {
        backgroundColor: "var(--bg-badge)",
        color: "var(--text-badge)",
    },
    info: {
        backgroundColor: "var(--lint-info-bg)",
        color: "var(--lint-info)",
    },
    lintError: {
        backgroundColor: "var(--lint-error-bg)",
        color: "var(--lint-error)",
    },
    lintInfo: {
        backgroundColor: "var(--lint-info-bg)",
        color: "var(--lint-info)",
    },
    lintPass: {
        backgroundColor: "var(--lint-pass-bg)",
        color: "var(--lint-pass)",
    },
    lintWarn: {
        backgroundColor: "var(--lint-warn-bg)",
        color: "var(--lint-warn)",
    },
    purple: {
        backgroundColor: "var(--accent-violet-bg)",
        color: "var(--accent-violet)",
    },
    success: {
        backgroundColor: "var(--lint-pass-bg)",
        color: "var(--lint-pass)",
    },
    warning: {
        backgroundColor: "var(--lint-warn-bg)",
        color: "var(--lint-warn)",
    },
};

export const Badge = ({
    children,
    variant,
}: {
    children: ReactNode,
    variant?: BadgeVariantType,
}) => {
    const defaultVariant: BadgeVariantType = "default";

    const resolvedVariant = variant ?? defaultVariant;

    const styles = variantStyles[resolvedVariant];

    return (
        <span
            style={styles}
            className={joinClassesHandler(`
                inline-flex
                items-center
                rounded-full
                px-2.5
                py-0.5
                text-xs
                font-medium
            `)}
        >
            {children}
        </span>
    );
};
