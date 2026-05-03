import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/novidades`,
      lastModified: new Date("2026-05-02"),
      changeFrequency: "weekly",
      priority: 0.8
    }
  ];
}
