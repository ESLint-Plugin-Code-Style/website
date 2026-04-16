"use client";

import { motion } from "motion/react";

const satellites = [
    {
        delay: 0,
        x: -34,
        y: -18,
    },
    {
        delay: 0.1,
        x: 34,
        y: -18,
    },
    {
        delay: 0.2,
        x: -34,
        y: 18,
    },
    {
        delay: 0.3,
        x: 34,
        y: 18,
    },
    {
        delay: 0.4,
        x: 0,
        y: -28,
    },
    {
        delay: 0.5,
        x: 0,
        y: 28,
    },
];

export const ZeroDepsVignette = () => (
    <div
        style={{ backgroundColor: "var(--bg-code)" }}
        className="
            relative
            flex
            h-24
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-md
        "
    >
        <div className="relative">
            <motion.div
                animate={{
                    backgroundColor: [
                        "var(--accent-violet)",
                        "var(--accent-violet)",
                        "var(--lint-pass)",
                        "var(--lint-pass)",
                    ],
                    scale: [
                        1,
                        1,
                        1.2,
                        1.2,
                    ],
                }}
                className="
                    relative
                    z-10
                    flex
                    size-9
                    items-center
                    justify-center
                    rounded-full
                    font-mono
                    text-[10px]
                    font-bold
                    text-white
                "
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    times: [
                        0,
                        0.45,
                        0.65,
                        1,
                    ],
                }}
            >
                0
            </motion.div>
            {satellites.map((
                {
                    delay,
                    x,
                    y,
                },
                index,
            ) => (
                <motion.div
                    key={index}
                    style={{ backgroundColor: "var(--lint-error)" }}
                    animate={{
                        opacity: [
                            1,
                            1,
                            0,
                            0,
                        ],
                        x: [
                            x,
                            x,
                            0,
                            0,
                        ],
                        y: [
                            y,
                            y,
                            0,
                            0,
                        ],
                    }}
                    className="
                        absolute
                        top-1/2
                        left-1/2
                        size-3
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                    "
                    transition={{
                        delay: delay,
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [
                            0,
                            0.4,
                            0.55,
                            1,
                        ],
                    }}
                />
            ))}
        </div>
    </div>
);
