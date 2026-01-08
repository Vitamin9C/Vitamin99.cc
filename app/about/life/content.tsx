import { SectionNavigation } from 'app/components/aboutme-tabs'

export function LifeContent({ hideTitle = false, hideNav = false }: { hideTitle?: boolean, hideNav?: boolean }) {
  const sections = [
    { label: 'Mental Health', href: '#mental-health' },
    { label: 'Cooking', href: '#cooking' },
    { label: 'Travel', href: '#travel' },
    { label: 'Sports', href: '#sports' },
    { label: 'Gaming', href: '#gaming' },
    { label: 'Films', href: '#films' },
    { label: 'TV Series', href: '#tv-series' },
    { label: 'Ceramics', href: '#ceramics' },
  ]

  return (
    <section id="life-content">
      {!hideTitle && (
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Life
        </h1>
      )}
      
      {!hideNav && <SectionNavigation sections={sections} />}

      <div className="space-y-12">
        <div id="mental-health" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Mental Health</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="cooking" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Cooking</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="travel" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Travel</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="sports" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Sports</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="gaming" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Gaming</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="films" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Films</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="tv-series" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">TV Series</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>

        <div id="ceramics" className="scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Ceramics</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
        </div>
      </div>
    </section>
  )
}
