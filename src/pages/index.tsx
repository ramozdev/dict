import { DefinitionCard } from '@/components/definition-card'
import { Layout } from '@/components/layout'
import { type ParsedSlangForClient, parseManySlangs } from '@/lib/parse-slang-for-client'
import { prisma } from '@/server/db'
import Link from 'next/link'

// const mockData = {
//   abbreviations: ['abbr', 'abbrv'],
//   antonyms: ['antonym'],
//   definitions: {
//     verb: [
//       {
//         idiom: null,
//         definition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, culpa?',
//         examples: [
//           {
//             example: 'Odio perspiciatis officia ad quia adipisci incidunt, consequuntur aliquam.'
//           }
//         ]
//       },
//       {
//         idiom: null,
//         definition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, culpa?',
//         examples: [
//           {
//             example: 'Odio perspiciatis officia ad quia adipisci incidunt, consequuntur aliquam.'
//           }
//         ]
//       }
//     ],
//     adverb: [
//       {
//         idiom: null,
//         definition:
//           'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus corporis eaque odio perspiciatis officia ad quia adipisci incidunt, consequuntur aliquam, quos porro cupiditate repudiandae tempora dolorum qui reiciendis dolorem accusantium!',
//         examples: [
//           {
//             example:
//               'Quos porro cupiditate repudiandae tempora dolorum qui reiciendis dolorem accusantium!'
//           },
//           { example: 'aliquam, quos porro cupiditate repudiandae.' }
//         ]
//       }
//     ],
//     idiom: [
//       {
//         idiom: 'idiom',
//         definition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
//         examples: [
//           {
//             example: 'Ducimus corporis eaque odio perspiciatis officia ad quia adipisci.'
//           }
//         ]
//       }
//     ]
//   },
//   spellings: ['spelling', 'spelling2'],
//   synonyms: ['synonym', 'synonym2'],
//   tags: ['tag', 'tag2'],
//   slang: 'slang',
//   createdAt: '2021-07-01T00:00:00.000Z',
//   explicit: true,
//   updatedAt: '2021-07-01T00:00:00.000Z',
//   augmentative: 'augmentative',
//   diminutive: 'diminutive'
// }

type Props = {
  slangs: ParsedSlangForClient[]
}

export default function Home({ slangs }: Props) {
  const [featuredSlang] = slangs
  return (
    <Layout>
      <div className="grid justify-end md:grid-cols-2 gap-6 md:gap-12">
        <div>
          <header className="text-xl font-bold mb-4">Featured</header>
          <div>{featuredSlang && <DefinitionCard slang={featuredSlang} />}</div>
        </div>
        <div>
          <header className="text-xl font-bold mb-4">Trending</header>
          <ol>
            {slangs.map(({ slang, slug, id }) => (
              <li className="list-decimal py-2 mb-2" key={id}>
                <Link href={`/${slug}`}>{slang}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const payload = await prisma.slang.findMany({
    take: 10,
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

  const result = parseManySlangs(payload)

  return {
    props: {
      slangs: result
    }
  }
}
