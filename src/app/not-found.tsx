import type { Metadata } from "next";

import { LintButton } from "@/components";
import { lintButtonSizeValuesEnumsData, lintButtonToneValuesEnumsData, notFoundStringsData } from "@/data";

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
        <div
            className="mb-6 font-mono text-sm"
            style={{ color: "var(--text-tertiary)" }}
        >
            <span style={{ color: "var(--lint-error)" }}>{notFoundStringsData.errorLabel}</span>
            <span>{notFoundStringsData.errorMessage}</span>
        </div>
        <h1
            className="
                mb-4
                font-mono
                text-8xl
                font-bold
            "
            style={{
                color: "var(--lint-error)",
                lineHeight: "1.1",
            }}
        >
            {notFoundStringsData.title}
            <span
                aria-hidden="true"
                className="blinking-caret"
                style={{ color: "var(--lint-info)" }}
            />
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
            <LintButton
                href="/"
                size={lintButtonSizeValuesEnumsData.md}
                tone={lintButtonToneValuesEnumsData.primary}
            >
                {notFoundStringsData.ctaHome}
            </LintButton>
            <LintButton
                href="/docs"
                size={lintButtonSizeValuesEnumsData.md}
                tone={lintButtonToneValuesEnumsData.secondary}
            >
                {notFoundStringsData.ctaDocs}
            </LintButton>
        </div>
    </div>
);

export default NotFound;
