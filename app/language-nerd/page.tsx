import { SectionNavigation } from 'app/components/navigation-tabs'

export default function LanguageNerdPage() {
  const sections = [
    { label: 'German', href: '#german' },
    { label: 'French', href: '#french' },
    { label: 'Japanese', href: '#japanese' },
    { label: 'Latin', href: '#latin' },
    { label: 'Sanskrit', href: '#sanskrit' },
  ]

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Language Nerd
      </h1>
      
      <SectionNavigation sections={sections} />

      <div id="german" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          German (Deutsch)
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started learning at 20 at university with Prof. XIE Quanbo. Now at C1 level,
          living in Berlin has immersed me in the language and culture.
        </p>
        <p className="mb-2 text-neutral-800 dark:text-neutral-200 italic">
          "Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt." - Ludwig Wittgenstein
        </p>
      </div>

      <div id="french" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          French (Français)
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 13 with my dear Canadian professeure Catherine Forestier. 
          I can impress people by faking a rather authentic French accent, which I find quite fun.
        </p>
        <p className="mb-2 text-neutral-800 dark:text-neutral-200 italic">
          "La langue française est une femme. Et cette femme est si belle, si fière, si modeste..." - Anatole France
        </p>
      </div>

      <div id="japanese" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Japanese (日本語)
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 16 with tons of anime and J-Drama. The writing system with its kanji, 
          hiragana, and katakana is endlessly fascinating.
        </p>
        <p className="mb-2 text-neutral-800 dark:text-neutral-200 italic">
          "日本語は難しいですが、とても面白いです。"
        </p>
      </div>

      <div id="latin" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Latin (Latina)
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 21 with Unikurs Latein with Prof. LI Juan. Learning Latin has given me 
          insights into the roots of Romance languages and enhanced my understanding of grammar.
        </p>
        <p className="mb-2 text-neutral-800 dark:text-neutral-200 italic">
          "Verba volant, scripta manent."
        </p>
      </div>

      <div id="sanskrit" className="mb-12 scroll-mt-20">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Sanskrit (संस्कृतम्)
        </h2>
        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          Started at 21 with Stenzler with Prof. WANG Pin. The precision and complexity of 
          Sanskrit grammar is a linguistic marvel that has influenced many modern languages.
        </p>
        <p className="mb-2 text-neutral-800 dark:text-neutral-200 italic">
          "संस्कृतं नाम दैवी वाक्" (Sanskrit is divine speech)
        </p>
      </div>
    </section>
  )
}
