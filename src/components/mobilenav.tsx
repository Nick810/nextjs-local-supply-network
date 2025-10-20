import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

type MobileNavProps = {
  toggled: boolean;
  toggle: (open: boolean) => void;
};

const MobileNav: React.FC<MobileNavProps> = ({toggled, toggle}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (toggled) {
    setIsVisible(true);

    if (navRef.current && blurRef.current) {
      const tl = gsap.timeline();

      // Animate faux blur layer
      tl.to(blurRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }, 0);

      // Animate nav container
      tl.fromTo(
        navRef.current,
        { scale: 0.95, opacity: 0, transformOrigin: "top right" },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" },
        0
      );

      // Animate list items
      tl.fromTo(
        navRef.current.querySelectorAll("li"),
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
        "-=0.3"
      );
    }
  } else {
    if (navRef.current && blurRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      // Animate blur layer out
      tl.to(blurRef.current, {
        opacity: 0,
        scale: 1.3,
        duration: 0.4,
        ease: "power2.inOut",
      }, 0);

      // Animate nav container out
      tl.to(navRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      }, 0);
    }
  }
}, [toggled]);

  return (
    <nav
      ref={navRef} 
      className={`${isVisible ? "fixed" : "hidden"} w-[50%] max-w-[410px] h-[480px] top-0 right-0 overflow-hidden z-[100] border-l-2 border-b-2 border-[#333]`}>      
      <div
  ref={blurRef}
  className="absolute inset-0 bg-white/80 -z-10 rounded-bl-xl"
  style={{ opacity: 0, transform: "scale(1.3)" }}
/>
      <div className="z-30 absolute top-0 left-0 pr-[5%] w-full">
        <div className="flex flex-row items-center justify-end pt-3 pb-3">
          <button onClick={() => toggle(false)} className="cursor-pointer">
            <Image src="/close.svg" alt="Close Button" width={48} height={48} />
          </button>
        </div>

        <ul className="flex flex-col items-start gap-6 px-6">
          <li><Link prefetch href="/collections/all" className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">Products</Link></li>
          <li><Link prefetch href="/story" className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">Story</Link></li>
          <li><Link prefetch href="/about-us" className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">About</Link></li>
        </ul>
      </div>
    </nav>
  )
}
export default MobileNav