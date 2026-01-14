export function SocialActivityContent({ hideTitle = false }: { hideTitle?: boolean, hideNav?: boolean }) {
  return (
    <section id="social-activity-content">
      {!hideTitle && (
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Social Activity
        </h1>
      )}
      
      <p className="mb-6 text-neutral-800 dark:text-neutral-200">
        Place holder
      </p>

      <div className="mb-8 scroll-mt-20" id="kaifeng">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          SJTU Kaifeng
        </h2>
        <div className="space-y-3 text-neutral-800 dark:text-neutral-200">
            <p className="mb-2">  Placeholder. I was the vice director of Kaifeng from 2018 to 2019, a student organization for feminists and queers in SJTU.  </p>
        </div>
      </div>

      <div className="mb-8 scroll-mt-20" id="volunteering">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Volunteering
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Placeholder.
          I volunteered in 2019 in Shanghai Xinsheng Choir, a choir for migrant workers' children to craft advertising posters for their concerts and events.
        </p>
      </div>

      <div className="mb-8 scroll-mt-20" id="animal-on-campus">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Animals on Campus
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Placeholder.
          I was part of SJTU喵汪 (SJTU meow-woof) from 2021 to 2022, a student organization to conduct TNVR (trap, neuter, vaccinate, release/adoption) and help sick/injured stray cats & dogs on campus.
        </p>
      </div>
    </section>
  )
}
