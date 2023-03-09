import * as React from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { api } from '@/utils/api'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Input } from './ui/input'

export function CommandDialogDemo() {
  const { register, watch } = useForm({
    defaultValues: { search: '' }
  })
  const searchText = watch('search')
  const [debouncedText] = useDebounce(searchText, 500)

  const { data } = api.search.slang.useQuery(
    { slang: debouncedText },
    {
      enabled: debouncedText.length > 2
    }
  )
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <button
        type="button"
        className="flex min-w-[200px] md:min-w-[400px] justify-between items-center appearance-none rounded-md bg-white
        px-4 py-2 text-neutral-900 ring-1
        ring-neutral-300
        transition
        duration-100
        hover:ring-neutral-500 
        focus:outline-none 
        focus:ring-neutral-500
        focus-visible:ring-neutral-500 
        disabled:cursor-not-allowed 
        disabled:bg-neutral-50
        disabled:text-neutral-600 
        disabled:ring-neutral-200 
        dark:bg-black
        dark:text-neutral-200 
        dark:ring-neutral-800 
        dark:[color-scheme:dark] 
        dark:hover:bg-black 
        dark:hover:ring-neutral-600	
        dark:hover:invalid:ring-red-800 
        dark:focus:ring-neutral-600 
        dark:focus:invalid:ring-red-800 
        dark:focus-visible:ring-neutral-600"
        onClick={() => setOpen((open) => !open)}
      >
        <p>Search</p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input placeholder="Search" autoComplete="off" {...register('search')} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {data &&
              data.map(({ slang, slug }) => (
                <CommandItem key={slang}>
                  <Link className="bg-blue-500" href={`/${slug}`}>
                    <Card>{slang}</Card>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
