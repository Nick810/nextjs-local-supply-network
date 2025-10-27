import Image from "next/image"
import { ReactElement, useState } from "react"

interface ProductDrawerProps {
  data: {
    title: string
    details: string | ReactElement | undefined
    html?: boolean
    isCollapsible?: boolean
  } 
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(!data.isCollapsible)
  const toggleOpen = () => {
    if (data.isCollapsible) setIsOpen(isOpen => !isOpen)
  }

  return (
    <div className={`border-b-1 border-[#818181] pt-4 ${data.isCollapsible ? 'cursor-pointer' : ''}`} onClick={toggleOpen}>
      {
        data.html && data.details ?
        <div className="flex flex-col items-start justify-betwee py-4">
          <h4 className="text-2xl mb-4!">{ data.title}</h4>
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-[#333] prose-p-mb-16!"
            dangerouslySetInnerHTML={{ __html: data.details }}
          />
        </div>
        :
        <div className="py-4">
          <div className="flex flex-row items-start justify-between">
            <h4 className="text-2xl mb-4!">{ data.title }</h4>
            <Image src="/caret-up.svg" alt="" width={16} height={16} className={`${isOpen ? '': 'rotate-180'} transition-transform `} />
          </div>
          {isOpen && (<div>{ data.details }</div>)}
        </div>
      }
    </div>
  )
}
export default ProductDrawer