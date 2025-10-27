import Link from "next/link"

type BreadcrumbProps = {
  lang: string
  type: 'collections' | 'story'
  path: string
  subPath?: string
  isStaticPath?: boolean // NEW: makes `path` static instead of a link
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ lang, type, path, subPath, isStaticPath = false }) => {
  return (
    <nav className="my-4 container xl:mb-12">
      <ul className="flex flex-row items-center gap-3 text-sm">
        <li>
          <Link href={`/${lang}`} className="underline transition-colors duration-200 hover:text-neutral-400!">
            home
          </Link>
        </li>

        <li>
          <span className="text-xs! block">{`>`}</span>
        </li>

        {isStaticPath ? (
          <li>{path}</li>
        ) : (
          <li>
            <Link
              href={`/${lang}/${type}/${path}`}
              className="underline transition-colors duration-200 hover:text-neutral-400!"
            >
              {path}
            </Link>
          </li>
        )}

        {subPath && (
          <>
            <li>
              <span className="text-xs! block">{`>`}</span>
            </li>
            <li>{subPath}</li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Breadcrumb
