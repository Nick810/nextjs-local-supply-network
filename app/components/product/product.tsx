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
import Link from "next/link";
import { VENDORS } from "@/app/lib/vendors";
import { useTranslations } from "next-intl";

interface ProductProps {
  lang: string;
  product: {
    title: string;
    tags: string[];
    vendor: string;
    descriptionHtml: string;
    images?: {
      edges: Array<{
        node: {
          url: string;
          altText?: string | null;
        };
      }>;
    };
    metafield1?: {
      value: string
    }
    metafield2?: {
      value: string
    }
    metafield3?: {
      value: string
    }
    metafield4?: {
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

const Product: React.FC<ProductProps> = ({ product, lang }) => {
  const images = product?.images?.edges?.map((edge) => edge.node) || []; 
  const variants = product?.variants?.nodes || [];
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const addItem = useCartStore(state => state.addItem);
  const limitAmount = product?.metafield1?.value;
  const selected = variants[selectedIndex]
  const isPreorder = selected.variantMetafield1?.value === 'true';
  const matchedVendor = VENDORS.find(v => v.name.toLowerCase() === product?.vendor.toLowerCase());
  const vendorLogo = matchedVendor?.logo;
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

  const t = useTranslations('product');
  const tBtn = useTranslations('button');

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

      <div className="container mt-4">
        <Link href={`/${lang}/story/${product?.vendor}`} className="flex flex-row items-end space-x-4">
          <div className="relative aspect-square w-full max-w-12">
            <Image src={vendorLogo || ''} alt="" fill />
          </div>
          <p className="text-black underline">by { product?.vendor }</p>
        </Link>
      </div>
      
      <div className="container mt-6 md:basis-[40%] lg:basis-[63%]">
        <div className="flex flex-row items-start gap-8 justify-between">
          <h1 className="text-2xl lg:text-4xl leading-8! max-w-[560px]">{product?.title}</h1>
          <p className="text-xl"><span className="mr-1">฿</span>{(Number(price) * 1).toLocaleString()}</p>
        </div>

        {
          !hasOneVariantAndDefaultTitle && 
          (
            <VariantSelector
              variants={variants}
              onSelect={(variant) => {
                const index = variants.findIndex(v => v.id === variant.id);
                setSelectedVariant(variant);
                setSelectedIndex(index);
              }}
            />
          )
        }

        <div className="w-full border-b border-[#818181] py-2 mb-8 mt-4">
          <div className="flex items-center justify-between text-black">
            <span className="text-sm font-medium">{t('quantity')}</span>

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
          <ProductDrawer data={{ title: t('details'), details: product?.descriptionHtml, html: true, isCollapsible: false }} />
        </div>

        <div className="">
          <svg width="45" height="39" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.2109 0C27.7031 0 28.4062 0.316406 29.3203 0.949219C30.2344 1.58203 30.7969 2.17969 31.0078 2.74219C28.6172 4.14844 26.7891 5.83594 25.5234 7.80469C24.2578 9.70312 23.625 11.1797 23.625 12.2344C23.625 13.0781 23.9766 13.9219 24.6797 14.7656C25.4531 15.6094 26.1914 16.4531 26.8945 17.2969C27.668 18.1406 28.0547 18.9844 28.0547 19.8281C28.0547 21.0938 27.3164 22.1836 25.8398 23.0977C24.4336 24.0117 22.8516 24.4688 21.0938 24.4688C19.4766 24.4688 18.1758 24.082 17.1914 23.3086C16.1367 21.6914 15.6094 19.2305 15.6094 15.9258C15.6094 14.0977 15.9609 12.3047 16.6641 10.5469C17.4375 8.71875 18.3516 7.20703 19.4062 6.01172C20.8828 4.32422 22.4297 2.91797 24.0469 1.79297C25.6641 0.597656 26.7187 0 27.2109 0ZM11.6016 0C12.0937 0 12.7969 0.316406 13.7109 0.949219C14.625 1.58203 15.1875 2.17969 15.3984 2.74219C13.0078 4.14844 11.1797 5.83594 9.91406 7.80469C8.64844 9.70312 8.01562 11.1797 8.01562 12.2344C8.01562 13.0781 8.36719 13.9219 9.07031 14.7656C9.84375 15.6094 10.582 16.4531 11.2852 17.2969C12.0586 18.1406 12.4453 18.9844 12.4453 19.8281C12.4453 21.0938 11.707 22.1836 10.2305 23.0977C8.82422 24.0117 7.24219 24.4688 5.48438 24.4688C3.86719 24.4688 2.56641 24.082 1.58203 23.3086C0.527344 21.6914 0 19.2305 0 15.9258C0 14.0977 0.351562 12.3047 1.05469 10.5469C1.82812 8.71875 2.74219 7.20703 3.79688 6.01172C5.27344 4.32422 6.82031 2.91797 8.4375 1.79297C10.0547 0.597656 11.1094 0 11.6016 0Z" fill="#737373"/>
          </svg>

          <blockquote className="text-black px-16">
            <RichTextRenderer
              value={
                product?.metafield4
                  ? JSON.parse(product.metafield4.value)
                  : { type: 'root', children: [] }
              }
            />
          </blockquote>

          <p className="text-black mt-4 px-16">&mdash;&nbsp; { product?.vendor }</p>

          <div className="flex justify-end">
            <svg width="45" height="39" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.79687 24.4688C3.30469 24.4688 2.60156 24.1523 1.6875 23.5195C0.773435 22.8867 0.210935 22.2891 -2.64727e-06 21.7266C2.39062 20.3203 4.21875 18.6328 5.48437 16.6641C6.75 14.7656 7.38281 13.2891 7.38281 12.2344C7.38281 11.3906 7.03125 10.5469 6.32812 9.70313C5.55468 8.85938 4.8164 8.01563 4.11328 7.17188C3.33984 6.32813 2.95312 5.48438 2.95312 4.64063C2.95312 3.375 3.6914 2.28516 5.16796 1.3711C6.57421 0.457034 8.15625 2.14527e-06 9.91406 1.9916e-06C11.5312 1.85022e-06 12.832 0.38672 13.8164 1.16016C14.8711 2.77735 15.3984 5.23828 15.3984 8.54297C15.3984 10.3711 15.0469 12.1641 14.3437 13.9219C13.5703 15.75 12.6562 17.2617 11.6016 18.457C10.125 20.1445 8.57812 21.5508 6.96093 22.6758C5.34375 23.8711 4.28906 24.4688 3.79687 24.4688ZM19.4062 24.4688C18.9141 24.4688 18.2109 24.1523 17.2969 23.5195C16.3828 22.8867 15.8203 22.2891 15.6094 21.7266C18 20.3203 19.8281 18.6328 21.0937 16.6641C22.3594 14.7656 22.9922 13.2891 22.9922 12.2344C22.9922 11.3906 22.6406 10.5469 21.9375 9.70313C21.1641 8.85938 20.4258 8.01563 19.7227 7.17188C18.9492 6.32813 18.5625 5.48438 18.5625 4.64063C18.5625 3.375 19.3008 2.28516 20.7773 1.37109C22.1836 0.457032 23.7656 7.80658e-07 25.5234 6.26985e-07C27.1406 4.85606e-07 28.4414 0.386719 29.4258 1.16016C30.4805 2.77734 31.0078 5.23828 31.0078 8.54297C31.0078 10.3711 30.6562 12.1641 29.9531 13.9219C29.1797 15.75 28.2656 17.2617 27.2109 18.457C25.7344 20.1445 24.1875 21.5508 22.5703 22.6758C20.9531 23.8711 19.8984 24.4688 19.4062 24.4688Z" fill="#737373"/>
            </svg>
          </div>
          
          <div className="inline-flex flex-col justify-center items-center w-full mt-4">
            <Link href={`/${lang}/story/${product?.vendor}`} className="text-black underline border py-5 px-8 m-auto block">{tBtn('read_full_story')}</Link>
          </div>

        </div>

      </div>
      
    </div>
  )
}
export default Product;