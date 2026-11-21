import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/impact",
    "/challenge",
    "/comprendre",
    "/donner",
    "/confidentialite",
  ].map((path) => ({
    url: base + path,
    changeFrequency: "weekly",
    priority: path ? 0.7 : 1,
  }));
}
