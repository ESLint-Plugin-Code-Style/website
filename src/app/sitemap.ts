import type { MetadataRoute } from "next";

import { docsNavigationData, metadataStringsData, sitemapChangeFrequencyValuesEnumsData } from "@/data";

const getSitemapHandler = (): MetadataRoute.Sitemap => {
    const now = new Date();

    const baseUrl = metadataStringsData.canonicalUrl;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            changeFrequency: sitemapChangeFrequencyValuesEnumsData.weekly,
            lastModified: now,
            priority: 1,
            url: baseUrl,
        },
    ];

    const docsEntries: MetadataRoute.Sitemap = docsNavigationData.flatMap(({ items }) => items.map(({ href }) => ({
        changeFrequency: sitemapChangeFrequencyValuesEnumsData.weekly,
        lastModified: now,
        priority: href === "/docs" ? 0.9 : 0.7,
        url: `${baseUrl}${href}`,
    })));

    return [
        ...staticEntries,
        ...docsEntries,
    ];
};

export default getSitemapHandler;
