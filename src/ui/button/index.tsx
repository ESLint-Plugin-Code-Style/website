import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import { sizeClassesButtonData, toneClassesButtonData, toneStylesButtonData } from "@/data";
import { ButtonTypeEnum, LintButtonSizeEnum, LintButtonToneEnum } from "@/enums";
import { joinClassesHandler } from "@/lib";
import type { ButtonTypeType, LintButtonSizeType, LintButtonToneType } from "@/types";

export { BackToTop } from "./back-to-top";
export { CopyButton } from "./copy";
export { IconButton } from "./icon";
export { LintButton } from "./lint";

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

    const style = isGhost ? { color: toneStylesButtonData[resolvedTone].color } : {
        backgroundColor: toneStylesButtonData[resolvedTone].background,
        color: toneStylesButtonData[resolvedTone].color,
    };

    const sharedClass = joinClassesHandler(
        baseClass,
        sizeClassesButtonData[resolvedSize],
        toneClassesButtonData[resolvedTone],
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
