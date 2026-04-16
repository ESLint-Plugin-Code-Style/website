"use client";

import { AnimatePresence, motion } from "motion/react";
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
                <div className="flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="traffic-lights"
                    >
                        <span />
                        <span />
                        <span />
                    </span>
                    <span
                        className="font-mono text-xs"
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
            <AnimatePresence mode="wait">
                <motion.pre
                    key={stepIndex}
                    style={{ color: "var(--text-code)" }}
                    transition={{ duration: 0.35 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
                        overflow-auto
                        p-5
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
                    <code>{visibleSnippet}</code>
                    {isInitialTyping ? (
                        <span
                            aria-hidden="true"
                            className="blinking-caret"
                        />
                    ) : null}
                </motion.pre>
            </AnimatePresence>
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
