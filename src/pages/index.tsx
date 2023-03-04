import { DefinitionCard } from '@/components/definition-card'
import Layout from '@/components/layout'

const mockData = {
  abbreviations: ['abbr', 'abbrv'],
  antonyms: ['antonym'],
  definitions: {
    verb: [
      {
        idiom: null,
        definition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, culpa?',
        examples: [
          {
            example: 'Odio perspiciatis officia ad quia adipisci incidunt, consequuntur aliquam.'
          }
        ]
      },
      {
        idiom: null,
        definition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, culpa?',
        examples: [
          {
            example: 'Odio perspiciatis officia ad quia adipisci incidunt, consequuntur aliquam.'
          }
        ]
      }
    ],
    adverb: [
      {
        idiom: null,
        definition:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus corporis eaque odio perspiciatis officia ad quia adipisci incidunt, consequuntur aliquam, quos porro cupiditate repudiandae tempora dolorum qui reiciendis dolorem accusantium!',
        examples: [
          {
            example:
              'Quos porro cupiditate repudiandae tempora dolorum qui reiciendis dolorem accusantium!'
          },
          { example: 'aliquam, quos porro cupiditate repudiandae.' }
        ]
      }
    ],
    idiom: [
      {
        idiom: 'idiom',
        definition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        examples: [
          {
            example: 'Ducimus corporis eaque odio perspiciatis officia ad quia adipisci.'
          }
        ]
      }
    ]
  },
  spellings: ['spelling', 'spelling2'],
  synonyms: ['synonym', 'synonym2'],
  tags: ['tag', 'tag2'],
  slang: 'slang',
  createdAt: '2021-07-01T00:00:00.000Z',
  explicit: true,
  updatedAt: '2021-07-01T00:00:00.000Z',
  augmentative: 'augmentative',
  diminutive: 'diminutive'
}

export default function Home() {
  return (
    <Layout>
      <DefinitionCard {...mockData} />
    </Layout>
  )
}
