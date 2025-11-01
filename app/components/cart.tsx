import { useCartStore } from "@/app/lib/shopify/cart/cart-store";
import Image from "next/image";
import { useMemo, useState, useRef, useEffect } from "react";
import ImageWithSkeleton from "./image-with-skeleton";
import AuthPromptModal from "./auth-prompt-modal";
import gsap from "gsap";

type CartProps = {
  toggled: boolean;
  toggle: (open: boolean) => void;
  bgColor: string
};

const Cart: React.FC<CartProps> = ({ toggled, toggle, bgColor}) => {
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false);
  const [checkingOut, setCheckingOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const checkout = useCartStore((s) => s.checkout)
  const handleCheckout = async () => {
    setError(null);
    setCheckingOut(true);

    try {
      const url = await checkout()
      if (url) window.location.href = url
    } catch (err) {
      setCheckingOut(false);
      setError('Could not proceed to checkout. Please try again later.')
      console.error('Checkout error:', err)
      alert('Could not proceed to checkout.')
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
      className={`${isVisible ? "fixed" : "hidden"} w-full max-w-[600px] h-screen top-0 right-0 z-100`}
      style={{ backgroundColor: bgColor,
        boxShadow: '4px 0 30px -2px rgba(0,0,0,0.1)'
       }}
    >
      <div className="flex flex-row items-center justify-between py-6 px-[5%]">
        <h2 className="text-3xl">Cart</h2>
        <button onClick={() => toggle(false)} className="text-black cursor-pointer">
          <Image src="/close.svg" alt="Close Button" width={48} height={48} priority />
        </button>
      </div>

      { 
          items.length === 0 ? (
          <p className="px-[5%]">Your cart is empty.</p>
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
                <div className="flex flex-row min-w-full gap-4 border-b border-[#818181] py-4">
                  <div className="relative w-[20%]">
                    <ImageWithSkeleton
                      src={item.image || ''} 
                      alt={item.title} 
                      className="object-cover"
                     />
                  </div>

                  <div className="flex-1 flex flex-col gap-1">
                    <p className="text-sm leading-4">{item.title}</p>
                    <p className="">{size}</p>
                    <p className="">{color !== 'Default Title' ? color : ''}</p>
                    <div className="flex items-center space-x-3">
                      <button
                        className="w-6 h-6 flex items-center justify-center border border-[#818181] rounded-full text-sm cursor-pointer"                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="w-6 h-6 flex items-center justify-center border border-[#818181] rounded-full text-sm cursor-pointer"                        onClick={() =>
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
          <p className="text-xl font-bold!">Subtotal:</p>
          <p className="text-lg font-bold!">฿{(total * 1).toLocaleString()}</p>
        </div>)}
        {
          error ?? <p className="text-[#E21515]">{error}</p>
        }
        <div className="relative mt-2 px-[5%]">

          <div>
            {items.length > 0 && (
              <button
                className="mt-4 btn m-auto z-21 btn-main-color"
                disabled={checkingOut}
                onClick={handleCheckout}
              >
                { checkingOut ? 'Please wait...' : 'Checkout'}
              </button>
            )  }
          </div>

        </div>

      </div>
      {showAuthPrompt && (
        <AuthPromptModal
          onContinueAsGuest={async () => {
            setShowAuthPrompt(false);
            setCheckingOut(true);
            const url = await checkout();
            if (url) window.location.href = url;
          }}
          onSignIn={() => {
            window.location.href = '/account/login';
          }}
          onClose={() => setShowAuthPrompt(false)}
        />
      )}
    </div>
  )
}
export default Cart