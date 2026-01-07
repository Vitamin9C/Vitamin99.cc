'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Subtab {
  label: string
  href: string
}

interface Tab {
  label: string
  href: string
  color: string
  glowColor: string
  subtabs: Subtab[]
}

export function NavigationTabs() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const tabs: Tab[] = [
    { 
      label: 'Coding', 
      href: '/coding',
      color: 'from-cyan-400 to-blue-500',
      glowColor: 'shadow-cyan-500/50',
      subtabs: [
        { label: 'Python', href: '/coding#python' },
        { label: 'Rust', href: '/coding#rust' },
        { label: 'C/C++', href: '/coding#cpp' },
      ]
    },
    { 
      label: 'Language Nerd', 
      href: '/language-nerd',
      color: 'from-purple-400 to-pink-500',
      glowColor: 'shadow-purple-500/50',
      subtabs: [
        { label: 'German', href: '/language-nerd#german' },
        { label: 'French', href: '/language-nerd#french' },
        { label: 'Japanese', href: '/language-nerd#japanese' },
        { label: 'Latin', href: '/language-nerd#latin' },
        { label: 'Sanskrit', href: '/language-nerd#sanskrit' },
      ]
    },
    { 
      label: 'Leisure', 
      href: '/leisure',
      color: 'from-red-400 to-orange-500',
      glowColor: 'shadow-red-500/50',
      subtabs: []
    },
    { 
      label: 'Social Activity', 
      href: '/social-activity',
      color: 'from-green-400 to-emerald-500',
      glowColor: 'shadow-green-500/50',
      subtabs: []
    },
  ]

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <div 
            key={tab.href}
            onMouseEnter={() => setActiveTab(tab.href)}
            onMouseLeave={() => setActiveTab(null)}
            className="relative"
          >
            <Link
              href={tab.href}
              className={`
                block px-5 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider
                bg-gradient-to-r ${tab.color}
                text-white
                transition-all duration-300
                shadow-lg ${tab.glowColor}
                hover:shadow-xl hover:scale-105
                border-2 border-transparent
                hover:border-white/30
              `}
            >
              {tab.label}
            </Link>
            
            {activeTab === tab.href && tab.subtabs.length > 0 && (
              <div className="absolute top-full left-0 mt-2 z-10 min-w-[180px]">
                <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-2xl overflow-hidden">
                  {tab.subtabs.map((subtab, index) => (
                    <Link
                      key={subtab.href}
                      href={subtab.href}
                      className={`
                        block px-4 py-2 text-sm font-medium
                        text-white/90 hover:text-white
                        hover:bg-gradient-to-r hover:${tab.color}
                        transition-all duration-200
                        ${index !== tab.subtabs.length - 1 ? 'border-b border-white/10' : ''}
                      `}
                    >
                      {subtab.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface SectionTab {
  label: string
  href: string
}

interface SectionNavigationProps {
  sections: SectionTab[]
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
  return (
    <div className="my-6 flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
      {sections.map((section) => (
        <a
          key={section.href}
          href={section.href}
          className="
            px-3 py-1.5 rounded-md text-sm font-medium
            transition-all duration-150
            text-neutral-600 dark:text-neutral-400
            hover:text-neutral-900 dark:hover:text-neutral-100
            hover:bg-neutral-100 dark:hover:bg-neutral-800
          "
        >
          {section.label}
        </a>
      ))}
    </div>
  )
}
