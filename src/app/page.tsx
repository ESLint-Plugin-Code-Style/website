import type { Metadata } from "next";
import Link from "next/link";

import {
    AnimatedCodeFixer,
    AutoFixVignette,
    Card,
    CodeBlock,
    ConfigsVignette,
    CountUp,
    FlatConfigVignette,
    LintButton,
    MarkerHighlight,
    ReactVignette,
    SectionDivider,
    SignedSticker,
    SquiggleIcon,
    TypescriptVignette,
    ZeroDepsVignette,
} from "@/components";
import {
    cardVariantValuesEnumsData,
    codeFilenameValuesEnumsData,
    codeLanguageValuesEnumsData,
    codeSnippetStringsData,
    homeStringsData,
    lintButtonSizeValuesEnumsData,
    lintButtonToneValuesEnumsData,
    lintStatusValuesEnumsData,
    redesignStringsData,
    squiggleVariantValuesEnumsData,
} from "@/data";

export const metadata: Metadata = { title: homeStringsData.metadataTitle };

const categories = [
    {
        accent: "var(--lint-error)",
        count: 3,
        name: "Arrays",
        slug: "arrays",
    },
    {
        accent: "var(--lint-warn)",
        count: 4,
        name: "Arrow Functions",
        slug: "arrow-functions",
    },
    {
        accent: "var(--lint-pass)",
        count: 7,
        name: "Call Expressions",
        slug: "call-expressions",
    },
    {
        accent: "var(--lint-info)",
        count: 2,
        name: "Classes",
        slug: "classes",
    },
    {
        accent: "var(--accent-violet)",
        count: 1,
        name: "Comments",
        slug: "comments",
    },
    {
        accent: "var(--lint-error)",
        count: 6,
        name: "Components",
        slug: "components",
    },
    {
        accent: "var(--lint-warn)",
        count: 9,
        name: "Control Flow",
        slug: "control-flow",
    },
    {
        accent: "var(--lint-pass)",
        count: 6,
        name: "Functions",
        slug: "functions",
    },
    {
        accent: "var(--lint-info)",
        count: 5,
        name: "Hooks",
        slug: "hooks",
    },
    {
        accent: "var(--accent-violet)",
        count: 9,
        name: "Imports & Exports",
        slug: "imports-exports",
    },
    {
        accent: "var(--lint-error)",
        count: 13,
        name: "JSX",
        slug: "jsx",
    },
    {
        accent: "var(--lint-warn)",
        count: 5,
        name: "Objects",
        slug: "objects",
    },
    {
        accent: "var(--lint-pass)",
        count: 1,
        name: "React",
        slug: "react",
    },
    {
        accent: "var(--lint-info)",
        count: 2,
        name: "Spacing",
        slug: "spacing",
    },
    {
        accent: "var(--accent-violet)",
        count: 1,
        name: "Strings",
        slug: "strings",
    },
    {
        accent: "var(--lint-error)",
        count: 9,
        name: "TypeScript",
        slug: "typescript",
    },
    {
        accent: "var(--lint-warn)",
        count: 1,
        name: "Variables",
        slug: "variables",
    },
];

const stats = [
    {
        label: homeStringsData.statsRules,
        value: parseInt(
            homeStringsData.statsRulesValue,
            10,
        ),
    },
    {
        label: homeStringsData.statsAutoFixable,
        value: parseInt(
            homeStringsData.statsAutoFixableValue,
            10,
        ),
    },
    {
        label: homeStringsData.statsConfigurable,
        value: parseInt(
            homeStringsData.statsConfigurableValue,
            10,
        ),
    },
    {
        label: homeStringsData.statsCategories,
        value: parseInt(
            homeStringsData.statsCategoriesValue,
            10,
        ),
    },
];

const features = [
    {
        accent: "var(--lint-pass)",
        description: homeStringsData.featureAutoFixDescription,
        renderVignette: () => <AutoFixVignette />,
        title: homeStringsData.featureAutoFixTitle,
    },
    {
        accent: "var(--lint-info)",
        description: homeStringsData.featureReactDescription,
        renderVignette: () => <ReactVignette />,
        title: homeStringsData.featureReactTitle,
    },
    {
        accent: "var(--accent-violet)",
        description: homeStringsData.featureFlatConfigDescription,
        renderVignette: () => <FlatConfigVignette />,
        title: homeStringsData.featureFlatConfigTitle,
    },
    {
        accent: "var(--lint-error)",
        description: homeStringsData.featureZeroDepsDescription,
        renderVignette: () => <ZeroDepsVignette />,
        title: homeStringsData.featureZeroDepsTitle,
    },
    {
        accent: "var(--lint-warn)",
        description: homeStringsData.featureTypeScriptDescription,
        renderVignette: () => <TypescriptVignette />,
        title: homeStringsData.featureTypeScriptTitle,
    },
    {
        accent: "var(--lint-info)",
        description: homeStringsData.featureConfigsDescription,
        renderVignette: () => <ConfigsVignette />,
        title: homeStringsData.featureConfigsTitle,
    },
];

const eslintConfigCode = `import codeStyle from "eslint-plugin-code-style";

export default [
    codeStyle.configs.react,
];`;

const eslintConfigTsCode = `import codeStyle from "eslint-plugin-code-style";

export default [
    codeStyle.configs["react-ts"],
];`;

const HomePage = () => (
    <div className="animate-fade-in">
        <section className="relative overflow-hidden">
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
                            {`↳ ${homeStringsData.heroCorrection}`}
                        </span>
                    </div>
                    <p
                        style={{ color: "var(--text-secondary)" }}
                        className="
                            mb-8
                            max-w-xl
                            text-lg
                            leading-relaxed
                        "
                    >
                        {homeStringsData.heroSubtitle}
                    </p>
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                        "
                    >
                        <LintButton
                            href="/docs/getting-started"
                            size={lintButtonSizeValuesEnumsData.lg}
                            tone={lintButtonToneValuesEnumsData.primary}
                        >
                            {homeStringsData.ctaGetStarted}
                            <span aria-hidden="true">→</span>
                        </LintButton>
                        <LintButton
                            href="/docs/rules"
                            size={lintButtonSizeValuesEnumsData.lg}
                            tone={lintButtonToneValuesEnumsData.secondary}
                        >
                            {homeStringsData.ctaViewRules}
                        </LintButton>
                        <a
                            href="https://github.com/ESLint-Plugin-Code-Style/plugin"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-md
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                transition-colors
                                duration-200
                                hover:opacity-80
                            "
                        >
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
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
        <SectionDivider />
        <section className="relative">
            <div
                className="
                    mx-auto
                    max-w-5xl
                    px-4
                    py-16
                    sm:px-6
                "
            >
                <p
                    style={{ color: "var(--text-tertiary)" }}
                    className="
                        mb-6
                        text-center
                        font-mono
                        text-xs
                        tracking-widest
                        uppercase
                    "
                >
                    {homeStringsData.statsEyebrow}
                </p>
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-6
                        sm:grid-cols-4
                    "
                >
                    {stats.map(({
                        label,
                        value,
                    }) => (
                        <Card
                            className="text-center"
                            key={label}
                            variant={cardVariantValuesEnumsData.tab}
                        >
                            <div
                                className="font-mono text-4xl font-extrabold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                <CountUp to={value} />
                            </div>
                            <div
                                style={{ color: "var(--text-secondary)" }}
                                className="
                                    mt-1
                                    text-xs
                                    font-medium
                                    tracking-wide
                                    uppercase
                                "
                            >
                                {label}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        <SectionDivider />
        <section className="relative">
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-10 text-center">
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
                        {homeStringsData.featuresEyebrow}
                    </p>
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-3
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {homeStringsData.featuresSectionTitle}
                    </h2>
                    <p
                        className="mx-auto max-w-2xl text-base"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.featuresSectionSubtitle}
                    </p>
                </div>
                <div
                    className="
                        grid
                        gap-6
                        md:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {features.map(({
                        description,
                        renderVignette,
                        title,
                    }) => (
                        <Card
                            key={title}
                            variant={cardVariantValuesEnumsData.tab}
                        >
                            {renderVignette()}
                            <h3
                                style={{ color: "var(--text-primary)" }}
                                className="
                                    mt-4
                                    mb-2
                                    text-base
                                    font-semibold
                                "
                            >
                                {title}
                            </h3>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        <SectionDivider />
        <section className="relative">
            <div
                className="
                    mx-auto
                    max-w-6xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-10 text-center">
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
                        {homeStringsData.categoriesEyebrow}
                    </p>
                    <h2
                        style={{ color: "var(--text-primary)" }}
                        className="
                            mb-3
                            text-3xl
                            font-bold
                            tracking-tight
                            sm:text-4xl
                        "
                    >
                        {homeStringsData.categoriesSectionTitle}
                    </h2>
                    <p
                        className="mx-auto max-w-2xl text-base"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.categoriesSectionSubtitle}
                    </p>
                </div>
                <div
                    className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {categories.map(({
                        accent,
                        count,
                        name,
                        slug,
                    }) => (
                        <Link
                            className="group block"
                            href={`/docs/rules/${slug}`}
                            key={slug}
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border
                                    px-5
                                    py-4
                                    transition-all
                                    duration-200
                                    group-hover:-translate-y-0.5
                                "
                                style={{
                                    backgroundColor: "var(--bg-card)",
                                    borderColor: "var(--border-primary)",
                                    borderLeftColor: accent,
                                    borderLeftWidth: 3,
                                    borderRadius: "2px 10px 10px 2px",
                                    boxShadow: "var(--shadow-sm)",
                                }}
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
                                        px-2.5
                                        py-0.5
                                        font-mono
                                        text-xs
                                        font-semibold
                                    "
                                    style={{
                                        backgroundColor: `${accent}1A`,
                                        color: accent,
                                    }}
                                >
                                    {count}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
        <SectionDivider />
        <section className="relative">
            <div
                className="
                    mx-auto
                    max-w-3xl
                    px-4
                    py-20
                    sm:px-6
                "
            >
                <div className="mb-10 text-center">
                    <h2
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
                        className="mx-auto max-w-2xl text-base"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.quickStartSectionSubtitle}
                    </p>
                    <p
                        className="handwritten mt-3 text-2xl"
                        style={{
                            color: "var(--lint-warn)",
                            transform: "rotate(-2deg)",
                        }}
                    >
                        {homeStringsData.quickStartTip}
                        {" "}
                        ✦
                    </p>
                </div>
                <div className="space-y-8">
                    <Card variant={cardVariantValuesEnumsData.notched}>
                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    flex
                                    size-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    font-mono
                                    text-xs
                                    font-bold
                                "
                                style={{
                                    backgroundColor: "var(--lint-error-bg)",
                                    color: "var(--lint-error)",
                                }}
                            >
                                1
                            </span>
                            <h3
                                className="text-base font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {homeStringsData.quickStartStepInstall}
                            </h3>
                        </div>
                        <CodeBlock
                            code={codeSnippetStringsData.installNpm}
                            filename={codeFilenameValuesEnumsData.terminal}
                            language={codeLanguageValuesEnumsData.bash}
                        />
                    </Card>
                    <Card variant={cardVariantValuesEnumsData.notched}>
                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    flex
                                    size-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    font-mono
                                    text-xs
                                    font-bold
                                "
                                style={{
                                    backgroundColor: "var(--lint-warn-bg)",
                                    color: "var(--lint-warn)",
                                }}
                            >
                                2
                            </span>
                            <h3
                                className="text-base font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {homeStringsData.quickStartStepConfigure}
                            </h3>
                        </div>
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
                    </Card>
                    <Card variant={cardVariantValuesEnumsData.notched}>
                        <div
                            className="
                                mb-3
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    flex
                                    size-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    font-mono
                                    text-xs
                                    font-bold
                                "
                                style={{
                                    backgroundColor: "var(--lint-pass-bg)",
                                    color: "var(--lint-pass)",
                                }}
                            >
                                3
                            </span>
                            <h3
                                className="text-base font-semibold"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {homeStringsData.quickStartStepLint}
                            </h3>
                        </div>
                        <CodeBlock
                            code={codeSnippetStringsData.eslintFixCommand}
                            filename={codeFilenameValuesEnumsData.terminal}
                            language={codeLanguageValuesEnumsData.bash}
                        />
                    </Card>
                </div>
                <div className="mt-12 text-center">
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
        <SectionDivider />
        <footer className="relative">
            <div
                className="
                    mx-auto
                    flex
                    max-w-5xl
                    flex-col
                    items-center
                    gap-8
                    px-4
                    py-12
                    sm:flex-row
                    sm:justify-between
                    sm:px-6
                "
            >
                <SignedSticker />
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        gap-3
                        text-center
                        sm:items-end
                        sm:text-right
                    "
                >
                    <p
                        className="text-sm font-medium"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        {homeStringsData.footerCopyright}
                    </p>
                    <div className="flex items-center gap-5">
                        <a
                            className="text-sm font-medium hover:underline"
                            href="https://github.com/ESLint-Plugin-Code-Style/website/blob/main/LICENSE"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                        >
                            {homeStringsData.footerLicense}
                        </a>
                        <a
                            className="text-sm font-medium hover:underline"
                            href="https://www.npmjs.com/package/eslint-plugin-code-style"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                        >
                            {homeStringsData.footerNpm}
                        </a>
                        <a
                            className="text-sm font-medium hover:underline"
                            href="https://github.com/ESLint-Plugin-Code-Style/plugin"
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                        >
                            {homeStringsData.footerGitHub}
                        </a>
                        <Link
                            className="text-sm font-medium hover:underline"
                            href="/docs/changelog"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {homeStringsData.footerChangelog}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);

export default HomePage;
