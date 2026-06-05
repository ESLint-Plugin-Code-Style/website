export const MagnifierIcon = ({ className }: { className?: string }) => (
    <svg
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
    >
        <circle
            cx="11"
            cy="11"
            r="7"
        />
        <path
            d="M21 21l-4.3-4.3"
            strokeLinecap="round"
        />
    </svg>
);
