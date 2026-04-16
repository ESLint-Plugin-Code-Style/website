"use client";

import { motion } from "motion/react";

import { motionRepeatTypeValuesEnumsData } from "@/data";

const configs = [
    {
        color: "var(--lint-info)",
        name: "react",
    },
    {
        color: "var(--lint-pass)",
        name: "react-ts",
    },
    {
        color: "var(--lint-warn)",
        name: "react-tw",
    },
    {
        color: "var(--accent-violet)",
        name: "react-ts-tw",
    },
];

export const ConfigsVignette = () => (
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
        "
        style={{
            backgroundColor: "var(--bg-code)",
            color: "var(--text-code)",
        }}
    >
        <div className="flex flex-col gap-1">
            {configs.map((
                {
                    color,
                    name,
                },
                index,
            ) => (
                <motion.div
                    key={name}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    className="
                        flex
                        items-center
                        gap-2
                        font-mono
                        text-xs
                    "
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    transition={{
                        delay: index * 0.15,
                        duration: 0.4,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 2,
                        repeatType: motionRepeatTypeValuesEnumsData.mirror,
                    }}
                >
                    <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <span style={{ color: "var(--text-code)" }}>{name}</span>
                </motion.div>
            ))}
        </div>
    </div>
);
