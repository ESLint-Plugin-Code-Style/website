"use client";

import { motion } from "motion/react";

export const FlatConfigVignette = () => (
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
                flex
                flex-col
                items-start
                gap-0
                leading-tight
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
            <span style={{ color: "var(--text-tertiary)" }}>{".eslintrc"}</span>
            <span>{"{ extends: ["}</span>
            <span className="pl-3">{"\"airbnb\","}</span>
            <span className="pl-3">{"\"prettier\""}</span>
            <span>{"] }"}</span>
        </motion.div>
        <motion.div
            animate={{
                opacity: [
                    0,
                    0,
                    1,
                    1,
                ],
                scale: [
                    0.7,
                    0.7,
                    1,
                    1,
                ],
            }}
            className="
                absolute
                flex
                flex-col
                items-start
                gap-0
                leading-tight
            "
            transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                times: [
                    0,
                    0.45,
                    0.6,
                    1,
                ],
            }}
        >
            <span style={{ color: "var(--text-tertiary)" }}>{"eslint.config.js"}</span>
            <span>{"export default ["}</span>
            <span
                style={{ color: "var(--lint-pass)" }}
                className="
                    inline-flex
                    items-center
                    gap-1
                    pl-3
                "
            >
                <span>{"codeStyle.configs.react,"}</span>
                <span aria-hidden="true">✓</span>
            </span>
            <span>{"]"}</span>
        </motion.div>
    </div>
);
