"use client";

import { motion } from "motion/react";

import { codeSamplesStringsData } from "@/data";

export const ReactVignette = () => (
    <div
        className="
            relative
            flex
            h-24
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-md
            font-mono
            text-xs
        "
        style={{
            backgroundColor: "var(--bg-code)",
            color: "var(--text-code)",
        }}
    >
        <div
            className="
                flex
                flex-col
                items-start
                gap-0
                leading-tight
            "
        >
            <span style={{ color: "var(--lint-info)" }}>{codeSamplesStringsData.reactJsxCardOpen}</span>
            <motion.span
                style={{ color: "var(--lint-warn)" }}
                animate={{
                    opacity: [
                        0.4,
                        0.4,
                        1,
                        1,
                    ],
                    x: [
                        12,
                        12,
                        16,
                        16,
                    ],
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [
                        0,
                        0.4,
                        0.6,
                        1,
                    ],
                }}
            >
                {codeSamplesStringsData.reactJsxHeader}
            </motion.span>
            <motion.span
                style={{ color: "var(--lint-pass)" }}
                animate={{
                    opacity: [
                        0.4,
                        0.4,
                        1,
                        1,
                    ],
                    x: [
                        12,
                        12,
                        16,
                        16,
                    ],
                }}
                transition={{
                    delay: 0.15,
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [
                        0,
                        0.4,
                        0.6,
                        1,
                    ],
                }}
            >
                {codeSamplesStringsData.reactJsxBody}
            </motion.span>
            <motion.span
                style={{ color: "var(--accent-violet)" }}
                animate={{
                    opacity: [
                        0.4,
                        0.4,
                        1,
                        1,
                    ],
                    x: [
                        12,
                        12,
                        16,
                        16,
                    ],
                }}
                transition={{
                    delay: 0.3,
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [
                        0,
                        0.4,
                        0.6,
                        1,
                    ],
                }}
            >
                {codeSamplesStringsData.reactJsxFooter}
            </motion.span>
            <span style={{ color: "var(--lint-info)" }}>{codeSamplesStringsData.reactJsxCardClose}</span>
        </div>
    </div>
);
