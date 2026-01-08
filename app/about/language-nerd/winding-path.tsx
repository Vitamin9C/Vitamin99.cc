'use client'

import { useEffect, useRef, useState } from 'react'

export function TheWindingPath() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const ballRef = useRef<SVGGElement>(null)
  const [pathD, setPathD] = useState('')
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  // Initialization and Resize Observer
  useEffect(() => {
    setIsClient(true)
    
    const calculatePath = () => {
      const startEl = document.getElementById('winding-path-start')
      const endEl = document.getElementById('winding-path-end')
      const containerEl = document.getElementById('winding-path-container')

      if (!startEl || !endEl || !containerEl) return

      const startRect = startEl.getBoundingClientRect()
      const endRect = endEl.getBoundingClientRect()
      const containerRect = containerEl.getBoundingClientRect()

      // Calculate relative coordinates within the container
      const startX = startRect.left + startRect.width / 2 - containerRect.left
      const titleY = startRect.top + startRect.height / 2 - containerRect.top
      
      // Start from top of container
      const startY = 0 
      
      // End at the left of the quote
      // Adjust endX to be slightly more to the left to give room for loops
      const endX = endRect.left - containerRect.left
      const endY = endRect.top + endRect.height / 2 - containerRect.top

      const width = containerRect.width
      const height = endY + 100 // Extra space

      setDimensions({ width, height })

      // Winding Path Logic
      
      const dy = endY - titleY
      const cp1y = titleY + dy * 0.3
      const cp2y = titleY + dy * 0.6
      
      const rightX = width * 0.85
      const leftX = width * 0.15
      const centerX = width / 2

      // Constructing a Golden Spin path
      // 1. Straight down from top to title
      // 2. Winding S-curves
      // 3. Loop de loops near the end
      
      const loopRadius = 40;

      const d = [
        `M ${startX} ${startY}`,
        `L ${startX} ${titleY}`,
        
        // S-Curve 1: Swing Right
        `C ${startX} ${titleY + 100}, ${rightX} ${cp1y - 100}, ${rightX} ${cp1y}`,
        
        // S-Curve 2: Swing Left
        `C ${rightX} ${cp1y + 150}, ${leftX} ${cp2y - 150}, ${leftX} ${cp2y}`,
  
        // Approach the target for the loops
        `C ${leftX} ${cp2y + 150}, ${endX - 50} ${endY - 100}, ${endX} ${endY - 60}`,
        
        // Loop 1 (Clockwise approx)
        `C ${endX + 60} ${endY - 60}, ${endX + 60} ${endY + 60}, ${endX} ${endY + 20}`,
        `C ${endX - 60} ${endY + 20}, ${endX - 60} ${endY - 40}, ${endX} ${endY - 40}`,
        
        // Loop 2 (Tighter)
        `C ${endX + 40} ${endY - 40}, ${endX + 40} ${endY + 40}, ${endX} ${endY}`,
        
      ].join(' ')

      setPathD(d)
    }

    // Initial calc
    const timer = setTimeout(calculatePath, 100)
    
    const resizeObserver = new ResizeObserver(() => {
      calculatePath()
    })
    
    const container = document.getElementById('winding-path-container')
    if (container) resizeObserver.observe(container)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
    }
  }, [])

  // Scroll Animation Logic
  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()
    
    // Set up initial dash layout
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const handleScroll = () => {
      const endEl = document.getElementById('winding-path-end')
      if (!endEl) return

      // Logic:
      // Start drawing when user starts scrolling the section?
      // Use window scroll position.
      
      const container = document.getElementById('winding-path-container')
      if (!container) return
      
      const containerRect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // We want the ball to be at "eye level" usually, about 1/3 or 1/2 down the screen?
      // Or just map the entire container height to scroll distance?
      
      // Let's say:
      // Start: When container top enters screen bottom
      // End: When quote (near bottom of container) is in middle of screen
      
      const startTrigger = containerRect.top - windowHeight // < 0 when entering
      const totalScrollableDistance = containerRect.height + windowHeight * 0.5 // Rough calc
      
      // Simpler: Just map the "line tip" to be relative to how much we've scrolled past the container top
      // But we want the line to "arrive" at the text when the text is visible.
      // Quote position relative to viewport:
      const quoteRect = endEl.getBoundingClientRect()
      const quoteTop = quoteRect.top
      
      // Ideally:
      // When Quote is at bottom of screen (entering), progress is close to 100%? 
      // No, when quote is centered, progress is 100%.
      // When Title is at top of screen, progress is small.
      
      // Let's use a "Focus Point" which is 60% down the screen.
      const focusPoint = windowHeight * 0.6
      
      // What Y coordinate in the container is currently at the Focus Point?
      // containerY + internalY = focusPoint  =>  internalY = focusPoint - containerY
      const currentY = focusPoint - containerRect.top // This is the y-coordinate inside the SVG we "should" be at.
      
      // However, the PATH is curved, so Y doesn't map linearly to Length.
      // We need to find the length L such that getPointAtLength(L).y ≈ currentY.
      // This is expensive to invert.
      // Approximation: Map "Scroll Percentage of Section" to "Path Percentage".
      
      // Let's assume the path generally goes down.
      // Path Start Y = 0. Path End Y = height.
      // If currentY < 0, progress 0. If currentY > height, progress 1.
      
      let progress = currentY / dimensions.height
      if (progress < 0) progress = 0
      if (progress > 1) progress = 1
      
      // Fine tune: The path is longer than height due to squiggles.
      // But visually we want the ball to track vertically with the scroll.
      // So linear mapping of Y is good enough.
      
      const drawLength = length * progress
      path.style.strokeDashoffset = `${length - drawLength}`

      // Update Steel Ball Position
      if (ballRef.current) {
         const point = path.getPointAtLength(drawLength)
         // Calculate rotation based on travel
         // A ball of radius 8 rotates: distance / (2 * PI * r) * 360
         const rotation = (drawLength / (2 * Math.PI * 8)) * 360
         
         ballRef.current.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${rotation}deg)`
         
         // Show/Hide ball based on progress
         ballRef.current.style.opacity = progress > 0 && progress < 1 ? '1' : '0'
      }

      // Trigger Reveal
      const quoteText = document.getElementById('winding-path-text')
      if (quoteText) {
        if (progress > 0.98) {
            quoteText.style.opacity = '1'
            quoteText.style.transform = 'translateY(0)'
            quoteText.style.filter = 'blur(0px)'
        } else {
            quoteText.style.opacity = '0'
            quoteText.style.transform = 'translateY(10px)'
            quoteText.style.filter = 'blur(4px)'
        }
      }
    }

    const onScroll = () => requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    if (dimensions.height > 0) handleScroll() // Initial check

    return () => window.removeEventListener('scroll', onScroll)
  }, [pathD, dimensions.height])

  if (!isClient) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
      <svg 
        width="100%" 
        height={dimensions.height}
        className="overflow-visible"
      >
        <path
          d={pathD}
          fill="none"
          strokeWidth="1"
          className="stroke-neutral-200 dark:stroke-neutral-800/50"
          strokeLinecap="round"
        />
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          strokeWidth="3"
          className="stroke-emerald-600 dark:stroke-emerald-400 drop-shadow-md"
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
        
        {/* Steel Ball */}
        <g ref={ballRef} className="opacity-0 transition-opacity duration-300">
           {/* Outer Rim */}
           <circle r="10" fill="url(#ballGradient)" stroke="#059669" strokeWidth="1" />
           {/* Detailed Lines for Rotation visibility */}
           <path d="M -10 0 L 10 0" stroke="#065f46" strokeWidth="1" />
           <path d="M 0 -10 L 0 10" stroke="#065f46" strokeWidth="1" />
           <circle r="6" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
        </g>
        
        <defs>
          <radialGradient id="ballGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#064e3b" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}
