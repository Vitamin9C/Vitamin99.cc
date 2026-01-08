'use client'

import { useState, useEffect } from 'react'

export function InteractiveSanskrit() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleClickOutside = () => setActiveIndex(null)
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const words = [
    { devanagari: 'उद्यमेन', translit: 'Udyamena', grammar: 'inst. masc. sg.', gloss: 'by effort' },
    { devanagari: 'हि', translit: 'hi', grammar: 'part.', gloss: 'indeed' },
    { devanagari: 'सिध्यन्ति', translit: 'sidhyanti', grammar: '3rd pl. pres. ind.', gloss: 'succeed' },
    { devanagari: 'कार्याणि', translit: 'kāryāṇi', grammar: 'nom. pl. nt.', gloss: 'works, deeds, tasks' },
    { devanagari: 'न', translit: 'na', grammar: 'negation', gloss: 'not' },
    { devanagari: 'मनोरथैः', translit: 'manorathaiḥ', grammar: 'inst. pl. masc.', gloss: 'by wishes' },
  ]

  return (
    <div className="mb-2 text-sm text-neutral-800 dark:text-neutral-200">
      <div className="flex flex-wrap gap-x-4 gap-y-8 items-end">
        {words.map((word, i) => {
          const isActive = activeIndex === i
          return (
            <div 
              key={i} 
              className="relative text-center cursor-pointer select-none group"
              onClick={(e) => {
                e.stopPropagation()
                setActiveIndex(isActive ? null : i)
              }}
            >
              <div className={`transition-all duration-200 ease-out ${isActive ? 'scale-110 -translate-y-1' : 'active:scale-95'}`}>
                <div className={`border-b border-dotted pb-0.5 transition-colors ${isActive ? 'border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300' : 'border-neutral-400 dark:border-neutral-500'}`}>
                  <span className="italic text-lg">{word.devanagari}</span>
                </div>
                <span className={`text-xs italic block mt-1 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-300 font-medium' : 'text-neutral-600 dark:text-neutral-400'}`}>
                  {word.translit}
                </span>
              </div>
              
              {/* Tooltip / Popover */}
              <div 
                className={`
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 
                  bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg shadow-xl
                  transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform origin-bottom
                  z-50 whitespace-nowrap text-xs not-italic
                  ${isActive 
                    ? 'opacity-100 scale-100 translate-y-0 visible' 
                    : 'opacity-0 scale-75 translate-y-2 invisible pointer-events-none'}
                `}
              >
                <div className="font-semibold text-sm mb-0.5">{word.gloss}</div>
                <div className="text-neutral-400 dark:text-neutral-500 text-[10px] uppercase tracking-wider">
                  {word.grammar}
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100"></div>
              </div>
            </div>
          )
        })}
      
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-6 not-italic flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mouse-pointer-click"><path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/></svg>
        Click on words to inspect translation & grammar
      </p>
      <p className="mb-2 text-sm text-neutral-800 dark:text-neutral-200 italic">
        "By effort indeed the tasks succeed, not by mere wishes."
       </p>
    </div>
  )
}
