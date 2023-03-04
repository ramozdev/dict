import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export function NavBar() {
  const { data } = useSession()
  return (
    <nav className="p-2 bg-black">
      <ul className="flex justify-between max-w-screen-lg mx-auto">
        <li className="font-mono">Slict</li>
        <li>
          <Link href="/">Home</Link>
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
