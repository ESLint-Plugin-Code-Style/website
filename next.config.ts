import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
    /*
     * Skip Next.js's deprecated in-build `next lint` runner. Lint is
     * enforced by the standalone `pnpm lint` script via the husky
     * pre-commit hook. Next.js 16 removes `next lint` entirely
     * (https://nextjs.org/docs/app/api-reference/config/eslint).
     */
    eslint: { ignoreDuringBuilds: true },
    outputFileTracingRoot: __dirname,
};

export default nextConfig;
