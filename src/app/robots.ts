import type { MetadataRoute } from "next";

import { metadataStringsData } from "@/data";

const robots = (): MetadataRoute.Robots => ({
    host: metadataStringsData.canonicalUrl,
    rules: [
        {
            allow: "/",
            disallow: ["/offline"],
            userAgent: "*",
        },
    ],
    sitemap: `${metadataStringsData.canonicalUrl}/sitemap.xml`,
});

// eslint-disable-next-line import-x/no-default-export
export default robots;
