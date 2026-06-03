import { joinClassesHandler } from "@/lib";
import type { SvgWidthType } from "@/types";

/*
 * Animated brand mark: a red lint squiggle draws in, fades, a clean green
 * line draws over it, then a check pops — the "lint to auto-fix" story, looping.
 * No letters. Pure-CSS (keyframes in globals.css), freezes to the fixed
 * end-frame under prefers-reduced-motion.
 */
export const BrandMarkIcon = ({
    className,
    width,
}: {
    className?: string,
    width?: SvgWidthType,
}) => (
    <svg
        aria-hidden="true"
        fill="none"
        height="18"
        viewBox="0 0 28 18"
        width={width ?? 28}
        xmlns="http://www.w3.org/2000/svg"
        className={joinClassesHandler(
            "brand-mark",
            className,
        )}
    >
        <path
            className="brand-mark-squiggle"
            d="M3 11 Q6 7 9 11 T15 11 T21 11 T25 11"
            stroke="var(--lint-error)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <path
            className="brand-mark-line"
            d="M3 11 H25"
            stroke="var(--lint-pass)"
            strokeLinecap="round"
            strokeWidth="2"
        />
        <path
            className="brand-mark-check"
            d="M11 10.5 l3 3 l6.5 -8"
            stroke="var(--lint-pass)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);
