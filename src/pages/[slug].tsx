import { DefinitionCard } from '@/components/definition-card'
import Layout from '@/components/layout'
import { type ParsedSlangForClient, parseSlangForClient } from '@/lib/parse-slang-for-client'
import { prisma } from '@/server/db'

type Props = {
  slang: ParsedSlangForClient
}

export default function SlangPage({ slang }: Props) {
  return (
    <Layout>
      <DefinitionCard slang={slang} />
    </Layout>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const slug = params?.slug?.toString()

  if (!slug) {
    return {
      notFound: true
    }
  }

  const payload = await prisma.slang.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      explicit: true,
      createdAt: true,
      updatedAt: true,
      slang: true,
      augmentative: true,
      diminutive: true,
      abbreviations: { select: { abbreviation: true, id: true } },
      antonyms: { select: { antonym: true, id: true } },
      definitions: {
        select: {
          definition: true,
          pos: true,
          examples: { select: { example: true, id: true } },
          idiom: true,
          id: true
        }
      },
      spellings: { select: { spelling: true, id: true } },
      synonyms: { select: { synonym: true, id: true } },
      tags: { select: { tag: true, id: true } },
      authorId: true
    }
  })

  if (!payload) throw new Error('No data found')

  const result = parseSlangForClient(payload)

  return {
    props: {
      slang: result
    }
  }
}
