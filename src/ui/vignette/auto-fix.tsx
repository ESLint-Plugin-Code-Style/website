"use client";

import { motion } from "motion/react";

import { codeSamplesStringsData } from "@/data";

const fadeOut = {
    animate: {
        opacity: [
            1,
            1,
            0,
            0,
        ],
    },
    transition: {
        duration: 3,
        ease: "easeInOut" as const,
        repeat: Infinity,
        times: [
            0,
            0.42,
            0.52,
            1,
        ],
    },
};

const fadeIn = {
    animate: {
        opacity: [
            0,
            0,
            1,
            1,
        ],
    },
    transition: {
        duration: 3,
        ease: "easeInOut" as const,
        repeat: Infinity,
        times: [
            0,
            0.48,
            0.58,
            1,
        ],
    },
};

export const AutoFixVignette = () => (
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
            text-sm
        "
        style={{
            backgroundColor: "var(--bg-code)",
            color: "var(--text-code)",
        }}
    >
        <div className="grid">
            <motion.div
                animate={fadeOut.animate}
                transition={fadeOut.transition}
                className="
                    relative
                    col-start-1
                    row-start-1
                    justify-self-center
                "
            >
                <span>{codeSamplesStringsData.autoFixKeyword}</span>
                {" "}
                <span style={{ color: "var(--lint-warn)" }}>{codeSamplesStringsData.autoFixVariable}</span>
                <span>{codeSamplesStringsData.autoFixOperatorMessy}</span>
                <span style={{ color: "var(--lint-info)" }}>{codeSamplesStringsData.autoFixVariableValue}</span>
                <svg
                    aria-hidden="true"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 120 4"
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                        absolute
                        -bottom-1
                        left-0
                        h-1
                        w-full
                    "
                >
                    <path
                        d="M0 2 Q6 0 12 2 T24 2 T36 2 T48 2 T60 2 T72 2 T84 2 T96 2 T108 2 T120 2"
                        stroke="var(--lint-error)"
                        strokeWidth="1.4"
                    />
                </svg>
            </motion.div>
            <motion.div
                animate={fadeIn.animate}
                transition={fadeIn.transition}
                className="
                    col-start-1
                    row-start-1
                    flex
                    flex-col
                    items-center
                    gap-1.5
                "
            >
                <div>
                    <span>{codeSamplesStringsData.autoFixKeyword}</span>
                    {" "}
                    <span style={{ color: "var(--lint-warn)" }}>{codeSamplesStringsData.autoFixVariable}</span>
                    <span>{codeSamplesStringsData.autoFixOperator}</span>
                    <span style={{ color: "var(--lint-info)" }}>{codeSamplesStringsData.autoFixVariableValue}</span>
                    {" "}
                    <span style={{ color: "var(--lint-pass)" }}>✓</span>
                </div>
                <div
                    className="text-xs"
                    style={{ color: "var(--lint-pass)" }}
                >
                    {codeSamplesStringsData.autoFixCommand}
                </div>
            </motion.div>
        </div>
    </div>
);
