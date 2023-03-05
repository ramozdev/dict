import { pos } from '@/lib/validations/slang'
import * as z from 'zod'

const defintionSchema = z.array(
  z.object({
    idiom: z.string().optional(),
    definition: z.string(),
    examples: z.array(z.object({ example: z.string() }))
  })
)

const definitionsSchema = z.record(z.enum(pos), defintionSchema)

export const slangApiSchema = z.object({
  abbreviations: z.array(z.string()),
  antonyms: z.array(z.string()),
  definitions: definitionsSchema,
  spellings: z.array(z.string()),
  synonyms: z.array(z.string()),
  tags: z.array(z.string()),
  slang: z.string(),
  createdAt: z.string(),
  explicit: z.boolean(),
  updatedAt: z.string(),
  augmentative: z.string().optional(),
  diminutive: z.string().optional()
})
