import Link from "next/link"

type LinkProps = {
  path: string
  subPath: string | undefined 
}

const Breadcrumb: React.FC<LinkProps> = ({ path, subPath = '' }) => {
  return (
    <nav className="my-4 container xl:mb-12">
      <ul className="flex flex-row items-center gap-3 text-sm">
        <li>
          <Link href="/" className="underline transition-colors duration-200 hover:text-neutral-400!">home</Link>
        </li>
        <li>
          <span className="text-xs! block">{`>`}</span>
        </li>
        {
          !subPath ?
          <li>{ path }</li>
          :
          <>
            <li>
              <Link href={`/collections/${path}`} className="underline transition-colors duration-200 hover:text-neutral-400!">{ path } </Link>
            </li>
            <li>
              <span className="text-xs! block">{`>`}</span>
            </li>
            <li>
              { subPath.toLowerCase() }
            </li>
          </>
        }
      </ul>
    </nav>
  )
}
export default Breadcrumb