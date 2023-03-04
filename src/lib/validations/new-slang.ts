import * as z from 'zod'

export const pos = [
  'adjective',
  'adverb',
  'conjunction',
  'determiner',
  'idiom',
  'interjection',
  'noun',
  'preposition',
  'pronoun',
  'verb',
] as const

export const newSlangSchema = z.object({
  slang: z.string().min(1),
  spellings: z.array(z.object({ spelling: z.string() })),
  synonyms: z.array(z.object({ synonym: z.string() })),
  antonyms: z.array(z.object({ antonym: z.string() })),
  abbreviations: z.array(z.object({ abbreviation: z.string() })),
  tags: z.array(z.object({ tag: z.string() })),
  diminutive: z.string(),
  augmentative: z.string(),
  explicit: z.boolean(),
  definitions: z.array(
    z.object({
      definition: z.string().min(1),
      idiom: z.string().optional(),
      pos: z.enum(pos),
      examples: z.array(z.object({ example: z.string() })),
    })
  ),
  authorId: z.string().min(1),
})

export type NewSlangForm = z.infer<typeof newSlangSchema>
