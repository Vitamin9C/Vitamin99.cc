'use client'

import { useState, useEffect, useRef } from 'react'

interface LyricLineProps {
  text: string
  italic?: boolean
  baseDelay: number
  letterDelay: number
  isHovered: boolean
  isActive: boolean
}

function LyricLine({ text, italic, baseDelay, letterDelay, isHovered, isActive }: LyricLineProps) {
  return (
    <span 
      className={`block transition-all duration-500 ${italic ? 'italic' : 'not-italic'} ${
        isActive ? 'translate-x-1 -translate-y-0.5 text-neutral-900 dark:text-white scale-[1.02]' : ''
      }`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="transition-colors duration-300"
          style={{
            color: isHovered 
              ? (isActive ? 'inherit' : 'rgb(163 163 163)') // inactive lines stay gray even when hovered
              : 'rgb(163 163 163)', 
            transitionDelay: isHovered && isActive
              ? `${index * letterDelay}ms` 
              : '0ms'
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export function AnimatedLyrics() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeLine, setActiveLine] = useState<number | null>(null)
  
  const lyrics = [
    { text: "🎶 Pourquoi notre cœur fait tic-tac ? 🎶", italic: true, duration: 3400 },
    { text: "Parce que la pluie fait flic flac.", italic: false, duration: 3400 },
    { text: "🎶 Pourquoi le temps passe si vite ? 🎶", italic: true, duration: 3400 },
    { text: "Parce que le vent lui rend visite.", italic: false, duration: 3400 },
    { text: "🎶 Pourquoi tu me prends par la main ? 🎶", italic: true, duration: 3400 },
    { text: "Parce qu'avec toi je suis bien.", italic: false, duration: 3400 },
    { text: "🎶 Pourquoi le diable et le bon Dieu ? 🎶", italic: true, duration: 3400 },
    { text: "C'est pour faire parler les curieux ~ 🎵", italic: false, duration: 3400 },
  ]

  const letterDelay = 80 
  const timerRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (isHovered) {
      let currentDelay = 0
      lyrics.forEach((line, index) => {
        const timeout = setTimeout(() => {
          setActiveLine(index)
        }, currentDelay)
        timerRef.current.push(timeout)
        currentDelay += line.duration
      })
      
      // Clear active line after all finished
      const finalTimeout = setTimeout(() => {
        setActiveLine(null)
      }, currentDelay)
      timerRef.current.push(finalTimeout)
    } else {
      timerRef.current.forEach(clearTimeout)
      timerRef.current = []
      setActiveLine(null)
    }

    return () => {
      timerRef.current.forEach(clearTimeout)
      timerRef.current = []
    }
  }, [isHovered])

  return (
    <div 
      className="mb-2 text-sm text-neutral-800 dark:text-neutral-200 min-w-fit cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {lyrics.map((line, index) => (
        <LyricLine 
          key={index} 
          text={line.text} 
          italic={line.italic} 
          baseDelay={0} // Managed by setActiveLine now
          letterDelay={letterDelay}
          isHovered={isHovered}
          isActive={activeLine === index}
        />
      ))}
    </div>
  )
}
