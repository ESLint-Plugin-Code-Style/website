"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { componentStringsData, constantsData } from "@/data";
import { EventNameEnum } from "@/enums";

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const pathname = usePathname();

    /*
     * On docs pages the purple sidebar FAB sits bottom-left below `lg`, so the
     * button is lifted above it there; everywhere else it stays near the corner.
     */
    const isDocs = pathname?.startsWith("/docs") ?? false;

    const scrollThreshold = 400;

    useEffect(
        () => {
            const checkScrollHandler = () => setIsVisible(window.scrollY > scrollThreshold);

            checkScrollHandler();

            window.addEventListener(
                EventNameEnum.SCROLL,
                checkScrollHandler,
                { passive: true },
            );

            return () => window.removeEventListener(
                EventNameEnum.SCROLL,
                checkScrollHandler,
            );
        },
        [],
    );

    return (
        <AnimatePresence>
            {isVisible ? (
                <motion.button
                    aria-label={componentStringsData.backToTopLabel}
                    transition={{ duration: 0.18 }}
                    whileHover={{ opacity: 1 }}
                    animate={{
                        opacity: 0.8,
                        scale: 1,
                    }}
                    className={`
                        fixed
                        left-4
                        z-40
                        flex
                        h-11
                        w-11
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-full
                        shadow-lg
                        lg:bottom-6
                        ${isDocs ? "bottom-20" : "bottom-6"}
                    `}
                    exit={{
                        opacity: 0,
                        scale: 0.8,
                    }}
                    initial={{
                        opacity: 0,
                        scale: 0.8,
                    }}
                    style={{
                        backgroundColor: "var(--text-primary)",
                        color: "var(--bg-primary)",
                    }}
                    onClick={() => window.scrollTo({
                        behavior: constantsData.scrollBehaviors.smooth,
                        top: 0,
                    })}
                >
                    <svg
                        aria-hidden="true"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 19V5M5 12l7-7 7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.button>
            ) : null}
        </AnimatePresence>
    );
};
