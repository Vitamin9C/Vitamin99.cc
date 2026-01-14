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
            Python has been my go-to language for ML / AI related tasks. I've been using it extensively from 2017, the Tensorflow and Sklearn era.
          </p>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            Now I use for rapid prototyping and delivering various AI-powered applications with a broad range of tools.
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Experience with FastAPI and async for backend development</p>
            <p>• Experience with frameworks for AI Apps. (LangGraph, Vector DB, Streamlit, vLLM) </p>
            <p>• Experience with PyTorch for training and inference (Segmentation, LoRA, ViT)</p> 
            <p>• Data science with pandas, numpy, and scikit-learn.</p>
          </div>
        </div>

        <div id="cpp" className="mb-8 scroll-mt-24">
          <h3 className="mb-2 text-lg font-medium tracking-tight">
            C++
          </h3>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            C++ is my first language to learn OOP, data structure, algorithms, operating systems, and parallel computing.
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Built FFN wit CUDA from scratch, implementing data and model parallelism schema to speed up training and inference.</p>
            <p>• Smart pointers for ownership, STLs for engineering practice, multi-threading, concurrency.</p>
          </div>
        </div>

        <div id="rust" className="mb-8 scroll-mt-24">
          <h3 className="mb-2 text-lg font-medium tracking-tight">
            Rust
          </h3>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            I know Rust is the future of systems programming and more, cuz I'm aware what kind of mess memory/thread unsafety can lead to with C++.
            Also, its functional programming feature fascinates me: it's much more than Haskell that I already found charming 8 years ago. 
          </p>
          <div className="space-y-1 text-sm text-neutral-800 dark:text-neutral-200 ml-2">
            <p>• Building SQLite from scratch</p>
            <p>• Contributing to open source projects like nushell and coreutils</p>
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
            CPP101: Learn pointers and memory management With C.
          </p>
          <h4 className="mb-2 text-lg font-medium tracking-tight">
            Typescript
          </h4>
          <p className="mb-3 text-neutral-800 dark:text-neutral-200">
            This site. relying heavily on vibe coding but a proper learning is already planned.
          </p>
        </div>
      </div>

      <div id="frameworks-infra" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Frameworks & Infrastructures
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
