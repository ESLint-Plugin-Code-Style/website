/**
 * Validates that the auto-generated website data files are internally consistent.
 *
 * Checks:
 * 1. rules.ts has valid rule data with required fields
 * 2. config.ts has a valid version
 * 3. navigation.ts includes all categories from rules.ts
 * 4. Rule counts in rules.ts match exported stat constants
 *
 * Run: node scripts/validate-sync.js
 * Runs automatically before build via "prebuild" script.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, "..");

let errors = 0;

const fail = (msg) => {
    console.error(`  \u274C ${msg}`);
    errors++;
};

const pass = (msg) => {
    console.log(`  \u2713 ${msg}`);
};

// Skip on Vercel — validation is for local/CI, not deployment builds
if (process.env.VERCEL) {
    console.log("\n\u2713 Skipping sync validation on Vercel deployment.\n");
    process.exit(0);
}

console.log("\nValidating website data consistency...\n");

// 1. rules.ts exists and has rules
const rulesTs = fs.readFileSync(path.join(websiteRoot, "src/data/rules.ts"), "utf-8");
const ruleNames = [...rulesTs.matchAll(/name:\s*"([\w]+-[\w-]+)"/g)].map((m) => m[1]);

if (ruleNames.length > 0) {
    pass(`rules.ts has ${ruleNames.length} rules`);
} else {
    fail("rules.ts has no rules");
}

// 2. rules.ts stat exports match actual data
const totalMatch = rulesTs.match(/totalRulesData\s*=\s*(\d+)/);
const fixableMatch = rulesTs.match(/fixableRulesData\s*=\s*(\d+)/);

if (totalMatch && parseInt(totalMatch[1]) === ruleNames.length) {
    pass(`totalRulesData (${totalMatch[1]}) matches actual rule count`);
} else {
    fail(`totalRulesData (${totalMatch?.[1]}) does not match actual rule count (${ruleNames.length})`);
}

// 3. config.ts has a valid version
const configTs = fs.readFileSync(path.join(websiteRoot, "src/data/config.ts"), "utf-8");
const versionMatch = configTs.match(/version:\s*"(\d+\.\d+\.\d+)"/);

if (versionMatch) {
    pass(`config.ts version: ${versionMatch[1]}`);
} else {
    fail("config.ts has no valid version");
}

// 4. Navigation includes all categories from rules.ts
const categories = [...rulesTs.matchAll(/slug:\s*"([\w-]+)"/g)].map((m) => m[1]);
const navTs = fs.readFileSync(path.join(websiteRoot, "src/data/navigation.ts"), "utf-8");
const navCategories = [...navTs.matchAll(/href:\s*"\/docs\/rules\/([\w-]+)"/g)].map((m) => m[1]);
const missingNav = categories.filter((cat) => !navCategories.includes(cat));

if (missingNav.length === 0) {
    pass(`Navigation includes all ${categories.length} categories`);
} else {
    fail(`Categories missing from navigation: ${missingNav.join(", ")}`);
}

// Summary
console.log("");

if (errors > 0) {
    console.error(`\u274C Validation failed with ${errors} error(s). Fix the issues above before building.`);
    process.exit(1);
} else {
    console.log("\u2713 All checks passed.\n");
}
