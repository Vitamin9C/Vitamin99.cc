export function SocialActivityContent({ hideTitle = false }: { hideTitle?: boolean, hideNav?: boolean }) {
  return (
    <section id="social-activity-content">
      {!hideTitle && (
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Social Activity
        </h1>
      )}
      
      <p className="mb-6 text-neutral-800 dark:text-neutral-200">
        Beyond coding and language learning, I enjoy connecting with people and participating 
        in various social and community activities.
      </p>

      <div className="mb-8 scroll-mt-20" id="kaifeng">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Kaifeng
        </h2>
        <div className="space-y-3 text-neutral-800 dark:text-neutral-200">
            <p className="mb-2">  test  </p>
        </div>
      </div>

      <div className="mb-8 scroll-mt-20" id="volunteering">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Volunteering
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          When I&apos;m not coding or studying languages, you might find me exploring Berlin&apos;s 
          diverse neighborhoods, trying new restaurants, or enjoying the city&apos;s rich cultural scene.
        </p>
      </div>

      <div className="mb-8 scroll-mt-20" id="animal-on-campus">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Animals on Campus
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          I&apos;m always interested in meeting new people and learning about different perspectives. 
          Feel free to reach out if you want to chat about tech, languages, or anything else!
        </p>
      </div>
    </section>
  )
}
