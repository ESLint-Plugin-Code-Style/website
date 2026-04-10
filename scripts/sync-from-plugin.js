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

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/ESLint-Plugin-Code-Style/plugin/main";
const GITHUB_RAW_URL = `${GITHUB_RAW_BASE}/metadata.json`;
const CHANGELOG_RAW_URL = `${GITHUB_RAW_BASE}/CHANGELOG.md`;

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

    // Generate versions.ts from CHANGELOG.md (only releases with version range)
    const changelogPath = join(__dirname, "..", "CHANGELOG.md");
    let changelogContent = "";

    try {
        changelogContent = readFileSync(changelogPath, "utf-8");
    } catch {
        // CHANGELOG.md not yet written, will be on next pass
    }

    if (changelogContent) {
        const versionRegex = /^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})$/gm;
        const releaseVersions = [];
        let match;

        while ((match = versionRegex.exec(changelogContent)) !== null) {
            const version = match[1];
            const date = match[2];
            const startIdx = match.index;
            const nextMatch = changelogContent.slice(startIdx + match[0].length).match(/^## \[/m);
            const endIdx = nextMatch ? startIdx + match[0].length + nextMatch.index : changelogContent.length;
            const versionContent = changelogContent.slice(startIdx, endIdx);

            // Only include if it has a version range (i.e., it's a GitHub release)
            if (versionContent.includes("**Version Range:**")) {
                const titleMatch = versionContent.match(/\*\*([^V][^*]+)\*\*\n/);
                releaseVersions.push({
                    date,
                    title: titleMatch ? titleMatch[1].trim() : null,
                    version,
                });
            }
        }

        // Generate TypeScript-formatted output with trailing commas (not JSON.stringify which omits them)
        const versionEntriesTs = releaseVersions.map((release) => `    {
        date: ${JSON.stringify(release.date)},
        title: ${JSON.stringify(release.title)},
        version: ${JSON.stringify(release.version)},
    },`).join("\n");

        const versionsTs = `// AUTO-GENERATED from CHANGELOG.md — do not edit manually

import type { ReleaseVersionInterface } from "@/interfaces";

export const releaseVersionsData: ReleaseVersionInterface[] = [
${versionEntriesTs}
];
`;
        writeFileSync(join(srcDataDir, "versions.ts"), versionsTs);
        console.log(`Generated: src/data/versions.ts (${releaseVersions.length} releases)`);
    }

    // Fetch CHANGELOG.md from plugin repo
    if (!process.argv[2]) {
        console.log(`Fetching changelog from: ${CHANGELOG_RAW_URL}`);
        const changelogResponse = await fetch(CHANGELOG_RAW_URL);

        if (changelogResponse.ok) {
            const changelog = await changelogResponse.text();
            writeFileSync(join(__dirname, "..", "CHANGELOG.md"), changelog);
            console.log("Fetched: CHANGELOG.md");
        } else {
            console.warn(`Warning: could not fetch CHANGELOG.md (${changelogResponse.status})`);
        }
    } else {
        // Local mode: copy from sibling plugin repo if it exists
        const localChangelog = join(process.argv[2], "..", "CHANGELOG.md");

        try {
            const changelog = readFileSync(localChangelog, "utf-8");
            writeFileSync(join(__dirname, "..", "CHANGELOG.md"), changelog);
            console.log(`Copied: CHANGELOG.md from ${localChangelog}`);
        } catch {
            console.warn("Warning: could not find local CHANGELOG.md");
        }
    }

    console.log("Sync complete.");
};

main().catch((err) => {
    console.error("Sync failed:", err.message);
    process.exit(1);
});
