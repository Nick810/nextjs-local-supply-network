import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy ',
  description: 'Learn how Powerberry collects, uses, and protects your personal information when you shop with us.',
};


const PrivacyPolicy: React.FC = () => {
  return (
    <main className="container pt-32 pb-16">
      <div className='max-w-2xl'>
        <h1 className="text-3xl font-semibold mb-6!">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8!">Last updated: August 21, 2025</p>

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

          <h2 className="text-xl font-semibold mt-10! mb-4!">Personal Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Contact details: name, address, phone number, email</li>
            <li>Financial info: card numbers, payment details</li>
            <li>Account info: username, password, preferences</li>
            <li>Transaction history: viewed, purchased, returned items</li>
            <li>Communications: messages sent to customer support</li>
            <li>Device info: browser, IP address, identifiers</li>
            <li>Usage data: interaction and navigation behavior</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Sources of Personal Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Directly from you</li>
            <li>Automatically via cookies and device usage</li>
            <li>From service providers and partners</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4!">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and improve the Services</li>
            <li>For marketing and advertising</li>
            <li>For security and fraud prevention</li>
            <li>To communicate with you</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Disclosure of Personal Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>With Shopify and service providers</li>
            <li>With marketing partners</li>
            <li>With your consent or direction</li>
            <li>Within our corporate group</li>
            <li>In connection with legal or business transactions</li>
          </ul>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Relationship with Shopify</h2>
          <p>
            Our Services are hosted by Shopify, which collects and processes personal information to
            improve your experience. Shopify may use data from your interactions with our store and
            other merchants. For more details, visit the{' '}
            <a
              href="https://www.shopify.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Shopify Consumer Privacy Policy
            </a>{' '}
            or manage your rights via the{' '}
            <a
              href="https://privacy.shopify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Shopify Privacy Portal
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Third-Party Links</h2>
          <p>
            Our Services may link to external sites. We are not responsible for their privacy
            practices or content. Please review their policies before sharing personal information.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Children’s Data</h2>
          <p>
            Our Services are not intended for children. We do not knowingly collect personal
            information from individuals under the age of majority. Parents or guardians may contact
            us to request deletion of such data.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Security and Retention of Your Information</h2>
          <p>
            Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee
            &quot;perfect security.&quot; Any information you send to us may not be secure while in transit. We
            recommend avoiding unsecure channels when communicating sensitive or confidential information.
          </p>
          <p>
            The duration for which we retain your personal information depends on factors such as account
            maintenance, service delivery, legal compliance, dispute resolution, and enforcement of
            applicable contracts and policies.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have rights regarding your personal information. These
            rights may include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Right to Access / Know</li>
            <li>Right to Delete</li>
            <li>Right to Correct</li>
            <li>Right of Portability</li>
            <li>Managing Communication Preferences</li>
          </ul>
          <p>
            You may exercise these rights via the Services or by contacting us. For data processed by
            Shopify, visit{' '}
            <a
              href="https://privacy.shopify.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Shopify Privacy Portal
            </a>
            .
          </p>
          <p>
            We will not discriminate against you for exercising your rights. Identity verification may be
            required before processing requests. You may also designate an authorized agent to act on your
            behalf.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Complaints</h2>
          <p>
            If you have concerns about how we handle your personal information, please contact us. Depending
            on your jurisdiction, you may also appeal our decisions or file a complaint with your local data
            protection authority.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">International Transfers</h2>
          <p>
            We may transfer, store, and process your personal information outside your country of residence.
            For transfers out of the EEA or UK, we rely on recognized mechanisms such as Standard
            Contractual Clauses or equivalent safeguards, unless the destination country offers adequate
            protection.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or legal
            requirements. Updates will be posted on this website with a revised &quot;Last updated&quot; date and
            notice as required by law.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-4!">Contact</h2>
          <p>
            If you have questions about our privacy practices or wish to exercise your rights, please reach
            out to us at:
          </p>
          <address className="not-italic text-gray-700 space-y-2!">
            <p>Email: <a href="mailto:support@powerberryharvest.com" className=" underline">support@powerberryharvest.com</a></p>
            <p><span className="font-medium">Address: </span>540/4 soi Ladphrao 87 Wangthonglang Klongjaokhunsing Bangkok 10310 Thailand</p>
          </address>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;