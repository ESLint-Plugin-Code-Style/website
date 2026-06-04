"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { heroDemoSnippetsStringsData, redesignStringsData } from "@/data";
import type { LintStatusType, PillColorType } from "@/types";

const pillColorByStatus: Record<LintStatusType, PillColorType> = {
    error: {
        background: "var(--lint-error-bg)",
        color: "var(--lint-error)",
    },
    info: {
        background: "var(--lint-info-bg)",
        color: "var(--lint-info)",
    },
    pass: {
        background: "var(--lint-pass-bg)",
        color: "var(--lint-pass)",
    },
    warn: {
        background: "var(--lint-warn-bg)",
        color: "var(--lint-warn)",
    },
};

/*
 * Lightweight TSX tokenizer for the demo so the box reads like a real editor.
 * Token group -> color: 1 comment, 2 string, 3 keyword, 4 jsx tag, 5 number, 6 literal.
 */
const tokenColorByGroup: Record<number, string> = {
    1: "var(--text-tertiary)",
    2: "var(--lint-pass)",
    3: "var(--accent-violet)",
    4: "var(--lint-info)",
    5: "var(--lint-warn)",
    6: "var(--accent-violet)",
};

const tokenRe = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:import|from|export|default|const|let|var|return|interface|type|enum|function|new|extends|async|await)\b)|(<\/?[A-Za-z][\w.]*|\/?>)|(\b\d+(?:\.\d+)?\b)|(\b(?:true|false|null|undefined)\b)/g;

const getLineTokensHandler = (line: string): ReactNode[] => {
    const nodes: ReactNode[] = [];

    let lastIndex = 0;

    let key = 0;

    let match: RegExpExecArray | null;

    tokenRe.lastIndex = 0;

    while ((match = tokenRe.exec(line)) !== null) {
        const current = match;

        if (current.index > lastIndex) {
            nodes.push(
                line.slice(
                    lastIndex,
                    current.index,
                ),
            );
        }

        let groupIndex = 0;

        for (let g = 1; g <= 6; g += 1) {
            if (current[g] !== undefined) {
                groupIndex = g;

                break;
            }
        }

        nodes.push(
            <span
                key={key++}
                style={{ color: tokenColorByGroup[groupIndex] }}
            >
                {current[0]}
            </span>,
        );

        lastIndex = current.index + current[0].length;
    }

    if (lastIndex < line.length) nodes.push(line.slice(lastIndex));

    return nodes.length > 0 ? nodes : [" "];
};

export const AnimatedCodeFixer = () => {
    const [stepIndex, setStepIndex] = useState(0);

    const [typed, setTyped] = useState("");

    const [isTyping, setIsTyping] = useState(true);

    const [isPaused, setIsPaused] = useState(false);

    const stepDurationMs = 2400;

    const typingCharMs = 14;

    const finalDwellExtraMs = 2000;

    const totalSteps = heroDemoSnippetsStringsData.steps.length;

    const isInitialTyping = isTyping && stepIndex === 0;

    const activeStep = useMemo(
        () => heroDemoSnippetsStringsData.steps[stepIndex],
        [stepIndex],
    );

    const pillColors = useMemo(
        () => pillColorByStatus[activeStep.pillStatus],
        [activeStep],
    );

    const visibleSnippet = isInitialTyping ? typed : activeStep.snippet;

    const changedLines = useMemo(
        () => {
            if (isInitialTyping || stepIndex === 0) return new Set<string>();

            const prevSnippet = heroDemoSnippetsStringsData.steps[stepIndex - 1].snippet;

            const prevLines = new Set(prevSnippet.split("\n").map((line) => line.trim()));

            const currentLines = activeStep.snippet.split("\n").map((line) => line.trim());

            return new Set(currentLines.filter((line) => line.length > 0 && !prevLines.has(line)));
        },
        [
            activeStep,
            stepIndex,
            isInitialTyping,
        ],
    );

    useEffect(
        () => {
            if (isPaused) return undefined;

            if (!isTyping) return undefined;

            if (stepIndex !== 0) {
                setTyped(activeStep.snippet);

                setIsTyping(false);

                return undefined;
            }

            const full = activeStep.snippet;

            let cursor = 0;

            const timer = window.setInterval(
                () => {
                    cursor += 1;

                    setTyped(
                        full.slice(
                            0,
                            cursor,
                        ),
                    );

                    if (cursor >= full.length) {
                        window.clearInterval(timer);

                        setIsTyping(false);
                    }
                },
                typingCharMs,
            );

            return () => window.clearInterval(timer);
        },
        [
            activeStep,
            isPaused,
            isTyping,
            stepIndex,
        ],
    );

    useEffect(
        () => {
            if (isPaused) return undefined;

            if (isTyping) return undefined;

            const dwell = stepIndex === totalSteps - 1 ? stepDurationMs + finalDwellExtraMs : stepDurationMs;

            const timer = window.setTimeout(
                () => {
                    const next = (stepIndex + 1) % totalSteps;

                    setStepIndex(next);

                    if (next === 0) {
                        setTyped("");

                        setIsTyping(true);
                    } else setTyped(heroDemoSnippetsStringsData.steps[next].snippet);
                },
                dwell,
            );

            return () => window.clearTimeout(timer);
        },
        [
            isPaused,
            isTyping,
            stepIndex,
            totalSteps,
        ],
    );

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-xl
                border
                shadow-xl
            "
            style={{
                backgroundColor: "var(--bg-code)",
                borderColor: "var(--border-primary)",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    px-4
                    py-2.5
                "
                style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                }}
            >
                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                    "
                >
                    <span
                        aria-hidden="true"
                        className="traffic-lights"
                    >
                        <span />
                        <span />
                        <span />
                    </span>
                    <span
                        className="truncate font-mono text-xs"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                        {heroDemoSnippetsStringsData.fileName}
                    </span>
                </div>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={activeStep.pill}
                        transition={{ duration: 0.25 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-full
                            px-2.5
                            py-0.5
                            font-mono
                            text-[11px]
                            font-medium
                        "
                        exit={{
                            opacity: 0,
                            y: -4,
                        }}
                        initial={{
                            opacity: 0,
                            y: 4,
                        }}
                        style={{
                            backgroundColor: pillColors.background,
                            color: pillColors.color,
                        }}
                    >
                        <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: pillColors.color }}
                        />
                        {activeStep.pill}
                    </motion.span>
                </AnimatePresence>
            </div>
            <motion.div
                className="overflow-x-auto py-4"
                transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                }}
                layout
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stepIndex}
                        transition={{ duration: 0.3 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            min-w-fit
                            font-mono
                            text-[13px]
                            leading-[1.7]
                        "
                        exit={{
                            opacity: 0,
                            y: -6,
                        }}
                        initial={{
                            opacity: 0,
                            y: 6,
                        }}
                    >
                        {visibleSnippet.split("\n").map((
                            line,
                            index,
                            allLines,
                        ) => {
                            const isChanged = changedLines.has(line.trim()) && line.trim().length > 0;

                            return (
                                <div
                                    className="flex"
                                    key={index}
                                    style={isChanged ? { backgroundColor: "var(--lint-pass-bg)" } : undefined}
                                >
                                    <span
                                        aria-hidden="true"
                                        style={{ color: "rgba(148,163,184,0.35)" }}
                                        className="
                                            w-10
                                            shrink-0
                                            pr-4
                                            text-right
                                            select-none
                                        "
                                    >
                                        {index + 1}
                                    </span>
                                    <code
                                        className="pr-5"
                                        style={{ color: "var(--text-code)" }}
                                    >
                                        {getLineTokensHandler(line)}
                                        {isInitialTyping && index === allLines.length - 1 ? (
                                            <span
                                                aria-hidden="true"
                                                className="blinking-caret"
                                            />
                                        ) : null}
                                    </code>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
            {isPaused ? (
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        px-4
                        py-1.5
                        text-right
                        font-mono
                        text-[10px]
                    "
                    style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    {redesignStringsData.heroDemoPauseMessage}
                </div>
            ) : null}
        </div>
    );
};
