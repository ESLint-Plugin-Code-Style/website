import { redesignStringsData } from "@/data";
import { joinClassesHandler } from "@/lib";

export const SignedSticker = ({ className }: { className?: string }) => (
    <div
        aria-hidden="true"
        className={joinClassesHandler(
            "inline-flex flex-col items-start gap-0 leading-none",
            className,
        )}
        style={{
            color: "var(--text-hand)",
            transform: "rotate(-3deg)",
        }}
    >
        <span
            className="handwritten text-sm opacity-70"
            style={{ color: "var(--text-tertiary)" }}
        >
            {redesignStringsData.signedBy}
        </span>
        <span
            className="
                handwritten
                -mt-1
                text-2xl
                font-semibold
            "
        >
            {redesignStringsData.signedName}
        </span>
        <svg
            aria-hidden="true"
            className="-mt-1.5 h-2 w-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 180 10"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 6 Q40 2 90 5 Q140 8 177 4"
                stroke="var(--accent-violet)"
                strokeLinecap="round"
                strokeWidth="1.6"
            />
        </svg>
    </div>
);
