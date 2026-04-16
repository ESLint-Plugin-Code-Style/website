import type { MetadataRoute } from "next";

import { metadataStringsData } from "@/data";

const getRobotsHandler = (): MetadataRoute.Robots => ({
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

export default getRobotsHandler;
