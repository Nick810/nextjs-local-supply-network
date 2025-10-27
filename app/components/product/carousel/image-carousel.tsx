import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  usePrevNextButtons
} from './arrow-button'
import useEmblaCarousel from 'embla-carousel-react'
import ImageWithSkeleton from '../../../components/image-with-skeleton'
import { Thumb } from './thumbs'

type ShopifyProductImage = {
  url: string;
  altText?: string | null;
};

type PropType = {
  options?: EmblaOptionsType
  data?: ShopifyProductImage[];
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, data } = props
  const [height, setHeight] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const {
  } = usePrevNextButtons(emblaApi)


  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi, emblaThumbsApi]
  )
  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section className="embla md:basis-[47%]">
      <div className="embla__viewport" ref={emblaRef}>
        <ul className="embla__container" style={{ height: height - (58 * 4) + "px" }}>
          {
            data?.map((image, index) => (
            <li key={index} className="relative w-full aspect-square embla__slide">
              <ImageWithSkeleton 
                src={image.url}
                alt={image.altText || `Product image ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </li>
            )) 
          }
        </ul>
      </div>

      <div className="embla__controls">

        <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container lg:mt-8">
            {data?.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
