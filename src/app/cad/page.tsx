"use client"

import Link from 'next/link'
import { useState, useRef } from 'react'

export default function CADPage() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }))
    
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Titan Surface Background */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Starfield - Dominant black background */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(-100px)' }}>
          {[...Array(800)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 200 - 50}%`,
                top: `${Math.random() * 200 - 50}%`,
                width: `${Math.random() * 3 + 0.5}px`,
                height: `${Math.random() * 3 + 0.5}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                transform: `translateZ(${Math.random() * 200 - 100}px)`
              }}
            />
          ))}
        </div>

        {/* Titan Surface - 3D Sphere */}
        <div className="absolute bottom-0 left-0 right-0 h-1/5">
          {/* 3D Sphere Container - Fixed position */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '600px',
              height: '600px',
              transformStyle: 'preserve-3d',
              transform: 'translateY(300px) rotateX(75deg)',
              animation: 'planetRotation 60s linear infinite'
            }}
          >
            {/* Single Sphere Surface */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, #4ade80 0%, #22d3ee 30%, #06b6d4 60%, #0891b2 100%)',
                boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.3)'
              }}
            ></div>
            
            {/* Terrain variations that move across the surface */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.6) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, transparent 40%)',
                animation: 'terrainShift 30s ease-in-out infinite alternate'
              }}
            ></div>
          </div>
        </div>

        {/* Imposing Solar System - Much larger scale */}
        <div className="absolute inset-0">
          {/* Sun - Very large and imposing */}
          <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full opacity-60 animate-ping"></div>
              <div className="absolute inset-2 w-16 h-16 bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>

          {/* Saturn - Very large and prominent */}
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 via-orange-400 to-yellow-600 rounded-full"></div>
              {/* Saturn's rings - much larger */}
              <div className="absolute inset-0 w-36 h-36 border-4 border-yellow-400/50 rounded-full transform -translate-x-6 -translate-y-6"></div>
              <div className="absolute inset-0 w-28 h-28 border-3 border-yellow-300/60 rounded-full transform -translate-x-2 -translate-y-2"></div>
            </div>
          </div>

          {/* Jupiter - Large gas giant */}
          <div className="absolute top-1/6 right-1/6 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 via-orange-500 to-red-600 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-400 rounded-full opacity-30"></div>
              {/* Jupiter's bands */}
              <div className="absolute inset-2 w-12 h-12 bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500 rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Earth - Blue and green */}
          <div className="absolute top-1/2 right-1/8 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-400 to-green-500 rounded-full"></div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full opacity-40"></div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-white/30 via-white/20 to-transparent rounded-full opacity-60"></div>
            </div>
          </div>
          
          {/* Mars - Red planet */}
          <div className="absolute top-2/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-full"></div>
          </div>
          
          {/* Venus - Yellow/orange */}
          <div className="absolute top-1/8 left-1/6 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-300 to-yellow-500 rounded-full"></div>
          </div>

          {/* Uranus - Ice giant */}
          <div className="absolute top-3/4 left-1/8 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-300 to-cyan-500 rounded-full"></div>
          </div>

          {/* Neptune - Blue giant */}
          <div className="absolute top-1/3 right-1/8 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-full"></div>
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-start pt-4 pb-2 px-4">
          {/* Left side - Project tabs */}
          <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 p-2">
            <Link 
              href="/cad"
              className="px-4 py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden bg-blue-600/50"
              style={{
                backgroundImage: 'url(/images/Tesseract.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <span className="relative z-10">CAD</span>
            </Link>
            <Link 
              href="/writing"
              className="px-4 py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                backgroundImage: 'url(/images/elderscroll.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <span className="relative z-10">Writing</span>
            </Link>
            <Link 
              href="/reading"
              className="px-4 py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                backgroundImage: 'url(/images/Shrek.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <span className="relative z-10">Reading</span>
            </Link>
            <Link 
              href="/3d-printing"
              className="px-4 py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <span className="relative z-10">3D Printing</span>
            </Link>
          </div>
          
          {/* Right side - Main navigation */}
          <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 p-2">
            <Link 
              href="/" 
              className="px-6 py-3 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="px-6 py-3 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              About Me
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              CAD Projects
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Computer-Aided Design and engineering solutions
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Sample CAD Project */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 hover:bg-white/20 transition-all duration-300">
            <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-6xl">⚙️</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sample CAD Design</h3>
            <p className="text-white/70 mb-4">
              A precision-engineered component designed using advanced CAD software.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">SolidWorks</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">3D Model</span>
            </div>
          </div>

          {/* Add more CAD projects here */}
        </div>
      </div>

      {/* Combined CSS for all animations */}
      <style jsx>{`
        @keyframes planetRotation {
          0% {
            transform: translateY(300px) rotateX(75deg) rotateY(0deg);
          }
          100% {
            transform: translateY(300px) rotateX(75deg) rotateY(-360deg);
          }
        }
        
        @keyframes terrainShift {
          0% {
            background: radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.6) 0%, transparent 40%), 
                        radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, transparent 40%);
          }
          50% {
            background: radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.6) 0%, transparent 40%), 
                        radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.6) 0%, transparent 40%);
          }
          100% {
            background: radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.6) 0%, transparent 40%), 
                        radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.6) 0%, transparent 40%);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </main>
  )
}