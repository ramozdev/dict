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
  'verb'
] as const

export const slangSchema = z.object({
  id: z.string().cuid(),
  slang: z.string().min(1),
  spellings: z.array(z.object({ spelling: z.string(), id: z.string().optional() })),
  synonyms: z.array(z.object({ synonym: z.string(), id: z.string().optional() })),
  antonyms: z.array(z.object({ antonym: z.string(), id: z.string().optional() })),
  abbreviations: z.array(z.object({ abbreviation: z.string(), id: z.string().optional() })),
  tags: z.array(z.object({ tag: z.string(), id: z.string().optional() })),
  diminutive: z.string(),
  augmentative: z.string(),
  explicit: z.boolean(),
  definitions: z.array(
    z.object({
      definition: z.string().min(1),
      idiom: z.string(),
      pos: z.enum(pos),
      examples: z.array(z.object({ example: z.string().min(1), id: z.string().optional() })),
      id: z.string()
    })
  ),
  authorId: z.string().min(1)
})

export type SlangFormSchema = z.infer<typeof slangSchema>
