import type { ReactNode } from "react";

import { CardAsEnum, CardVariantEnum } from "@/enums";
import { joinClassesHandler } from "@/lib";
import type { CardAsType, CardVariantType } from "@/types";

const classByVariant: Record<CardVariantType, string> = {
    notched: "card-notched",
    note: "card-note",
    tab: "card-tab",
};

const resolveClassHandler = (
    variant: CardVariantType,
    isRotateRight: boolean | undefined,
    className: string | undefined,
): string => joinClassesHandler(
    classByVariant[variant],
    isRotateRight && variant === CardVariantEnum.NOTE && "rotate-right",
    className,
);

export const Card = ({
    as,
    children,
    className,
    isRotateRight,
    variant,
}: {
    as?: CardAsType,
    children: ReactNode,
    className?: string,
    isRotateRight?: boolean,
    variant?: CardVariantType,
}) => {
    const resolvedVariant: CardVariantType = variant ?? CardVariantEnum.TAB;

    const resolvedAs: CardAsType = as ?? CardAsEnum.DIV;

    const resolvedClass = resolveClassHandler(
        resolvedVariant,
        isRotateRight,
        className,
    );

    if (resolvedAs === CardAsEnum.ARTICLE) return <article className={resolvedClass}>{children}</article>;

    if (resolvedAs === CardAsEnum.SECTION) return <section className={resolvedClass}>{children}</section>;

    return <div className={resolvedClass}>{children}</div>;
};
