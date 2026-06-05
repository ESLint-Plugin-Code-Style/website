"use client";

import { useEffect, useState } from "react";

import { ruleSearchStringsData } from "@/data";
import { ButtonTypeEnum } from "@/enums";

import { MagnifierIcon } from "./magnifier-icon";

export const RuleSearchTrigger = ({
    isCompact,
    onOpen,
}: {
    isCompact?: boolean,
    onOpen: () => void,
}) => {
    const [shortcut, setShortcut] = useState(ruleSearchStringsData.shortcutOther);

    useEffect(
        () => {
            if (navigator.platform.includes(ruleSearchStringsData.macPlatformToken)) setShortcut(ruleSearchStringsData.shortcutMac);
        },
        [],
    );

    if (isCompact) {
        return (
            <button
                aria-label={ruleSearchStringsData.triggerAriaLabel}
                type={ButtonTypeEnum.BUTTON}
                className="
                    flex
                    h-9
                    w-9
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    transition-colors
                    duration-200
                "
                style={{
                    backgroundColor: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                }}
                onClick={onOpen}
            >
                <MagnifierIcon className="size-5" />
            </button>
        );
    }

    return (
        <button
            aria-label={ruleSearchStringsData.triggerAriaLabel}
            type={ButtonTypeEnum.BUTTON}
            className="
                flex
                cursor-pointer
                items-center
                gap-2
                rounded-lg
                py-1.5
                pr-2
                pl-3
                text-sm
                transition-colors
                duration-200
            "
            style={{
                backgroundColor: "var(--bg-tertiary)",
                color: "var(--text-tertiary)",
            }}
            onClick={onOpen}
        >
            <MagnifierIcon className="size-4" />
            <span>{ruleSearchStringsData.triggerLabel}</span>
            <kbd
                className="
                    rounded
                    px-1.5
                    py-0.5
                    font-mono
                    text-xs
                "
                style={{
                    backgroundColor: "var(--bg-badge)",
                    color: "var(--text-badge)",
                }}
            >
                {shortcut}
            </kbd>
        </button>
    );
};
