import { z } from 'zod'

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

export const updateSlangSchema = z.object({
  id: z.string().cuid(),
  slang: z.string().min(1).max(191),
  spellings: z.array(z.object({ spelling: z.string().min(1) })),
  synonyms: z.array(z.object({ synonym: z.string().min(1) })),
  antonyms: z.array(z.object({ antonym: z.string().min(1) })),
  abbreviations: z.array(z.object({ abbreviation: z.string().min(1) })),
  tags: z.array(z.object({ tag: z.string().min(1) })),
  diminutive: z.string().min(1).nullable(),
  augmentative: z.string().min(1).nullable(),
  explicit: z.boolean(),
  definitions: z.array(
    z.object({
      definition: z.string().min(1).max(500),
      idiom: z.string().min(1).nullable(),
      pos: z.enum(pos),
      examples: z.array(z.object({ example: z.string().min(1), id: z.string().optional() })),
      id: z.string().cuid().nullable()
    })
  ),
  authorId: z.string().min(1).cuid()
})
