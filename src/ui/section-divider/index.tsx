import { redesignStringsData } from "@/data";
import { joinClassesHandler } from "@/lib";

export const SectionDivider = ({ className }: { className?: string }) => (
    <div
        aria-label={redesignStringsData.sectionDividerLabel}
        role="separator"
        className={joinClassesHandler(
            "mx-auto my-10 flex w-full max-w-5xl items-center gap-3 px-4",
            className,
        )}
    >
        <svg
            aria-hidden="true"
            className="h-3 flex-1"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 400 12"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 6 L10 2 L20 10 L30 2 L40 10 L50 2 L60 10 L70 2 L80 10 L90 2 L100 10 L110 2 L120 10 L130 2 L140 10 L150 2 L160 10 L170 2 L180 10 L190 2 L200 10 L210 2 L220 10 L230 2 L240 10 L250 2 L260 10 L270 2 L280 10 L290 2 L300 10 L310 2 L320 10 L330 2 L340 10 L350 2 L360 10 L370 2 L380 10 L390 2 L398 6"
                stroke="var(--border-primary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
            />
        </svg>
        <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--lint-warn)" }}
        />
        <svg
            aria-hidden="true"
            className="h-3 flex-1"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 400 12"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2 6 L10 10 L20 2 L30 10 L40 2 L50 10 L60 2 L70 10 L80 2 L90 10 L100 2 L110 10 L120 2 L130 10 L140 2 L150 10 L160 2 L170 10 L180 2 L190 10 L200 2 L210 10 L220 2 L230 10 L240 2 L250 10 L260 2 L270 10 L280 2 L290 10 L300 2 L310 10 L320 2 L330 10 L340 2 L350 10 L360 2 L370 10 L380 2 L390 10 L398 6"
                stroke="var(--border-primary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
            />
        </svg>
    </div>
);
