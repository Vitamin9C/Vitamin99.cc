export default function SocialActivityPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Social Activity
      </h1>
      
      <p className="mb-6 text-neutral-800 dark:text-neutral-200">
        Beyond coding and language learning, I enjoy connecting with people and participating 
        in various social and community activities.
      </p>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Community Involvement
        </h2>
        <div className="space-y-3 text-neutral-800 dark:text-neutral-200">
          <div>
            <h3 className="font-medium mb-1">Tech Meetups</h3>
            <p className="text-sm">
              Regular attendance at local tech meetups and conferences in Berlin, 
              sharing knowledge and learning from the community.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Language Exchange</h3>
            <p className="text-sm">
              Participating in language exchange events to practice my languages 
              and help others learn Chinese and English.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Open Source</h3>
            <p className="text-sm">
              Contributing to open source projects and collaborating with developers worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Hobbies & Interests
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          When I'm not coding or studying languages, you might find me exploring Berlin's 
          diverse neighborhoods, trying new restaurants, or enjoying the city's rich cultural scene.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Let's Connect
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          I'm always interested in meeting new people and learning about different perspectives. 
          Feel free to reach out if you want to chat about tech, languages, or anything else!
        </p>
      </div>
    </section>
  )
}
