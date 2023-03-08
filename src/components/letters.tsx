const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'ñ',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]
import { useRouter } from 'next/router'
import { GeneralizedSelect, type GeneralizedSelectProps } from '@/components/ui/select'

type Props = {
  letter?: string
}

export function Letters({ letter }: Props) {
  const router = useRouter()
  const items: GeneralizedSelectProps['items'] = [
    {
      id: 'letter',
      items: letters.map((letter) => ({ props: { value: letter }, label: letter.toUpperCase() }))
    }
  ]
  return (
    <div className="flex justify-center gap-x-2">
      <GeneralizedSelect
        items={items}
        defaultValue={letter ?? 'a'}
        onValueChange={(letter) =>
          router.push({
            query: { letter }
          })
        }
      />
    </div>
  )
}
