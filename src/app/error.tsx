"use client";

import { useEffect } from "react";

import { errorBoundaryStringsData, inputTypeValuesEnumsData } from "@/data";
import type { ErrorBoundaryPropsInterface } from "@/interfaces";

const ErrorBoundaryPage = ({
    error,
    reset,
}: ErrorBoundaryPropsInterface) => {
    const {
        digest,
        message,
        stack,
    } = error;

    const resetHandler = () => reset();

    const reloadHandler = () => {
        if (typeof window !== "undefined") window.location.href = errorBoundaryStringsData.homeUrl;
    };

    useEffect(
        () => console.error(
            errorBoundaryStringsData.consoleErrorPrefix,
            error,
        ),
        [error],
    );

    return (
        <div
            className="
                flex
                min-h-[calc(100vh-4rem)]
                flex-col
                items-center
                justify-center
                px-4
                py-12
            "
        >
            <div
                className="
                    w-full
                    max-w-2xl
                    rounded-xl
                    border
                    p-8
                "
                style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                }}
            >
                <div
                    className="
                        mb-6
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        style={{ backgroundColor: "oklch(0.55 0.22 25 / 0.15)" }}
                        className="
                            flex
                            size-12
                            items-center
                            justify-center
                            rounded-full
                        "
                    >
                        <svg
                            aria-hidden="true"
                            className="size-6"
                            fill="none"
                            stroke="oklch(0.55 0.22 25)"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1
                            className="text-xl font-bold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {errorBoundaryStringsData.title}
                        </h1>
                        <p
                            className="text-sm"
                            style={{ color: "var(--text-tertiary)" }}
                        >
                            {errorBoundaryStringsData.subtitle}
                        </p>
                    </div>
                </div>
                <div
                    className="
                        mb-6
                        rounded-lg
                        border
                        p-4
                    "
                    style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-primary)",
                    }}
                >
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mb-2
                            text-xs
                            font-semibold
                            tracking-wide
                            uppercase
                        "
                    >
                        {errorBoundaryStringsData.errorMessageLabel}
                    </p>
                    <p
                        className="font-mono text-sm break-words"
                        style={{ color: "var(--text-primary)" }}
                    >
                        {message || errorBoundaryStringsData.unknownError}
                    </p>
                    {digest && (
                        <p
                            className="mt-3 font-mono text-xs"
                            style={{ color: "var(--text-tertiary)" }}
                        >
                            {errorBoundaryStringsData.digestLabel}
                            {": "}
                            {digest}
                        </p>
                    )}
                    {stack && (
                        <details className="mt-3">
                            <summary
                                className="cursor-pointer text-xs font-semibold"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {errorBoundaryStringsData.stackTraceLabel}
                            </summary>
                            <pre
                                className="
                                    mt-2
                                    overflow-x-auto
                                    rounded
                                    p-3
                                    font-mono
                                    text-xs
                                    leading-relaxed
                                "
                                style={{
                                    backgroundColor: "var(--bg-secondary)",
                                    color: "var(--text-tertiary)",
                                }}
                            >
                                {stack}
                            </pre>
                        </details>
                    )}
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        type={inputTypeValuesEnumsData.button}
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
                        onClick={resetHandler}
                    >
                        {errorBoundaryStringsData.ctaTryAgain}
                    </button>
                    <button
                        type={inputTypeValuesEnumsData.button}
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
                        onClick={reloadHandler}
                    >
                        {errorBoundaryStringsData.ctaGoHome}
                    </button>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line import-x/no-default-export
export default ErrorBoundaryPage;
