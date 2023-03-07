import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { useForm, type SubmitHandler } from 'react-hook-form'
// import { useState, useTransition } from 'react'
import { Spellings } from '@/components/spellings'
import { Abbreviations } from '@/components/abbreviations'
import { Antonyms } from '@/components/antonyms'
import { Synonyms } from '@/components/synonyms'
import { Tags } from '@/components/tags'
import { Definitions } from '@/components/definitions'
import { type SlangFormSchema, slangSchema } from '@/lib/validations/slang'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/utils/api'
import { parseSlangForPrisma } from '@/lib/parse-slang-for-prisma'
import { useRouter } from 'next/router'

type Props = {
  defaultValues?: SlangFormSchema
  userId: string
  slangId: string
}

export function EditSlangForm({ defaultValues }: Props) {
  const { register, handleSubmit, setValue, control } = useForm<SlangFormSchema>({
    defaultValues: {
      id: defaultValues?.id,
      slang: defaultValues?.slang,
      explicit: defaultValues?.explicit,
      diminutive: defaultValues?.diminutive,
      augmentative: defaultValues?.augmentative,
      definitions: defaultValues?.definitions,
      authorId: defaultValues?.authorId
    },
    resolver: zodResolver(slangSchema)
  })

  const router = useRouter()
  // const [isPending, startTransition] = useTransition()
  // const [isFetching, setIsFetching] = useState(false)

  // Create inline loading UI
  // const isMutating = isFetching || isPending

  const { mutateAsync } = api.slang.update.useMutation()

  const onSubmit: SubmitHandler<SlangFormSchema> = async (data) => {
    // setIsFetching(true)
    const parsedData = parseSlangForPrisma(data)
    const res = await mutateAsync(parsedData)
    await router.push(`/${res.slug}`)
    // setIsFetching(false)

    // startTransition(() => {
    // Refresh the current route and fetch new data from the server without
    // losing client-side browser or React state.
    // router.refresh()
    // })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
      <fieldset>
        <legend>Slang</legend>

        <Checkbox
          id="explicit"
          defaultChecked={false}
          onCheckedChange={(value) => setValue('explicit', value as boolean)}
          {...register('explicit')}
        />
        <Label htmlFor="explicit">Explicit</Label>
        <InputWrapper>
          <Label htmlFor="slang">Slang</Label>
          <Input className="input" id="slang" {...register('slang')} />
        </InputWrapper>
        <Spellings {...{ control, register }} editableValues={defaultValues?.spellings} />
      </fieldset>

      <Abbreviations {...{ control, register }} editableValues={defaultValues?.abbreviations} />
      <Synonyms {...{ control, register }} editableValues={defaultValues?.synonyms} />
      <Antonyms {...{ control, register }} editableValues={defaultValues?.antonyms} />
      <Tags {...{ control, register }} editableValues={defaultValues?.tags} />

      <fieldset>
        <legend>Sufijos</legend>

        <InputWrapper>
          <Label htmlFor="diminutive">Diminutivo</Label>
          <Input id="diminutive" placeholder="diminutive" {...register('diminutive')} />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="augmentative">Aumentativo</Label>
          <Input id="augmentative" placeholder="augmentative" {...register('augmentative')} />
        </InputWrapper>
      </fieldset>

      <fieldset>
        <legend>Definitions</legend>

        <Definitions {...{ control, register, handleSubmit, setValue }} />
      </fieldset>

      <Button>Submit</Button>
    </form>
  )
}
