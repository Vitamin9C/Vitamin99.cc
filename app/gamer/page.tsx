export default function GamerPage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Leisure
      </h1>
      
      <p className="mb-6 text-neutral-800 dark:text-neutral-200">
        Gaming has been a significant part of my life, providing entertainment, challenge, 
        and opportunities to connect with people around the world.
      </p>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Favorite Genres
        </h2>
        <div className="space-y-3 text-neutral-800 dark:text-neutral-200">
          <div>
            <h3 className="font-medium mb-1">RPGs</h3>
            <p className="text-sm">Story-driven experiences that let me explore vast worlds and make meaningful choices.</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Strategy Games</h3>
            <p className="text-sm">From turn-based tactics to real-time strategy, I enjoy games that challenge my planning and decision-making.</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Indie Games</h3>
            <p className="text-sm">Unique mechanics and artistic vision that push the boundaries of what games can be.</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Gaming Setup
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          My gaming rig is optimized for both performance and productivity, doubling as my development workstation.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Gaming Philosophy
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          I believe gaming is more than just entertainment—it's an art form, a social experience, 
          and a way to explore interactive storytelling. Whether competing or collaborating, 
          gaming teaches problem-solving, teamwork, and perseverance.
        </p>
      </div>
    </section>
  )
}
