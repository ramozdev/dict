import type { ParsedSlangForClient } from '@/lib/parse-slang-for-client'
import Link from 'next/link'

type Props = {
  slangs: ParsedSlangForClient[]
}

export function ListSlangs({ slangs }: Props) {
  return (
    <div className="mx-auto mb-4 grid max-w-xl gap-x-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
      {slangs.length === 0 ? (
        <div>No slangs.</div>
      ) : (
        slangs.map(({ slug, slang }) => (
          <Link key={slug} href={`/${slug}`}>
            {slang}
          </Link>
        ))
      )}
    </div>
  )
}
