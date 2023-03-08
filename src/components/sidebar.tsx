import { Search } from '@/components/search'
import type { ParsedSlangForClient } from '@/lib/parse-slang-for-client'

type Props = {
  trending?: ParsedSlangForClient[]
}

export function SideBar({ trending }: Props) {
  return (
    <div className="grid h-screen overflow-auto px-1">
      <Search trending={trending} />
    </div>
  )
}
