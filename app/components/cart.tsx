import { useCartStore } from "@/app/lib/shopify/cart/cart-store";
import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import ImageWithSkeleton from "./image-with-skeleton";
import gsap from "gsap";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

type CartProps = {
  toggled: boolean;
  toggle: (open: boolean) => void;
  bgColor: string
  lang: string
};

const Cart: React.FC<CartProps> = ({ toggled, toggle, bgColor, lang }) => {
  const [checkingOut, setCheckingOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const items = useCartStore((s) => s.items)
  const t = useTranslations('cart');
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const router = useRouter();
  const handleCheckout = async () => {
    setError(null);
    setCheckingOut(true);

    try {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setIsVisible(false)
    router.push(`/${lang}/checkout?amount=${totalAmount}`);
  } catch (err) {
    setCheckingOut(false);
    setError('Could not proceed to payment. Please try again later.');
    console.error('Redirect error:', err);
  }
  }
  // compute total price
  const total = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  useEffect(() => {
    if (toggled) {
      setIsVisible(true); // Show cart immediately

      if (cartRef.current) {
        const tl = gsap.timeline();

        // Animate cart container
        tl.fromTo(
          cartRef.current,
          {
            scale: 0.95,
            opacity: 0,
            transformOrigin: "top right",
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          0
        );

        // Animate list items inside cart
        tl.fromTo(
          cartRef.current.querySelectorAll("li"),
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    } else {
      if (cartRef.current) {
        const tl = gsap.timeline({
          onComplete: () => setIsVisible(false),
        });

        // Animate cart container out
        tl.to(cartRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    }
  }, [toggled]);


  return (
    <div 
      ref={cartRef}
      className={`${isVisible ? "fixed" : "hidden"} w-full max-w-[600px] h-screen top-26 right-0 z-100`}
      style={{ backgroundColor: bgColor,
        boxShadow: '4px 0 30px -2px rgba(0,0,0,0.1)'
       }}
    >
      <div className="flex flex-row items-center justify-between py-6 px-[5%]">
        <h2 className="text-3xl">{t('title')}</h2>
        <button onClick={() => toggle(false)} className="text-black cursor-pointer">
          <Image src="/close.svg" alt="Close Button" width={48} height={48} priority />
        </button>
      </div>

      { 
          items.length === 0 ? (
          <p className="px-[5%]">{t('empty_pg')}</p>
        ) : (
        <ul className="px-[5%] space-y-4 mt-8 w-full">
          {
          items.map((item) => {
            const [color, size] = item.varaintTitle.split('/');

            return (
              <li
                key={item.variantId}
                className="flex items-center justify-between"
              >
                <div className="flex flex-row min-w-full gap-4 border-b border-[#ebebeb] py-4">
                  <div className="relative aspect-square w-full h-full max-w-[20%]!">
                    <ImageWithSkeleton
                      src={item.image || ''} 
                      alt={item.title} 
                      className="object-cover"
                     />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <p className="text-sm leading-4">{item.title}</p>
                    <p className="">{size}</p>
                    <p className="text-gray-400!">{color !== 'Default Title' ? color : ''}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-[#818181] rounded-full text-sm cursor-pointer" 
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                      >
                        –
                      </button>
                      <span className="">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-[#818181] rounded-full text-sm cursor-pointer"                        
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="justify-self-end flex flex-col">
                    <p className="text-right text-sm">฿{Number(item.price * 1).toLocaleString()}</p>
                    <button
                      className="cursor-pointer mt-auto"
                      onClick={() => removeItem(item.variantId)}
                    >
                      <Image src="/trash.svg" alt="Remove Item Button" width={20} height={20} className="ml-auto" priority/>
                    </button>
                  </div>
                  
                </div>
              </li>
            )
          })}
        </ul>
        )
      }
      
      <div className="mt-6 pt-4">

        {items.length !== 0 && (<div className="flex flex-row items-center justify-between px-[5%]">
          <p className="text-xl font-bold!">{t('subtotal')}:</p>
          <p className="text-lg font-bold!">฿{(total * 1).toLocaleString()}</p>
        </div>)}
        {
          error ?? <p className="text-[#E21515]">{error}</p>
        }
        <div className="relative mt-2 px-[5%]">

          <div>
            {items.length > 0 && (
              <button
                className="mt-4 btn m-auto z-21 bg-accent text-sm!"
                disabled={checkingOut}
                onClick={handleCheckout}
              >
                { checkingOut ? t('button.loading') : t('button.checkout')}
              </button>
            )  }
          </div>

        </div>

      </div>
    </div>
  )
}
export default Cart