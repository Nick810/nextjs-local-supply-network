import Link from "next/link";

const DesktopMenu = () => {
  return (
    <ul className="lg:flex flex-row items-start gap-8 px-6 hidden lg:shrink-0 absolute right-0 -translate-x-1/2">
      <li><Link prefetch href="/collections/all" className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">Products</Link></li>
      <li><Link prefetch href="/story" className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">Story</Link></li>
      <li><Link prefetch href="/about-us" className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">About</Link></li>
    </ul>
  )
}
export default DesktopMenu;