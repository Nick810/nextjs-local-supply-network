'use client';

import { useCartStore } from "@/app/lib/shopify/cart/cart-store";
import { useCallback, useMemo, useState } from "react";
import { EmblaOptionsType } from 'embla-carousel'
import ProductDrawer from "./product-drawer";
import VariantSelector from "./variant-selector";
import EmblaCarousel from "./carousel/image-carousel";
import Image from "next/image";
import BuyButton from "./buy-button";
import WaitlistButton from "./waiting-list-button";
import RichTextRenderer from "../rich-text-renderer";

const shippingInfo = `
  <ul>
    <li>🚚 Every order ships with EMS for just ฿50 — fast, secure, and trackable. Estimated delivery: 2–3 days in Thailand.</li>
    <li>FREE EMS Shipping on orders over 2,500 THB</li>
    <li>International orders are shipped via FastShip and typically arrive within 3 to 7 business days.</li>
  </ul>
  `

interface ProductProps {
  product: {
    title: string;
    tags: string[];
    descriptionHtml: string;
    images?: {
      edges: Array<{
        node: {
          url: string;
          altText?: string | null;
        };
      }>;
    };
    metafield1: {
      value: string
    }
    metafield2: {
      value: string
    }
    metafield3: {
      value: string
    }
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    variants: {
      nodes: Array<{
        availableForSale: boolean;
        id: string;
        variantMetafield1: {
          value: string;
        };
        priceV2: {
          amount: string;
        };
        title: string;
      }>;
    };
  } | null;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const images = product?.images?.edges?.map((edge) => edge.node) || []; 
  const variants = product?.variants?.nodes || [];
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const addItem = useCartStore(state => state.addItem);
  const limitAmount = product?.metafield1?.value;
  const selected = variants[selectedIndex]
  const isPreorder = selected.variantMetafield1?.value === 'true';
  const price = useMemo(
    () => selectedVariant?.priceV2?.amount || "0",
    [selectedVariant]
  );
  const handleAddToCart = useCallback(() => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;
    addItem({
      variantId: selectedVariant.id,
      varaintTitle: selectedVariant.title,
      title: product!.title,
      price: Number(selectedVariant.priceV2.amount),
      image: product!.images?.edges[0]?.node.url,
      quantity,
    });
  }, [addItem, selectedVariant, quantity, product]);
  const hasOneVariantAndDefaultTitle = variants.length === 1 && variants[0].title === 'Default Title'

  const OPTIONS: EmblaOptionsType = { axis: 'y' }

  const renderPurchaseSection = () => {
    if (isPreorder) {
      return (
        <>
          <div className="mb-4 text-red">
            <RichTextRenderer
              value={
                product?.metafield3
                  ? JSON.parse(product.metafield3.value)
                  : { type: 'root', children: [] }
              }
            />
          </div>
          <BuyButton
            onClick={handleAddToCart}
            isAvailable={true}
            isPreorder={true}
            productTitle={product?.title}
            quantity={quantity}
          />
        </>
      )
    }
    
    if (selected.availableForSale) {
      return (
        <BuyButton
          onClick={handleAddToCart}
          isAvailable={true}
          productTitle={product?.title}
          quantity={quantity}
        />
      )
    }

    if (!isPreorder && !selected.availableForSale) {
      return (
        <>
          <p className="text-red-600">
            This product is currently sold out. Please join the waitlist below.
          </p>
          <WaitlistButton
            productTitle={product?.title || 'Unknown Product'}
            variantTitle={variants[selectedIndex].title}
          />
        </>
      )
    }

    return (
      <>
        <p className="text-red-600">
          This product is currently sold out. Please join the waitlist below.
        </p>
        <WaitlistButton
          productTitle={product?.title || 'Unknown Product'}
          variantTitle={variants[selectedIndex].title}
        />
      </>
    )
  }
  
  return (
    <div className="md:flex">
      {product?.images?.edges[0] && (<EmblaCarousel  options={OPTIONS} data={images} />)}
      
      <div className="container mt-8 md:basis-[40%] lg:basis-[63%]">
        <div className="flex flex-row items-start gap-8 justify-between">
          <h1 className="text-3xl lg:text-4xl leading-8! max-w-[560px]">{product?.title}</h1>
          <p className="text-xl"><span className="mr-1">฿</span>{(Number(price) * 1).toLocaleString()}</p>
        </div>

        {
          !hasOneVariantAndDefaultTitle && 
          (
            <VariantSelector
              variants={variants}
              // colorMap={colorMap}
              onSelect={(variant) => {
                const index = variants.findIndex(v => v.id === variant.id);
                setSelectedVariant(variant);
                setSelectedIndex(index);
              }}
            />
          )
        }

        <div className="w-full border-b border-[#818181] py-2 mb-8 mt-4 max-w-[160px]">
          <div className="flex items-center justify-between text-black">
            <span className="text-sm font-medium">Quantity</span>

            <div className="relative">
              <select
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="appearance-none bg-transparent px-3 py-1 pr-8 text-sm text-black focus:outline-none focus:none"
              >
                {[...Array(limitAmount ? +limitAmount : 10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500 text-xs">
                <Image src="/arrow-down.svg" alt="" width={16} height={16} priority />
              </div>
            </div>
          </div>
        </div>

        { renderPurchaseSection() }

        <div className="mt-8 max-w-[560px]">
          <ProductDrawer data={{ title: 'Details', details: product?.descriptionHtml, html: true, isCollapsible: false }} />
          <ProductDrawer data={{ title: 'Shipping & Returns', details: shippingInfo, html: true, isCollapsible: false }} />
        </div>

      </div>
      
    </div>
  )
}
export default Product;