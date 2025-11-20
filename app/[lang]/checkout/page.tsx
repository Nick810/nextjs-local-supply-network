import CheckoutForm from "@/app/components/checkout-form";
import OrderSummary from "@/app/components/order-summary";

type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string>>
}

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
  searchParams
}: Props) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const { amount } = resolvedSearchParams;

  return (
    <main className="fixed inset-0 bg-white overflow-hidden z-1000">
      <div className="flex h-full lg:flex-row flex-col">
        <aside className="hidden lg:block lg:w-1/2 bg-gray-100 p-8 overflow-y-auto">
          <OrderSummary amount={amount} />
        </aside>
        <section className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-xl mx-auto w-full">
            <CheckoutForm lang={lang} amount={amount} />
          </div>
        </section>
      </div>
    </main>
  )
}