import { Layout } from '@/components/layout'
import { SlangForm } from '@/components/new-slang-form'
import { authOptions } from '@/server/auth'
import type { GetServerSideProps } from 'next'
import { getServerSession, type Session } from 'next-auth'

type Props = {
  user: Session['user']
}

export default function NewPage({ user }: Props) {
  return (
    <Layout>
      <SlangForm
        defaultValues={{
          abbreviations: [],
          antonyms: [],
          spellings: [],
          synonyms: [],
          tags: [],
          authorId: user.id,
          augmentative: '',
          diminutive: '',
          definitions: [
            {
              definition: '',
              examples: [],
              idiom: '',
              pos: 'noun'
            }
          ],
          explicit: false,
          slang: ''
        }}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user: session.user
    }
  }
}
