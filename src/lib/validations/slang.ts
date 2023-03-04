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

export const slangSchema = z.object({
  id: z.string().cuid().optional(),
  slang: z.string().min(1),
  spellings: z
    .array(z.object({ spelling: z.string().min(1), id: z.string().optional() }))
    .optional(),
  synonyms: z
    .array(z.object({ synonym: z.string().min(1), id: z.string().optional() }))
    .optional(),
  antonyms: z
    .array(z.object({ antonym: z.string().min(1), id: z.string().optional() }))
    .optional(),
  abbreviations: z
    .array(
      z.object({ abbreviation: z.string().min(1), id: z.string().optional() })
    )
    .optional(),
  tags: z
    .array(z.object({ tag: z.string().min(1), id: z.string().optional() }))
    .optional(),
  diminutive: z.string().nullable(),
  augmentative: z.string().nullable(),
  explicit: z.boolean(),
  definitions: z.array(
    z.object({
      definition: z.string().min(1),
      idiom: z.string().nullable(),
      pos: z.enum(pos),
      examples: z
        .array(
          z.object({ example: z.string().min(1), id: z.string().optional() })
        )
        .optional(),
      id: z.string().optional(),
    })
  ),
  authorId: z.string().min(1),
})

export type SlangForm = z.infer<typeof slangSchema>
