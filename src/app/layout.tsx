import type { Metadata, Viewport } from "next"
import '@fontsource/comic-relief/400.css';
import '@fontsource/comic-relief/700.css';
import './reset.css'
import "./globals.css";
import './embla.css';
import 'react-loading-skeleton/dist/skeleton.css'
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ShopifyMetaobjectsResponse } from "@/lib/shopify/types";
import { getMetaObjects } from "@/lib/shopify/api";
import { ThemeHydrator } from "@/components/theme-hydrator";
import { ToastContainer } from "react-toastify";
import { GoogleTagManager } from "@next/third-parties/google";
import Subscribe from "@/components/subscription";
// import CookieConsent from "@/components/cookie-consent";

interface KeyValue {
  key: string
  value: string
}

interface MarqueeProps {
  marquee_text_1: string
  marquee_color_1: string
  marquee_text_2: string
  marquee_color_2: string
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: Use window.location
    return window.location.origin;
  }
  // Server-side: Use environment variable or fallback
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://local-supply-network.com';
};

const baseUrl = getBaseUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF2E3"
};

export const metadata: Metadata = {
  title: {
    template: '%s - Powerberry',
    default: 'Powerberry - Fruit of Youthfulness'
  },
  description: 'Powerberry is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.',
  openGraph: {
    title: 'Powerberry - Fruit of Youthfulness',
    description: 'Powerberry is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.',
    url: baseUrl,
    siteName: 'Powerberry Harvest',
    images: [
      {
        url: `https://cdn.shopify.com/s/files/1/0948/0618/0125/files/meta-image.jpg?v=1755860664`,
        width: 1200,
        height: 630,
        alt: 'Powerberry: Fruit of Youthfulness',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Powerberry - Fruit of Youthfulness',
    description: 'Powerberry is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.',
    images: ['https://cdn.shopify.com/s/files/1/0948/0618/0125/files/meta-image.jpg?v=1755860664'],
  },
}

const remap = (arr: KeyValue[]): MarqueeProps => {
  return arr.reduce((acc, item) => {
    acc[item.key as keyof MarqueeProps] = item.value;
    return acc;
  }, {} as MarqueeProps);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { metaobjects }: ShopifyMetaobjectsResponse = await getMetaObjects('theme_color');
  const { metaobjects: marquee }: ShopifyMetaobjectsResponse = await getMetaObjects('marquee');
  const bgColor = metaobjects.edges[0].node.fields[0].value;
  const marqueeText = remap(marquee.edges[0].node.fields) || "";
  
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/djh2llz.css" />
      </head>
      <body
        className={`antialiased`}
      >
        <GoogleTagManager gtmId=""/>
        <Header bgColor={bgColor} marqueeText={marqueeText}/>
        {children}
        <Subscribe />
        <Footer />
        <ThemeHydrator handle="theme_color"/>
        <ToastContainer />
      </body>
    </html>
  );
}
