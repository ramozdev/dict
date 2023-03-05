import { createTRPCRouter } from '@/server/api/trpc'
import { slangRouter } from '@/server/api/routers/slang'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  slang: slangRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
