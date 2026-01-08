import { CodingContent } from './coding/content'
import { LanguageNerdContent } from './language-nerd/content'
import { SocialActivityContent } from './social-activity/content'
import { LifeContent } from './life/content'
import { Sidebar } from './sidebar'

export default function Page() {
  return (
    <>
      <Sidebar />
      <div className="space-y-24">


        <CodingContent hideTitle={false} hideNav={true} />
        <LanguageNerdContent hideTitle={false} hideNav={true} />
        <SocialActivityContent hideTitle={false} hideNav={true} />
        <LifeContent hideTitle={false} hideNav={true} />
      </div>
    </>
  )
}
