import CheckoutForm from "@/app/components/checkout";
import OrderSummary from "@/app/components/order-summary";



type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string>>
}


export default async function Page({
  params,
  searchParams
}: Props) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const { amount } = resolvedSearchParams;

  return (
    <main className="py-32">
      <div className="grid lg:grid-cols-2">
        <OrderSummary amount={amount} />
        <CheckoutForm lang={lang} amount={amount} />
      </div>
    </main>
  )
}