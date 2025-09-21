"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function StartPrintPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [printSettings, setPrintSettings] = useState({
    material: 'PLA',
    layerHeight: '0.2',
    infill: '20'
  })
  const [advancedSettings, setAdvancedSettings] = useState({
    printSpeed: '200',
    acceleration: '10000',
    nozzleTemp: '220',
    bedTemp: '60',
    fanSpeed: '100',
    retractionDistance: '0.8',
    retractionSpeed: '40',
    supportEnabled: false,
    brimEnabled: false,
    raftEnabled: false,
    layerCooling: '100',
    flowRate: '100',
    zHop: '0.2',
    wipeDistance: '0.0'
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.name.endsWith('.stl') || file.name.endsWith('.stp') || file.name.endsWith('.step'))) {
      setSelectedFile(file)
    } else {
      alert('Please select a valid .stl, .stp, or .step file')
    }
  }

  const handleStartPrint = () => {
    if (!selectedFile) {
      alert('Please select a file first')
      return
    }
    // Here you would typically send the file and settings to your 3D printer
    alert('Print started! (This is a demo)')
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
              Start a 3D Print
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Upload your STL file and configure print settings
          </p>
        </div>

        {/* Print Configuration */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            {/* File Upload */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Upload 3D Model File</h3>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".stl,.stp,.step"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="text-6xl mb-4">📁</div>
                  <p className="text-white/80 text-lg mb-2">
                    {selectedFile ? selectedFile.name : 'Click to upload 3D model file'}
                  </p>
                  <p className="text-white/60 text-sm">Supports .stl, .stp, and .step files</p>
                </label>
              </div>
            </div>

            {/* Print Settings */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Print Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2">Material</label>
                  <select
                    value={printSettings.material}
                    onChange={(e) => setPrintSettings({...printSettings, material: e.target.value})}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="PLA">PLA</option>
                    <option value="ABS">ABS</option>
                    <option value="PETG">PETG</option>
                    <option value="TPU">TPU</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">
                    Layer Height: {printSettings.layerHeight}mm
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0.08"
                      max="0.28"
                      step="0.01"
                      value={printSettings.layerHeight}
                      onChange={(e) => setPrintSettings({...printSettings, layerHeight: e.target.value})}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>0.08mm</span>
                      <span>0.28mm</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">
                    Infill Density: {printSettings.infill}%
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="15"
                      max="100"
                      step="1"
                      value={printSettings.infill}
                      onChange={(e) => setPrintSettings({...printSettings, infill: e.target.value})}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>15%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Advanced Settings Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-6 py-3 text-white transition-all duration-300 hover:scale-105"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Print Settings
              </button>
            </div>

            {/* Advanced Settings Section */}
            {showAdvanced && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                  Bambu X1 Carbon Advanced Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Print Speed */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Print Speed: {advancedSettings.printSpeed} mm/s
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={advancedSettings.printSpeed}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, printSpeed: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>50 mm/s</span>
                        <span>500 mm/s</span>
                      </div>
                    </div>
                  </div>

                  {/* Acceleration */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Acceleration: {advancedSettings.acceleration} mm/s²
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="500"
                        value={advancedSettings.acceleration}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, acceleration: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>1000</span>
                        <span>20000</span>
                      </div>
                    </div>
                  </div>

                  {/* Nozzle Temperature */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Nozzle Temperature: {advancedSettings.nozzleTemp}°C
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="180"
                        max="300"
                        step="5"
                        value={advancedSettings.nozzleTemp}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, nozzleTemp: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>180°C</span>
                        <span>300°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Bed Temperature */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Bed Temperature: {advancedSettings.bedTemp}°C
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="25"
                        max="120"
                        step="5"
                        value={advancedSettings.bedTemp}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, bedTemp: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>25°C</span>
                        <span>120°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Fan Speed */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Fan Speed: {advancedSettings.fanSpeed}%
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={advancedSettings.fanSpeed}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, fanSpeed: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Retraction Distance */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Retraction Distance: {advancedSettings.retractionDistance} mm
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={advancedSettings.retractionDistance}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, retractionDistance: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>0 mm</span>
                        <span>5 mm</span>
                      </div>
                    </div>
                  </div>

                  {/* Retraction Speed */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Retraction Speed: {advancedSettings.retractionSpeed} mm/s
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={advancedSettings.retractionSpeed}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, retractionSpeed: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>10 mm/s</span>
                        <span>100 mm/s</span>
                      </div>
                    </div>
                  </div>

                  {/* Flow Rate */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Flow Rate: {advancedSettings.flowRate}%
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="50"
                        max="150"
                        step="5"
                        value={advancedSettings.flowRate}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, flowRate: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>50%</span>
                        <span>150%</span>
                      </div>
                    </div>
                  </div>

                  {/* Z-Hop */}
                  <div>
                    <label className="block text-white/80 mb-2">
                      Z-Hop: {advancedSettings.zHop} mm
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={advancedSettings.zHop}
                        onChange={(e) => setAdvancedSettings({...advancedSettings, zHop: e.target.value})}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-white/60 mt-1">
                        <span>0 mm</span>
                        <span>2 mm</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkbox Options */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-3 text-white">
                    <input
                      type="checkbox"
                      checked={advancedSettings.supportEnabled}
                      onChange={(e) => setAdvancedSettings({...advancedSettings, supportEnabled: e.target.checked})}
                      className="w-4 h-4 text-pink-600 bg-white/10 border-white/20 rounded focus:ring-pink-500"
                    />
                    <span>Enable Support Structures</span>
                  </label>

                  <label className="flex items-center space-x-3 text-white">
                    <input
                      type="checkbox"
                      checked={advancedSettings.brimEnabled}
                      onChange={(e) => setAdvancedSettings({...advancedSettings, brimEnabled: e.target.checked})}
                      className="w-4 h-4 text-pink-600 bg-white/10 border-white/20 rounded focus:ring-pink-500"
                    />
                    <span>Enable Brim</span>
                  </label>

                  <label className="flex items-center space-x-3 text-white">
                    <input
                      type="checkbox"
                      checked={advancedSettings.raftEnabled}
                      onChange={(e) => setAdvancedSettings({...advancedSettings, raftEnabled: e.target.checked})}
                      className="w-4 h-4 text-pink-600 bg-white/10 border-white/20 rounded focus:ring-pink-500"
                    />
                    <span>Enable Raft</span>
                  </label>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Link
                href="/3d-printing"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
              >
                Back to 3D Printing
              </Link>
              <button
                onClick={handleStartPrint}
                className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 hover:scale-105"
              >
                Start Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for gradient animation and slider styling */}
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
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-webkit-slider-track {
          background: linear-gradient(to right, #ff6b6b, #4ecdc4);
          height: 8px;
          border-radius: 4px;
        }
        
        .slider::-moz-range-track {
          background: linear-gradient(to right, #ff6b6b, #4ecdc4);
          height: 8px;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </main>
  )
}
