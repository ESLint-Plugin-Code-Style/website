import type { Metadata } from "next";
import Link from "next/link";

import { Card } from "@/components";
import { cardVariantValuesEnumsData, docsOverviewStringsData } from "@/data";

export const metadata: Metadata = { title: docsOverviewStringsData.metadataTitle };

const cards = [
    {
        accent: "var(--lint-pass)",
        description: docsOverviewStringsData.cardInstallationDescription,
        href: "/docs/getting-started",
        title: docsOverviewStringsData.cardInstallationTitle,
        token: "$",
    },
    {
        accent: "var(--lint-warn)",
        description: docsOverviewStringsData.cardConfigurationDescription,
        href: "/docs/configuration",
        title: docsOverviewStringsData.cardConfigurationTitle,
        token: "{ }",
    },
    {
        accent: "var(--lint-info)",
        description: docsOverviewStringsData.cardRulesDescription,
        href: "/docs/rules",
        title: docsOverviewStringsData.cardRulesTitle,
        token: "[*]",
    },
    {
        accent: "var(--accent-violet)",
        description: docsOverviewStringsData.cardPhilosophyDescription,
        href: "/docs/philosophy",
        title: docsOverviewStringsData.cardPhilosophyTitle,
        token: "//",
    },
];

const DocsPage = () => (
    <div>
        <h1>{docsOverviewStringsData.title}</h1>
        <p>
            {docsOverviewStringsData.introPrefix}
            <strong>{docsOverviewStringsData.pluginName}</strong>
            {docsOverviewStringsData.intro}
        </p>
        <div
            className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
            "
        >
            {cards.map(({
                accent,
                description,
                href,
                title,
                token,
            }) => (
                <Link
                    className="block no-underline"
                    href={href}
                    key={href}
                    style={{ textDecoration: "none" }}
                >
                    <Card variant={cardVariantValuesEnumsData.tab}>
                        <div
                            className="
                                mb-4
                                inline-flex
                                size-10
                                items-center
                                justify-center
                                rounded-md
                                font-mono
                                text-base
                                font-bold
                            "
                            style={{
                                backgroundColor: `${accent}1A`,
                                color: accent,
                            }}
                        >
                            {token}
                        </div>
                        <h3
                            className="mb-2 text-base font-semibold"
                            style={{ color: "var(--text-primary)" }}
                        >
                            {title}
                        </h3>
                        <p
                            className="text-sm leading-relaxed"
                            style={{
                                color: "var(--text-secondary)",
                                marginBottom: 0,
                            }}
                        >
                            {description}
                        </p>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
);

// eslint-disable-next-line import-x/no-default-export
export default DocsPage;
