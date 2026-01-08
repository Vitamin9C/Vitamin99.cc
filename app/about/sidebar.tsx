'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { ABOUT_ME_TABS } from 'app/components/aboutme-tabs'

interface SidebarItem {
  label: string
  hrefFragment: string
  items?: SidebarItem[]
}

export function Sidebar() {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const isManualScroll = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Transform tabs data to sidebar format with manual extensions
  const navItems: SidebarItem[] = ABOUT_ME_TABS.map(tab => {
    let items: SidebarItem[] = tab.subtabs.map(subtab => ({
      label: subtab.label,
      hrefFragment: `#${subtab.href.split('#')[1] || subtab.href.split('/').pop()}`
    }))

    // Manual extension for Coding -> Languages subsections
    if (tab.label === 'Coding') {
      items = items.map(item => {
        if (item.label === 'Languages') {
          return {
            ...item,
            items: [
              { label: 'Python', hrefFragment: '#python' },
              { label: 'Rust', hrefFragment: '#rust' },
              { label: 'Others', hrefFragment: '#others' },
            ]
          }
        }
        return item
      })
    }

    return {
      label: tab.label,
      hrefFragment: `#${tab.href.split('/').pop()}-content`,
      items
    }
  })

  // Collect all IDs to observe (recursive)
  const getIds = (items: SidebarItem[]): string[] => {
    return items.flatMap(item => [
      item.hrefFragment.substring(1),
      ...(item.items ? getIds(item.items) : [])
    ])
  }

  // Memoize idsToObserve to prevent useEffect re-triggering if no change
  // Although in this component body, objects are recreated. 
  // We should rely on JSON.stringify or length check if we want strictness, 
  // but for now, rely on standard dependency array behavior (re-runs on render is fine if observer handles it well).
  const idsToObserve = getIds(navItems)

  useEffect(() => {
    const sectionMap = new Map<string, IntersectionObserverEntry>()

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return

        entries.forEach((entry) => {
          sectionMap.set(entry.target.id, entry)
        })

        // Find the visible section closest to the top
        // We consider "visible" as intersecting or close to top
        // Since we track all entries, we might have multiple intersecting.
        // We prioritize the one with top edge closest to the viewport top (e.g. 80px)
        
        const visibleSections = Array.from(sectionMap.values()).filter(entry => entry.isIntersecting)
        
        if (visibleSections.length > 0) {
          // Sort by distance from top (80px is the sticky header offset approx)
          // We want the one that is currently "being read" -> starts above or near clear-zone
          // Sorting by boundingClientRect.top
          
          // Heuristic:
          // 1. Filter those whose top is <= viewport height / 3 (so we don't pick something just entering at bottom)
          // 2. Of those, pick the one with highest "top" value (closest to being just scrolled past?)
          //    Actually, standard spy behavior: The highest element on the page that is still visible (top < threshold).
          
          // Let's stick to: The element whose top is closest to 80px (absolute distance), 
          // OR if it's above 80px, it's the current container.
          
          // Simplified: The active section is the one with the smallest POSITIVE top position, 
          // OR the largest NEGATIVE top position (if we are deep inside a long section).
          
          // Actually, let's use the standard "First visible section"
          visibleSections.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          
          // The first one in sorted list is the top-most visible one.
          // However, if we have nested sections (Languages -> Python), 
          // 'Languages' top might be -100px, 'Python' top might be 20px.
          // Both intersect. Sorted: Languages (-100), Python (20).
          // If we pick first: Languages.
          // If user sees Python header, they probably want Python highlighted.
          // Exception: If Python top is barely visible at bottom? No, we filtered intersecting.
          
          // Refined Heuristic for Nested:
          // If multiple intersect, prefer the one with positive top (header visible) that is closest to top offset.
          // If all have negative top (we are scrolling past headers), prefer the 'deepest' one in DOM? 
          // Or simply the last one in the list (most specific logic).
          
          // Let's try: Pick the first one whose top is > 0 (header visible).
          // If none > 0, pick the last one (deepest container we are scrolling through).
          
          const firstPositive = visibleSections.find(entry => entry.boundingClientRect.top > 50) 
          // > 50 to add a buffer for sticky header interaction
          
          const candidate = firstPositive || visibleSections[visibleSections.length - 1]
          
          if (candidate) {
             setActiveSection(candidate.target.id)
          }
        }
      },
      { 
        // Adjust rootMargin to have a clear "read zone"
        // Top: -100px (ignores the sticky header area)
        // Bottom: -70% (Don't highlight things until they are near the top)
        rootMargin: '-100px 0px -70% 0px' 
      }
    )

    idsToObserve.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowTopBtn(true)
        } else {
          setShowTopBtn(false)
        }

        // Extend manual scroll lock if scrolling is happening
        if (isManualScroll.current) {
          if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
          scrollTimeout.current = setTimeout(() => {
            isManualScroll.current = false
          }, 150) // Unlock 150ms after last scroll event
        }
    }
  
    window.addEventListener('scroll', handleScroll)
  
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [idsToObserve.join(',')]) // safe dependency on ID list string

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Recursive check for active state
  const isItemActive = (item: SidebarItem, section: string): boolean => {
    if (item.hrefFragment.substring(1) === section) return true
    if (item.items) return item.items.some(sub => isItemActive(sub, section))
    return false
  }

  // Recursive Link Component for simpler rendering
  const SidebarLink = ({ item, level = 0 }: { item: SidebarItem, level?: number }) => {
    // Level 0: Active if self or deep child is active
    // Level > 0: Active only if self is active (explicit selection)
    const isActive = level === 0 
        ? isItemActive(item, activeSection)
        : activeSection === item.hrefFragment.substring(1)
    
    const handleClick = () => {
      // Immediately set active section
      setActiveSection(item.hrefFragment.substring(1))
      
      // Disable observer updates temporarily
      isManualScroll.current = true
      
      // Initial lock (cleared by scroll listener if scroll happens, or here if no scroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        isManualScroll.current = false
      }, 1000) // Fallback: 1s if no scroll event fires (e.g. short jump)

      if (isMobileOpen) {
        setIsMobileOpen(false)
      }
    }

    return (
      <>
      <Link
        href={item.hrefFragment}
        onClick={handleClick}
        className={`
          block transition-all duration-200
          ${level === 0 
            ? `text-sm font-bold uppercase tracking-widest mb-3 transform origin-left ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 scale-105' : 'text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 hover:scale-105'}` 
            : `text-xs py-1 ${isActive ? 'text-neutral-900 dark:text-neutral-100 font-semibold translate-x-1' : 'text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 hover:translate-x-1'}`
          }
          ${level > 1 ? 'pl-6' : level === 1 ? 'pl-4' : ''}
        `}
      >
        {level > 0 && (
          <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all duration-300
              ${isActive ? 'bg-blue-500 w-2' : level === 1 ? 'bg-transparent group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800' : 'bg-transparent'}
          `} />
        )}
        {item.label}
      </Link>
      {item.items && (
        <ul className={`${level === 0 ? 'space-y-2 border-l border-neutral-100 dark:border-neutral-900 ml-1' : 'space-y-1 mt-1'}`}>
          {item.items.map(subItem => (
            <li key={subItem.hrefFragment} className="relative">
              <SidebarLink item={subItem} level={level + 1} />
            </li>
          ))}
        </ul>
      )}
      </>
    )
  }

  // Desktop Component
  const DesktopSidebar = () => (
    <nav className="hidden xl:block fixed top-24 right-[calc(50%+22rem)] w-64 h-[calc(100vh-8rem)]">
        {/* Go to Top Button */}
        <button
            onClick={scrollToTop}
            className="absolute top-0 right-2 p-1 text-neutral-300 hover:text-neutral-900 dark:text-neutral-600 dark:hover:text-neutral-100 transition-colors z-10 cursor-pointer"
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        </button>

        {/* Static Stroke on the right side */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
        
        {/* Scrollable Content Container */}
        <div className="h-full overflow-y-auto pr-6 pb-10 sidebar-scroller">
            <ul className="space-y-8 relative">
                {navItems.map((section) => (
                <li key={section.hrefFragment} className="group">
                    <SidebarLink item={section} level={0} />
                </li>
                ))}
            </ul>
        </div>
    </nav>
  )

  // Mobile Toggle button & Drawer
  const MobileSidebar = () => (
    <div className="xl:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`
            fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300
            bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800
            hover:scale-110 active:scale-95
            ${isMobileOpen ? 'rotate-90 bg-neutral-100 dark:bg-neutral-800' : ''}
        `}
        aria-label="Toggle Table of Contents"
      >
        {isMobileOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        )}
      </button>

      {/* Drawer */}
      <div 
        className={`
            fixed inset-y-0 right-0 z-40 w-72 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl
            border-l border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 pt-24
            transform transition-transform duration-300 ease-in-out
            overflow-y-auto
            ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <h3 className="text-lg font-bold mb-6 text-neutral-900 dark:text-white flex items-center gap-2">
            Table of Contents
        </h3>
        <nav className="space-y-6">
            {navItems.map((section) => (
                <div key={section.hrefFragment}>
                    <SidebarLink item={section} level={0} />
                </div>
            ))}
        </nav>
      </div>
      
      {/* Overlay */}
      {isMobileOpen && (
        <div 
            className="fixed inset-0 z-30 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  )

  const BackToTop = () => (
    <button
        onClick={scrollToTop}
        className={`
            fixed bottom-6 right-24 (xl:right-6) z-30 p-3 rounded-full shadow-lg transition-all duration-500
            bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800
            text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400
            hover:-translate-y-1
            ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            ${isMobileOpen ? 'mr-16' : ''} xl:mr-0
        `}
        aria-label="Back to top"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
      <BackToTop />
    </>
  )
}
