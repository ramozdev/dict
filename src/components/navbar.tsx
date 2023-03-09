import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { CommandDialogDemo } from './search'

export function NavBar() {
  const { data } = useSession()
  return (
    <nav className="p-4 bg-black mb-4">
      <ul className="flex items-center justify-between max-w-screen-xl mx-auto">
        <li className="font-mono">Slangz</li>
        <li>
          <CommandDialogDemo />
        </li>
        <li>
          {!!data ? (
            <button type="button" onClick={() => signOut()}>
              Logout
            </button>
          ) : (
            <button type="button" onClick={() => signIn('google')}>
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}
