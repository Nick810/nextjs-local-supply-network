'use client';

import { useState } from "react";
import { useCartStore } from "../lib/shopify/cart/cart-store";
import ImageWithSkeleton from "./image-with-skeleton";
import { ChevronDown } from 'lucide-react';
import { useTranslations } from "next-intl";

type Props = {
  amount: string
}

export default function OrderSummary({ amount }: Props) {
  const items = useCartStore((s) => s.items)
  const [isVisible, setIsvisible] = useState(false);
  const t = useTranslations('order_summary');

  return (
    <div className="grid lg:order-2">
      <div className="border-t border-b lg:hidden">
        <div className="flex items-center justify-between max-w-xl! container py-4" onClick={() => setIsvisible(!isVisible)}>
          <div className="flex items-center gap-2">
            {t('title')}
            <ChevronDown className=""/>
          </div>
          ฿{ (amount || 0).toLocaleString() }
        </div>
      </div>

      <div className={`${isVisible ? 'block' : 'hidden'} lg:block container bg-gray-100 py-8`}>
        <div className="max-w-xl! mx-auto">
          <ul>
            {
            items.map((item) => {
              const [color, size] = item.varaintTitle.split('/');
              const { quantity } = item;

              return (
                <li
                  key={item.variantId}
                  className="flex items-center justify-between"
                >
                  <div className="flex flex-row min-w-full gap-4 py-4">
                    <div className="relative aspect-square w-full h-full max-w-[20%]!">
                      <ImageWithSkeleton
                        src={item.image || ''} 
                        alt={item.title} 
                        className="object-cover rounded-md"
                        />
                      <span className="absolute -top-3 z-10 -right-3 py-1 px-2 bg-white border border-gray-500 rounded-full text-xs">{ quantity }</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-sm leading-4">{item.title}</p>
                      <p className="">{size}</p>
                      <p className="">{color !== 'Default Title' ? color : ''}</p>
                    </div>

                    <div className="justify-self-end flex flex-col">
                      <p className="text-right text-sm">฿{Number(item.price * 1).toLocaleString()}</p>
                    </div>
                    
                  </div>
                </li>
              )
            })}
          </ul>

          {/* <div className="flex justify-between mb-4">
            <p className="text-md font-bold!">Shipping:</p>
            <p className="text-lg font-bold!">฿0</p>
          </div> */}

          <div className="flex justify-between">
            <p className="text-xl font-bold!">Total:</p>
            <p className="text-lg font-bold!">฿{(Number(amount) * 1).toLocaleString()}</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}