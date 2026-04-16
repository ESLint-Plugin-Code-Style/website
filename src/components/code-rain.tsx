"use client";

import { useEffect, useRef, useState } from "react";

import { eventNameValuesEnumsData, mediaQueryValuesEnumsData, redesignStringsData } from "@/data";
import type { DriftEntryType } from "@/types";

const minDuration = 22;

const maxDuration = 48;

const minFont = 11;

const maxFont = 22;

const getRandomBetweenHandler = (min: number, max: number): number => min + Math.random() * (max - min);

const getRandomTokenHandler = (): string => {
    const tokens = redesignStringsData.codeRainTokens;

    return tokens[Math.floor(Math.random() * tokens.length)];
};

const buildEntriesHandler = (count: number): DriftEntryType[] => Array.from(
    { length: count },
    (
        _,
        index,
    ) => ({
        delay: -Math.random() * maxDuration,
        duration: getRandomBetweenHandler(
            minDuration,
            maxDuration,
        ),
        fontSize: Math.round(
            getRandomBetweenHandler(
                minFont,
                maxFont,
            ),
        ),
        key: index,
        left: (index / count) * 100 + getRandomBetweenHandler(
            -2,
            2,
        ),
        token: getRandomTokenHandler(),
    }),
);

export const CodeRain = () => {
    const prefersReducedRef = useRef(false);

    const [entries, setEntries] = useState<DriftEntryType[]>([]);

    const columnCount = 16;

    useEffect(
        () => {
            if (typeof window === "undefined") return undefined;

            const mediaQuery = window.matchMedia(mediaQueryValuesEnumsData.prefersReducedMotion);

            prefersReducedRef.current = mediaQuery.matches;

            if (mediaQuery.matches) {
                setEntries([]);

                return undefined;
            }

            setEntries(buildEntriesHandler(columnCount));

            const changeHandler = () => {
                prefersReducedRef.current = mediaQuery.matches;

                setEntries(mediaQuery.matches ? [] : buildEntriesHandler(columnCount));
            };

            mediaQuery.addEventListener(
                eventNameValuesEnumsData.change,
                changeHandler,
            );

            return () => mediaQuery.removeEventListener(
                eventNameValuesEnumsData.change,
                changeHandler,
            );
        },
        [],
    );

    return (
        <div
            aria-hidden="true"
            className="code-rain fixed inset-0"
        >
            {entries.map(({
                delay,
                duration,
                fontSize,
                key,
                left,
                token,
            }) => (
                <span
                    key={key}
                    style={{
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                        fontSize: `${fontSize}px`,
                        left: `${left}%`,
                    }}
                >
                    {token}
                </span>
            ))}
        </div>
    );
};
