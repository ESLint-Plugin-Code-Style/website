"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { componentStringsData, homeStringsData, pluginConfigData } from "@/data";

const linkClassName = `
    font-medium
    text-sm
    duration-200
    transition-colors
    focus-visible:outline-[color:var(--border-active)]
    focus-visible:outline-2
    focus-visible:outline-offset-4
    hover:text-[color:var(--text-primary)]
    hover:underline
`;

const externalLinks: {
    href: string,
    label: string,
}[] = [
    {
        href: "https://github.com/ESLint-Plugin-Code-Style/website/blob/main/LICENSE",
        label: homeStringsData.footerLicense,
    },
    {
        href: pluginConfigData.npmUrl,
        label: homeStringsData.footerNpm,
    },
    {
        href: pluginConfigData.githubUrl,
        label: homeStringsData.footerGitHub,
    },
];

export const Footer = () => {
    const pathname = usePathname();

    /*
     * Docs pages use a full-height sticky rail + in-page navigation; the
     * marketing footer is intentionally omitted there (Stripe / Next.js pattern).
     */
    if (pathname?.startsWith("/docs")) return null;

    return (
        <footer
            aria-label={homeStringsData.colophonMasthead}
            className="relative"
        >
            <div
                style={{ borderColor: "var(--border-secondary)" }}
                className="
                    mx-auto
                    flex
                    max-w-7xl
                    flex-col
                    items-center
                    gap-6
                    border-t
                    px-4
                    py-8
                    text-center
                    sm:px-6
                    md:flex-row
                    md:items-end
                    md:justify-between
                    md:text-left
                    lg:px-8
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        gap-2
                        md:items-start
                    "
                >
                    <p
                        style={{ color: "var(--text-tertiary)" }}
                        className="
                            font-mono
                            text-xs
                            tracking-widest
                            uppercase
                        "
                    >
                        {`${homeStringsData.colophonEditionLabel} · ${homeStringsData.badge}`}
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
                    <p
                        className="hidden text-xs md:block"
                        style={{ color: "var(--text-tertiary)" }}
                    >
                        {homeStringsData.footerCopyright}
                    </p>
                </div>
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        gap-3
                        md:items-end
                    "
                >
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-5
                            md:justify-end
                        "
                    >
                        {externalLinks.map(({
                            href,
                            label,
                        }) => (
                            <a
                                className={linkClassName}
                                href={href}
                                key={label}
                                rel="noopener noreferrer"
                                style={{ color: "var(--text-secondary)" }}
                                target="_blank"
                            >
                                {label}
                            </a>
                        ))}
                        <Link
                            className={linkClassName}
                            href="/docs/changelog"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {homeStringsData.footerChangelog}
                        </Link>
                    </div>
                    <p
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                    >
                        {`${componentStringsData.footerAuthorPrefix} `}
                        <a
                            href={componentStringsData.footerAuthorUrl}
                            rel="noopener noreferrer"
                            style={{ color: "var(--text-secondary)" }}
                            target="_blank"
                            className="
                                font-medium
                                transition-colors
                                duration-200
                                hover:text-[color:var(--text-primary)]
                                hover:underline
                            "
                        >
                            {componentStringsData.footerAuthorName}
                        </a>
                    </p>
                    <p
                        className="text-xs md:hidden"
                        style={{ color: "var(--text-tertiary)" }}
                    >
                        {homeStringsData.footerCopyright}
                    </p>
                </div>
            </div>
        </footer>
    );
};
