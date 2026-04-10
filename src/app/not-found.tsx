import type { Metadata } from "next";
import Link from "next/link";

import { notFoundStringsData } from "@/data";

export const metadata: Metadata = { title: notFoundStringsData.metadataTitle };

const NotFound = () => (
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
        <h1
            style={{ lineHeight: "1.1" }}
            className="
                gradient-text
                mb-4
                text-8xl
                font-bold
            "
        >
            {notFoundStringsData.title}
        </h1>
        <h2
            className="mb-4 text-2xl font-semibold"
            style={{ color: "var(--text-primary)" }}
        >
            {notFoundStringsData.heading}
        </h2>
        <p
            className="mb-8 max-w-md text-base"
            style={{ color: "var(--text-secondary)" }}
        >
            {notFoundStringsData.description}
        </p>
        <div
            className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
            "
        >
            <Link
                href="/"
                className="
                    rounded-lg
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                "
                style={{
                    backgroundColor: "var(--bg-button-primary)",
                    color: "var(--text-button-primary)",
                }}
            >
                {notFoundStringsData.ctaHome}
            </Link>
            <Link
                href="/docs"
                className="
                    rounded-lg
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                "
                style={{
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                }}
            >
                {notFoundStringsData.ctaDocs}
            </Link>
        </div>
    </div>
);

// eslint-disable-next-line import-x/no-default-export
export default NotFound;
