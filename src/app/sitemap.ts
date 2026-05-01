import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
