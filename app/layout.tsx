import type { Metadata, Viewport } from "next";
import './styles/reset.css'
import "./styles/globals.css"
import './styles/embla.css';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: Use window.location
    return window.location.origin;
  }
  // Server-side: Use environment variable or fallback
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://localsupply.network';
};

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  return {
    title: {
      template: '%s - Local Supply Network',
      default: 'Local Supply Network - Simplest Way to Buy Weed'
    },
    description: 'Local Supply Network is a ...',
    openGraph: {
      title: 'Local Supply Network - Simplest Way to Buy Weed',
      description: 'Local Supply Network is a ...',
      url: baseUrl,
      siteName: 'Local Supply Network',
      images: [
        {
          url: `https://cdn.shopify.com/s/files/1/0942/4479/8827/files/lsn-meta-image.jpg?v=1763004994`,
          width: 1200,
          height: 630,
          alt: 'Local Supply Network',
        },
      ],
      locale: locale === 'th' ? 'th_TH' : 'en_US',
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
      description: 'Local Supply Network is a ...',
      images: ['https://cdn.shopify.com/s/files/1/0942/4479/8827/files/lsn-meta-image.jpg?v=1763004994'],
    },
  };
}


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f7"
};


export default function RootLayout({ children, params }: Props) {
  const { locale } = params;

  if (!['th', 'en'].includes(locale)) notFound();

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
