// app/language-select/page.tsx
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import logo from '@/public/lsn-logo.png'

export default function LanguageSelect() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const changeLanguage = (lang: string) => {
    setIsLoading(true) // เปิด loading ทันที
    
    // ตั้ง cookie
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`
    
    // เล็กน้อย delay เพื่อให้เห็น loading (สวย ๆ)
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 800)
  }

  return (
    <>
      <Image 
        src={logo}
        className='absolute w-1/2 top-[10%] left-1/2 -translate-x-1/2 max-w-[160px]!' 
        alt="LSN Logo" 
        priority
      />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-8! text-gray-800">
            เลือกภาษา / Select Language
          </h1>

          {isLoading ? (
            // Loading State สวยมาก!
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 border-8 border-gray-200 rounded-full"></div>
                  <div className="w-20 h-20 border-8 border-[#326e3f] rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
              </div>
              <p className="text-xl font-semibold text-[#326e3f] animate-pulse">
                กำลังพาคุณไปยังเว็บไซต์...
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to website...
              </p>
            </div>
          ) : (
          <div className="space-y-6">
            <button
              onClick={() => changeLanguage('th')}
              className="w-full py-6 px-8 bg-[#F7F7F7] text-black text-2xl font-bold rounded-2xl hover:scale-105 btn--hover-green curosr-pointer transition shadow-lg"
            >
              🇹🇭 ไทย
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className="w-full py-6 px-8 bg-[#F7F7F7] text-black text-4xl font-bold rounded-2xl hover:scale-105 transition cursor-pointer btn--hover-green shadow-lg border-2 border-gray-400 lang-selected"
            >
              🇬🇧 English
            </button>
          </div>
          )}
        </div>
      </div>
    </>
  )
}