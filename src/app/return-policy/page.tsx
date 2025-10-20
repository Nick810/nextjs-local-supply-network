import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
  description: 'Review Powerberry\'s policy on returns, exchanges, and defective items. Learn how we handle product issues and ensure customer satisfaction.',
};

export default function ReturnsExchanges() {
  return (
    <main className="container pt-32 pb-16">
      <h1 className="text-3xl font-semibold mb-6!">Returns & Exchanges</h1>

      <section className="space-y-6! max-w-2xl">
        <p>
          In any case, orders cannot be cancelled after completion, except in the case that the product is different from the order or is defective. We also do not accept returns at the customer&apos;s convenience.
        </p>

        <p>
          Please note that no refunds will be accepted for orders returned without prior notice, or for returns or cancellations due to refusal to accept the order.
        </p>

        <p>
          If you receive an item that is not what you ordered, or if the item is defective, please contact us within 30 days of receipt. In this case, we will bear the return shipping costs.
          We will inspect the condition of the product and if we are able to confirm the error or defect, we will replace the product if it is in stock or refund the money if it is not in stock.
        </p>

        <p>
          Please note that even if the product is defective, we may refuse to exchange it if we cannot determine that the product is &quote;unused&quote; according to our company&apos;s standards.
        </p>

        <h2 className="text-xl font-semibold mt-10">In Case of Defective Item</h2>

        <p>We apologize for any inconvenience caused.
          If you purchased the item at a store, please contact the store where you purchased the item and bring the item to us within 30 days, including the date of purchase.</p>

        <ul className="list-disc list-inside space-y-2!">
          <li>
            If you purchased the product at an online store, please contact support and return the product within 30 days, including the day you received the product.
          </li>
          <li>
            If purchased online, please contact our support team and return the item within 30
            days of receipt.
          </li>
        </ul>

        <p>
          After confirming the time of purchase and the condition of the item, we will take action.
If there is no defect attributable to our company, or if the product is defective but cannot be judged as &quote;unused&quote; according to our company&apos;s standards, we may refuse to deal with the problem. Please understand this in advance.
        </p>
      </section>
    </main>
  )
}
