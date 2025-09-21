"use client"

import Link from 'next/link'

export default function AIDesignerPage() {
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              AI Designer
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Transform your ideas into 3D models with the power of artificial intelligence
          </p>
        </div>

        {/* Design Flow */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Step 1: Hyper3D */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <div className="text-center">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Step 1: Create Your 3D Model
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                With Hyper3D, you can take a simple picture and turn it into a 3D CAD model in no time
              </p>
              <a
                href="https://hyper3d.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Launch Hyper3D
              </a>
            </div>
          </div>

          {/* Step 2: Echo Banana Editor */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <div className="text-center">
              <div className="text-6xl mb-6">🍌</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Step 2: Enhance Your Image (Optional)
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Don't have an image that is quite ready for Hyper3D? Leverage AI once again to make changes to your picture prior to 3D model generation using the Echo Banana Editor
              </p>
              <a
                href="https://echo-nano-banana.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Open Echo Banana Editor
              </a>
            </div>
          </div>

          {/* Workflow Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Recommended Workflow</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span>Start with Echo Banana Editor to perfect your image</span>
                </div>
                <div className="hidden md:block text-white/40">→</div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span>Use Hyper3D to convert to 3D model</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/cad/start-project"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
          >
            Back to Project Options
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
