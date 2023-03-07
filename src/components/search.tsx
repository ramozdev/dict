import { api } from '@/utils/api'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDebounce } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'

export function Search() {
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

  return (
    <div className="h-screen overflow-auto px-1">
      <Input
        className="w-full mb-3 mt-1"
        type="text"
        placeholder="Buscar jerga"
        autoComplete="off"
        {...register('search')}
      />

      {data && data.length > 0 && (
        <ScrollArea className="rounded-md gap-y-2 grid">
          {data.map(({ slang, slug }) => (
            <Link key={slang} className="bg-blue-500" href={`/${slug}`}>
              <Card>{slang}</Card>
            </Link>
          ))}
        </ScrollArea>
      )}
    </div>
  )
}
