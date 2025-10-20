import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Review Powerberry's Terms of Service outlining your rights, responsibilities, and conditions when using our website and services.`,
};

const TermsAndConditions: React.FC = () => {
  return (
    <main className="container pt-32 pb-16 text-gray-800">

      <h1 className="text-3xl font-semibold mb-6!">Terms of Service</h1>

      <section className="space-y-6! max-w-2xl">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p>
          Welcome to Powerberry! The terms “we”, “us” and “our” refer to Powerberry. We operate
          this store and website to provide you with a curated shopping experience (the
          “Services”), powered by Shopify.
        </p>
        <p>
          These Terms of Service (“Terms”) describe your rights and responsibilities when using
          the Services. By accessing or using our Services, you agree to be bound by these Terms
          and our{' '}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold">Section 1 – Access and Account</h2>
        <p>
          You must be at least the age of majority in your jurisdiction to use the Services. You
          agree to provide accurate and complete information and are responsible for maintaining
          the security of your account credentials.

        </p>

        <h2 className="text-xl font-semibold">Section 2 – Our Products</h2>
        <p>
          We strive to represent our products accurately, but colors and appearance may vary by
          device. We do not guarantee that products will meet expectations. Descriptions and
          availability may change without notice.

        </p>

        <h2 className="text-xl font-semibold">Section 3 – Orders</h2>
        <p>
          Orders are offers to purchase and are subject to acceptance. We reserve the right to
          decline or cancel orders. Your purchases are governed by our{' '}
          <a href="/returns-exchanges" className="underline">
            Refund Policy
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold">Section 4 – Prices and Billing</h2>
        <p>
          Prices and promotions may change without notice. You agree to provide accurate payment
          details and authorize charges for purchases, including applicable taxes and shipping.

        </p>

        <h2 className="text-xl font-semibold">Section 5 – Shipping and Delivery</h2>
        <p>
          Delivery times are estimates and not guaranteed. We are not responsible for delays
          caused by carriers or external factors. Risk of loss transfers to you upon shipment.

        </p>

        <h2 className="text-xl font-semibold">Section 6 – Intellectual Property</h2>
        <p>
          All content and trademarks on the Services are owned by Powerberry or its licensors and
          protected by law. You may not reproduce or use any materials without written permission.

        </p>

        <h2 className="text-xl font-semibold">Section 7 – Optional Tools</h2>
        <p>
          Third-party tools may be provided “as is” without warranties. Use of such tools is at
          your own risk and subject to the third party’s terms.

        </p>

        <h2 className="text-xl font-semibold">Section 8 – Third-Party Links</h2>
        <p>
          We are not responsible for third-party websites or content. Use them at your own risk
          and review their policies before engaging in transactions.

        </p>

        <h2 className="text-xl font-semibold">Section 9 – Relationship with Shopify</h2>
        <p>
          Powerberry is powered by Shopify, but all purchases are made directly with Powerberry.
          Shopify is not responsible for any aspect of your transactions with us. You release
          Shopify from all related claims and liabilities.
        </p>

        <h2 className="text-xl font-semibold">Section 10 – Privacy Policy</h2>
        <p>
          All personal information collected through the Services is subject to our{' '}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>{' '}
          and Shopify’s{' '}
          <a href="https://www.shopify.com/legal/privacy" className="underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          . By using the Services, you acknowledge that you have read and understood these policies.
        </p>
        <p>
          Shopify may collect and process personal data to operate and improve the Services. Your
          information may be transmitted to third parties in other countries to fulfill service
          obligations.

        </p>

        <h2 className="text-xl font-semibold">Section 11 – Feedback</h2>
        <p>
          By submitting any ideas, reviews, or suggestions (“Feedback”), you grant us a
          royalty-free, perpetual license to use and display such content for any purpose. You
          confirm you have rights to the Feedback and that it complies with these Terms.
        </p>
        <p>
          We may monitor or remove Feedback at our discretion. You agree not to submit unlawful,
          abusive, or misleading content and are solely responsible for its accuracy.

        </p>

        <h2 className="text-xl font-semibold">Section 12 – Errors, Inaccuracies and Omissions</h2>
        <p>
          Occasionally, the Services may contain errors or omissions related to product details,
          pricing, or availability. We reserve the right to correct such issues and cancel orders
          if necessary, without prior notice.

        </p>

        <h2 className="text-xl font-semibold">Section 13 – Prohibited Uses</h2>
        <p>
          You agree to use the Services lawfully and refrain from activities such as impersonation,
          harassment, spreading malware, or violating intellectual property rights. We may suspend
          or terminate your account for violations without notice.

        </p>

        <h2 className="text-xl font-semibold">Section 14 – Termination</h2>
        <p>
          We may terminate your access to the Services at any time. Sections such as Intellectual
          Property, Feedback, and Limitation of Liability will survive termination.

        </p>

        <h2 className="text-xl font-semibold">Section 15 – Disclaimer of Warranties</h2>
        <p>
          The Services and products are provided “as is” without warranties of any kind. We do not
          guarantee uninterrupted or error-free access. Your use of the Services is at your own
          risk.

        </p>

        <h2 className="text-xl font-semibold">Section 16 – Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Powerberry and its affiliates shall not be liable
          for any damages arising from your use of the Services or products, including indirect or
          consequential losses.

        </p>

        <h2 className="text-xl font-semibold">Section 17 – Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Powerberry, Shopify, and their affiliates from
          any claims or liabilities arising from your breach of these Terms, violation of law, or
          use of the Services. We may control the defense of such claims and you agree to
          cooperate fully.

        </p>

        <h2 className="text-xl font-semibold">Section 18 – Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable, the remainder will remain
          valid and enforceable to the fullest extent permitted by law.

        </p>

        <h2 className="text-xl font-semibold">Section 19 – Waiver; Entire Agreement</h2>
        <p>
          Our failure to enforce any provision does not waive our rights. These Terms, along with
          posted policies, represent the entire agreement between you and Powerberry, superseding
          prior communications.

        </p>

        <h2 className="text-xl font-semibold">Section 20 – Assignment</h2>
        <p>
          You may not assign your rights under these Terms without our consent. We may assign or
          delegate our rights and obligations without notice.

        </p>

        <h2 className="text-xl font-semibold">Section 21 – Governing Law</h2>
        <p>
          These Terms are governed by the laws and courts of the jurisdiction where Powerberry is
          headquartered. You consent to venue and personal jurisdiction in those courts.

        </p>

        <h2 className="text-xl font-semibold">Section 22 – Headings</h2>
        <p>
          Headings are for convenience only and do not affect the interpretation of these Terms.

        </p>

        <h2 className="text-xl font-semibold">Section 23 – Changes to Terms of Service</h2>
        <p>
          We may update these Terms at any time by posting changes to our website. Material
          changes will be communicated as required by law. Continued use of the Services
          constitutes acceptance of the updated Terms.

        </p>

        <h2 className="text-xl font-semibold">Section 24 – Contact Information</h2>
        <p>
          Questions about these Terms should be directed to{' '}
          <a
            href="mailto:support@powerberryharvest.com"
            className="underline"
          >
            support@powerberryharvest.com
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default TermsAndConditions;