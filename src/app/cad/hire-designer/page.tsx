"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function HireDesignerPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [projectDescription, setProjectDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create FormData to handle file uploads
      const formData = new FormData()
      formData.append('projectDescription', projectDescription)
      formData.append('email', 'celebrimbor137@gmail.com')
      
      // Add files to FormData
      selectedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file)
      })

      // Send to API route
      const response = await fetch('/api/send-design-request', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setProjectDescription('')
        setSelectedFiles([])
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              Hire an Expert Designer
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get professional design support for your CAD project
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* File Upload Section */}
              <div>
                <label className="block text-white/80 mb-2 text-lg font-semibold">
                  Attach any pictures, models, or blueprints relevant to your project
                </label>
                <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.stl,.stp,.step,.dwg,.dxf,.obj,.fbx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="text-6xl mb-4">📎</div>
                    <p className="text-white/80 text-lg mb-2">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-white/60 text-sm">
                      Supports images, PDFs, and 3D model files
                    </p>
                  </label>
                </div>
                
                {/* Display selected files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-white/80 font-semibold">Selected Files:</h4>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <span className="text-white/80 text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-white/80 mb-2 text-lg font-semibold">
                  Describe your project in detail
                </label>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 resize-none"
                  rows={8}
                  placeholder="Please provide a detailed description of your project, including:
• What you want to create
• Specific requirements or constraints
• Intended use or application
• Any technical specifications
• Timeline expectations
• Budget considerations"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !projectDescription.trim()}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="text-center p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-300">✅ Your request has been sent successfully!</p>
                  <p className="text-green-300/80 text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-center p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-300">❌ There was an error sending your request.</p>
                  <p className="text-red-300/80 text-sm mt-1">Please try again or contact us directly.</p>
                </div>
              )}

            </form>
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
