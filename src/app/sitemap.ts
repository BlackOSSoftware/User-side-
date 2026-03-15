import type { MetadataRoute } from "next";
import { SITE_URL, LOGIN_URL, TRIAL_URL } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<MetadataRoute.Sitemap[number]> = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/announcements`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/lead`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/market`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/plans`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/delete-account`, changeFrequency: "yearly", priority: 0.5 },
    { url: LOGIN_URL, changeFrequency: "monthly", priority: 0.4 },
    { url: TRIAL_URL, changeFrequency: "monthly", priority: 0.5 },
  ];

  return routes.map((route) => ({
    ...route,
    lastModified: now,
  }));
}
