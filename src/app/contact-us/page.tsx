import ContactForm from '@/components/contact/form';
import { Metadata } from 'next';
import Image from 'next/image';
import logo from '../../../public/lsn-logo.png';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Connect with Powerberry for inquiries, collaborations, or thoughtful conversations. Reach out directly or through our contact form—every message is received with care and intention.'
}

const Contact: React.FC = () => {
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  "mainEntity": {
    "@type": "Organization",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66 65-939-5247",
      "contactType": "Customer Service",
      "areaServed": "TH",
      "availableLanguage": ["Thai", "English"]
    }
  }
}

  return (
    <>
      <main className="container flex flex-col items-center justify-center pt-32!">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />

        <Image src={logo} alt="" width={100} height={100} priority/>
        
        <div className="w-full space-y-8 mt-12">
          <div>
            <h1 className="text-center text-5xl font-extrabold text-[#125144] mb-8!">
              Contact Us
            </h1>
            <div className="pb-8 border-gray-300 border-t max-w-[240px] m-auto"></div>
            <p className='m-auto max-w-xl!'>We welcome you to reach out with any inquiries, collaborations, or thoughtful conversations. We invite you to connect through the form below or directly via our dedicated contact channels.</p>
          </div>

          <div className=''>
            <address className="max-w-xl mb-8! space-y-4! text-gray-800 m-auto">
              
              {/* <p className="text-md">
                <span className="font-medium">Name: </span>Parin
              </p> */}
              
              <p className="text-md">
                <span className="font-medium">Address: </span>540/4 soi Ladphrao 87 Wangthonglang Klongjaokhunsing Bangkok 10310 Thailand
              </p>
              
              <p className="text-md">
                <span className="font-medium">Phone: </span> +66 65-939-5247
              </p>
              
              <p className="text-md">
                <span className="font-medium">Email: </span> <a href="mailto:support@powerberryharvest.com" className="text-[#125144] underline hover:text-[#0f4036]">support@powerberryharvest.com</a>
              </p>
            </address>

            <ContactForm />
          </div>

        </div>
      </main>
    </>
  );
};

export default Contact;