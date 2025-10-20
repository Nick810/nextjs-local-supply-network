import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy ',
  description: 'Learn how Powerberry collects, uses, and protects your personal information when you shop with us.',
};

const CopyrightPolicy: React.FC = () => {
  return (
    <main className="container text-[#4B724D] py-32">
      <h1 className="text-3xl font-semibold mb-6!">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: August 21, 2025</p>

      <section className="space-y-6">
        <p>
          Powerberry operates this store and website, including all related information, content,
          features, tools, products and services, in order to provide you, the customer, with a
          curated shopping experience (the &quot;Services&quot;). Powered by Shopify, we use their platform
          to deliver these Services.
        </p>

        <p>
          This Privacy Policy describes how we collect, use, and disclose your personal
          information when you visit, use, or make a purchase or other transaction using the
          Services or otherwise communicate with us.
        </p>

        <h2 className="text-xl font-semibold mt-10">Personal Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Contact details: name, address, phone number, email</li>
          <li>Financial info: card numbers, payment details</li>
          <li>Account info: username, password, preferences</li>
          <li>Transaction history: viewed, purchased, returned items</li>
          <li>Communications: messages sent to customer support</li>
          <li>Device info: browser, IP address, identifiers</li>
          <li>Usage data: interaction and navigation behavior</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10">Sources of Personal Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Directly from you</li>
          <li>Automatically via cookies and device usage</li>
          <li>From service providers and partners</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide and improve the Services</li>
          <li>For marketing and advertising</li>
          <li>For security and fraud prevention</li>
          <li>To communicate with you</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10">Disclosure of Personal Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>With Shopify and service providers</li>
          <li>With marketing partners</li>
          <li>With your consent or direction</li>
          <li>Within our corporate group</li>
          <li>In connection with legal or business transactions</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10">Relationship with Shopify</h2>
        <p>
          Our Services are hosted by Shopify, which collects and processes personal information to
          improve your experience. Shopify may use data from your interactions with our store and
          other merchants. For more details, visit the{' '}
          <a
            href="https://www.shopify.com/legal/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Shopify Consumer Privacy Policy
          </a>{' '}
          or manage your rights via the{' '}
          <a
            href="https://privacy.shopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Shopify Privacy Portal
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-10">Third-Party Links</h2>
        <p>
          Our Services may link to external sites. We are not responsible for their privacy
          practices or content. Please review their policies before sharing personal information.
        </p>

        <h2 className="text-xl font-semibold mt-10">Children’s Data</h2>
        <p>
          Our Services are not intended for children. We do not knowingly collect personal
          information from individuals under the age of majority. Parents or guardians may contact
          us to request deletion of such data.
        </p>
      </section>
    </main>
  );
};

export default CopyrightPolicy;