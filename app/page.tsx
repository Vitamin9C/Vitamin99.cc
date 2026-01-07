import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Salve, Munde!
      </h1>
      <p className="mb-4">
        From Shanghai to Berlin and the world,
      </p>
      
      <h2 className="mb-8 text-xl font-semibold tracking-tighter">
        Developer but junior
      </h2>

      <h2 className="mb-8 text-xl font-semibold tracking-tighter">
        Polyglot Wanna-be
      </h2>
      <p className="mb-4">
        {`
          I started learning 
          - English at 6, French at 13 (with my dear Canadian professeure Catherine Forestier), 
          Japanese at 16 (with tons of anime and J-Drama), German at 20 (at Uni with Prof. XIE Quanbo), 
          Lati (Unikurs Latein with Prof. LI Juan) and Sanskrit (Stenzler with Prof. WANG Pin) at 21. 
          While I only truly "learned" English (C1 or C2) and German (C1), 
          I can indeed sometimes impress people by faking a rather authentic accents in French and Japanese, which I found quite fun.
        `

        }
      </p>
      

      <p className="mb-4">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
