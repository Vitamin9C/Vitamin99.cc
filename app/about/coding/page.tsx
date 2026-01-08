import { SectionNavigation } from 'app/components/aboutme-tabs'
export default function CodingPage() {
  const sections = [
    { label: 'Projects', href: '#projects' },
    { label: 'Languages', href: '#languages' },
    { label: 'Frameworks', href: '#frameworks' },
    { label: 'Tools', href: '#tools' },
  ]

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Coding
      </h1>
      
      <SectionNavigation sections={sections} />

      <div id="python" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Python
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Python has been my go-to language for rapid prototyping, data analysis, and scripting tasks.
          I appreciate its clean syntax and extensive ecosystem of libraries.
        </p>
        <div className="space-y-2 text-neutral-800 dark:text-neutral-200">
          <p>• Experience with Django, FastAPI, and Flask for web development</p>
          <p>• Data science with pandas, numpy, and scikit-learn</p>
          <p>• Automation and scripting for DevOps tasks</p>
        </div>
      </div>

      <div id="rust" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Rust
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Rust fascinates me with its memory safety guarantees and zero-cost abstractions.
          The ownership model is elegant and ensures thread safety at compile time.
        </p>
        <div className="space-y-2 text-neutral-800 dark:text-neutral-200">
          <p>• Building performant CLI tools</p>
          <p>• Exploring systems programming concepts</p>
          <p>• Working with async/await for concurrent applications</p>
        </div>
      </div>

      <div id="cpp" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          C/C++
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          My foundation in programming started with C/C++. These languages taught me about 
          memory management, pointers, and low-level system operations.
        </p>
        <div className="space-y-2 text-neutral-800 dark:text-neutral-200">
          <p>• Performance-critical applications</p>
          <p>• Understanding computer architecture and operating systems</p>
          <p>• Modern C++ features (C++11/14/17/20)</p>
        </div>
      </div>
    </section>
  )
}
