import Link from 'next/link'
import { NavMenu } from './nav-menu'
import { CommandDialogDemo } from './search'

export function NavBar() {
  return (
    <nav className="p-4 bg-black mb-4">
      <ul className="flex items-center justify-between max-w-screen-xl mx-auto">
        <li className="font-mono">
          <Link href="/" className="text-white text-xl font-bold">
            Slangz
          </Link>
        </li>
        <li>
          <CommandDialogDemo />
        </li>
        <li>
          <NavMenu />
        </li>
      </ul>
    </nav>
  )
}
