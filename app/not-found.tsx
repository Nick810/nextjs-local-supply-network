'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-[#ffffff] via-[#d2d2d2] to-[#bcbfbc] flex items-center justify-center p-8 overflow-hidden relative py-32">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-[#326e3f]/10 rounded-full blur-3xl animate-pulse"
          style={{
            top: `${mousePosition.y / 20}px`,
            left: `${mousePosition.x / 20}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute w-80 h-80 bg-[#326e3f]/5 rounded-full blur-3xl animate-pulse delay-1000" 
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 404 Text with Glitch Effect */}
        <h1 className="text-9xl md:text-[12rem] font-black text-[#326e3f] tracking-tighter relative">
          <span className="relative inline-block animate-bounce">4</span>
          <span className="relative inline-block animate-bounce delay-100">0</span>
          <span className="relative inline-block animate-bounce delay-200">4</span>
          
          {/* Glitch Effect */}
          <span className="absolute inset-0 text-pink-500 opacity-70 animate-pulse" 
            style={{ transform: 'translate(4px, -4px)' }}>404</span>
          <span className="absolute inset-0 text-cyan-500 opacity-70 animate-pulse" 
            style={{ transform: 'translate(-4px, 4px)' }}>404</span>
        </h1>

        {/* Funny Message */}
        <div className="mt-8 space-y-4">
          <p className="text-4xl md:text-6xl font-bold text-[#326e3f] animate-fade-in">
            Oops! Lost in the Weed Forest
          </p>
          <p className="text-xl md:text-2xl text-[#326e3f]/80 max-w-2xl mx-auto">
            The page you&apos;re looking for seems to have vanished in a cloud of smoke. Or maybe we accidentally smoked it.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/"
            style={{ color: 'white' }}
            className="group px-10 py-5 bg-white text-xl font-bold rounded-md shadow-2xl hover:scale-110 hover:shadow-[#326e3f]/50 transition-all duration-300 flex items-center gap-3"
          >
            <span>Take Me Home</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>

        {/* Fun Weed Leaf Animation */}
        <div className="mt-16 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="text-6xl animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-20 text-[#326e3f]/60 text-sm">
          © 2025 Local Supply Network — If you&apos;re lost again, we got the good stuff to make you forget the way home
        </p>
      </div>
    </div>
  )
}