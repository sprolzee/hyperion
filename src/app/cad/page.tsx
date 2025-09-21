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
        <div className="absolute bottom-0 left-0 right-0 h-1/5 z-20">
          {/* 3D Sphere Container - Fixed position */}
          <div 
            className="absolute bottom-0 left-0 right-0"
            style={{
              width: '600px',
              height: '600px',
              transformStyle: 'preserve-3d',
              transform: 'translate(calc(50vw - 300px), 300px) rotateX(45deg) rotateZ(45deg)',
              animation: 'planetRotation 60s linear infinite'
            }}
          >
            {/* Planet with Solid Color */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: '#4ade80'
              }}
            ></div>
            
            {/* Terrain layers removed for clean planet appearance */}
            
            {/* Terrain variations that move across the surface */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.6) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, transparent 40%)',
                animation: 'terrainShift 30s ease-in-out infinite alternate'
              }}
            ></div>
            
            {/* Rotation tick marks at 0°, 90°, 180°, 270° */}
            <div className="absolute inset-0 rounded-full">
              {/* 0° / 360° tick mark (top) */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
              
              {/* 90° tick mark (right) */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
              
              {/* 180° tick mark (bottom) */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
              
              {/* 270° tick mark (left) */}
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
            </div>
            
            {/* Stick Man - New Design with legs on planet edge */}
            <div className="absolute inset-0 rounded-full">
              <div 
                className="absolute z-30"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                  transform: 'rotate(135deg) translateX(300px) rotateX(-45deg)'
                }}
              >
                {/* Proper Stick Figure Design */}
                <div className="relative">
                  {/* Head - Circle at the end of torso */}
                  <div 
                    className="absolute w-4 h-4 bg-white rounded-full"
                    style={{
                      left: '-2px',
                      top: '-30px'
                    }}
                  ></div>
                  
                  {/* Torso - Vertical line from head to legs */}
                  <div 
                    className="absolute w-1 h-20 bg-white"
                    style={{
                      left: '-0.5px',
                      top: '-26px'
                    }}
                  ></div>
                  
                  {/* Left Upper Arm - Perpendicular to torso */}
                  <div 
                    className="absolute w-8 h-1 bg-white"
                    style={{
                      left: '-8px',
                      top: '-18px'
                    }}
                  ></div>
                  
                  {/* Left Lower Arm - Connected to upper arm */}
                  <div 
                    className="absolute w-1 h-6 bg-white"
                    style={{
                      left: '-8px',
                      top: '-18px',
                      transform: 'rotate(45deg)',
                      transformOrigin: 'top'
                    }}
                  ></div>
                  
                  {/* Right Upper Arm - Perpendicular to torso */}
                  <div 
                    className="absolute w-8 h-1 bg-white"
                    style={{
                      left: '1px',
                      top: '-18px'
                    }}
                  ></div>
                  
                  {/* Right Lower Arm - Connected to upper arm */}
                  <div 
                    className="absolute w-1 h-6 bg-white"
                    style={{
                      left: '8px',
                      top: '-18px',
                      transform: 'rotate(-45deg)',
                      transformOrigin: 'top'
                    }}
                  ></div>
                  
                  {/* Left Upper Leg - From torso intersection */}
                  <div 
                    className="absolute w-1 h-8 bg-white"
                    style={{
                      left: '-2px',
                      top: '-6px',
                      transform: 'rotate(-20deg)',
                      transformOrigin: 'top'
                    }}
                  ></div>
                  
                  {/* Left Lower Leg - Connected to upper leg */}
                  <div 
                    className="absolute w-1 h-8 bg-white"
                    style={{
                      left: '-4px',
                      top: '2px',
                      transform: 'rotate(-20deg)',
                      transformOrigin: 'top'
                    }}
                  ></div>
                  
                  {/* Right Upper Leg - From torso intersection */}
                  <div 
                    className="absolute w-1 h-8 bg-white"
                    style={{
                      left: '1px',
                      top: '-6px',
                      transform: 'rotate(20deg)',
                      transformOrigin: 'top'
                    }}
                  ></div>
                  
                  {/* Right Lower Leg - Connected to upper leg */}
                  <div 
                    className="absolute w-1 h-8 bg-white"
                    style={{
                      left: '3px',
                      top: '2px',
                      transform: 'rotate(20deg)',
                      transformOrigin: 'top'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solar System - Planets orbit around the Sun, viewed from Titan */}
        <div className="absolute inset-0 z-10" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
          {/* Sun - Positioned as seen from Titan */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full opacity-60 animate-ping"></div>
              <div className="absolute inset-2 w-16 h-16 bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>

          {/* Saturn - Positioned as seen from Titan */}
          <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* animate-orbit-saturn */}
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 via-orange-400 to-yellow-600 rounded-full"></div>
              {/* Saturn's rings */}
              <div className="absolute inset-0 w-36 h-36 border-4 border-yellow-400/50 rounded-full transform -translate-x-6 -translate-y-6"></div>
              <div className="absolute inset-0 w-28 h-28 border-3 border-yellow-300/60 rounded-full transform -translate-x-2 -translate-y-2"></div>
            </div>
          </div>

          {/* Jupiter - Positioned as seen from Titan */}
          <div className="absolute top-1/5 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* animate-orbit-jupiter */}
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 via-orange-500 to-red-600 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-400 rounded-full opacity-30"></div>
              {/* Jupiter's bands */}
              <div className="absolute inset-2 w-12 h-12 bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500 rounded-full opacity-40"></div>
            </div>
          </div>

          {/* Earth - Positioned as seen from Titan */}
          <div className="absolute top-2/3 left-1/5 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-12 h-12">
              {/* animate-orbit-earth */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-400 to-green-500 rounded-full"></div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full opacity-40"></div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-white/30 via-white/20 to-transparent rounded-full opacity-60"></div>
            </div>
          </div>
          
          {/* Mars - Positioned as seen from Titan */}
          <div className="absolute top-3/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              {/* animate-orbit-mars */}
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Venus - Positioned as seen from Titan */}
          <div className="absolute top-1/6 right-1/5 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              {/* animate-orbit-venus */}
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-300 to-yellow-500 rounded-full"></div>
            </div>
          </div>

          {/* Uranus - Positioned as seen from Titan */}
          <div className="absolute top-1/2 right-1/6 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              {/* animate-orbit-uranus */}
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-300 to-cyan-500 rounded-full"></div>
            </div>
          </div>

          {/* Neptune - Positioned as seen from Titan */}
          <div className="absolute top-2/5 left-1/6 transform -translate-x-1/2 -translate-y-1/2">
            <div>
              {/* animate-orbit-neptune */}
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-full"></div>
            </div>
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
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Computer-Aided Design and engineering solutions
          </p>
          
          {/* Start a Project Button */}
          <div className="flex justify-center">
            <Link 
              href="/cad/start-project"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Project Grid - Removed sample widget to let background dominate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Add CAD projects here when ready */}
        </div>
      </div>

      {/* Combined CSS for all animations */}
      <style jsx>{`
        @keyframes planetRotation {
          0% {
            transform: translate(calc(50vw - 300px), 300px) rotateX(45deg) rotateZ(45deg);
          }
          100% {
            transform: translate(calc(50vw - 300px), 300px) rotateX(45deg) rotateZ(405deg);
          }
        }
        
        /* New Stick Man Animation - Constant speed with pauses */
        @keyframes stickmanWalkNew {
          0% {
            transform: rotate(90deg) translateX(300px) rotateX(-45deg);
          }
          5% {
            transform: rotate(90deg) translateX(300px) rotateX(-45deg);
          }
          10% {
            transform: rotate(100deg) translateX(300px) rotateX(-45deg);
          }
          15% {
            transform: rotate(100deg) translateX(300px) rotateX(-45deg);
          }
          20% {
            transform: rotate(110deg) translateX(300px) rotateX(-45deg);
          }
          25% {
            transform: rotate(110deg) translateX(300px) rotateX(-45deg);
          }
          30% {
            transform: rotate(120deg) translateX(300px) rotateX(-45deg);
          }
          35% {
            transform: rotate(120deg) translateX(300px) rotateX(-45deg);
          }
          40% {
            transform: rotate(130deg) translateX(300px) rotateX(-45deg);
          }
          45% {
            transform: rotate(130deg) translateX(300px) rotateX(-45deg);
          }
          50% {
            transform: rotate(140deg) translateX(300px) rotateX(-45deg);
          }
          55% {
            transform: rotate(140deg) translateX(300px) rotateX(-45deg);
          }
          60% {
            transform: rotate(150deg) translateX(300px) rotateX(-45deg);
          }
          65% {
            transform: rotate(150deg) translateX(300px) rotateX(-45deg);
          }
          70% {
            transform: rotate(160deg) translateX(300px) rotateX(-45deg);
          }
          75% {
            transform: rotate(160deg) translateX(300px) rotateX(-45deg);
          }
          80% {
            transform: rotate(170deg) translateX(300px) rotateX(-45deg);
          }
          85% {
            transform: rotate(170deg) translateX(300px) rotateX(-45deg);
          }
          90% {
            transform: rotate(180deg) translateX(300px) rotateX(-45deg);
          }
          95% {
            transform: rotate(180deg) translateX(300px) rotateX(-45deg);
          }
          100% {
            transform: rotate(90deg) translateX(300px) rotateX(-45deg);
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
        
        /* 3D Orbital Animations - Planets orbit around the Sun with Z-axis motion */
        /* COMMENTED OUT - Planets are now stationary, but keeping for future use
        @keyframes orbit-saturn {
          0% {
            transform: translate(calc(50vw - 10px), calc(50vh - 10px)) rotate(0deg) translateX(300px) translateZ(50px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 10px), calc(50vh - 10px)) rotate(90deg) translateX(300px) translateZ(-50px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 10px), calc(50vh - 10px)) rotate(180deg) translateX(300px) translateZ(50px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 10px), calc(50vh - 10px)) rotate(270deg) translateX(300px) translateZ(-50px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 10px), calc(50vh - 10px)) rotate(360deg) translateX(300px) translateZ(50px) rotate(-360deg);
          }
        }
        */
        
        /* COMMENTED OUT - All remaining orbital animations disabled
        @keyframes orbit-jupiter {
          0% {
            transform: translate(calc(50vw - 8px), calc(50vh - 8px)) rotate(0deg) translateX(250px) translateZ(-30px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 8px), calc(50vh - 8px)) rotate(90deg) translateX(250px) translateZ(30px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 8px), calc(50vh - 8px)) rotate(180deg) translateX(250px) translateZ(-30px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 8px), calc(50vh - 8px)) rotate(270deg) translateX(250px) translateZ(30px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 8px), calc(50vh - 8px)) rotate(360deg) translateX(250px) translateZ(-30px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-earth {
          0% {
            transform: translate(calc(50vw - 6px), calc(50vh - 6px)) rotate(0deg) translateX(200px) translateZ(40px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 6px), calc(50vh - 6px)) rotate(90deg) translateX(200px) translateZ(-40px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 6px), calc(50vh - 6px)) rotate(180deg) translateX(200px) translateZ(40px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 6px), calc(50vh - 6px)) rotate(270deg) translateX(200px) translateZ(-40px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 6px), calc(50vh - 6px)) rotate(360deg) translateX(200px) translateZ(40px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-mars {
          0% {
            transform: translate(calc(50vw - 5px), calc(50vh - 5px)) rotate(0deg) translateX(180px) translateZ(-25px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 5px), calc(50vh - 5px)) rotate(90deg) translateX(180px) translateZ(25px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 5px), calc(50vh - 5px)) rotate(180deg) translateX(180px) translateZ(-25px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 5px), calc(50vh - 5px)) rotate(270deg) translateX(180px) translateZ(25px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 5px), calc(50vh - 5px)) rotate(360deg) translateX(180px) translateZ(-25px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-venus {
          0% {
            transform: translate(calc(50vw - 4px), calc(50vh - 4px)) rotate(0deg) translateX(150px) translateZ(35px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 4px), calc(50vh - 4px)) rotate(90deg) translateX(150px) translateZ(-35px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 4px), calc(50vh - 4px)) rotate(180deg) translateX(150px) translateZ(35px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 4px), calc(50vh - 4px)) rotate(270deg) translateX(150px) translateZ(-35px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 4px), calc(50vh - 4px)) rotate(360deg) translateX(150px) translateZ(35px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-uranus {
          0% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(0deg) translateX(350px) translateZ(-60px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(90deg) translateX(350px) translateZ(60px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(180deg) translateX(350px) translateZ(-60px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(270deg) translateX(350px) translateZ(60px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(360deg) translateX(350px) translateZ(-60px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-neptune {
          0% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(0deg) translateX(320px) translateZ(45px) rotate(0deg);
          }
          25% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(90deg) translateX(320px) translateZ(-45px) rotate(-90deg);
          }
          50% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(180deg) translateX(320px) translateZ(45px) rotate(-180deg);
          }
          75% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(270deg) translateX(320px) translateZ(-45px) rotate(-270deg);
          }
          100% {
            transform: translate(calc(50vw - 7px), calc(50vh - 7px)) rotate(360deg) translateX(320px) translateZ(45px) rotate(-360deg);
          }
        }
        */
        
        /* Apply orbital animations with different speeds */
        /* COMMENTED OUT - Animation classes disabled for stationary planets
        .animate-orbit-saturn {
          animation: orbit-saturn 90s linear infinite;
        }
        
        .animate-orbit-jupiter {
          animation: orbit-jupiter 60s linear infinite;
        }
        
        .animate-orbit-earth {
          animation: orbit-earth 45s linear infinite;
        }
        
        .animate-orbit-mars {
          animation: orbit-mars 35s linear infinite;
        }
        
        .animate-orbit-venus {
          animation: orbit-venus 30s linear infinite;
        }
        
        .animate-orbit-uranus {
          animation: orbit-uranus 75s linear infinite;
        }
        
        .animate-orbit-neptune {
          animation: orbit-neptune 65s linear infinite;
        }
        */
      `}</style>
    </main>
  )
}