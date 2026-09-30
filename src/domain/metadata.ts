export const SITE_NAME = "CalculatePregnancy.com";
export const BASE_URL = "https://calculatepregnancy.com";

export const DEFAULT_OG_IMAGE = [
  {
    url: `${BASE_URL}/og-image.png`,
    width: 1200,
    height: 630,
    alt: "CalculatePregnancy.com — Pregnancy & Due Date Calculators",
  },
];

export const DEFAULT_TWITTER_IMAGE = [`${BASE_URL}/og-image.png`];

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const canonicalUrl = path === "" || path === "/" ? BASE_URL : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website" as const,
      images: DEFAULT_OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: DEFAULT_TWITTER_IMAGE,
    },
  };
}
