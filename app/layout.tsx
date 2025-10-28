import type { Metadata, Viewport } from "next";
import './styles/reset.css'
import "./styles/globals.css"
import './styles/embla.css';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: Use window.location
    return window.location.origin;
  }
  // Server-side: Use environment variable or fallback
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://localsupply.network';
};

const baseUrl = getBaseUrl();


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDF2E3"
};

export const metadata: Metadata = {
  title: {
    template: '%s - Local Supply Network',
    default: 'Local Supply Network - Simplest Way to Buy Weed'
  },
  description: 'Local Supply Network is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.',
  openGraph: {
    title: 'Local Supply Network - Simplest Way to Buy Weed',
    description: 'Local Supply Network is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.',
    url: baseUrl,
    siteName: 'Local Supply Network Harvest',
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
    title: 'Local Supply Network',
    description: 'Local Supply Network is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.',
    images: ['https://cdn.shopify.com/s/files/1/0948/0618/0125/files/meta-image.jpg?v=1755860664'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/xsz1ojp.css" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
