"use client"

import Link from 'next/link'

export default function ThreeDPrintingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-start pt-4 pb-2 px-4">
          {/* Left side - Project tabs */}
          <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/20 p-2">
            <Link 
              href="/cad"
              className="px-4 py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden"
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
              className="px-4 py-2 rounded-md text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden bg-gradient-to-r from-pink-600/50 to-purple-600/50"
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
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              3D Printing Projects
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Additive manufacturing and 3D printed creations
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-12">
          <Link 
            href="/3d-printing/start-print"
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start a 3D Print
          </Link>
        </div>

        {/* Find a Model to Print */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Find a Model to Print
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Thingiverse */}
            <a
              href="https://www.thingiverse.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🌐</div>
              <div className="text-xl font-semibold text-white">Thingiverse</div>
              <div className="text-white/70 text-sm">Mostly free community models</div>
            </a>

            {/* MyMiniFactory */}
            <a
              href="https://www.myminifactory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🏭</div>
              <div className="text-xl font-semibold text-white">MyMiniFactory</div>
              <div className="text-white/70 text-sm">Free & paid tabletop & cosplay</div>
            </a>

            {/* Cults3D */}
            <a
              href="https://cults3d.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-xl font-semibold text-white">Cults3D</div>
              <div className="text-white/70 text-sm">Free & premium marketplace</div>
            </a>

            {/* CGTrader */}
            <a
              href="https://www.cgtrader.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">💼</div>
              <div className="text-xl font-semibold text-white">CGTrader</div>
              <div className="text-white/70 text-sm">Professional models & formats</div>
            </a>

            {/* Sketchfab */}
            <a
              href="https://sketchfab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">👁️</div>
              <div className="text-xl font-semibold text-white">Sketchfab</div>
              <div className="text-white/70 text-sm">3D viewer & store</div>
            </a>

            {/* Pinshape */}
            <a
              href="https://pinshape.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">📌</div>
              <div className="text-xl font-semibold text-white">Pinshape</div>
              <div className="text-white/70 text-sm">Community marketplace</div>
            </a>

            {/* Thangs */}
            <a
              href="https://thangs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-xl font-semibold text-white">Thangs</div>
              <div className="text-white/70 text-sm">Geometric search & CAD</div>
            </a>

            {/* Printables */}
            <a
              href="https://www.printables.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🖨️</div>
              <div className="text-xl font-semibold text-white">Printables</div>
              <div className="text-white/70 text-sm">Prusa's validated prints</div>
            </a>

            {/* GrabCAD */}
            <a
              href="https://grabcad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-xl font-semibold text-white">GrabCAD</div>
              <div className="text-white/70 text-sm">Engineering CAD models</div>
            </a>

            {/* Shapeways */}
            <a
              href="https://www.shapeways.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🏪</div>
              <div className="text-xl font-semibold text-white">Shapeways</div>
              <div className="text-white/70 text-sm">Paid marketplace & printing</div>
            </a>

            {/* Etsy */}
            <a
              href="https://www.etsy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="text-2xl mb-2">🛍️</div>
              <div className="text-xl font-semibold text-white">Etsy</div>
              <div className="text-white/70 text-sm">Independent designer STLs</div>
            </a>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Add 3D printing projects here */}
        </div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
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