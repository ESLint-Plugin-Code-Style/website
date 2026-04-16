import type { MetadataRoute } from "next";

import { docsNavigationData, metadataStringsData } from "@/data";

const sitemap = (): MetadataRoute.Sitemap => {
    const now = new Date();

    const baseUrl = metadataStringsData.canonicalUrl;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            changeFrequency: "weekly",
            lastModified: now,
            priority: 1,
            url: baseUrl,
        },
    ];

    const docsEntries: MetadataRoute.Sitemap = docsNavigationData.flatMap((section) => section.items.map((item) => ({
        changeFrequency: "weekly" as const,
        lastModified: now,
        priority: item.href === "/docs" ? 0.9 : 0.7,
        url: `${baseUrl}${item.href}`,
    })));

    return [
        ...staticEntries,
        ...docsEntries,
    ];
};

// eslint-disable-next-line import-x/no-default-export
export default sitemap;
