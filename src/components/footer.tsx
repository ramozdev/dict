import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

export function Footer() {
  return (
    <footer className="p-4 bg-black mb-4">
      <ul className="flex items-center justify-between max-w-screen-xl mx-auto">
        <li className="ml-3 text-xl">Slangz</li>
        <span className="inline-flex gap-3 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <InstagramLogoIcon />
          <TwitterLogoIcon />
        </span>
      </ul>
    </footer>
  )
}
