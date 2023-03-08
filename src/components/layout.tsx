import { NavBar } from '@/components/navbar'
import { Shell } from '@/components/shell'
import { SideBar } from '@/components/sidebar'

export function Layout({ children }: { children: React.ReactNode }) {
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
