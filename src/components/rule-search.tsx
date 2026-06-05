"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { categoriesRulesData, ruleSearchStringsData, scrollBehaviorValuesConstantsData } from "@/data";
import { ButtonTypeEnum, EventNameEnum, KeyboardKeyEnum } from "@/enums";
import type { SearchRuleEntryInterface } from "@/interfaces";
import { Input, MagnifierIcon } from "@/ui";

const searchIndexData: SearchRuleEntryInterface[] = categoriesRulesData.flatMap(({
    name: categoryName,
    rules,
    slug: categorySlug,
}) => rules.map(({
    description,
    isConfigurable,
    isFixable,
    name,
}) => ({
    category: categoryName,
    description: description,
    isConfigurable: isConfigurable,
    isFixable: isFixable,
    name: name,
    slug: categorySlug,
})));

const getMatchesHandler = (query: string): SearchRuleEntryInterface[] => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) return [];

    const scored: {
        entry: SearchRuleEntryInterface,
        score: number,
    }[] = [];

    for (const entry of searchIndexData) {
        const name = entry.name.toLowerCase();

        const description = entry.description.toLowerCase();

        const category = entry.category.toLowerCase();

        let score = -1;

        if (name.startsWith(trimmed)) score = 0;
        else if (name.includes(trimmed)) score = 1;
        else if (category.includes(trimmed)) score = 2;
        else if (description.includes(trimmed)) score = 3;

        if (score >= 0) {
            scored.push({
                entry: entry,
                score: score,
            });
        }
    }

    scored.sort((
        {
            entry: entryA,
            score: scoreA,
        },
        {
            entry: entryB,
            score: scoreB,
        },
    ) => scoreA - scoreB || entryA.name.localeCompare(entryB.name));

    return scored.map(({ entry }) => entry);
};

export const RuleSearch = ({
    isOpen,
    onClose,
    onOpen,
}: {
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [query, setQuery] = useState("");

    const [activeIndex, setActiveIndex] = useState(0);

    const router = useRouter();

    const pathname = usePathname();

    const results = useMemo(
        () => getMatchesHandler(query),
        [query],
    );

    const selectHandler = (slug: string, name: string) => {
        onClose();

        const target = `/docs/rules/${slug}`;

        if (pathname === target) {
            const element = document.getElementById(name);

            if (element) element.scrollIntoView({ behavior: scrollBehaviorValuesConstantsData.smooth });
        } else router.push(`${target}#${name}`);
    };

    useEffect(
        () => {
            if (isOpen) {
                inputRef.current?.focus();

                return;
            }

            setQuery("");

            setActiveIndex(0);
        },
        [isOpen],
    );

    useEffect(
        () => setActiveIndex(0),
        [query],
    );

    useEffect(
        () => {
            const processKeyHandler = (event: KeyboardEvent) => {
                const {
                    ctrlKey,
                    key,
                    metaKey,
                } = event;

                if (key === KeyboardKeyEnum.KEY_K && (metaKey || ctrlKey)) {
                    event.preventDefault();

                    if (isOpen) onClose();
                    else onOpen();

                    return;
                }

                if (!isOpen) return;

                if (key === KeyboardKeyEnum.ESCAPE) {
                    onClose();

                    return;
                }

                if (key === KeyboardKeyEnum.ARROW_DOWN) {
                    event.preventDefault();

                    setActiveIndex((previous) => Math.min(
                        previous + 1,
                        results.length - 1,
                    ));

                    return;
                }

                if (key === KeyboardKeyEnum.ARROW_UP) {
                    event.preventDefault();

                    setActiveIndex((previous) => Math.max(
                        previous - 1,
                        0,
                    ));

                    return;
                }

                if (key === KeyboardKeyEnum.ENTER) {
                    const match = results[activeIndex];

                    if (match) {
                        selectHandler(
                            match.slug,
                            match.name,
                        );
                    }
                }
            };

            document.addEventListener(
                EventNameEnum.KEYDOWN,
                processKeyHandler,
            );

            return () => document.removeEventListener(
                EventNameEnum.KEYDOWN,
                processKeyHandler,
            );
        },
        [
            activeIndex,
            isOpen,
            onClose,
            onOpen,
            results,
        ],
    );

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    animate={{ opacity: 1 }}
                    aria-label={ruleSearchStringsData.dialogAriaLabel}
                    aria-modal="true"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    role="dialog"
                    style={{ backgroundColor: "var(--overlay)" }}
                    transition={{ duration: 0.15 }}
                    className="
                        fixed
                        inset-0
                        z-[60]
                        flex
                        justify-center
                        px-4
                        pt-[12vh]
                    "
                    onClick={onClose}
                >
                    <motion.div
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="
                            flex
                            max-h-[70vh]
                            w-full
                            max-w-[640px]
                            flex-col
                            overflow-hidden
                            rounded-lg
                            border
                            shadow-xl
                        "
                        exit={{
                            opacity: 0,
                            y: -8,
                        }}
                        initial={{
                            opacity: 0,
                            y: -8,
                        }}
                        style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: "var(--border-primary)",
                        }}
                        transition={{
                            duration: 0.18,
                            ease: "easeOut",
                        }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            style={{ borderColor: "var(--border-primary)" }}
                            className="
                                flex
                                items-center
                                gap-3
                                border-b
                                px-4
                                py-3
                            "
                        >
                            <MagnifierIcon className="size-5 shrink-0" />
                            <Input
                                ariaLabel={ruleSearchStringsData.inputAriaLabel}
                                className="text-base"
                                inputRef={inputRef}
                                placeholder={ruleSearchStringsData.placeholder}
                                value={query}
                                onChange={({ target }) => setQuery(target.value)}
                            />
                        </div>
                        <div className="min-h-0 flex-1 overflow-y-auto">
                            {query.trim() === "" ? (
                                <div className="p-4">
                                    <p
                                        className="mb-3 text-sm"
                                        style={{ color: "var(--text-tertiary)" }}
                                    >
                                        {ruleSearchStringsData.emptyHint}
                                    </p>
                                    <p
                                        style={{ color: "var(--text-tertiary)" }}
                                        className="
                                            mb-2
                                            text-[11px]
                                            font-semibold
                                            tracking-widest
                                            uppercase
                                        "
                                    >
                                        {ruleSearchStringsData.browseLabel}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {categoriesRulesData.map(({
                                            name,
                                            slug,
                                        }) => (
                                            <Link
                                                href={`/docs/rules/${slug}`}
                                                key={slug}
                                                className="
                                                    rounded-full
                                                    px-3
                                                    py-1
                                                    text-xs
                                                    font-medium
                                                    transition-colors
                                                    duration-150
                                                "
                                                style={{
                                                    backgroundColor: "var(--bg-tertiary)",
                                                    color: "var(--text-secondary)",
                                                }}
                                                onClick={onClose}
                                            >
                                                {name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : results.length === 0 ? (
                                <div
                                    className="p-6 text-center text-sm"
                                    style={{ color: "var(--text-tertiary)" }}
                                >
                                    {ruleSearchStringsData.noResults}
                                </div>
                            ) : (
                                <ul
                                    aria-label={ruleSearchStringsData.resultsAriaLabel}
                                    role="listbox"
                                >
                                    {results.map((
                                        entry,
                                        index,
                                    ) => {
                                        const {
                                            category,
                                            description,
                                            isConfigurable,
                                            isFixable,
                                            name,
                                            slug,
                                        } = entry;

                                        const isActive = index === activeIndex;

                                        return (
                                            <li
                                                aria-selected={isActive}
                                                key={name}
                                                role="option"
                                            >
                                                <button
                                                    type={ButtonTypeEnum.BUTTON}
                                                    className="
                                                        flex
                                                        w-full
                                                        cursor-pointer
                                                        items-center
                                                        gap-3
                                                        border-b
                                                        px-4
                                                        py-3
                                                        text-left
                                                    "
                                                    style={{
                                                        backgroundColor: isActive ? "var(--bg-tertiary)" : "transparent",
                                                        borderColor: "var(--border-primary)",
                                                    }}
                                                    onMouseEnter={() => setActiveIndex(index)}
                                                    onClick={() => selectHandler(
                                                        slug,
                                                        name,
                                                    )}
                                                >
                                                    <span
                                                        className="
                                                            flex
                                                            min-w-0
                                                            flex-1
                                                            flex-col
                                                            gap-1
                                                        "
                                                    >
                                                        <span
                                                            className="
                                                                flex
                                                                flex-wrap
                                                                items-center
                                                                gap-2
                                                            "
                                                        >
                                                            <span
                                                                className="font-mono text-sm font-medium"
                                                                style={{ color: "var(--text-primary)" }}
                                                            >
                                                                {name}
                                                            </span>
                                                            <span
                                                                className="
                                                                    rounded-full
                                                                    px-2
                                                                    py-0.5
                                                                    text-[10px]
                                                                    font-medium
                                                                "
                                                                style={{
                                                                    backgroundColor: "var(--bg-badge)",
                                                                    color: "var(--text-badge)",
                                                                }}
                                                            >
                                                                {category}
                                                            </span>
                                                            {isFixable ? (
                                                                <span
                                                                    className="
                                                                        rounded-full
                                                                        px-2
                                                                        py-0.5
                                                                        text-[10px]
                                                                        font-medium
                                                                    "
                                                                    style={{
                                                                        backgroundColor: "var(--lint-pass-bg)",
                                                                        color: "var(--lint-pass)",
                                                                    }}
                                                                >
                                                                    {ruleSearchStringsData.badgeFixable}
                                                                </span>
                                                            ) : null}
                                                            {isConfigurable ? (
                                                                <span
                                                                    className="
                                                                        rounded-full
                                                                        px-2
                                                                        py-0.5
                                                                        text-[10px]
                                                                        font-medium
                                                                    "
                                                                    style={{
                                                                        backgroundColor: "var(--lint-info-bg)",
                                                                        color: "var(--lint-info)",
                                                                    }}
                                                                >
                                                                    {ruleSearchStringsData.badgeConfigurable}
                                                                </span>
                                                            ) : null}
                                                        </span>
                                                        <span
                                                            className="line-clamp-1 text-xs"
                                                            style={{ color: "var(--text-tertiary)" }}
                                                        >
                                                            {description}
                                                        </span>
                                                    </span>
                                                    <svg
                                                        aria-hidden="true"
                                                        className="size-4 shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        style={{ color: "var(--text-tertiary)" }}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M9 18l6-6-6-6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
