import { NavBar } from '@/components/navbar'
import { Shell } from '@/components/shell'
import { SideBar } from '@/components/sidebar'
import type { ParsedSlangForClient } from '@/lib/parse-slang-for-client'

type Props = {
  children: React.ReactNode
  trending?: ParsedSlangForClient[]
}

export function Layout({ children, trending }: Props) {
  return (
    <Shell>
      <SideBar trending={trending} />
      <div>
        <NavBar />
        <main className="container mx-auto px-3 lg:px-0">{children}</main>
      </div>
    </Shell>
  )
}
