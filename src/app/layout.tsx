import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import type React from "react";

import { Navbar, OfflineIndicator, ServiceWorkerRegister } from "@/components";
import { layoutStringsData, metadataStringsData } from "@/data";
import { ThemeProvider } from "@/providers";

export const metadata: Metadata = {
    authors: [
        {
            name: metadataStringsData.authorName,
            url: metadataStringsData.authorUrl,
        },
    ],
    creator: metadataStringsData.authorName,
    description: metadataStringsData.defaultDescription,
    keywords: metadataStringsData.keywords.split(","),
    manifest: "/manifest.json",
    metadataBase: new URL("https://www.eslint-plugin-code-style.org"),
    openGraph: {
        description: metadataStringsData.ogDescription,
        locale: "en_US",
        siteName: metadataStringsData.ogSiteName,
        title: metadataStringsData.ogTitle,
        type: "website",
        url: "https://www.eslint-plugin-code-style.org",
    },
    publisher: metadataStringsData.authorName,
    robots: {
        follow: true,
        index: true,
    },
    title: {
        default: metadataStringsData.defaultTitle,
        template: metadataStringsData.titleTemplate,
    },
    twitter: {
        card: "summary_large_image",
        description: metadataStringsData.twitterDescription,
        title: metadataStringsData.twitterTitle,
    },
};

export const viewport = { themeColor: "#7c3aed" };

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html
        lang="en"
        suppressHydrationWarning
    >
        <head>
            <script dangerouslySetInnerHTML={{ __html: layoutStringsData.themeInitScript }} />
        </head>
        <body
            className="min-h-screen font-sans antialiased"
            suppressHydrationWarning
        >
            <ThemeProvider>
                <Navbar />
                <main className="pt-16">{children}</main>
                <OfflineIndicator />
                <ServiceWorkerRegister />
            </ThemeProvider>
            <Script
                data-library="/eslint-plugin-code-style/plugin"
                src="https://context7.com/widget.js"
                strategy="afterInteractive"
            />
        </body>
    </html>
);

// eslint-disable-next-line import-x/no-default-export
export default RootLayout;
