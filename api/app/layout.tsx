import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://india-pincode-finder.gossorg.in";

export const metadata: Metadata = {
  title: {
    default: "India Pincode Finder — Free Pincode API & Lookup",
    template: "%s | India Pincode Finder",
  },
  description:
    "Free India pincode API and lookup tool. Search 50,000+ Indian pincodes by district, block, or office name. Get full address details including state, district, circle, region, and division. Available as npm and PyPI packages.",
  keywords: [
    "india pincode",
    "pincode api",
    "indian pincode api",
    "pincode lookup",
    "pincode search",
    "pin code",
    "postal code india",
    "zip code india",
    "india postal code",
    "pincode to address",
    "pincode finder",
    "indian pincodes",
    "india address lookup",
    "pincode package",
    "pincode npm",
    "pincode python",
    "india post pincode",
    "6 digit pincode",
    "pincode details",
    "pincode to district",
    "pincode to state",
    "address by pincode",
    "data.gov.in pincode",
    "government pincode data",
  ],
  authors: [
    { name: "Akshat Kotpalliwar" },
    { name: "Aniket Dhumal" },
  ],
  creator: "Akshat Kotpalliwar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "India Pincode Finder",
    title: "India Pincode Finder — Free Pincode API & Lookup",
    description:
      "Search 50,000+ Indian pincodes by district, block, or office name. Free API, npm and PyPI packages available.",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "India Pincode Finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Pincode Finder — Free Pincode API & Lookup",
    description:
      "Search 50,000+ Indian pincodes by district, block, or office name. Free API, npm and PyPI packages available.",
    images: [`${siteUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "India Pincode Finder",
    url: siteUrl,
    description:
      "Free India pincode API and lookup tool. Search 50,000+ Indian pincodes for full address details.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    author: {
      "@type": "Person",
      name: "Akshat Kotpalliwar",
      url: "https://www.akshatkotpalliwar.in/",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
