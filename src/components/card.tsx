import type { ReactNode } from "react";

import { cardAsValuesEnumsData, cardVariantValuesEnumsData } from "@/data";
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
    isRotateRight && variant === cardVariantValuesEnumsData.note && "rotate-right",
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
    const resolvedVariant: CardVariantType = variant ?? cardVariantValuesEnumsData.tab;

    const resolvedAs: CardAsType = as ?? cardAsValuesEnumsData.div;

    const resolvedClass = resolveClassHandler(
        resolvedVariant,
        isRotateRight,
        className,
    );

    if (resolvedAs === cardAsValuesEnumsData.article) return <article className={resolvedClass}>{children}</article>;

    if (resolvedAs === cardAsValuesEnumsData.section) return <section className={resolvedClass}>{children}</section>;

    return <div className={resolvedClass}>{children}</div>;
};
