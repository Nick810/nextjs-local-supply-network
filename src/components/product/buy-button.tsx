'use client';

import { sendGTMEvent } from '@next/third-parties/google'

interface BuyButtonProps {
  onClick: () => void;
  isAvailable: boolean;
  isPreorder?: boolean;
  productTitle?: string;
  quantity?: number;
}

const BuyButton: React.FC<BuyButtonProps> = ({ onClick, isAvailable, productTitle, quantity, isPreorder = false }) => {
  const handleClick = () => {

    onClick()

    const pathname = window.location.pathname;
    const productSlug = pathname.split('/').pop() || 'unknown-product';
    
    // Send GTM event
    sendGTMEvent({
      event: 'add_to_cart',
      value: {
        item_name: productTitle,
        item_id: productSlug,
        quantity: quantity,
        timestamp: new Date().toISOString()
      }
    });
  }


  const canBuy = isAvailable || isPreorder;

  return (
    <button
      className={`btn text-white! cursor-pointer btn-main-color max-w-[480px] 
      ${!canBuy ? 'bg-[#d9d9d9]! cursor-not-allowed!' : ''}`}
      disabled={!canBuy}
      onClick={canBuy ? handleClick : undefined}
    >
      { isAvailable ? 'Add to Cart' : isPreorder ? 'Preorder Now' : 'Sold Out' }
    </button>
  )
}
export default BuyButton