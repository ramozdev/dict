import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  EnterIcon,
  ExitIcon,
  GearIcon,
  HamburgerMenuIcon,
  Pencil2Icon,
  PersonIcon
} from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export function NavMenu() {
  const { data } = useSession()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2">
          <HamburgerMenuIcon /> Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>{!!data ? data.user.name : 'User'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/new')}>
            <Pencil2Icon className="mr-2 h-4 w-4" />
            <span>Add new slang</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => (!!data ? signOut() : signIn('google'))}>
          {!!data ? <ExitIcon className="mr-2 h-4 w-4" /> : <EnterIcon className="mr-2 h-4 w-4" />}
          <span>{!!data ? 'Log out' : 'Log in'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
