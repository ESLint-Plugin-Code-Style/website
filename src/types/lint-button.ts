import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type LintButtonCommonPropsType = {
    children: ReactNode,
    className?: string,
    size?: "lg" | "md" | "sm",
    tone?: "ghost" | "primary" | "secondary",
};

type LintButtonAsAnchorPropsType = LintButtonCommonPropsType
    & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">
    & { href: string };

type LintButtonAsButtonPropsType = LintButtonCommonPropsType
    & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">
    & { href?: undefined };

export type LintButtonPropsType = LintButtonAsAnchorPropsType | LintButtonAsButtonPropsType;
