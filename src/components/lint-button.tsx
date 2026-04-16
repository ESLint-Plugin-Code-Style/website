import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import { buttonTypeValuesEnumsData, lintButtonSizeValuesEnumsData, lintButtonToneValuesEnumsData } from "@/data";
import { joinClassesHandler } from "@/lib";
import type {
    ButtonTypeType,
    LintButtonSizeType,
    LintButtonToneType,
    PillColorType,
} from "@/types";

const renderLintButtonSquiggleHandler = () => (
    <svg
        aria-hidden="true"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 4"
        xmlns="http://www.w3.org/2000/svg"
        className="
            pointer-events-none
            absolute
            inset-x-2
            bottom-1
            z-0
            h-1
            opacity-0
            transition-opacity
            duration-200
            group-hover:opacity-100
        "
    >
        <path
            className="lint-underline-error"
            d="M0 2 Q5 0 10 2 T20 2 T30 2 T40 2 T50 2 T60 2 T70 2 T80 2 T90 2 T100 2"
            fill="none"
            stroke="var(--lint-error)"
            strokeWidth="1.4"
        />
        <path
            className="lint-underline-pass"
            d="M2 2 L10 3 L18 1 L26 2 L34 3 L42 1 L50 2 L58 3 L66 1 L74 2 L82 3 L90 1 L98 2"
            fill="none"
            stroke="var(--lint-pass)"
            strokeLinecap="round"
            strokeWidth="1.6"
        />
    </svg>
);

const sizeClassByValue: Record<LintButtonSizeType, string> = {
    lg: "px-6 py-3 text-base",
    md: "px-5 py-2.5 text-sm",
    sm: "px-4 py-2 text-xs",
};

const toneClassByValue: Record<LintButtonToneType, string> = {
    ghost: "bg-transparent border-transparent",
    primary: "",
    secondary: "",
};

const styleByTone: Record<LintButtonToneType, PillColorType> = {
    ghost: {
        background: "transparent",
        color: "var(--text-primary)",
    },
    primary: {
        background: "var(--text-primary)",
        color: "var(--bg-primary)",
    },
    secondary: {
        background: "var(--bg-card)",
        color: "var(--text-primary)",
    },
};

const sharedClassBase = `
    inline-flex
    relative
    items-center
    justify-center
    gap-2
    font-semibold
    border
    rounded-md
    duration-200
    transition-all
    group
    overflow-hidden
    hover:-translate-y-0.5
`;

export const LintButton = ({
    ariaLabel,
    children,
    className,
    href,
    onClick,
    rel,
    size,
    target,
    tone,
    type,
}: {
    ariaLabel?: string,
    children: ReactNode,
    className?: string,
    href?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>,
    rel?: string,
    size?: LintButtonSizeType,
    target?: string,
    tone?: LintButtonToneType,
    type?: ButtonTypeType,
}) => {
    const resolvedSize: LintButtonSizeType = size ?? lintButtonSizeValuesEnumsData.md;

    const resolvedTone: LintButtonToneType = tone ?? lintButtonToneValuesEnumsData.primary;

    const isSecondary = resolvedTone === lintButtonToneValuesEnumsData.secondary;

    const toneBackground = styleByTone[resolvedTone].background;

    const borderColor = isSecondary ? "var(--border-primary)" : toneBackground;

    const style = {
        backgroundColor: toneBackground,
        borderColor,
        color: styleByTone[resolvedTone].color,
    };

    const sharedClass = joinClassesHandler(
        sharedClassBase,
        sizeClassByValue[resolvedSize],
        toneClassByValue[resolvedTone],
        className,
    );

    if (href !== undefined) {
        return (
            <Link
                aria-label={ariaLabel}
                className={sharedClass}
                href={href}
                rel={rel}
                style={style}
                target={target}
                onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
            >
                <span
                    className="
                        relative
                        z-10
                        flex
                        items-center
                        gap-2
                    "
                >
                    {children}
                </span>
                {renderLintButtonSquiggleHandler()}
            </Link>
        );
    }

    return (
        <button
            aria-label={ariaLabel}
            className={sharedClass}
            style={style}
            type={type ?? buttonTypeValuesEnumsData.button}
            onClick={onClick as MouseEventHandler<HTMLButtonElement>}
        >
            <span
                className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-2
                "
            >
                {children}
            </span>
            {renderLintButtonSquiggleHandler()}
        </button>
    );
};
