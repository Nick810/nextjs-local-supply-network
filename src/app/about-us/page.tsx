import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: `Powerberry is a representative of youthfulness, a humble unity and a friendly reminder 
    that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.`
}

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Powerberry Harvest",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "logo": "https://cdn.shopify.com/s/files/1/0948/0618/0125/files/powerberry-logo.png?v=1755825727",
    "sameAs": [
      "https://www.instagram.com/powerberry_official/"
    ],
    "description": "Luxury e-commerce brand offering premium products and experiences."
  }

  return (
    <main className="container pt-32 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <h1 className="text-4xl md:text-5xl mb-8!">Powerberry</h1>
      <div className='max-w-3xl'>
        <p className="text-lg mb-8!">is a representative of youthfulness, a humble unity and a friendly reminder that we all have a younger version of ourselves, that life is beautiful, sometimes trippy while dreams can come true and full of possibilities.</p>
        <p className="text-lg mb-8!">Each product is the fruit which yields from imagination, experience and pure state of mind in each season and as we want to share the vibe of each collection the best way possible.</p>
        <p className="text-lg mb-8!">We present a free access to our exclusive album & playlist in every new collection through PWBR Records.</p>
      </div>
    </main>
  )
}
export default Page