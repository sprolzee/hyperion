"use client"

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [testParticle, setTestParticle] = useState({ x: 0, y: 0, velocityX: 0, velocityY: 0, startTime: Date.now() })
  // const [isDragging, setIsDragging] = useState(false)
  // const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [rockets, setRockets] = useState<Array<{id: number, startTime: number, path: string[], earthAngle: number, earthX: number, earthY: number, crashed: boolean, crashPlanet: string | null, velocityX: number, velocityY: number}>>([])
  
  // Calculate current planet positions for gravitational circles
  const getCurrentPlanetPositions = () => {
    const elapsed = (Date.now() - testParticle.startTime) / 1000
    return planets.map(planet => ({
      ...planet,
      position: getPlanetPosition(planet, elapsed)
    }))
  }
  
  // Calculate planet positions using current time (for gravitational circles)
  const getCurrentTimePlanetPositions = () => {
    const currentTime = Date.now() / 1000
    return planets.map(planet => ({
      ...planet,
      position: getPlanetPosition(planet, currentTime)
    }))
  }
  
  // Calculate planet positions using the same time as particle physics
  // Fixed start time for planet animations that never changes
  const planetAnimationStartTime = useRef(Date.now())
  
  const getParticleTimePlanetPositions = () => {
    const elapsed = (Date.now() - planetAnimationStartTime.current) / 1000
    return planets.map(planet => ({
      ...planet,
      position: getPlanetPosition(planet, elapsed)
    }))
  }
  const audioRef = useRef<HTMLAudioElement>(null)
  const rocketIdRef = useRef(0)

  // Planet data with gravitational strength and collision radius (further reduced for better visibility)
  const planets = [
    { name: 'mercury', mass: 0.055, radius: 1.8, orbitRadius: 60, orbitTime: 8 },
    { name: 'venus', mass: 0.815, radius: 2.7, orbitRadius: 100, orbitTime: 12 },
    { name: 'earth', mass: 1.0, radius: 3.6, orbitRadius: 140, orbitTime: 20 },
    { name: 'mars', mass: 0.107, radius: 2.7, orbitRadius: 180, orbitTime: 30 },
    { name: 'jupiter', mass: 317.8, radius: 5.4, orbitRadius: 220, orbitTime: 60 },
    { name: 'saturn', mass: 95.2, radius: 4.5, orbitRadius: 260, orbitTime: 90 },
    { name: 'uranus', mass: 14.5, radius: 3.6, orbitRadius: 300, orbitTime: 120 },
    { name: 'neptune', mass: 17.1, radius: 3.6, orbitRadius: 340, orbitTime: 150 }
  ]

  // Shared function to calculate planet positions
  const getPlanetPosition = (planet: any, elapsed: number) => {
    const planetAngle = (elapsed / planet.orbitTime) * 360
    const planetX = Math.cos((planetAngle - 90) * Math.PI / 180) * planet.orbitRadius
    const planetY = Math.sin((planetAngle - 90) * Math.PI / 180) * planet.orbitRadius
    return { x: planetX, y: planetY }
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Test particle physics effect (replacing rocket launches)
  useEffect(() => {
    // Initialize test particle from the Sun
    const initializeTestParticle = () => {
      // Start from the Sun (center)
      const particleX = 0
      const particleY = 0
      
      // Random direction (0 to 2π radians)
      const randomAngle = Math.random() * 2 * Math.PI
      
      // Moderate velocity to see gravitational effects clearly
      const slowVelocity = 2.0 // Back to original level for better observation
      
      // Velocity in random direction
      const initialVelocity = {
        x: Math.cos(randomAngle) * slowVelocity,
        y: Math.sin(randomAngle) * slowVelocity
      }
      
      console.log(`INITIALIZING PARTICLE: x=${particleX.toFixed(1)}, y=${particleY.toFixed(1)}, angle=${(randomAngle * 180 / Math.PI).toFixed(1)}°, vx=${initialVelocity.x.toFixed(3)}, vy=${initialVelocity.y.toFixed(3)}`)
      
      setTestParticle({
        x: particleX,
        y: particleY,
        velocityX: initialVelocity.x,
        velocityY: initialVelocity.y,
        startTime: Date.now()
      })
    }

    // Initialize test particle
    initializeTestParticle()
    
    // Relaunch particle every 60 seconds for better visibility (but keep same start time)
    const relaunchInterval = setInterval(() => {
      console.log('RELAUNCHING PARTICLE FROM SUN')
      setTestParticle(prev => {
        const randomAngle = Math.random() * 2 * Math.PI
        const slowVelocity = 2.0
        return {
          x: Math.cos(randomAngle) * 50,
          y: Math.sin(randomAngle) * 50,
          velocityX: Math.cos(randomAngle) * slowVelocity,
          velocityY: Math.sin(randomAngle) * slowVelocity,
          startTime: prev.startTime // Keep the same start time to avoid animation restart
        }
      })
    }, 60000) // 60 seconds
    
    // Simulate physics for test particle
    const physicsInterval = setInterval(() => {
      setTestParticle(prev => {
        const elapsed = (Date.now() - prev.startTime) / 1000
        
        // Debug: Log current particle state
        console.log(`PARTICLE: x=${prev.x.toFixed(6)}, y=${prev.y.toFixed(6)}, vx=${prev.velocityX.toFixed(6)}, vy=${prev.velocityY.toFixed(6)}`)
        
        // Apply gravitational forces from each planet FIRST
        let totalForceX = 0
        let totalForceY = 0
        
        // SUN'S GRAVITATIONAL FORCE (temporarily disabled for testing)
        const sunX = 0 // Sun is at the center
        const sunY = 0
        const dxToSun = sunX - prev.x
        const dyToSun = sunY - prev.y
        const distanceToSun = Math.sqrt(dxToSun * dxToSun + dyToSun * dyToSun)
        
        // Temporarily disable Sun's gravity to test particle movement
        if (false && distanceToSun > 0) {
          const sunMass = 0.0005 // 0.01% of 0.5 for extremely weak gravity
          const sunForce = (sunMass * 0.0005) / (distanceToSun * distanceToSun) // 0.01% of 0.05 multiplier
          const sunForceX = (dxToSun / distanceToSun) * sunForce
          const sunForceY = (dyToSun / distanceToSun) * sunForce
          totalForceX += sunForceX
          totalForceY += sunForceY
          
          console.log(`SUN GRAVITY: distance=${distanceToSun.toFixed(1)}, force=${sunForce.toFixed(3)}, fx=${sunForceX.toFixed(3)}, fy=${sunForceY.toFixed(3)}`)
        }
        
        planets.forEach(planet => {
          // Calculate planet position using planet animation time (not particle time)
          const planetElapsed = (Date.now() - planetAnimationStartTime.current) / 1000
          const planetPos = getPlanetPosition(planet, planetElapsed)
          const planetX = planetPos.x
          const planetY = planetPos.y
          
          const dx = planetX - prev.x
          const dy = planetY - prev.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Gravitational influence radius = much larger for better interaction
          const gravitationalRadius = planet.radius * 50 // Increased from 20 to 50 for much larger fields
          
          // Debug: Log all planet positions and distances
          console.log(`PLANET ${planet.name}: x=${planetX.toFixed(1)}, y=${planetY.toFixed(1)}, distance=${distance.toFixed(1)}, radius=${gravitationalRadius.toFixed(1)}`)
          
          // Debug: Log when particle is within gravitational range
          if (distance <= gravitationalRadius) {
            console.log(`🎯 PARTICLE IN ${planet.name.toUpperCase()} GRAVITY RANGE!`)
          }
          
          // Only apply gravity if within gravitational influence radius
          if (distance <= gravitationalRadius && distance > 0) {
            const force = (planet.mass * 500.0) / (distance * distance) // 10x stronger gravity (50.0 -> 500.0)
            const forceX = (dx / distance) * force
            const forceY = (dy / distance) * force
            totalForceX += forceX
            totalForceY += forceY
            
            // Debug logging for planets within gravitational radius
            console.log(`PLANET GRAVITY: ${planet.name} - distance=${distance.toFixed(1)}, radius=${gravitationalRadius.toFixed(1)}, force=${force.toFixed(6)}, fx=${forceX.toFixed(6)}, fy=${forceY.toFixed(6)}`)
          } else if (distance <= gravitationalRadius * 2) {
            // Debug: Log when particle is getting close but not quite in range
            console.log(`NEAR MISS: ${planet.name} - distance=${distance.toFixed(1)}, radius=${gravitationalRadius.toFixed(1)}`)
          }
        })
        
        // Debug logging for total forces
        console.log(`TOTAL FORCES: X=${totalForceX.toFixed(3)}, Y=${totalForceY.toFixed(3)}`)
        
        // Check for collisions with any planet after processing all forces
        let collisionDetected = false
        let collisionPlanet = ''
        planets.forEach(planet => {
          // Calculate planet position using planet animation time (not particle time)
          const planetElapsed = (Date.now() - planetAnimationStartTime.current) / 1000
          const planetPos = getPlanetPosition(planet, planetElapsed)
          const planetX = planetPos.x
          const planetY = planetPos.y
          const dx = planetX - prev.x
          const dy = planetY - prev.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const collisionRadius = planet.radius * 3
          
          if (distance <= collisionRadius) {
            collisionDetected = true
            collisionPlanet = planet.name
          }
        })
        
        if (collisionDetected) {
          console.log(`💥 PARTICLE CRASHED INTO ${collisionPlanet.toUpperCase()}!`)
          // Reset particle to center with new random direction
          const randomAngle = Math.random() * 2 * Math.PI
          return {
            x: Math.cos(randomAngle) * 50, // Start 50px from center
            y: Math.sin(randomAngle) * 50,
            velocityX: Math.cos(randomAngle) * 2.0,
            velocityY: Math.sin(randomAngle) * 2.0,
            startTime: prev.startTime // Keep the same start time to avoid animation restart
          }
        }
        
        // Update velocity based on gravitational forces
        const newVelocityX = prev.velocityX + totalForceX * 10.0 // Apply force over time step (10x stronger)
        const newVelocityY = prev.velocityY + totalForceY * 10.0
        
        // DEBUG: Limit maximum velocity to prevent runaway acceleration
        const maxVelocity = 20.0 // Much higher to allow particle to be pulled into planets
        const currentSpeed = Math.sqrt(newVelocityX * newVelocityX + newVelocityY * newVelocityY)
        
        let finalVelocityX = newVelocityX
        let finalVelocityY = newVelocityY
        
        if (currentSpeed > maxVelocity) {
          const scale = maxVelocity / currentSpeed
          finalVelocityX = newVelocityX * scale
          finalVelocityY = newVelocityY * scale
          console.log(`VELOCITY LIMITED: ${currentSpeed.toFixed(6)} -> ${maxVelocity.toFixed(6)}`)
        }
        
        // Debug: Log velocity changes
        console.log(`VELOCITY CHANGE: Δvx=${(finalVelocityX - prev.velocityX).toFixed(6)}, Δvy=${(finalVelocityY - prev.velocityY).toFixed(6)}`)
        console.log(`CURRENT SPEED: ${currentSpeed.toFixed(6)}`)
        
        // THEN update position based on new velocity
        const newPosX = prev.x + finalVelocityX * 1.0
        const newPosY = prev.y + finalVelocityY * 1.0
        
        // DEBUG: Keep particle on screen (screen is roughly 2000x2000 centered)
        const screenLimit = 2000 // Much larger to prevent immediate reset
        let finalPosX = newPosX
        let finalPosY = newPosY
        
        if (Math.abs(newPosX) > screenLimit || Math.abs(newPosY) > screenLimit) {
          console.log(`PARTICLE OFF SCREEN: x=${newPosX.toFixed(1)}, y=${newPosY.toFixed(1)} - RESETTING`)
          // Reset particle to center with random direction
          const randomAngle = Math.random() * 2 * Math.PI
          finalPosX = Math.cos(randomAngle) * 50 // Start 50px from center
          finalPosY = Math.sin(randomAngle) * 50
          finalVelocityX = Math.cos(randomAngle) * 1.0 // Much faster reset velocity
          finalVelocityY = Math.sin(randomAngle) * 1.0
        }
        
        // Debug: Log position changes
        console.log(`POSITION CHANGE: Δx=${(finalPosX - prev.x).toFixed(6)}, Δy=${(finalPosY - prev.y).toFixed(6)}`)
        console.log(`NEW POSITION: x=${finalPosX.toFixed(1)}, y=${finalPosY.toFixed(1)}`)
        console.log('---')
        
        return {
          x: finalPosX,
          y: finalPosY,
          velocityX: finalVelocityX,
          velocityY: finalVelocityY,
          startTime: prev.startTime
        }
      })
    }, 50) // Update physics 20 times per second (much faster for testing)
    
    return () => {
      clearInterval(physicsInterval)
      clearInterval(relaunchInterval)
    }
  }, [])

  // Rocket launch effect (commented out for testing)
  /*
  useEffect(() => {
    const launchRocket = () => {
      const rocketId = rocketIdRef.current++
      
      // Calculate Earth's current orbital position
      const earthOrbitTime = 20 // seconds
      const currentTime = (Date.now() / 1000) % earthOrbitTime
      const earthAngle = (currentTime / earthOrbitTime) * 360
      
      // Calculate Earth's current position
      const earthRadius = 260
      const earthX = Math.cos((earthAngle - 90) * Math.PI / 180) * earthRadius
      const earthY = Math.sin((earthAngle - 90) * Math.PI / 180) * earthRadius
      
      // Initial velocity vector (tangent to Earth's orbit) - much slower
      const initialVelocity = {
        x: -Math.sin((earthAngle - 90) * Math.PI / 180) * 10, // Reduced from 50 to 10
        y: Math.cos((earthAngle - 90) * Math.PI / 180) * 10
      }
      
      // Planet data with gravitational strength and collision radius (using main planets array)
      
      setRockets(prev => [...prev, { 
        id: rocketId, 
        startTime: Date.now(), 
        path: ['earth'],
        earthAngle,
        earthX,
        earthY,
        crashed: false,
        crashPlanet: null,
        velocityX: initialVelocity.x,
        velocityY: initialVelocity.y
      }])
      
      // Simulate physics for 30 seconds
      const physicsInterval = setInterval(() => {
        setRockets(prev => prev.map(rocket => {
          if (rocket.id !== rocketId || rocket.crashed) return rocket
          
          const elapsed = (Date.now() - rocket.startTime) / 1000
          if (elapsed > 30) {
            clearInterval(physicsInterval)
            return rocket
          }
          
          // Calculate rocket position based on physics - start from Earth's position
          let posX = rocket.earthX + rocket.velocityX * elapsed
          let posY = rocket.earthY + rocket.velocityY * elapsed
          
          // Apply gravitational forces from each planet
          let totalForceX = 0
          let totalForceY = 0
          
          planets.forEach(planet => {
            const planetAngle = (elapsed / planet.orbitTime) * 360
            const planetX = Math.cos((planetAngle - 90) * Math.PI / 180) * planet.orbitRadius
            const planetY = Math.sin((planetAngle - 90) * Math.PI / 180) * planet.orbitRadius
            
            const dx = planetX - posX
            const dy = planetY - posY
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            // Check for collision
            if (distance < planet.radius + 4) { // 4px is rocket radius
              return {
                ...rocket,
                crashed: true,
                crashPlanet: planet.name
              }
            }
            
            // Apply gravitational force (inverse square law) - reduced strength
            if (distance > 0) {
              const force = (planet.mass * 0.01) / (distance * distance) // Reduced from 0.1 to 0.01
              totalForceX += (dx / distance) * force
              totalForceY += (dy / distance) * force
            }
          })
          
          // Update velocity based on gravitational forces
          const newVelocityX = rocket.velocityX + totalForceX
          const newVelocityY = rocket.velocityY + totalForceY
          
          // Update position based on new velocity
          posX = rocket.earthX + newVelocityX * elapsed
          posY = rocket.earthY + newVelocityY * elapsed
          
          return {
            ...rocket,
            earthX: posX,
            earthY: posY,
            velocityX: newVelocityX,
            velocityY: newVelocityY
          }
        }))
      }, 100) // Update physics 10 times per second
      
      // Remove rocket after animation completes
      setTimeout(() => {
        setRockets(prev => prev.filter(r => r.id !== rocketId))
        clearInterval(physicsInterval)
      }, 30000)
    }

    // Launch rocket every 30 seconds
    const interval = setInterval(launchRocket, 30000)
    
    // Launch first rocket after 2 seconds (when planets are in motion)
    const initialLaunch = setTimeout(launchRocket, 2000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(initialLaunch)
    }
  }, [])
  */

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   setIsDragging(true)
  //   setDragStart({ x: e.clientX, y: e.clientY })
  // }

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (!isDragging) return
    
  //   const deltaX = e.clientX - dragStart.x
  //   const deltaY = e.clientY - dragStart.y
    
  //   setRotation(prev => ({
  //     x: prev.x + deltaY * 0.5, // Invert Y for natural feel
  //     y: prev.y + deltaX * 0.5
  //   }))
    
  //   setDragStart({ x: e.clientX, y: e.clientY })
  // }

  // const handleMouseUp = () => {
  //   setIsDragging(false)
  // }

  // const handleMouseLeave = () => {
  //   setIsDragging(false)
  // }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/no-time-for-caution.mp3"
        loop
        preload="auto"
      />

      {/* Audio Control Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleAudio}
          className="bg-black/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/10 transition-colors border border-white/20"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Solar System Background */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          // transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          // cursor: isDragging ? 'grabbing' : 'grab'
        }}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseLeave}
      >
        {/* Starfield */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(-100px)' }}>
          {[...Array(800)].map((_, i) => (
            <div
              key={i}
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

        {/* Test Particle - Positioned between Jupiter and Saturn to test for stray gravitational fields */}
        <div
          className="absolute"
          style={{
            left: `calc(50% + ${testParticle.x}px)`,
            top: `calc(50% + ${testParticle.y}px)`,
            zIndex: 1000
          }}
        >
          <div className="relative w-3 h-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute inset-0 w-3 h-3 bg-red-400/60 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-3 h-3 bg-yellow-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          {/* Debug: Show particle coordinates */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-1 rounded">
            ({testParticle.x.toFixed(0)}, {testParticle.y.toFixed(0)})
          </div>
        </div>



        {/* JavaScript-Positioned Gravitational Circles (aligned with physics) */}
        {getParticleTimePlanetPositions().map((planet, index) => {
          const gravitationalRadius = planet.radius * 50 // Same as physics calculation
          return (
            <div
              key={`grav-${planet.name}`}
              className="absolute border-2 border-red-500/50 rounded-full pointer-events-none"
              style={{
                width: `${gravitationalRadius * 2}px`,
                height: `${gravitationalRadius * 2}px`,
                left: `calc(50% + ${planet.position.x}px)`,
                top: `calc(50% + ${planet.position.y}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: 400
              }}
            />
          )
        })}

        {/* Sun */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute inset-2 w-20 h-20 bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 rounded-full opacity-40 animate-pulse"></div>
            {/* Sun's Gravitational Field */}
            <div 
              className="absolute border-2 border-purple-500/50 rounded-full pointer-events-none"
              style={{
                width: '300px',
                height: '300px',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                zIndex: 400
              }}
            />
          </div>
        </div>

        {/* JavaScript-Positioned Planets (aligned with physics) */}
        {getParticleTimePlanetPositions().map((planet, index) => {
          const planetSize = planet.radius * 2 * 5 // 5x larger planets
          let planetVisual
          
          switch(planet.name) {
            case 'mercury':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 rounded-full opacity-40"></div>
                </div>
              )
              break
            case 'venus':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-yellow-400 via-orange-300 to-yellow-500 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-500 via-orange-400 to-yellow-600 rounded-full opacity-40"></div>
                </div>
              )
              break
            case 'earth':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-blue-500 via-blue-400 to-green-500 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-600 via-green-500 to-green-400 rounded-full opacity-40"></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/30 via-white/20 to-transparent rounded-full opacity-60"></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-300/20 via-blue-200/10 to-transparent rounded-full opacity-40"></div>
                </div>
              )
              break
            case 'mars':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-700 via-red-600 to-red-500 rounded-full opacity-40"></div>
                </div>
              )
              break
            case 'jupiter':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-yellow-600 via-orange-500 to-red-600 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-600 via-yellow-500 to-orange-400 rounded-full opacity-30"></div>
                  <div className="absolute inset-2 w-4/5 h-4/5 bg-gradient-to-br from-orange-500 via-yellow-400 to-orange-500 rounded-full opacity-40"></div>
                </div>
              )
              break
            case 'saturn':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-yellow-300 via-orange-300 to-yellow-400 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300 rounded-full opacity-60"></div>
                </div>
              )
              break
            case 'uranus':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-cyan-400 via-blue-300 to-cyan-500 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500 via-blue-400 to-cyan-600 rounded-full opacity-40"></div>
                </div>
              )
              break
            case 'neptune':
              planetVisual = (
                <div className="relative" style={{ width: `${planetSize}px`, height: `${planetSize}px` }}>
                  <div className={`w-full h-full bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-full`}></div>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-full opacity-40"></div>
                </div>
              )
              break
            default:
              planetVisual = <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          }
          
          return (
            <div
              key={`planet-${planet.name}`}
              className="absolute"
              style={{
                left: `calc(50% + ${planet.position.x}px)`,
                top: `calc(50% + ${planet.position.y}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: planet.name === 'saturn' ? 600 : 500
              }}
            >
              {planetVisual}
            </div>
          )
        })}



        {/* Orbital paths */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-200 h-200 border border-white/5 rounded-full"></div>
          <div className="w-360 h-360 border border-white/5 rounded-full"></div>
          <div className="w-520 h-520 border border-white/5 rounded-full"></div>
          <div className="w-680 h-680 border border-white/5 rounded-full"></div>
          <div className="w-880 h-880 border border-white/5 rounded-full"></div>
          <div className="w-1080 h-1080 border border-white/5 rounded-full"></div>
          <div className="w-1280 h-1280 border border-white/5 rounded-full"></div>
          <div className="w-1480 h-1480 border border-white/5 rounded-full"></div>
        </div>
      </div>

      {/* CSS Animation for Planetary Orbits */}
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
        
        @keyframes mercuryOrbit {
          0% {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }
        
        @keyframes venusOrbit {
          0% {
            transform: rotate(0deg) translateX(180px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(180px) rotate(-360deg);
          }
        }
        
        @keyframes earthOrbit {
          0% {
            transform: rotate(0deg) translateX(260px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(260px) rotate(-360deg);
          }
        }
        
        @keyframes marsOrbit {
          0% {
            transform: rotate(0deg) translateX(340px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(340px) rotate(-360deg);
          }
        }
        
        @keyframes jupiterOrbit {
          0% {
            transform: rotate(0deg) translateX(440px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(440px) rotate(-360deg);
          }
        }
        
        @keyframes saturnOrbit {
          0% {
            transform: rotate(0deg) translateX(540px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(540px) rotate(-360deg);
          }
        }
        
        @keyframes uranusOrbit {
          0% {
            transform: rotate(0deg) translateX(640px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(640px) rotate(-360deg);
          }
        }
        
        @keyframes neptuneOrbit {
          0% {
            transform: rotate(0deg) translateX(740px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(740px) rotate(-360deg);
          }
        }
      `}</style>

      {/* Navigation Tabs */}
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
          

        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="text-center">
          {/* Content can be added here later if needed */}
        </div>
      </div>
    </main>
  )
} 