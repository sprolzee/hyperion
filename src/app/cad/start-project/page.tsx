"use client"

import Link from 'next/link'

export default function StartProjectPage() {
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
              Start a CAD Project
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose your approach to bring your design ideas to life
          </p>
        </div>

        {/* Two Column Choices */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Hire an Expert Designer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6">👨‍💻</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Hire an Expert Designer
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Provide a description of a model/project you need design support on
                </p>
                <Link
                  href="/cad/hire-designer"
                  className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Right Column - Design Your Own */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="text-6xl mb-6">🤖</div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Design Your Own - No Expertise Required!
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Leverage the power of AI to turn a 2D image into a 3D model at the click of a button
                </p>
                <Link
                  href="/cad/ai-designer"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Try AI Design
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/cad"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
          >
            Back to CAD Projects
          </Link>
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
