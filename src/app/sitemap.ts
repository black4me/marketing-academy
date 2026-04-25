import type { MetadataRoute } from "next";
import { MODULES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://marketing-academy.vercel.app";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/templates`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cases`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const moduleRoutes: MetadataRoute.Sitemap = MODULES.map((m) => ({
    url: `${base}/module/${m.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const lessonRoutes: MetadataRoute.Sitemap = MODULES.flatMap((m) =>
    m.lessons.map((l) => ({
      url: `${base}/lesson/${l.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...moduleRoutes, ...lessonRoutes];
}
