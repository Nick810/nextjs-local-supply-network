import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';
import Letter1 from '@/public/letter-1.jpg';
import Letter2 from '@/public/letter-2.jpg';
import Letter3 from '@/public/letter-3.jpg';
import Letter4 from '@/public/letter-4.jpg';

export default function Letter() {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="grid grid-flow-col auto-cols-[55vw] md:auto-cols-[40vw] lg:auto-cols-[25vw] gap-8 h-full">
        {[Letter1, Letter2, Letter3, Letter4].map((letter, index) => (
          <div key={index} className="relative drop-shadow-lg">
            <Zoom classDialog="drop-shadow-lg">
              <Image
                src={letter}
                alt={`PDF preview ${index + 1}`}
                width={600}
                height={850}
                className="w-full h-auto"
              />
            </Zoom>
          </div>
        ))}
      </div>
    </div>
  )
}