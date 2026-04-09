/**
 * Sync website data from the plugin's metadata.json
 *
 * This script fetches metadata.json from the plugin repo and auto-generates:
 * - src/data/rules.ts (categories + rules)
 * - src/data/config.ts (version + metadata)
 * - src/data/navigation.ts (sidebar categories)
 *
 * Usage: node scripts/sync-from-plugin.js [path-to-metadata.json]
 *   - If path provided: reads from local file (for local dev)
 *   - If no path: fetches from GitHub raw (for CI)
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDataDir = join(__dirname, "..", "src", "data");

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/ESLint-Plugin-Code-Style/plugin/main/metadata.json";

const fetchMetadata = async () => {
    const metadataPath = process.argv[2];

    if (metadataPath) {
        console.log(`Reading metadata from: ${metadataPath}`);
        return JSON.parse(readFileSync(metadataPath, "utf-8"));
    }

    console.log(`Fetching metadata from: ${GITHUB_RAW_URL}`);
    const response = await fetch(GITHUB_RAW_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.status}`);
    }

    return response.json();
};

const escapeForTemplate = (str) => str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");

const generateRulesTs = (metadata) => {
    const lines = [
        'import type { CategoryInterface, RuleInterface } from "@/interfaces";',
        "",
        'export type { CategoryInterface, RuleInterface, RuleOptionInterface } from "@/interfaces";',
        "",
        "export const categoriesRulesData = [",
    ];

    for (const category of metadata.categories) {
        lines.push("    {");
        lines.push(`        description: ${JSON.stringify(category.description)},`);
        lines.push(`        name: ${JSON.stringify(category.name)},`);
        lines.push("        rules: [");

        for (const rule of category.rules) {
            lines.push("            {");

            // badExample — use template literal if multiline
            if (rule.badExample.includes("\n")) {
                lines.push(`                badExample: \`${escapeForTemplate(rule.badExample)}\`,`);
            } else {
                lines.push(`                badExample: ${JSON.stringify(rule.badExample)},`);
            }

            lines.push(`                description: ${JSON.stringify(rule.description)},`);

            // goodExample — use template literal if multiline
            if (rule.goodExample.includes("\n")) {
                lines.push(`                goodExample: \`${escapeForTemplate(rule.goodExample)}\`,`);
            } else {
                lines.push(`                goodExample: ${JSON.stringify(rule.goodExample)},`);
            }

            lines.push(`                isConfigurable: ${rule.isConfigurable},`);
            lines.push(`                isFixable: ${rule.isFixable},`);
            lines.push(`                isTsOnly: ${rule.isTsOnly},`);
            lines.push(`                name: ${JSON.stringify(rule.name)},`);

            if (rule.options.length === 0) {
                lines.push("                options: [],");
            } else {
                lines.push("                options: [");
                for (const opt of rule.options) {
                    lines.push("                    {");
                    lines.push(`                        default: ${JSON.stringify(opt.default)},`);
                    lines.push(`                        description: ${JSON.stringify(opt.description)},`);
                    lines.push(`                        name: ${JSON.stringify(opt.name)},`);
                    lines.push(`                        type: ${JSON.stringify(opt.type)},`);
                    lines.push("                    },");
                }
                lines.push("                ],");
            }

            lines.push(`                rationale: ${JSON.stringify(rule.rationale)},`);
            lines.push("            },");
        }

        lines.push("        ],");
        lines.push(`        slug: ${JSON.stringify(category.slug)},`);
        lines.push("    },");
    }

    lines.push("];");
    lines.push("");
    lines.push("// eslint-disable-next-line code-style/folder-based-naming-convention -- function Handler suffix takes precedence");
    lines.push("export const getAllRulesRulesDataHandler = (): RuleInterface[] => categoriesRulesData.flatMap(({ rules }) => rules);");
    lines.push("");
    lines.push("// eslint-disable-next-line code-style/folder-based-naming-convention -- function Handler suffix takes precedence");
    lines.push("export const getCategoryBySlugRulesDataHandler = (targetSlug: string): CategoryInterface | undefined => categoriesRulesData.find(({ slug }) => slug === targetSlug);");
    lines.push("");
    lines.push("// eslint-disable-next-line code-style/folder-based-naming-convention -- function Handler suffix takes precedence");
    lines.push("export const getRuleByNameRulesDataHandler = (targetName: string): {");
    lines.push("    category: CategoryInterface,");
    lines.push("    rule: RuleInterface,");
    lines.push("} | undefined => {");
    lines.push("    for (const currentCategoryRulesData of categoriesRulesData) {");
    lines.push('        const matchedRulesData = currentCategoryRulesData.rules.find(({ name }) => name === targetName);');
    lines.push("");
    lines.push("        if (matchedRulesData) {");
    lines.push("            return {");
    lines.push("                category: currentCategoryRulesData,");
    lines.push("                rule: matchedRulesData,");
    lines.push("            };");
    lines.push("        }");
    lines.push("    }");
    lines.push("");
    lines.push("    return undefined;");
    lines.push("};");
    lines.push("");
    lines.push(`export const totalRulesData = ${metadata.totalRules};`);
    lines.push("");
    lines.push(`export const fixableRulesData = ${metadata.fixableRules};`);
    lines.push("");
    lines.push(`export const configurableRulesData = ${metadata.configurableRules};`);
    lines.push("");
    lines.push(`export const reportOnlyRulesData = ${metadata.reportOnlyRules};`);
    lines.push("");
    const tsOnlyCount = metadata.categories.reduce((sum, c) => sum + c.rules.filter((r) => r.isTsOnly).length, 0);
    lines.push(`export const tsOnlyRulesData = ${tsOnlyCount};`);
    lines.push("");

    return lines.join("\n");
};

const generateConfigTs = (metadata) => `/*
 * Central plugin configuration — single source of truth for version and metadata
 * AUTO-GENERATED from plugin metadata.json — do not edit manually
 */

export const pluginConfigData = {
    description: "${metadata.totalRules} custom ESLint rules for enforcing consistent code formatting in React/JSX projects. ${metadata.fixableRules} auto-fixable, ${metadata.configurableRules} configurable. Built for ESLint ${metadata.eslintVersions} flat config.",
    eslintVersions: ${JSON.stringify(metadata.eslintVersions)},
    githubUrl: ${JSON.stringify(metadata.githubUrl)},
    name: "eslint-plugin-code-style",
    npmUrl: ${JSON.stringify(metadata.npmUrl)},
    version: ${JSON.stringify(metadata.version)},
    versionDisplay: "v${metadata.version}",
    websiteUrl: ${JSON.stringify(metadata.websiteUrl)},
};
`;

const generateNavigationTs = (metadata) => {
    const categoryItems = metadata.categories.map((c) => ({
        href: `/docs/rules/${c.slug}`,
        title: c.name,
    }));

    const lines = [
        'import type { NavSectionInterface } from "@/interfaces";',
        "",
        'export type { NavItemInterface, NavSectionInterface } from "@/interfaces";',
        "",
        "export const docsNavigationData: NavSectionInterface[] = [",
        "    {",
        "        items: [",
        "            {",
        '                href: "/docs",',
        '                title: "Introduction",',
        "            },",
        "            {",
        '                href: "/docs/getting-started",',
        '                title: "Installation",',
        "            },",
        "            {",
        '                href: "/docs/configuration",',
        '                title: "Configuration",',
        "            },",
        "        ],",
        '        title: "Getting Started",',
        "    },",
        "    {",
        "        items: [",
        "            {",
        '                href: "/docs/rules",',
        '                title: "Overview",',
        "            },",
    ];

    for (const item of categoryItems) {
        lines.push("            {");
        lines.push(`                href: ${JSON.stringify(item.href)},`);
        lines.push(`                title: ${JSON.stringify(item.title)},`);
        lines.push("            },");
    }

    lines.push("        ],");
    lines.push('        title: "Rules",');
    lines.push("    },");
    lines.push("    {");
    lines.push("        items: [");
    lines.push("            {");
    lines.push('                href: "/docs/philosophy",');
    lines.push('                title: "Philosophy",');
    lines.push("            },");
    lines.push("            {");
    lines.push('                href: "/docs/contributing",');
    lines.push('                title: "Contributing",');
    lines.push("            },");
    lines.push("            {");
    lines.push('                href: "/docs/changelog",');
    lines.push('                title: "Changelog",');
    lines.push("            },");
    lines.push("        ],");
    lines.push('        title: "Guides",');
    lines.push("    },");
    lines.push("];");
    lines.push("");

    return lines.join("\n");
};

const main = async () => {
    const metadata = await fetchMetadata();

    const totalRules = metadata.categories.reduce((sum, c) => sum + c.rules.length, 0);
    console.log(`Plugin v${metadata.version} — ${totalRules} rules, ${metadata.categories.length} categories`);

    const rulesTs = generateRulesTs(metadata);
    writeFileSync(join(srcDataDir, "rules.ts"), rulesTs);
    console.log("Generated: src/data/rules.ts");

    const configTs = generateConfigTs(metadata);
    writeFileSync(join(srcDataDir, "config.ts"), configTs);
    console.log("Generated: src/data/config.ts");

    const navigationTs = generateNavigationTs(metadata);
    writeFileSync(join(srcDataDir, "navigation.ts"), navigationTs);
    console.log("Generated: src/data/navigation.ts");

    console.log("Sync complete.");
};

main().catch((err) => {
    console.error("Sync failed:", err.message);
    process.exit(1);
});
