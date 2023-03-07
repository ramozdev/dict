import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { prisma } from '@/server/db'

export const searchRouter = createTRPCRouter({
  slang: publicProcedure.input(z.object({ slang: z.string() })).query(async ({ input }) => {
    if (input.slang.length < 2) return []
    return await prisma.slang.findMany({
      where: {
        slang: {
          search: input.slang
        }
      },
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
      },
      take: 20
    })
  })
})
