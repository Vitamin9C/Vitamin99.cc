import { BlogPosts } from 'app/components/posts'
import { AboutMeTabs } from 'app/components/aboutme-tabs'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Salve, Munde!
      </h1>
      <p className="mb-4">
        From Shanghai to Berlin and beyond, I'm an AI developer with a passion for 
        crafting elegant solutions to complex problems and scenarios with state-of-the-art technology, 
        as I continue to explore how to release my potential to the maximum by pursuing a career with purpose and curiosity.
      </p>
      
      <AboutMeTabs />

      <h2 className="mb-8 text-xl font-semibold tracking-tighter">
        Blogs & Articles
      </h2>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
