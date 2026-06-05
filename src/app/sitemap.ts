import type { MetadataRoute } from "next";

import { docsNavigationData, metadataStringsData } from "@/data";
import { SitemapChangeFrequencyEnum } from "@/enums";

const getSitemapHandler = (): MetadataRoute.Sitemap => {
    const now = new Date();

    const baseUrl = metadataStringsData.canonicalUrl;

    const staticEntries: MetadataRoute.Sitemap = [
        {
            changeFrequency: SitemapChangeFrequencyEnum.WEEKLY,
            lastModified: now,
            priority: 1,
            url: baseUrl,
        },
    ];

    const docsEntries: MetadataRoute.Sitemap = docsNavigationData.flatMap(({ items }) => items.map(({ href }) => ({
        changeFrequency: SitemapChangeFrequencyEnum.WEEKLY,
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
