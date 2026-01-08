import { SectionNavigation } from 'app/components/aboutme-tabs'

export function CodingContent({ hideTitle = false, hideNav = false }: { hideTitle?: boolean, hideNav?: boolean }) {
  const sections = [
    { label: 'Projects', href: '#projects' },
    { label: 'Languages', href: '#languages' },
    { label: 'Frameworks', href: '#frameworks' },
    { label: 'Tools', href: '#tools' },
  ]

  return (
    <section id="coding-content">
      {!hideTitle && (
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Coding
        </h1>
      )}
      
      {!hideNav && <SectionNavigation sections={sections} />}

      <div id="projects" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Projects
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
      </div>

      <div id="languages" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Languages
        </h2>
        
        <div id="python" className="mb-8 scroll-mt-24">
          <h3 className="mb-2 text-lg font-medium tracking-tight">
            Python
          </h3>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            Python has been my go-to language for rapid prototyping, data analysis, and scripting tasks.
            I appreciate its clean syntax and extensive ecosystem of libraries.
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Experience with Django, FastAPI, and Flask for web development</p>
            <p>• Data science with pandas, numpy, and scikit-learn</p>
            <p>• Automation and scripting for DevOps tasks</p>
          </div>
        </div>

        <div id="rust" className="mb-8 scroll-mt-24">
          <h3 className="mb-2 text-lg font-medium tracking-tight">
            Rust
          </h3>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            Rust fascinates me with its memory safety guarantees and zero-cost abstractions.
            The ownership model is elegant and ensures thread safety at compile time.
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Building performant CLI tools</p>
            <p>• Exploring systems programming concepts</p>
            <p>• Working with async/await for concurrent applications</p>
          </div>
        </div>

        <div id="Others" className="mb-8 scroll-mt-24">
          <h3 className="mb-2 text-lg font-medium tracking-tight">
            Others
          </h3>
          <h4 className="mb-2 text-lg font-medium tracking-tight">
            C
          </h4>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            My foundation in programming started with C/C++. These languages taught me about 
            memory management, pointers, and low-level system operations.
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Performance-critical applications</p>
            <p>• Understanding computer architecture and operating systems</p>
            <p>• Modern C++ features (C++11/14/17/20)</p>
          </div>
          <h4 className="mb-2 text-lg font-medium tracking-tight">
            C++
          </h4>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Performance-critical applications</p>
            <p>• Understanding computer architecture and operating systems</p>
            <p>• Modern C++ features (C++11/14/17/20)</p>
          </div>
          <h4 className="mb-2 text-lg font-medium tracking-tight">
            Typescript
          </h4>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            My foundation in programming started with C/C++. These languages taught me about 
            memory management, pointers, and low-level system operations.
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Performance-critical applications</p>
            <p>• Understanding computer architecture and operating systems</p>
            <p>• Modern C++ features (C++11/14/17/20)</p>
          </div>
          
        </div>
      </div>

      <div id="frameworks" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Frameworks
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
      </div>

      <div id="tools" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Tools
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">Content coming soon...</p>
      </div>
    </section>
  )
}
