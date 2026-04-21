import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import {
    AnimatedCodeFixer,
    AutoFixVignette,
    Card,
    CodeBlock,
    ConfigsVignette,
    FlatConfigVignette,
    LintButton,
    MarkerHighlight,
    ReactVignette,
    SectionDivider,
    SquiggleIcon,
    TypescriptVignette,
    ZeroDepsVignette,
} from "@/components";
import {
    cardVariantValuesEnumsData,
    categoriesRulesData,
    codeFilenameValuesEnumsData,
    codeLanguageValuesEnumsData,
    codeSnippetStringsData,
    fixableRulesData,
    homeStringsData,
    lintAccentNameValuesEnumsData,
    lintButtonSizeValuesEnumsData,
    lintButtonToneValuesEnumsData,
    lintStatusValuesEnumsData,
    pluginConfigData,
    redesignStringsData,
    squiggleVariantValuesEnumsData,
    totalRulesData,
} from "@/data";
import { getLintAccentHandler } from "@/lib";
import type { LintAccentNameType } from "@/types";

export const metadata: Metadata = { title: homeStringsData.metadataTitle };

const gesturesData: {
    accent: LintAccentNameType,
    description: string,
    title: string,
    vignette: ReactNode,
}[] = [
    {
        accent: lintAccentNameValuesEnumsData.pass,
        description: homeStringsData.featureAutoFixDescription,
        title: homeStringsData.featureAutoFixTitle,
        vignette: <AutoFixVignette />,
    },
    {
        accent: lintAccentNameValuesEnumsData.info,
        description: homeStringsData.featureReactDescription,
        title: homeStringsData.featureReactTitle,
        vignette: <ReactVignette />,
    },
    {
        accent: lintAccentNameValuesEnumsData.violet,
        description: homeStringsData.featureFlatConfigDescription,
        title: homeStringsData.featureFlatConfigTitle,
        vignette: <FlatConfigVignette />,
    },
    {
        accent: lintAccentNameValuesEnumsData.error,
        description: homeStringsData.featureZeroDepsDescription,
        title: homeStringsData.featureZeroDepsTitle,
        vignette: <ZeroDepsVignette />,
    },
    {
        accent: lintAccentNameValuesEnumsData.warn,
        description: homeStringsData.featureTypeScriptDescription,
        title: homeStringsData.featureTypeScriptTitle,
        vignette: <TypescriptVignette />,
    },
    {
        accent: lintAccentNameValuesEnumsData.info,
        description: homeStringsData.featureConfigsDescription,
        title: homeStringsData.featureConfigsTitle,
        vignette: <ConfigsVignette />,
    },
];

const prettierComparisonsData = [
    {
        afterCode: homeStringsData.prettierComparison1After,
        beforeCode: homeStringsData.prettierComparison1Before,
        caption: homeStringsData.prettierComparison1Caption,
        language: codeLanguageValuesEnumsData.javascript,
        rule: homeStringsData.prettierComparison1Rule,
    },
    {
        afterCode: homeStringsData.prettierComparison2After,
        beforeCode: homeStringsData.prettierComparison2Before,
        caption: homeStringsData.prettierComparison2Caption,
        language: codeLanguageValuesEnumsData.js,
        rule: homeStringsData.prettierComparison2Rule,
    },
    {
        afterCode: homeStringsData.prettierComparison3After,
        beforeCode: homeStringsData.prettierComparison3Before,
        caption: homeStringsData.prettierComparison3Caption,
        language: codeLanguageValuesEnumsData.javascript,
        rule: homeStringsData.prettierComparison3Rule,
    },
];

const rulesIndexAccentCycleData: LintAccentNameType[] = [
    lintAccentNameValuesEnumsData.error,
    lintAccentNameValuesEnumsData.warn,
    lintAccentNameValuesEnumsData.pass,
    lintAccentNameValuesEnumsData.info,
    lintAccentNameValuesEnumsData.violet,
];

const quickStartStepAccentsData: LintAccentNameType[] = [
    lintAccentNameValuesEnumsData.error,
    lintAccentNameValuesEnumsData.warn,
    lintAccentNameValuesEnumsData.pass,
];

const eslintConfigCode = `import codeStyle from "eslint-plugin-code-style";

export default [
    codeStyle.configs.react,
];`;

const eslintConfigTsCode = `import codeStyle from "eslint-plugin-code-style";

export default [
    codeStyle.configs["react-ts"],
];`;

const heroInlineStats = `${totalRulesData} rules \u00b7 ${fixableRulesData} auto-fix \u00b7 zero deps`;

const HomePage = () => (
    <div className="animate-fade-in">
        <section
            aria-labelledby="hero-title"
            className="relative overflow-hidden"
        >
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    grid
                    max-w-6xl
                    gap-12
                    px-4
                    pt-16
                    pb-20
                    sm:px-6
                    lg:grid-cols-[1.05fr_1fr]
                    lg:items-center
                    lg:gap-16
                    lg:py-28
                "
            >
                <div className="relative">
                    <div
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mb-5
                            inline-flex
                            items-center
                            gap-2
                            font-mono
                            text-xs
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full"
                            style={{ backgroundColor: "var(--lint-pass)" }}
                        />
                        {homeStringsData.heroEyebrow}
                        <span
                            className="
                                ml-2
                                rounded-full
                                px-2
                                py-0.5
                            "
                            style={{
                                backgroundColor: "var(--bg-badge)",
                                color: "var(--text-secondary)",
                            }}
                        >
                            {homeStringsData.badge}
                        </span>
                    </div>
                    <h1
                        id="hero-title"
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-5
                            text-4xl
                            font-extrabold
                            tracking-tight
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        <span className="block">
                            <MarkerHighlight status={lintStatusValuesEnumsData.warn}>{homeStringsData.heroTitle}</MarkerHighlight>
                        </span>
                        <span
                            style={{ color: "var(--text-secondary)" }}
                            className="
                                block
                                font-mono
                                text-2xl
                                font-medium
                                sm:text-3xl
                                lg:text-4xl
                            "
                        >
                            {homeStringsData.heroTitleSuffix}
                        </span>
                        <span className="relative inline-block w-full">
                            <SquiggleIcon
                                className="-mt-1 h-2 w-1/2"
                                strokeWidth={1.8}
                                variant={squiggleVariantValuesEnumsData.fix}
                                isAnimate
                            />
                        </span>
                    </h1>
                    <div
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mb-6
                            flex
                            flex-col
                            gap-1
                            text-sm
                        "
                    >
                        <span
                            className="line-through"
                            style={{ color: "var(--lint-error)" }}
                        >
                            {homeStringsData.heroCrossedOut}
                        </span>
                        <span
                            className="handwritten text-xl"
                            style={{ color: "var(--lint-pass)" }}
                        >
                            {`\u21b3 ${homeStringsData.heroCorrection}`}
                        </span>
                    </div>
                    <p
                        style={{ color: "var(--text-secondary)" }}
                        className="
                            mb-3
                            max-w-xl
                            text-lg
                            leading-relaxed
                        "
                    >
                        {homeStringsData.heroSubtitle}
                    </p>
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mb-8
                            font-mono
                            text-xs
                            tracking-wide
                        "
                    >
                        {heroInlineStats}
                    </p>
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-4
                        "
                    >
                        <LintButton
                            href="/docs/rules"
                            size={lintButtonSizeValuesEnumsData.lg}
                            tone={lintButtonToneValuesEnumsData.primary}
                        >
                            {homeStringsData.ctaViewRules}
                            <span aria-hidden="true">→</span>
                        </LintButton>
                        <LintButton
                            href="/docs/getting-started"
                            size={lintButtonSizeValuesEnumsData.lg}
                            tone={lintButtonToneValuesEnumsData.ghost}
                        >
                            {homeStringsData.ctaGetStarted}
                        </LintButton>
                        <a
                            href={pluginConfigData.githubUrl}
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-tertiary)" }}
                            target="_blank"
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-md
                                px-1.5
                                py-1
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                hover:text-[color:var(--text-primary)]
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[color:var(--border-active)]
                            "
                        >
                            <svg
                                aria-hidden="true"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            {homeStringsData.ctaGitHub}
                        </a>
                    </div>
                </div>
                <div className="relative">
                    <div
                        style={{ transform: "rotate(-8deg)" }}
                        className="
                            absolute
                            -top-6
                            -left-6
                            z-20
                            hidden
                            md:block
                        "
                    >
                        <span
                            className="
                                handwritten
                                rounded-md
                                px-2.5
                                py-1
                                text-lg
                            "
                            style={{
                                backgroundColor: "var(--lint-warn-bg)",
                                color: "var(--lint-warn)",
                            }}
                        >
                            {redesignStringsData.heroAnnotation}
                        </span>
                    </div>
                    <AnimatedCodeFixer />
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mt-3
                            text-right
                            font-mono
                            text-xs
                        "
                    >
                        {homeStringsData.heroDemoFooter}
                    </p>
                </div>
            </div>
        </section>
        <section
            aria-label={homeStringsData.thesisKicker}
            className="relative"
        >
            <div
                className="
                    mx-auto
                    grid
                    max-w-6xl
                    gap-12
                    px-4
                    py-20
                    sm:px-6
                    lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]
                    lg:items-center
                    lg:gap-20
                    lg:py-28
                "
            >
                <div>
                    <p
                        className="handwritten mb-4 text-2xl"
                        style={{
                            color: "var(--lint-warn)",
                            display: "inline-block",
                            transform: "rotate(-1.5deg)",
                        }}
                    >
                        {homeStringsData.thesisKicker}
                    </p>
                    <p
                        className="max-w-[60ch] text-lg leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.thesisParagraph}
                    </p>
                </div>
                <Card
                    className="relative"
                    variant={cardVariantValuesEnumsData.tab}
                >
                    <blockquote
                        className="text-xl leading-snug font-semibold"
                        style={{ color: "var(--text-primary)" }}
                    >
                        <span
                            aria-hidden="true"
                            style={{ color: "var(--lint-info)" }}
                            className="
                                mr-1
                                font-mono
                                text-3xl
                                leading-none
                            "
                        >
                            {"\u201C"}
                        </span>
                        {homeStringsData.thesisPullQuote}
                    </blockquote>
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mt-4
                            font-mono
                            text-xs
                            tracking-wide
                            uppercase
                        "
                    >
                        {homeStringsData.thesisByline}
                    </p>
                </Card>
            </div>
        </section>
        <SectionDivider />
        <section
            aria-labelledby="prettier-title"
            className="relative"
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-12 max-w-2xl">
                    <p
                        className="handwritten mb-3 text-2xl"
                        style={{
                            color: "var(--accent-violet)",
                            display: "inline-block",
                            transform: "rotate(-1deg)",
                        }}
                    >
                        {homeStringsData.prettierKicker}
                    </p>
                    <h2
                        id="prettier-title"
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-4
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {homeStringsData.prettierSectionTitle}
                    </h2>
                    <p
                        className="max-w-[60ch] text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.prettierIntro}
                    </p>
                </div>
                <div className="flex flex-col gap-10">
                    {prettierComparisonsData.map(({
                        afterCode,
                        beforeCode,
                        caption,
                        language,
                        rule,
                    }) => (
                        <div key={rule}>
                            <div
                                className="
                                    grid
                                    gap-4
                                    lg:grid-cols-2
                                    lg:gap-6
                                "
                            >
                                <div>
                                    <p
                                        style={{ color: "var(--text-tertiary)" }}
                                        className="
                                            mb-2
                                            font-mono
                                            text-[11px]
                                            tracking-widest
                                            uppercase
                                        "
                                    >
                                        {homeStringsData.prettierBeforeLabel}
                                    </p>
                                    <CodeBlock
                                        code={beforeCode}
                                        language={language}
                                    />
                                </div>
                                <div>
                                    <p
                                        style={{ color: "var(--lint-pass)" }}
                                        className="
                                            mb-2
                                            font-mono
                                            text-[11px]
                                            tracking-widest
                                            uppercase
                                        "
                                    >
                                        {homeStringsData.prettierAfterLabel}
                                    </p>
                                    <CodeBlock
                                        code={afterCode}
                                        language={language}
                                    />
                                </div>
                            </div>
                            <p
                                className="mt-3 text-sm"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                <span
                                    className="font-medium"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    {caption}
                                </span>
                                {" \u00b7 "}
                                <code
                                    className="
                                        rounded
                                        px-1.5
                                        py-0.5
                                        font-mono
                                        text-xs
                                    "
                                    style={{
                                        backgroundColor: "var(--bg-code-inline)",
                                        color: "var(--text-code-inline)",
                                    }}
                                >
                                    {rule}
                                </code>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <Link
                        href="/docs/philosophy"
                        style={{ color: "var(--text-link)" }}
                        className="
                            inline-flex
                            items-center
                            gap-1
                            text-sm
                            font-semibold
                            transition-colors
                            duration-200
                            hover:text-[color:var(--text-link-hover)]
                            focus-visible:outline-2
                            focus-visible:outline-offset-4
                            focus-visible:outline-[color:var(--border-active)]
                        "
                    >
                        {homeStringsData.prettierSeeMoreLabel}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
        <section
            aria-labelledby="gestures-title"
            className="relative"
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-16 max-w-2xl">
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mb-2
                            font-mono
                            text-xs
                            tracking-widest
                            uppercase
                        "
                    >
                        {homeStringsData.gesturesEyebrow}
                    </p>
                    <h2
                        id="gestures-title"
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-4
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {homeStringsData.gesturesSectionTitle}
                    </h2>
                    <p
                        className="max-w-[60ch] text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.featuresSectionSubtitle}
                    </p>
                </div>
                <div
                    className="
                        flex
                        flex-col
                        gap-16
                        lg:gap-20
                    "
                >
                    {gesturesData.map((
                        {
                            accent,
                            description,
                            title,
                            vignette,
                        },
                        index,
                    ) => {
                        const accentTokens = getLintAccentHandler(accent);

                        const stepNumber = String(index + 1).padStart(
                            2,
                            "0",
                        );

                        const isVignetteRight = index % 2 === 1;

                        return (
                            <div
                                key={title}
                                className="
                                    grid
                                    gap-8
                                    lg:grid-cols-[1fr_1fr]
                                    lg:items-center
                                    lg:gap-16
                                "
                            >
                                <div className={isVignetteRight ? "lg:order-2" : ""}>{vignette}</div>
                                <div>
                                    <p
                                        style={{ color: accentTokens.color }}
                                        className="
                                            mb-3
                                            font-mono
                                            text-sm
                                            font-semibold
                                            tracking-widest
                                        "
                                    >
                                        {stepNumber}
                                    </p>
                                    <h3
                                        style={{ color: "var(--text-primary)" }}
                                        className="
                                            mb-3
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                        "
                                    >
                                        {title}
                                    </h3>
                                    <p
                                        className="max-w-[50ch] text-base leading-relaxed"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        {description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        <SectionDivider />
        <section
            aria-labelledby="rules-index-title"
            className="relative"
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-12 max-w-2xl">
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            mb-2
                            font-mono
                            text-xs
                            tracking-widest
                            uppercase
                        "
                    >
                        {homeStringsData.rulesIndexEyebrow}
                    </p>
                    <h2
                        id="rules-index-title"
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-4
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {homeStringsData.rulesIndexSectionTitle}
                    </h2>
                    <p
                        className="max-w-[60ch] text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.rulesIndexSectionSubtitle}
                    </p>
                </div>
                <ul
                    style={{ borderColor: "var(--border-secondary)" }}
                    className="
                        grid
                        grid-cols-1
                        gap-x-10
                        gap-y-1
                        border-t
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {categoriesRulesData.map((
                        {
                            name,
                            rules,
                            slug,
                        },
                        index,
                    ) => {
                        const accentName = rulesIndexAccentCycleData[index % rulesIndexAccentCycleData.length] as LintAccentNameType;

                        const accentTokens = getLintAccentHandler(accentName);

                        return (
                            <li
                                className="border-b"
                                key={slug}
                                style={{ borderColor: "var(--border-secondary)" }}
                            >
                                <Link
                                    href={`/docs/rules/${slug}`}
                                    className="
                                        group
                                        flex
                                        items-baseline
                                        justify-between
                                        gap-4
                                        py-4
                                        transition-transform
                                        duration-200
                                        hover:translate-x-1.5
                                        focus-visible:translate-x-1.5
                                        focus-visible:outline-2
                                        focus-visible:outline-offset-4
                                        focus-visible:outline-[color:var(--border-active)]
                                    "
                                >
                                    <span
                                        style={{ color: "var(--text-primary)" }}
                                        className="
                                            flex
                                            items-baseline
                                            gap-3
                                            font-mono
                                            text-base
                                            font-medium
                                            transition-colors
                                            duration-200
                                        "
                                    >
                                        <span
                                            aria-hidden="true"
                                            style={{ color: accentTokens.color }}
                                            className="
                                                opacity-0
                                                transition-opacity
                                                duration-200
                                                group-hover:opacity-100
                                                group-focus-visible:opacity-100
                                            "
                                        >
                                            {"\u203A"}
                                        </span>
                                        {name}
                                    </span>
                                    <span
                                        className="
                                            inline-flex
                                            min-w-7
                                            justify-center
                                            rounded-full
                                            px-2
                                            py-0.5
                                            font-mono
                                            text-xs
                                            font-semibold
                                        "
                                        style={{
                                            backgroundColor: accentTokens.background,
                                            color: accentTokens.color,
                                        }}
                                    >
                                        {rules.length}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
        <section
            aria-labelledby="quick-start-title"
            className="relative"
        >
            <div
                className="
                    mx-auto
                    max-w-5xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-12 max-w-2xl">
                    <h2
                        id="quick-start-title"
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-3
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {homeStringsData.quickStartSectionTitle}
                    </h2>
                    <p
                        className="max-w-[60ch] text-base leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.quickStartSectionSubtitle}
                    </p>
                    <p
                        className="handwritten mt-3 text-2xl"
                        style={{
                            color: "var(--lint-warn)",
                            display: "inline-block",
                            transform: "rotate(-2deg)",
                        }}
                    >
                        {`${homeStringsData.quickStartTip} \u2726`}
                    </p>
                </div>
                <div className="flex flex-col gap-10">
                    <div
                        className="
                            grid
                            gap-4
                            lg:grid-cols-[3rem_minmax(0,1fr)_minmax(10rem,14rem)]
                            lg:items-start
                            lg:gap-8
                        "
                    >
                        <span
                            aria-hidden="true"
                            style={{ color: getLintAccentHandler(quickStartStepAccentsData[0] as LintAccentNameType).color }}
                            className="
                                font-mono
                                text-3xl
                                leading-none
                                font-bold
                            "
                        >
                            {"01"}
                        </span>
                        <div>
                            <h3
                                className="mb-3 text-lg font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {homeStringsData.quickStartStepInstall}
                            </h3>
                            <CodeBlock
                                code={codeSnippetStringsData.installNpm}
                                filename={codeFilenameValuesEnumsData.terminal}
                                language={codeLanguageValuesEnumsData.bash}
                            />
                        </div>
                        <div className="hidden lg:block" />
                    </div>
                    <div
                        className="
                            grid
                            gap-4
                            lg:grid-cols-[3rem_minmax(0,1fr)_minmax(10rem,14rem)]
                            lg:items-start
                            lg:gap-8
                        "
                    >
                        <span
                            aria-hidden="true"
                            style={{ color: getLintAccentHandler(quickStartStepAccentsData[1] as LintAccentNameType).color }}
                            className="
                                font-mono
                                text-3xl
                                leading-none
                                font-bold
                            "
                        >
                            {"02"}
                        </span>
                        <div>
                            <h3
                                className="mb-3 text-lg font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {homeStringsData.quickStartStepConfigure}
                            </h3>
                            <CodeBlock
                                code={eslintConfigCode}
                                filename={codeFilenameValuesEnumsData.eslintConfig}
                                language={codeLanguageValuesEnumsData.js}
                            />
                            <p
                                className="mt-3 text-sm"
                                style={{ color: "var(--text-tertiary)" }}
                            >
                                {homeStringsData.quickStartTypeScriptHint}
                                <code
                                    className="
                                        rounded
                                        px-1.5
                                        py-0.5
                                        font-mono
                                        text-xs
                                    "
                                    style={{
                                        backgroundColor: "var(--bg-code-inline)",
                                        color: "var(--text-code-inline)",
                                    }}
                                >
                                    {homeStringsData.quickStartTypeScriptHintCode}
                                </code>
                                {homeStringsData.quickStartTypeScriptHintSuffix}
                            </p>
                            <div className="mt-2">
                                <CodeBlock
                                    code={eslintConfigTsCode}
                                    filename={codeFilenameValuesEnumsData.eslintConfig}
                                    language={codeLanguageValuesEnumsData.js}
                                />
                            </div>
                        </div>
                        <aside
                            className="
                                handwritten
                                hidden
                                max-w-[14rem]
                                pt-10
                                text-lg
                                leading-snug
                                lg:block
                            "
                            style={{
                                color: "var(--accent-violet)",
                                transform: "rotate(2deg)",
                            }}
                        >
                            {homeStringsData.quickStartTip}
                        </aside>
                    </div>
                    <div
                        className="
                            grid
                            gap-4
                            lg:grid-cols-[3rem_minmax(0,1fr)_minmax(10rem,14rem)]
                            lg:items-start
                            lg:gap-8
                        "
                    >
                        <span
                            aria-hidden="true"
                            style={{ color: getLintAccentHandler(quickStartStepAccentsData[2] as LintAccentNameType).color }}
                            className="
                                font-mono
                                text-3xl
                                leading-none
                                font-bold
                            "
                        >
                            {"03"}
                        </span>
                        <div>
                            <h3
                                className="mb-3 text-lg font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {homeStringsData.quickStartStepLint}
                            </h3>
                            <CodeBlock
                                code={codeSnippetStringsData.eslintFixCommand}
                                filename={codeFilenameValuesEnumsData.terminal}
                                language={codeLanguageValuesEnumsData.bash}
                            />
                        </div>
                        <div className="hidden lg:block" />
                    </div>
                </div>
                <div className="mt-12">
                    <LintButton
                        href="/docs/getting-started"
                        size={lintButtonSizeValuesEnumsData.lg}
                        tone={lintButtonToneValuesEnumsData.primary}
                    >
                        {homeStringsData.ctaInstallationGuide}
                        <span aria-hidden="true">→</span>
                    </LintButton>
                </div>
            </div>
        </section>
        <footer
            aria-label={homeStringsData.colophonMasthead}
            className="relative"
        >
            <div
                style={{ borderColor: "var(--border-secondary)" }}
                className="
                    mx-auto
                    flex
                    max-w-5xl
                    flex-col
                    gap-8
                    border-t
                    px-4
                    py-12
                    sm:px-6
                "
            >
                <div className="flex flex-col gap-4">
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            font-mono
                            text-xs
                            tracking-widest
                            uppercase
                        "
                    >
                        {`${homeStringsData.colophonEditionLabel} \u00b7 ${homeStringsData.badge}`}
                    </p>
                    <p
                        className="handwritten text-base leading-snug"
                        style={{
                            color: "var(--text-hand)",
                            display: "inline-block",
                            transform: "rotate(-1deg)",
                        }}
                    >
                        {homeStringsData.colophonImprint}
                    </p>
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-5
                        "
                    >
                        <a
                            href="https://github.com/ESLint-Plugin-Code-Style/website/blob/main/LICENSE"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                            className="
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                hover:text-[color:var(--text-primary)]
                                hover:underline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[color:var(--border-active)]
                            "
                        >
                            {homeStringsData.footerLicense}
                        </a>
                        <a
                            href="https://www.npmjs.com/package/eslint-plugin-code-style"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                            className="
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                hover:text-[color:var(--text-primary)]
                                hover:underline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[color:var(--border-active)]
                            "
                        >
                            {homeStringsData.footerNpm}
                        </a>
                        <a
                            href={pluginConfigData.githubUrl}
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                            className="
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                hover:text-[color:var(--text-primary)]
                                hover:underline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[color:var(--border-active)]
                            "
                        >
                            {homeStringsData.footerGitHub}
                        </a>
                        <Link
                            href="/docs/changelog"
                            style={{ color: "var(--text-secondary)" }}
                            className="
                                text-sm
                                font-medium
                                transition-colors
                                duration-200
                                hover:text-[color:var(--text-primary)]
                                hover:underline
                                focus-visible:outline-2
                                focus-visible:outline-offset-4
                                focus-visible:outline-[color:var(--border-active)]
                            "
                        >
                            {homeStringsData.footerChangelog}
                        </Link>
                    </div>
                    <p
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                    >
                        {homeStringsData.footerCopyright}
                    </p>
                </div>
            </div>
        </footer>
    </div>
);

export default HomePage;
