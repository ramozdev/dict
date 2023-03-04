import { prisma } from '@/server/db'
// import { EditSlangForm } from '@/components/edit-slang-form'
import { getServerSession, type Session } from 'next-auth'

import { authOptions } from '@/server/auth'
import type { SlangApi } from '@/types'
import type { GetServerSideProps } from 'next'
import Layout from '@/components/layout'

type Props = {
  slang: SlangApi
  user: Session['user']
}

export default function Page({ slang }: Props) {
  return (
    <Layout>
      <pre>{JSON.stringify(slang, null, 2)}</pre>
      {/* <EditSlangForm userId={user.id} slangId={slang.id} defaultValues={slang} /> */}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions)

  const slug = params?.slug?.toString()

  if (!session || !slug) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const payload = await prisma.slang.findUnique({
    where: { slug },
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
    }
  })

  if (!payload) throw new Error('No data found')

  const { createdAt, updatedAt, definitions, diminutive, augmentative, ...data } = payload

  const result = {
    ...data,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    diminutive: diminutive ? diminutive : '',
    augmentative: augmentative ? augmentative : '',
    definitions: definitions.map(({ idiom, ...data }) => ({
      ...data,
      idiom: idiom ? idiom : ''
    }))
  }

  return {
    props: {
      slang: result
    }
  }
}
