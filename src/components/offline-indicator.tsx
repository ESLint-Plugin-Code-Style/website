"use client";

import { useEffect, useState } from "react";

import { eventNameValuesEnumsData, offlineIndicatorStringsData } from "@/data";

export const OfflineIndicator = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(
        () => {
            if (typeof navigator === "undefined") return undefined;

            setIsOffline(!navigator.onLine);

            const setOnlineHandler = () => setIsOffline(false);

            const setOfflineHandler = () => setIsOffline(true);

            window.addEventListener(
                eventNameValuesEnumsData.online,
                setOnlineHandler,
            );

            window.addEventListener(
                eventNameValuesEnumsData.offline,
                setOfflineHandler,
            );

            return () => {
                window.removeEventListener(
                    eventNameValuesEnumsData.online,
                    setOnlineHandler,
                );

                window.removeEventListener(
                    eventNameValuesEnumsData.offline,
                    setOfflineHandler,
                );
            };
        },
        [],
    );

    if (!isOffline) return null;

    return (
        <div
            aria-live="polite"
            role="status"
            className="
                fixed
                inset-x-0
                bottom-0
                z-50
                flex
                items-center
                justify-center
                gap-2
                border-t
                px-4
                py-3
                text-sm
                font-medium
                shadow-lg
            "
            style={{
                backgroundColor: "oklch(0.55 0.22 25 / 0.95)",
                borderColor: "oklch(0.55 0.22 25)",
                color: "white",
            }}
        >
            <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span>{offlineIndicatorStringsData.message}</span>
        </div>
    );
};
