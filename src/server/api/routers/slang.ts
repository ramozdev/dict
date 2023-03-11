import { newSlangSchema } from '@/lib/validations/new-slang'
import { updateSlangSchema } from '@/lib/validations/update-slang'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { prisma } from '@/server/db'
import slugify from 'sluga'

export const slangRouter = createTRPCRouter({
  update: protectedProcedure
    .input(updateSlangSchema)
    .mutation(
      async ({
        input: {
          id,
          definitions,
          explicit,
          abbreviations,
          antonyms,
          augmentative,
          diminutive,
          spellings,
          synonyms,
          tags
        }
      }) => {
        return await prisma.slang.update({
          where: { id },
          data: {
            explicit,
            augmentative,
            diminutive,
            definitions: {
              upsert: definitions?.map(({ definition, pos, examples, idiom, id }) => ({
                update: {
                  definition,
                  pos,
                  examples: {
                    upsert: examples?.map(({ example, id }) => ({
                      update: { example },
                      create: { example },
                      where: { id: id ?? '' }
                    }))
                  },
                  idiom
                },
                create: {
                  definition,
                  pos,
                  examples: {
                    create: examples
                  },
                  idiom
                },
                where: { id: id ?? '' }
              }))
            },
            abbreviations: {
              connectOrCreate: abbreviations?.map(({ abbreviation }) => ({
                create: { abbreviation },
                where: { abbreviation }
              }))
            },
            antonyms: {
              connectOrCreate: antonyms?.map(({ antonym }) => ({
                create: { antonym },
                where: { antonym }
              }))
            },
            spellings: {
              connectOrCreate: spellings?.map(({ spelling }) => ({
                create: { spelling },
                where: { spelling }
              }))
            },
            synonyms: {
              connectOrCreate: synonyms?.map(({ synonym }) => ({
                create: { synonym },
                where: { synonym }
              }))
            },
            tags: {
              connectOrCreate: tags?.map(({ tag }) => ({
                create: { tag },
                where: { tag }
              }))
            }
          }
        })
      }
    ),

  create: protectedProcedure
    .input(newSlangSchema)
    .mutation(
      async ({
        input: {
          slang,
          definitions,
          explicit,
          abbreviations,
          antonyms,
          augmentative,
          diminutive,
          spellings,
          synonyms,
          tags,
          authorId
        }
      }) => {
        return await prisma.slang.create({
          data: {
            slang,
            slug: slugify(slang),
            explicit,
            augmentative: augmentative.length > 0 ? augmentative : null,
            diminutive: diminutive.length > 0 ? diminutive : null,
            definitions: {
              create: definitions?.map(({ definition, pos, examples, idiom }) => ({
                definition,
                pos,
                examples: {
                  create: examples.filter(({ example }) => example.length > 0)
                },
                idiom: idiom.length > 0 ? idiom : null
              }))
            },
            abbreviations: {
              connectOrCreate: abbreviations
                .filter(({ abbreviation }) => abbreviation.length > 0)
                .map(({ abbreviation }) => ({
                  create: { abbreviation },
                  where: { abbreviation }
                }))
            },
            antonyms: {
              connectOrCreate: antonyms
                .filter(({ antonym }) => antonym.length > 0)
                .map(({ antonym }) => ({
                  create: { antonym },
                  where: { antonym }
                }))
            },
            spellings: {
              create: spellings.filter(({ spelling }) => spelling.length > 0)
            },
            synonyms: {
              connectOrCreate: synonyms
                .filter(({ synonym }) => synonym.length > 0)
                .map(({ synonym }) => ({
                  create: { synonym },
                  where: { synonym }
                }))
            },
            tags: {
              connectOrCreate: tags
                .filter(({ tag }) => tag.length > 0)
                .map(({ tag }) => ({
                  create: { tag },
                  where: { tag }
                }))
            },
            author: { connect: { id: authorId } }
          }
        })
      }
    )
})
