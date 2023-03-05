import type {
  Slang,
  Abbreviation,
  Antonym,
  Definition,
  Example,
  Spelling,
  Synonym,
  Tag
} from '@prisma/client'

export type Payload = {
  id: Slang['id']
  slang: Slang['slang']
  slug: Slang['slug']
  createdAt: Slang['createdAt']
  updatedAt: Slang['updatedAt']
  diminutive: Slang['diminutive']
  augmentative: Slang['augmentative']
  explicit: Slang['explicit']
  authorId: Slang['authorId']
  abbreviations: Abbreviation[]
  antonyms: Antonym[]
  definitions: {
    definition: Definition['definition']
    pos: Definition['pos']
    examples: {
      example: Example['example']
      id: Example['id']
    }[]
    idiom: Definition['idiom']
    id: Definition['id']
  }[]
  spellings: {
    spelling: Spelling['spelling']
    id: Spelling['id']
  }[]
  synonyms: Synonym[]
  tags: Tag[]
}

export function parseSlangForClient({
  abbreviations,
  antonyms,
  definitions,
  spellings,
  synonyms,
  tags,
  createdAt,
  updatedAt,
  ...data
}: Payload) {
  return {
    ...data,
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString(),
    abbreviations: abbreviations?.map(({ abbreviation }) => abbreviation),
    antonyms: antonyms?.map(({ antonym }) => antonym),
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#grouping_objects_by_a_property
    definitions: definitions?.reduce<{
      [key: string]: {
        idiom: string | null
        definition: string
        examples: { example: string }[]
      }[]
    }>((acc, obj) => {
      const curGroup = acc[obj.pos] ?? []

      // exclude pos and parse examples
      const parsedObj = {
        examples: obj.examples,
        definition: obj.definition,
        idiom: obj.idiom
      }

      return { ...acc, [obj.pos]: [...curGroup, parsedObj] }
    }, {}),
    spellings: spellings?.map(({ spelling }) => spelling),
    synonyms: synonyms?.map(({ synonym }) => synonym),
    tags: tags?.map(({ tag }) => tag)
  }
}

export const parseManySlangs = (slangs: Payload[]) => slangs.map(parseSlangForClient)

export type ParsedSlangForClient = ReturnType<typeof parseSlangForClient>
