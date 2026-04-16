import { joinClassesHandler } from "@/lib";
import type { SquiggleVariantType } from "@/types";

const variantColors: Record<SquiggleVariantType, string> = {
    error: "var(--lint-error)",
    fix: "var(--lint-pass)",
};

export const Squiggle = ({
    className,
    isAnimate,
    strokeWidth,
    variant,
    width,
}: {
    className?: string,
    isAnimate?: boolean,
    strokeWidth?: number,
    variant: SquiggleVariantType,
    width?: number | string,
}) => (
    <svg
        aria-hidden="true"
        fill="none"
        height="8"
        preserveAspectRatio="none"
        viewBox="0 0 120 8"
        width={width ?? "100%"}
        xmlns="http://www.w3.org/2000/svg"
        className={joinClassesHandler(
            isAnimate && "squiggle-draw",
            className,
        )}
    >
        <path
            d="M2 5 Q8 1 14 5 T26 5 T38 5 T50 5 T62 5 T74 5 T86 5 T98 5 T118 5"
            stroke={variantColors[variant]}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth ?? 1.6}
        />
    </svg>
);
