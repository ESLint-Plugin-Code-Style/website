"use client";

import { motion } from "motion/react";

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
            <span style={{ color: "var(--lint-info)" }}>{"<Card>"}</span>
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
                {"<Header />"}
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
                {"<Body />"}
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
                {"<Footer />"}
            </motion.span>
            <span style={{ color: "var(--lint-info)" }}>{"</Card>"}</span>
        </div>
    </div>
);
