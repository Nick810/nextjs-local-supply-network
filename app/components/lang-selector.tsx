"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AVAILABLE_LANGUAGES } from '@/app/lib/locales';

export default function LangSelector({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang: string) => {
    // Replace the first segment (language code) with the new one
    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm! text-black p-2 border border-gray-300 rounded-md cursor-pointer"
      >
        { AVAILABLE_LANGUAGES.find(lang => lang.code === currentLang)?.label || currentLang.toUpperCase()}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <ul className="flex flex-col">
            {AVAILABLE_LANGUAGES.map((loc) => (
              <li key={loc.code}>
                <button
                  onClick={() => handleLanguageChange(loc.code)}
                  className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  {loc.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
