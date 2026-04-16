"use client";

import { motion } from "motion/react";

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
        <div
            className="
                flex
                flex-col
                items-start
                gap-0
                leading-tight
            "
        >
            <span style={{ color: "var(--text-tertiary)" }}>interface User &#123;</span>
            <motion.div
                animate={{
                    opacity: [
                        1,
                        1,
                        0,
                        0,
                    ],
                }}
                className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    pl-4
                "
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [
                        0,
                        0.4,
                        0.5,
                        1,
                    ],
                }}
            >
                {fieldsBefore.map(({
                    color,
                    name,
                }) => (
                    <div
                        key={name}
                        style={{ color: color }}
                    >
                        {name}
                        : string;
                    </div>
                ))}
            </motion.div>
            <motion.div
                animate={{
                    opacity: [
                        0,
                        0,
                        1,
                        1,
                    ],
                }}
                className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    pl-4
                "
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [
                        0,
                        0.5,
                        0.6,
                        1,
                    ],
                }}
            >
                {fieldsAfter.map(({
                    color,
                    name,
                }) => (
                    <div
                        key={name}
                        style={{ color: color }}
                    >
                        {name}
                        : string;
                    </div>
                ))}
            </motion.div>
            <span
                className="mt-12"
                style={{ color: "var(--text-tertiary)" }}
            >
                &#125;
            </span>
        </div>
    </div>
);
