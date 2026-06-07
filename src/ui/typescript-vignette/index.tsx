"use client";

import { motion } from "motion/react";

import { codeSamplesStringsData } from "@/data";

const fieldsBefore = [
    {
        color: "var(--lint-warn)",
        name: "name",
    },
    {
        color: "var(--lint-info)",
        name: "id",
    },
    {
        color: "var(--lint-pass)",
        name: "active",
    },
];

const fieldsAfter = [
    {
        color: "var(--lint-pass)",
        name: "active",
    },
    {
        color: "var(--lint-info)",
        name: "id",
    },
    {
        color: "var(--lint-warn)",
        name: "name",
    },
];

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
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity,
        times: [
            0,
            0.4,
            0.5,
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
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity,
        times: [
            0,
            0.5,
            0.6,
            1,
        ],
    },
};

export const TypescriptVignette = () => (
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
        <motion.span
            animate={fadeOut.animate}
            aria-hidden="true"
            style={{ color: "var(--lint-warn)" }}
            transition={fadeOut.transition}
            className="
                absolute
                top-2
                right-3
                font-medium
            "
        >
            {codeSamplesStringsData.typescriptVignetteUnsortedLabel}
        </motion.span>
        <motion.span
            animate={fadeIn.animate}
            aria-hidden="true"
            style={{ color: "var(--lint-pass)" }}
            transition={fadeIn.transition}
            className="
                absolute
                top-2
                right-3
                font-medium
            "
        >
            {codeSamplesStringsData.typescriptVignetteSortedLabel}
        </motion.span>
        <div
            className="
                flex
                flex-col
                items-start
                leading-tight
            "
        >
            <span style={{ color: "var(--text-tertiary)" }}>{codeSamplesStringsData.typescriptInterfaceOpen}</span>
            <div className="grid">
                <motion.div
                    animate={fadeOut.animate}
                    transition={fadeOut.transition}
                    className="
                        col-start-1
                        row-start-1
                        flex
                        flex-col
                        items-start
                        pl-4
                    "
                >
                    {fieldsBefore.map(({
                        color,
                        name,
                    }) => (
                        <span
                            key={name}
                            style={{ color: color }}
                        >
                            {name}
                            {codeSamplesStringsData.typescriptPropertyTypeAnnotation}
                        </span>
                    ))}
                </motion.div>
                <motion.div
                    animate={fadeIn.animate}
                    transition={fadeIn.transition}
                    className="
                        col-start-1
                        row-start-1
                        flex
                        flex-col
                        items-start
                        pl-4
                    "
                >
                    {fieldsAfter.map(({
                        color,
                        name,
                    }) => (
                        <span
                            key={name}
                            style={{ color: color }}
                        >
                            {name}
                            {codeSamplesStringsData.typescriptPropertyTypeAnnotation}
                        </span>
                    ))}
                </motion.div>
            </div>
            <span style={{ color: "var(--text-tertiary)" }}>{codeSamplesStringsData.typescriptInterfaceClose}</span>
        </div>
    </div>
);
