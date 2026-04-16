"use client";

import { motion } from "motion/react";

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
        <div className="flex flex-col gap-1.5">
            <div className="relative">
                <span>const</span>
                {" "}
                <span style={{ color: "var(--lint-warn)" }}>x</span>
                {" = "}
                <span style={{ color: "var(--lint-info)" }}>1</span>
                <motion.svg
                    aria-hidden="true"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 120 4"
                    xmlns="http://www.w3.org/2000/svg"
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
                        -bottom-1
                        left-0
                        h-1
                        w-full
                    "
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [
                            0,
                            0.45,
                            0.55,
                            1,
                        ],
                    }}
                >
                    <path
                        d="M0 2 Q6 0 12 2 T24 2 T36 2 T48 2 T60 2 T72 2 T84 2 T96 2 T108 2 T120 2"
                        stroke="var(--lint-error)"
                        strokeWidth="1.4"
                    />
                </motion.svg>
                <motion.span
                    aria-hidden="true"
                    className="absolute top-0 -right-6"
                    style={{ color: "var(--lint-pass)" }}
                    animate={{
                        opacity: [
                            0,
                            0,
                            1,
                            1,
                        ],
                    }}
                    transition={{
                        duration: 3,
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
                    ✓
                </motion.span>
            </div>
            <motion.div
                className="text-xs"
                style={{ color: "var(--lint-pass)" }}
                animate={{
                    opacity: [
                        0,
                        0,
                        1,
                        1,
                    ],
                }}
                transition={{
                    duration: 3,
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
                eslint --fix
            </motion.div>
        </div>
    </div>
);
