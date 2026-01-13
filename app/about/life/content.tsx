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
          <p className="text-neutral-600 dark:text-neutral-400">Developed through years of China's education system and upbringing, 
            I suffer from Obsessive Compulsive Personality Disorder (OCPD), 
            It forged my way to one of the top 4 universities in China, 
            but the subsequent inability to perform as well as my outstanding peers in the university stressed me out. 
            From 2017 to 2023, I kept pushing myself by sacrificing all my leisure activities and hobbies, 
            only to find myself lost in depression and anxiety, which further deteriorated my performance along with the impact of the pandemic and lockdown.
             </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            It was not until late 2025 that I finally found my true problem with a truly professional therapist and started to reorient my life. 
            I began to accept that this was the detour that I had to take,  
            and learned to balance work and leisure, in order to be healty and unleash my full potential.


          </p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Gradually, I started to rediscover my hobbies and interests,
            and my confusion about life miraculously faded away --- I can find purpose and joy even in productivity again.
            Although I still have a long way to go, I have learned how to cope with my OCPD and obtained a strong determination to rebuild my career and life.
          </p>
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
