import type { Slang } from '@prisma/client'

export function SlangCard({ slang }: { slang: Slang }) {
  return <pre>{JSON.stringify(slang, null, 2)}</pre>
}
