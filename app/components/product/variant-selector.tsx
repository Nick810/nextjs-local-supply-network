import { useEffect, useState } from "react";
// import ColorSwatch from "../color-swatch";

interface Variant {
  id: string;
  title: string; // "Black / S"
  availableForSale: boolean;
  variantMetafield1: {
    value: string;
  };
  priceV2: { amount: string };
}

interface Props {
  variants: Variant[]
  // colorMap: Record<string, string>
  onSelect: (variant: Variant) => void;
}

const VariantSelector: React.FC<Props> = ({ variants, onSelect }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    variants[0]?.title ?? ''
  );

  const sizes = [...new Set(variants.map(v => v.title))]; 

  useEffect(() => {
    if (selectedSize) {
      const match = variants.find(v => v.title === `${selectedSize}`);
      if (match) onSelect(match); 
    }
  }, [selectedSize, variants, onSelect]);

  return (
    <div className="space-y-4 mt-6">

      {/* Size Selection */}
      <div>
        <h3 className="text-xl mb-2!">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {
            sizes.map((size, index) => (
              <button
                key={`${size}-${index}`}
                onClick={() => setSelectedSize(size)}
                // SOLD OUT COLOR #d9d9d9
                className={`w-10 h-10 text-xs! flex items-center justify-center rounded-full border-2 transition cursor-pointer avenir-regular ${
                  selectedSize === size ? 'bg-white text-white border-black text-stroke-v' : 'bg-[#ffffff] text-[#333] border-[#f1f1f1]!'
                }`}
              >
                {size}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default VariantSelector;