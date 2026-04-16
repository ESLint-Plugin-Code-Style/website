"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const CountUp = ({
    duration,
    from,
    suffix,
    to,
}: {
    duration?: number,
    from?: number,
    suffix?: string,
    to: number,
}) => {
    const ref = useRef<HTMLSpanElement>(null);

    const [value, setValue] = useState(from ?? 0);

    const isInView = useInView(
        ref,
        {
            amount: 0.6,
            once: true,
        },
    );

    useEffect(
        () => {
            if (!isInView) return undefined;

            const controls = animate(
                from ?? 0,
                to,
                {
                    duration: duration ?? 1.6,
                    ease: "easeOut",
                    onUpdate: (latest) => setValue(Math.round(latest)),
                },
            );

            return () => controls.stop();
        },
        [
            duration,
            from,
            isInView,
            to,
        ],
    );

    return (
        <span ref={ref}>
            {value}
            {suffix ?? ""}
        </span>
    );
};
