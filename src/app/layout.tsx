import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import "@/styles/globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-Y64KDD1DB7";

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://calculatepregnancy.com"),
  title: {
    default: "CalculatePregnancy.com — Pregnancy & Due Date Calculators",
    template: "%s | CalculatePregnancy.com",
  },
  description:
    "Free, fast, and private pregnancy calculators. Estimate your due date, current pregnancy week, trimester boundaries, and baby development milestones based on standard clinical models.",
  keywords: [
    "pregnancy calculator",
    "due date calculator",
    "pregnancy week calculator",
    "calculate pregnancy",
    "how many weeks pregnant am I",
    "trimester calculator",
    "baby size by week",
  ],
  authors: [{ name: "CalculatePregnancy.com" }],
  creator: "CalculatePregnancy.com",
  publisher: "CalculatePregnancy.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calculatepregnancy.com",
    siteName: "CalculatePregnancy.com",
    title: "CalculatePregnancy.com — Fast, Calm Pregnancy & Due Date Calculators",
    description:
      "Simple, private, evidence-based pregnancy calculations to estimate your due date, gestational age, and developmental milestones.",
    images: [
      {
        url: "https://calculatepregnancy.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalculatePregnancy.com — Pregnancy & Due Date Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalculatePregnancy.com",
    description: "Simple, calm, and accurate pregnancy and due date calculations.",
    images: ["https://calculatepregnancy.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CalculatePregnancy.com",
              url: "https://calculatepregnancy.com",
              applicationCategory: "HealthApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Calculate pregnancy due date, gestational age, trimester, and weekly fetal development milestones privately on your device.",
            }),
          }}
        />
      </head>
      <body>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
