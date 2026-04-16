import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import type React from "react";

import {
    CodeRain,
    Navbar,
    OfflineIndicator,
    ServiceWorkerRegister,
} from "@/components";
import { layoutStringsData, metadataStringsData } from "@/data";
import { ThemeProvider } from "@/providers";

const interFont = Inter({
    display: "swap",
    subsets: ["latin"],
    variable: "--font-inter",
});

const jetbrainsMonoFont = JetBrains_Mono({
    display: "swap",
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

const caveatFont = Caveat({
    display: "swap",
    subsets: ["latin"],
    variable: "--font-caveat",
    weight: ["400", "500", "600"],
});

const fontVariables = `${interFont.variable} ${jetbrainsMonoFont.variable} ${caveatFont.variable}`;

export const metadata: Metadata = {
    alternates: { canonical: metadataStringsData.canonicalUrl },
    appleWebApp: {
        capable: true,
        statusBarStyle: metadataStringsData.appleWebAppStatusBarStyle,
        title: metadataStringsData.appleWebAppTitle,
    },
    applicationName: metadataStringsData.applicationName,
    authors: [
        {
            name: metadataStringsData.authorName,
            url: metadataStringsData.authorUrl,
        },
    ],
    category: metadataStringsData.category,
    creator: metadataStringsData.authorName,
    description: metadataStringsData.defaultDescription,
    formatDetection: {
        address: false,
        email: false,
        telephone: false,
    },
    generator: metadataStringsData.generator,
    icons: {
        apple: [
            {
                type: metadataStringsData.ogImageType,
                url: metadataStringsData.appleTouchIconPath,
            },
        ],
        icon: [
            {
                type: metadataStringsData.ogImageType,
                url: metadataStringsData.iconSvgPath,
            },
        ],
        shortcut: [{ url: metadataStringsData.iconSvgPath }],
    },
    keywords: metadataStringsData.keywords.split(","),
    manifest: "/manifest.json",
    metadataBase: new URL(metadataStringsData.canonicalUrl),
    openGraph: {
        description: metadataStringsData.ogDescription,
        images: [
            {
                alt: metadataStringsData.ogImageAlt,
                height: metadataStringsData.ogImageHeight,
                type: metadataStringsData.ogImageType,
                url: metadataStringsData.ogImagePath,
                width: metadataStringsData.ogImageWidth,
            },
        ],
        locale: metadataStringsData.locale,
        siteName: metadataStringsData.ogSiteName,
        title: metadataStringsData.ogTitle,
        type: "website",
        url: metadataStringsData.canonicalUrl,
    },
    publisher: metadataStringsData.authorName,
    robots: {
        follow: true,
        googleBot: {
            follow: true,
            index: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
        index: true,
    },
    title: {
        default: metadataStringsData.defaultTitle,
        template: metadataStringsData.titleTemplate,
    },
    twitter: {
        card: "summary_large_image",
        description: metadataStringsData.twitterDescription,
        images: [metadataStringsData.ogImagePath],
        title: metadataStringsData.twitterTitle,
    },
};

export const viewport: Viewport = {
    colorScheme: "dark light",
    initialScale: 1,
    themeColor: [
        {
            color: metadataStringsData.themeColorLight,
            media: "(prefers-color-scheme: light)",
        },
        {
            color: metadataStringsData.themeColorDark,
            media: "(prefers-color-scheme: dark)",
        },
    ],
    width: "device-width",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html
        className={fontVariables}
        lang="en"
        suppressHydrationWarning
    >
        <head>
            <script dangerouslySetInnerHTML={{ __html: layoutStringsData.themeInitScript }} />
        </head>
        <body
            className="
                relative
                min-h-screen
                font-sans
                antialiased
            "
            suppressHydrationWarning
        >
            <ThemeProvider>
                <CodeRain />
                <Navbar />
                <main className="relative z-10 pt-16">{children}</main>
                <OfflineIndicator />
                <ServiceWorkerRegister />
            </ThemeProvider>
            <Script
                data-color="#7c3aed"
                data-library="/eslint-plugin-code-style/plugin"
                data-placeholder="Ask about the plugin..."
                src="https://context7.com/widget.js"
                strategy="afterInteractive"
            />
        </body>
    </html>
);

// eslint-disable-next-line import-x/no-default-export
export default RootLayout;
