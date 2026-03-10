import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource/outfit";
import "@fontsource/jetbrains-mono";
import "./globals.css";
import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, LOGIN_URL, TRIAL_URL } from "@/lib/seo/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from 'sonner';
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSync } from "@/components/theme-sync";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClickSoundProvider } from "@/components/click-sound-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const siteLinksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MSPK Key Links",
    itemListElement: [
      { "@type": "ListItem", position: 1, url: SITE_URL },
      { "@type": "ListItem", position: 2, url: `${SITE_URL}/plans` },
      { "@type": "ListItem", position: 3, url: `${SITE_URL}/market` },
      { "@type": "ListItem", position: 4, url: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 5, url: `${SITE_URL}/announcements` },
      { "@type": "ListItem", position: 6, url: `${SITE_URL}/privacy-policy` },
      { "@type": "ListItem", position: 7, url: LOGIN_URL },
      { "@type": "ListItem", position: 8, url: TRIAL_URL },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Lato:wght@300;400;700&family=Montserrat:wght@400;500;600;700&family=Oswald:wght@200;300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLinksSchema) }}
        />
        <style>{`
          body.intro-preload header,
          body.intro-preload main,
          body.intro-preload footer {
            opacity: 0;
            pointer-events: none;
          }
        `}</style>
        <Script id="intro-preload" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                var params = new URLSearchParams(window.location.search);
                var force = params.has("intro");
                var seen = window.sessionStorage.getItem("mspk_intro_seen");
                var shouldShow = !reduce && (force || !seen);
                if (shouldShow) {
                  document.body.classList.add("intro-active");
                }
              } catch (e) {
              }
            })();
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`intro-preload ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeSync />
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ClickSoundProvider>
              {children}
              <Toaster position="top-center" richColors />
            </ClickSoundProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
