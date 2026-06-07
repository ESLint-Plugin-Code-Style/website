import type { MouseEventHandler, ReactNode } from "react";

import { ButtonTypeEnum } from "@/enums";
import { joinClassesHandler } from "@/lib";
import type { ButtonTypeType } from "@/types";

const iconButtonBaseClass = `
    flex
    items-center
    justify-center
    h-9
    w-9
    text-[var(--text-secondary)]
    bg-[var(--bg-tertiary)]
    rounded-lg
    duration-200
    transition-colors
    cursor-pointer
    hover:text-[var(--text-primary)]
`;

export const IconButton = ({
    ariaLabel,
    children,
    className,
    isAriaExpanded,
    onClick,
    type,
}: {
    ariaLabel: string,
    children: ReactNode,
    className?: string,
    isAriaExpanded?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    type?: ButtonTypeType,
}) => (
    <button
        aria-expanded={isAriaExpanded}
        aria-label={ariaLabel}
        type={type ?? ButtonTypeEnum.BUTTON}
        className={joinClassesHandler(
            iconButtonBaseClass,
            className,
        )}
        onClick={onClick}
    >
        {children}
    </button>
);
