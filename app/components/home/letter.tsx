import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';
import Letter1 from '@/public/letter-1.webp';
import Letter2 from '@/public/letter-2.webp';

export default function Letter() {
  return (
    <ul className="flex flex-row overflow-x-auto scrollbar-hide space-x-8 h-full">
      <li className='drop-shadow-sm'>
        <Zoom>
          <Image
            src={Letter1}
            alt="PDF preview"
            width={600}
            height={850}
          />
        </Zoom>
      </li>
      <li className='drop-shadow-sm'>
        <Zoom>
          <Image
            src={Letter2}
            alt="PDF preview"
            width={600}
            height={850}
          />
        </Zoom>
      </li>
    </ul>
  )
}