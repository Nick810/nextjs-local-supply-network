import ImageWithSkeleton from '@/app/components/image-with-skeleton'
import { getThumbUrl } from '@/app/lib/utils'
import React from 'react'

type PropType = {
  selected: boolean
  index: number
  image: {
    url: string
    altText?: string | null | undefined
  }
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, image, onClick } = props
  
  return (
    <div
      className={`embla-thumbs__slide flex grow-0 shrink-0 basis-[22%] md:basis-[28%] xl:basis-[15%]`.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number text-black!"
      >
        <ImageWithSkeleton
          src={getThumbUrl(image.url)}
          alt={image.altText || `Product image ${index + 1}`}
          className="object-cover w-full h-full"
        />
      </button>
    </div>
  )
}
