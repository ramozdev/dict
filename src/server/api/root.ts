import { createTRPCRouter } from '@/server/api/trpc'
import { slangRouter } from '@/server/api/routers/slang'
import { searchRouter } from '@/server/api/routers/search'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  slang: slangRouter,
  search: searchRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
