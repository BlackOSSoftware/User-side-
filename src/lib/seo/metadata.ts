import type { Metadata } from "next";
import { getSeoKeywordsForPage } from "@/lib/seo/keywords";
import { LOGIN_URL, TRIAL_URL } from "@/lib/external-links";

export const SITE_NAME = "MSPK Trade Solutions";
export const SITE_URL = "https://www.mspktradesolutions.com";
export { LOGIN_URL, TRIAL_URL };

export const DEFAULT_DESCRIPTION =
  "MSPK Trade Solutions delivers institutional-grade live trading signals with disciplined risk, clear entries, and execution-ready market context.";

type BuildMetadataArgs = {
  title: string;
  description?: string;
  path?: string;
  keywordsExtra?: string[];
  pageKey?: string;
};

export function buildMetadata({ title, description, path, keywordsExtra = [] }: BuildMetadataArgs): Metadata {
  const pageKey = (path || title).replace(/\//g, " ").trim() || title;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = path ? new URL(path, SITE_URL) : new URL(SITE_URL);
  const metaDescription = description || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: metaDescription,
    keywords: getSeoKeywordsForPage(pageKey, keywordsExtra),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: "/logo.jpg",
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: ["/logo.jpg"],
    },
  };
}
