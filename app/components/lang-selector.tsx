"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AVAILABLE_LANGUAGES } from '@/app/lib/locales';

export default function LangSelector({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLang: string) => {
    const currentRoute = window.location.href;
    const trimmedRoute = currentRoute.substring(0, currentRoute.lastIndexOf('/'));
    const newRoute = `${trimmedRoute}/${newLang}`;
    router.push(newRoute);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black px-2 py-1 border border-gray-300 rounded-md cursor-pointer"
      >
        {currentLang.toUpperCase()}
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
