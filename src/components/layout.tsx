import { FC, PropsWithChildren } from 'react'
import { NavBar } from '@/components/navbar'
import { Shell } from '@/components/shell'
import { SideBar } from '@/components/sidebar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Shell>
      <SideBar />
      <div>
        <NavBar />
        <main className="container mx-auto px-3 lg:px-0">{children}</main>
      </div>
    </Shell>
  )
}

export default Layout
