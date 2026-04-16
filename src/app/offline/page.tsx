import type { Metadata } from "next";

import { offlinePageStringsData } from "@/data";

export const metadata: Metadata = { title: offlinePageStringsData.metadataTitle };

const OfflinePage = () => (
    <div
        className="
            flex
            min-h-[calc(100vh-4rem)]
            flex-col
            items-center
            justify-center
            px-4
            text-center
        "
    >
        <div
            style={{ backgroundColor: "var(--bg-secondary)" }}
            className="
                mb-6
                flex
                size-20
                items-center
                justify-center
                rounded-full
            "
        >
            <svg
                aria-hidden="true"
                className="size-10"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
        <h1
            style={{ color: "var(--text-primary)" }}
            className="
                mb-3
                font-mono
                text-3xl
                font-bold
            "
        >
            {offlinePageStringsData.title}
            <span
                aria-hidden="true"
                className="blinking-caret"
                style={{ color: "var(--lint-warn)" }}
            />
        </h1>
        <p
            className="mb-8 max-w-md text-base"
            style={{ color: "var(--text-secondary)" }}
        >
            {offlinePageStringsData.description}
        </p>
    </div>
);

// eslint-disable-next-line import-x/no-default-export
export default OfflinePage;
