import { Layout } from '@/components/layout'
import { Letters } from '@/components/letters'
import { ListSlangs } from '@/components/list-slangs'
import type { ParsedSlangForClient } from '@/lib/parse-slang-for-client'
import { prisma } from '@/server/db'
import type { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  slangs: ParsedSlangForClient[]
  letter: string
}

export default function LetterPage({ slangs, letter }: Props) {
  return (
    <Layout>
      <Letters letter={letter} />
      <ListSlangs {...{ slangs }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const letter = params?.letter?.toString()

  if (!letter) {
    return {
      notFound: true
    }
  }

  const payload = await prisma.slang.findMany({
    where: {
      slang: {
        startsWith: letter
      }
    },
    select: {
      slug: true,
      explicit: true,
      slang: true
    }
  })

  if (!payload) {
    return {
      notFound: true
    }
  }

  return {
    props: { slangs: payload, letter },
    revalidate: 60 * 60 // One hour in seconds
  }
}
