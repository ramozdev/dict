import { NavBar } from '@/components/navbar'
import { Footer } from '@/components/footer'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <main className="max-w-screen-xl mx-auto px-3 lg:px-0">{children}</main>
      <Footer />
    </>
  )
}
