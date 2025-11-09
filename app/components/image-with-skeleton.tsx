'use client';

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

type ImageProps = {
  src: string | StaticImageData
  alt?: string;
  className: string;
  quality?: number;
  width?: string;
  height?: string;
}

const ImageWithSkeleton: React.FC<ImageProps> = ({ src, alt, className, quality = 100 }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg z-10" />
      )}
      <Image
        src={src}
        alt={alt || ''}
        fill
        quality={quality}
        loading="lazy"
        className={`${className} transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
export default ImageWithSkeleton
