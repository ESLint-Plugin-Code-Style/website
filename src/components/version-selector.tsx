"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
    eventNameValuesEnumsData,
    inputTypeValuesEnumsData,
    keyboardKeyValuesEnumsData,
    pluginConfigData,
    releaseVersionsData,
    versionSelectorStringsData,
} from "@/data";

export const VersionSelector = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredVersions = releaseVersionsData.filter(({
        title,
        version,
    }) => {
        const matchesVersion = version.includes(searchQuery);

        const matchesTitle = title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;

        return matchesVersion || matchesTitle;
    });

    const toggleHandler = () => setIsOpen((prev) => !prev);

    const closeDropdownHandler = () => {
        setIsOpen(false);

        setSearchQuery("");
    };

    useEffect(
        () => {
            const clickOutsideHandler = (event: MouseEvent) => {
                const { target } = event;

                if (dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
                    setIsOpen(false);

                    setSearchQuery("");
                }
            };

            const escapeHandler = (event: KeyboardEvent) => {
                const { key } = event;

                if (key === keyboardKeyValuesEnumsData.escape) {
                    setIsOpen(false);

                    setSearchQuery("");
                }
            };

            document.addEventListener(
                eventNameValuesEnumsData.mousedown,
                clickOutsideHandler,
            );

            document.addEventListener(
                eventNameValuesEnumsData.keydown,
                escapeHandler,
            );

            return () => {
                document.removeEventListener(
                    eventNameValuesEnumsData.mousedown,
                    clickOutsideHandler,
                );

                document.removeEventListener(
                    eventNameValuesEnumsData.keydown,
                    escapeHandler,
                );
            };
        },
        [],
    );

    useEffect(
        () => {
            if (isOpen) inputRef.current?.focus();
        },
        [isOpen],
    );

    return (
        <div
            className="relative"
            ref={dropdownRef}
        >
            <button
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={versionSelectorStringsData.ariaLabel}
                type={inputTypeValuesEnumsData.button}
                className="
                    flex
                    cursor-pointer
                    items-center
                    gap-1.5
                    rounded-md
                    px-2
                    py-1
                    font-mono
                    text-xs
                    font-medium
                    transition-colors
                    duration-200
                "
                style={{
                    backgroundColor: "var(--bg-badge)",
                    color: "var(--text-badge)",
                }}
                onClick={toggleHandler}
            >
                {versionSelectorStringsData.versionPrefix}
                {pluginConfigData.version}
                <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className={`
                        size-3
                        transition-transform
                        duration-200
                        ${isOpen ? "rotate-180" : ""}
                    `}
                >
                    <path
                        d="M19 9l-7 7-7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <div
                    className="
                        absolute
                        right-0
                        z-50
                        mt-2
                        w-72
                        overflow-hidden
                        rounded-lg
                        border
                        shadow-lg
                    "
                    style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-primary)",
                    }}
                >
                    <div
                        className="border-b p-2"
                        style={{ borderColor: "var(--border-primary)" }}
                    >
                        <input
                            aria-label={versionSelectorStringsData.ariaLabelSearch}
                            placeholder={versionSelectorStringsData.searchPlaceholder}
                            ref={inputRef}
                            type={inputTypeValuesEnumsData.text}
                            value={searchQuery}
                            className="
                                w-full
                                rounded-md
                                border
                                bg-transparent
                                px-2
                                py-1.5
                                text-sm
                                outline-none
                                focus:ring-1
                            "
                            style={{
                                borderColor: "var(--border-primary)",
                                color: "var(--text-primary)",
                            }}
                            onChange={({ target }) => setSearchQuery(target.value)}
                        />
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                        {filteredVersions.length === 0 ? (
                            <div
                                className="p-4 text-center text-sm"
                                style={{ color: "var(--text-tertiary)" }}
                            >
                                {versionSelectorStringsData.noResults}
                            </div>
                        ) : (
                            <ul
                                aria-label={versionSelectorStringsData.ariaLabelList}
                                role="listbox"
                            >
                                {filteredVersions.map((release) => {
                                    const {
                                        date,
                                        title,
                                        version,
                                    } = release;

                                    const isCurrent = version === pluginConfigData.version;

                                    return (
                                        <li
                                            aria-selected={isCurrent}
                                            key={version}
                                            role="option"
                                        >
                                            <Link
                                                href={`/docs/changelog#v${version}`}
                                                style={{ borderColor: "var(--border-primary)" }}
                                                className="
                                                    block
                                                    border-b
                                                    px-3
                                                    py-2
                                                    text-sm
                                                    transition-colors
                                                    duration-150
                                                    hover:bg-[var(--bg-hover)]
                                                "
                                                onClick={closeDropdownHandler}
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-2
                                                    "
                                                >
                                                    <span
                                                        className="font-mono font-medium"
                                                        style={{ color: "var(--text-primary)" }}
                                                    >
                                                        {versionSelectorStringsData.versionPrefix}
                                                        {version}
                                                    </span>
                                                    {isCurrent && (
                                                        <span
                                                            className="
                                                                rounded-full
                                                                px-2
                                                                py-0.5
                                                                text-xs
                                                                font-medium
                                                            "
                                                            style={{
                                                                backgroundColor: "oklch(0.52 0.24 270 / 0.15)",
                                                                color: "oklch(0.52 0.24 270)",
                                                            }}
                                                        >
                                                            {versionSelectorStringsData.currentBadge}
                                                        </span>
                                                    )}
                                                </div>
                                                {title && (
                                                    <p
                                                        className="mt-0.5 line-clamp-1 text-xs"
                                                        style={{ color: "var(--text-tertiary)" }}
                                                    >
                                                        {title}
                                                    </p>
                                                )}
                                                <p
                                                    className="mt-0.5 text-xs"
                                                    style={{ color: "var(--text-tertiary)" }}
                                                >
                                                    {date}
                                                </p>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
