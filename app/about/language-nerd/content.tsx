import { SectionNavigation } from 'app/components/aboutme-tabs'
import { InteractiveSanskrit } from './interactive-sanskrit'
import { TheWindingPath } from './winding-path'
import { AnimatedLyrics } from './animated-lyrics'

export function LanguageNerdContent({ hideTitle = false, hideNav = false }: { hideTitle?: boolean, hideNav?: boolean }) {
  const sections = [
    { label: 'Mandarin', href: '#mandarin' },
    { label: 'English', href: '#english' },
    { label: 'German', href: '#german' },
    { label: 'French', href: '#french' },
    { label: 'Japanese', href: '#japanese' },
    { label: 'Latin', href: '#latin' },
    { label: 'Sanskrit', href: '#sanskrit' },
  ]

  return (
    <section id="language-nerd-content">
      {!hideTitle && (
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Polyglot (i.e. Language Nerd)
        </h1>
      )}
      
      {!hideNav && <SectionNavigation sections={sections} />}

      <div id="mandarin" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter flex items-center gap-2">
          Mandarin
          <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 tracking-normal">
            NATIVE
          </span>
        </h2>
        
        <div className="space-y-6 text-neutral-800 dark:text-neutral-200">
          <p>My mother tongue.</p>
          
          <div className="flex flex-col gap-4 border-l-2 border-neutral-100 dark:border-neutral-900 pl-4 py-1">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Dialect & Roots</span>
              <p className="text-sm leading-relaxed">
                The language spoken in my hometown (the Northeastern part of China) is a dialect of Mandarin, 
                with an accent famous for hilarious <span className="italic">"sketch comedy"</span> (小品 xiǎopǐn) at CCTV&apos;s New Year&apos;s Gala before 2011.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Other Chinese</span>
              <p className="text-sm leading-relaxed">
                Though I&apos;m able to understand ~40% of Shanghainese due to 6 years of occasional exposure, 
                I couldn&apos;t speak it. I've always wished I could have the chance to learn another Chinese.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="english" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter flex items-center gap-2">
          English
          <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 tracking-normal uppercase">
            C1/C2
          </span>
        </h2>
        <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
          <p>Started at 6. It has become my primary language for academics and profession.</p>
          <ul className="list-disc list-inside text-sm space-y-1.5 ml-1">
            <li>Middle School: Video games played on XBOX360 in English</li>
            <li>University: Bachelor program fully taught in English by an international team</li>
            <li>Courses: Scored A and A- in Academic Writing I & II </li>
            <li>ToEFL iBT: Scored 110 without preparation</li>
            <li>Engaged in Reddit & other online English communities</li>
          </ul>
        </div>
      </div>

      <div id="german" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter flex items-center gap-2">
          German
          <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 tracking-normal uppercase">
            C1
          </span>
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 20 at university with Prof. XIE Quanbo. Passed C1-level exam.
        </p>
        <p className="mb-2 text-sm text-neutral-800 dark:text-neutral-200 italic">
          &quot;Der Mensch erkennt sich nur im Menschen, nur das Leben lehret jedem, was er sei.&quot;
        </p>
      </div>

      <div id="french" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter flex items-center gap-2">
          French
          <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 tracking-normal uppercase">
            ~B1
          </span>
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 13 with my dear Canadian professeure Catherine Forestier. 
          I can impress people by faking a rather authentic French accent, which I find quite fun.
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <AnimatedLyrics />
          <div className="aspect-video w-full md:w-80 rounded-lg overflow-hidden flex-shrink-0">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/anhpZk_-GzA" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div id="japanese" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Japanese
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 16 with tons of J-Drama, movie, manga, anime. Have quite a vocabulary and can understand to some certain degree 
          while struggle to express myself fluently.
        </p>
        <p className="mb-2 text-sm text-neutral-800 dark:text-neutral-200 italic">
          『本当に廻り道だった、本当に、本当に、 なんて遠い廻り道……』
        </p>
      </div>

      <div id="latin" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Latin
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 21 with Prof. LI Juan using Unikurs Latein. Learning Latin has given me 
          insights into the roots and connections of Romance languages, as well as enhanced my understanding of etymology and history.
        </p>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Big fan of polýMATHY. Looking forward to speaking Latin in Vatican city and 
          understanding the new pope's speech after <span className="italic">"Habemus Papam"</span>.
          <span className="block">(That's not a curse to you your holiness Leo XIV XD)</span>
        </p>
      </div>

      <div id="sanskrit" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Sanskrit 
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 21 with Prof. WANG Pin using Stenzler&apos;s <span className = "italic">Elementarbuch</span> 
           to explore the early Indo-european language, and to truly understand Buddhist scripts translated to Chinese.
        </p>
        <InteractiveSanskrit />
      </div>  
    </section>
  )
}
