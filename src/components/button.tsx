import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import { ButtonTypeEnum, LintButtonSizeEnum, LintButtonToneEnum } from "@/enums";
import { joinClassesHandler } from "@/lib";
import type {
    ButtonTypeType,
    LintButtonSizeType,
    LintButtonToneType,
    PillColorType,
} from "@/types";

const sizeClassByValue: Record<LintButtonSizeType, string> = {
    lg: "px-6 py-3 text-base",
    md: "px-5 py-2.5 text-sm",
    sm: "px-4 py-2 text-xs",
};

const toneClassByValue: Record<LintButtonToneType, string> = {
    ghost: "border-transparent hover:bg-[var(--bg-tertiary)]",
    primary: "border-transparent",
    secondary: "border-[var(--border-primary)]",
};

const styleByTone: Record<LintButtonToneType, PillColorType> = {
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

const baseClass = `
    inline-flex
    items-center
    justify-center
    gap-2
    font-semibold
    border
    rounded-lg
    duration-200
    transition-all
    cursor-pointer
`;

export const Button = ({
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
    const resolvedSize: LintButtonSizeType = size ?? LintButtonSizeEnum.MD;

    const resolvedTone: LintButtonToneType = tone ?? LintButtonToneEnum.PRIMARY;

    const isGhost = resolvedTone === LintButtonToneEnum.GHOST;

    const style = isGhost ? { color: styleByTone[resolvedTone].color } : {
        backgroundColor: styleByTone[resolvedTone].background,
        color: styleByTone[resolvedTone].color,
    };

    const sharedClass = joinClassesHandler(
        baseClass,
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
                {children}
            </Link>
        );
    }

    return (
        <button
            aria-label={ariaLabel}
            className={sharedClass}
            style={style}
            type={type ?? ButtonTypeEnum.BUTTON}
            onClick={onClick as MouseEventHandler<HTMLButtonElement>}
        >
            {children}
        </button>
    );
};
