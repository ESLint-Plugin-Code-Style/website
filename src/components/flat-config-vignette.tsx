"use client";

import { motion } from "motion/react";

import { codeSamplesStringsData } from "@/data";

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
            <span style={{ color: "var(--text-tertiary)" }}>{codeSamplesStringsData.flatConfigEslintRcFilename}</span>
            <span>{codeSamplesStringsData.flatConfigEslintRcExtends}</span>
            <span className="pl-3">{codeSamplesStringsData.flatConfigEslintRcAirbnb}</span>
            <span className="pl-3">{codeSamplesStringsData.flatConfigEslintRcPrettier}</span>
            <span>{codeSamplesStringsData.flatConfigEslintRcSuffix}</span>
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
            <span style={{ color: "var(--text-tertiary)" }}>{codeSamplesStringsData.flatConfigModernFilename}</span>
            <span>{codeSamplesStringsData.flatConfigModernArrayOpen}</span>
            <span
                style={{ color: "var(--lint-pass)" }}
                className="
                    inline-flex
                    items-center
                    gap-1
                    pl-3
                "
            >
                <span>{codeSamplesStringsData.flatConfigModernPreset}</span>
                <span aria-hidden="true">✓</span>
            </span>
            <span>{codeSamplesStringsData.flatConfigModernArrayClose}</span>
        </motion.div>
    </div>
);
