import type { ReactNode } from "react";

import { cardVariantValuesEnumsData } from "@/data";
import { joinClassesHandler } from "@/lib";
import type { CardVariantType } from "@/types";

const classByVariant: Record<CardVariantType, string> = {
    notched: "card-notched",
    note: "card-note",
    tab: "card-tab",
};

export const Card = ({
    as,
    children,
    className,
    isRotateRight,
    variant,
}: {
    as?: "article" | "div" | "section",
    children: ReactNode,
    className?: string,
    isRotateRight?: boolean,
    variant?: CardVariantType,
}) => {
    const resolvedVariant: CardVariantType = variant ?? cardVariantValuesEnumsData.tab;

    const Tag = (as ?? "div") as "article" | "div" | "section"; // eslint-disable-line code-style/variable-naming-convention

    return (
        <Tag
            className={joinClassesHandler(
                classByVariant[resolvedVariant],
                isRotateRight && resolvedVariant === cardVariantValuesEnumsData.note && "rotate-right",
                className,
            )}
        >
            {children}
        </Tag>
    );
};
