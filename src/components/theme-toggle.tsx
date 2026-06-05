"use client";

import { useSyncExternalStore } from "react";

import { componentStringsData } from "@/data";
import { ThemeEnum } from "@/enums";
import { useTheme } from "@/hooks";
import { IconButton } from "@/ui";

const emptySubscribeHandler = () => () => {};

const getClientSnapshotHandler = () => true;

const getServerSnapshotHandler = () => false;

export const ThemeToggle = () => {
    const {
        onSetTheme,
        resolvedTheme,
    } = useTheme();

    const isMounted = useSyncExternalStore(
        emptySubscribeHandler,
        getClientSnapshotHandler,
        getServerSnapshotHandler,
    );

    return (
        <IconButton
            ariaLabel={componentStringsData.toggleThemeLabel}
            onClick={() => onSetTheme(resolvedTheme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK)}
        >
            {!isMounted ? <span className="h-[18px] w-[18px]" /> : resolvedTheme === ThemeEnum.DARK ? (
                <svg
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="18"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="5"
                    />
                    <line
                        x1="12"
                        x2="12"
                        y1="1"
                        y2="3"
                    />
                    <line
                        x1="12"
                        x2="12"
                        y1="21"
                        y2="23"
                    />
                    <line
                        x1="4.22"
                        x2="5.64"
                        y1="4.22"
                        y2="5.64"
                    />
                    <line
                        x1="18.36"
                        x2="19.78"
                        y1="18.36"
                        y2="19.78"
                    />
                    <line
                        x1="1"
                        x2="3"
                        y1="12"
                        y2="12"
                    />
                    <line
                        x1="21"
                        x2="23"
                        y1="12"
                        y2="12"
                    />
                    <line
                        x1="4.22"
                        x2="5.64"
                        y1="19.78"
                        y2="18.36"
                    />
                    <line
                        x1="18.36"
                        x2="19.78"
                        y1="5.64"
                        y2="4.22"
                    />
                </svg>
            ) : (
                <svg
                    fill="none"
                    height="18"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="18"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </IconButton>
    );
};
