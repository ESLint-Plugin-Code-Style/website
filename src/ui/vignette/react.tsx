"use client";

import type { Transition } from "motion/react";
import { motion } from "motion/react";

import { codeSamplesStringsData } from "@/data";

const loopTransition: Transition = {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
    times: [
        0,
        0.4,
        0.5,
        0.9,
        1,
    ],
};

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
        <motion.div
            className="absolute"
            style={{ color: "var(--text-tertiary)" }}
            transition={loopTransition}
            animate={{
                opacity: [
                    1,
                    1,
                    0,
                    0,
                    1,
                ],
            }}
        >
            {codeSamplesStringsData.reactJsxBefore}
        </motion.div>
        <motion.div
            transition={loopTransition}
            animate={{
                opacity: [
                    0,
                    0,
                    1,
                    1,
                    0,
                ],
            }}
            className="
                absolute
                flex
                flex-col
                items-start
                leading-tight
            "
        >
            <span style={{ color: "var(--lint-info)" }}>{codeSamplesStringsData.reactJsxCardOpen}</span>
            <span
                className="pl-4"
                style={{ color: "var(--lint-warn)" }}
            >
                {codeSamplesStringsData.reactJsxHeader}
            </span>
            <span
                className="pl-4"
                style={{ color: "var(--lint-pass)" }}
            >
                {codeSamplesStringsData.reactJsxBody}
            </span>
            <span
                className="pl-4"
                style={{ color: "var(--accent-violet)" }}
            >
                {codeSamplesStringsData.reactJsxFooter}
            </span>
            <span style={{ color: "var(--lint-info)" }}>{codeSamplesStringsData.reactJsxCardClose}</span>
        </motion.div>
    </div>
);
