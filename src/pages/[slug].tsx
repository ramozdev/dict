import Layout from '@/components/layout'
import { prisma } from '@/server/db'
import type { SlangApi } from '@/types'

type Props = {
  slang: SlangApi
}

export default function SlangPage({ slang }: Props) {
  return (
    <Layout>
      <pre>{JSON.stringify(slang, null, 2)}</pre>
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

  const {
    abbreviations,
    antonyms,
    definitions,
    spellings,
    synonyms,
    tags,
    createdAt,
    updatedAt,
    ...data
  } = payload

  const result = {
    ...data,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    abbreviations: abbreviations.map(({ abbreviation }) => abbreviation),
    antonyms: antonyms.map(({ antonym }) => antonym),
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#grouping_objects_by_a_property
    definitions: definitions.reduce<SlangApi['definitions']>((acc, obj) => {
      const curGroup = acc[obj.pos] ?? []

      // exclude pos and parse examples
      const parsedObj = {
        examples: obj.examples,
        definition: obj.definition,
        idiom: obj.idiom
      }

      return { ...acc, [obj.pos]: [...curGroup, parsedObj] }
    }, {}),
    spellings: spellings.map(({ spelling }) => spelling),
    synonyms: synonyms.map(({ synonym }) => synonym),
    tags: tags.map(({ tag }) => tag)
  }

  return {
    props: {
      slang: result
    }
  }
}
