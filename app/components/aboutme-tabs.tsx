'use client'

import Link from 'next/link'

interface Subtab {
  label: string
  href: string
}

export interface Tab {
  label: string
  href: string
  color: string
  glowColor: string
  subtabs: Subtab[]
}

export const ABOUT_ME_TABS: Tab[] = [
  { 
    label: 'Coding', 
    href: '/about/coding',
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'shadow-cyan-500/50',
    subtabs: [
      { label: 'Projects', href: '/about/coding#projects' },
      { label: 'Languages', href: '/about/coding#languages' },
      { label: 'Frameworks', href: '/about/coding#frameworks' },
      { label: 'Tools', href: '/about/coding#tools' },
    ]
  },
  { 
    label: 'Polyglot', 
    href: '/about/language-nerd',
    color: 'from-purple-400 to-pink-500',
    glowColor: 'shadow-purple-500/50',
    subtabs: [
      { label: 'Mandarin', href: '/about/language-nerd#mandarin' },
      { label: 'English', href: '/about/language-nerd#english' },
      { label: 'German', href: '/about/language-nerd#german' },
      { label: 'French', href: '/about/language-nerd#french' },
      { label: 'Japanese', href: '/about/language-nerd#japanese' },
      { label: 'Latin', href: '/about/language-nerd#latin' },
      { label: 'Sanskrit', href: '/about/language-nerd#sanskrit' },
    ]
  },
  { 
    label: 'Social Activity', 
    href: '/about/social-activity',
    color: 'from-green-400 to-emerald-500',
    glowColor: 'shadow-green-500/50',
    subtabs: [
      { label: 'Kaifeng', href: '/about/social-activity#kaifeng' },
      { label: 'Volunteering', href: '/about/social-activity#volunteering' },
      { label: 'Animals on Campus', href: '/about/social-activity#animal-on-campus' },
    ]
  },
  {
    label: 'Life',
    href: '/about/life',
    color: 'from-yellow-400 to-orange-500',
    glowColor: 'shadow-yellow-500/50',
    subtabs: [
      { label: 'Mental Health', href: '/about/life#mental-health' },
      { label: 'Cooking', href: '/about/life#cooking' },
      { label: 'Travel', href: '/about/life#travel' },
      { label: 'Sports', href: '/about/life#sports' },
      { label: 'Gaming', href: '/about/life#gaming' },
      { label: 'Films', href: '/about/life#films' },
      { label: 'TV Series', href: '/about/life#tv-series' },
      { label: 'Ceramics', href: '/about/life#ceramics' },
    ]
  }
]

export function AboutMeTabs() {
  const tabs = ABOUT_ME_TABS

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-4">
        {tabs.map((tab) => (
          <div 
            key={tab.href}
            className="relative group"
          >
            <Link
              href={tab.href}
              className={`
                block px-5 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider
                bg-gradient-to-r ${tab.color}
                text-white
                transition-all duration-300
                shadow-lg ${tab.glowColor}
                group-hover:shadow-xl group-hover:scale-105
                border-2 border-transparent
                group-hover:border-white/30
              `}
            >
              {tab.label}
            </Link>
            
            {tab.subtabs.length > 0 && (
              <div className="absolute top-full left-0 pt-1 z-10 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-1 group-hover:translate-y-0">
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
