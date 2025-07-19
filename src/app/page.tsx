import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to My Personal Website
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hi, I'm a developer passionate about creating amazing web experiences. 
            This is my personal website built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              About Me
            </Link>
            <Link 
              href="/projects" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              My Projects
            </Link>
            <Link 
              href="/contact" 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Frontend Development</h3>
            <p className="text-gray-600">
              React, Next.js, TypeScript, and modern CSS frameworks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Backend Development</h3>
            <p className="text-gray-600">
              Node.js, Python, databases, and API development.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">DevOps & Deployment</h3>
            <p className="text-gray-600">
              Docker, CI/CD, cloud platforms, and infrastructure.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 