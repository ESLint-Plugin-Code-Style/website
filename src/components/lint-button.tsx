import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { joinClassesHandler } from "@/lib";
import type { LintButtonPropsType } from "@/types";

const sizeClass = {
    lg: "px-6 py-3 text-base",
    md: "px-5 py-2.5 text-sm",
    sm: "px-4 py-2 text-xs",
};

const toneClass = {
    ghost: "bg-transparent border-transparent",
    primary: "",
    secondary: "",
};

export const LintButton = ({
    children,
    className,
    size,
    tone,
    ...rest
}: LintButtonPropsType) => {
    const resolvedSize = size ?? "md";

    const resolvedTone = tone ?? "primary";

    const style = resolvedTone === "primary"
        ? {
            backgroundColor: "var(--text-primary)",
            borderColor: "var(--text-primary)",
            color: "var(--bg-primary)",
        }
        : resolvedTone === "secondary"
            ? {
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
            }
            : {
                backgroundColor: "transparent",
                borderColor: "transparent",
                color: "var(--text-primary)",
            };

    const sharedClass = joinClassesHandler(
        `
            group
            relative
            inline-flex
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-md
            border
            font-semibold
            transition-all
            duration-200
            hover:-translate-y-0.5
        `,
        sizeClass[resolvedSize],
        toneClass[resolvedTone],
        className,
    );

    const inner = (
        <>
            <span
                className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-2
                "
            >
                {children}
            </span>
            <svg
                aria-hidden="true"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 4"
                xmlns="http://www.w3.org/2000/svg"
                className="
                    pointer-events-none
                    absolute
                    inset-x-2
                    bottom-1
                    z-0
                    h-1
                    opacity-0
                    transition-opacity
                    duration-200
                    group-hover:opacity-100
                "
            >
                <path
                    className="lint-underline-error"
                    d="M0 2 Q5 0 10 2 T20 2 T30 2 T40 2 T50 2 T60 2 T70 2 T80 2 T90 2 T100 2"
                    fill="none"
                    stroke="var(--lint-error)"
                    strokeWidth="1.4"
                />
                <path
                    className="lint-underline-pass"
                    d="M2 2 L10 3 L18 1 L26 2 L34 3 L42 1 L50 2 L58 3 L66 1 L74 2 L82 3 L90 1 L98 2"
                    fill="none"
                    stroke="var(--lint-pass)"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                />
            </svg>
        </>
    );

    if ("href" in rest && rest.href !== undefined) {
        const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

        return (
            <Link
                {...anchorProps}
                className={sharedClass}
                style={style}
            >
                {inner}
            </Link>
        );
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
        <button
            {...buttonProps}
            className={sharedClass}
            style={style}
            type={buttonProps.type ?? "button"}
        >
            {inner}
        </button>
    );
};
