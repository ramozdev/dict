import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { useForm, type SubmitHandler } from 'react-hook-form'
// import { useRouter } from 'next/navigation'
// import { useState, useTransition } from 'react'
import { Spellings } from '@/components/spellings'
import { Abbreviations } from '@/components/abbreviations'
import { Antonyms } from '@/components/antonyms'
import { Synonyms } from '@/components/synonyms'
import { Tags } from '@/components/tags'
import { Definitions } from '@/components/definitions'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { zodResolver } from '@hookform/resolvers/zod'
import { newSlangSchema } from '@/lib/validations/new-slang'
import { api } from '@/utils/api'

type Props = {
  defaultValues?: SlangFormSchema
}

export function SlangForm({ defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<SlangFormSchema>({
    defaultValues,
    resolver: zodResolver(newSlangSchema)
  })

  // const router = useRouter()
  // const [isPending, startTransition] = useTransition()
  // const [isFetching, setIsFetching] = useState(false)

  // Create inline loading UI
  // const isMutating = isFetching || isPending

  const { mutateAsync } = api.slang.create.useMutation()

  const onSubmit: SubmitHandler<SlangFormSchema> = async (data) => {
    // setIsFetching(true)
    console.log(data)
    await mutateAsync(data)
    // setIsFetching(false)

    // startTransition(() => {
    // Refresh the current route and fetch new data from the server without
    // losing client-side browser or React state.
    // router.refresh()
    // })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto max-w-prose mb-8">
      <fieldset>
        <legend className="text-xl mb-4 font-bold">Add A New Slang</legend>

        <InputWrapper>
          <Label htmlFor="slang" className="items-center flex gap-4 mb-2">
            Slang
            <InputWrapper className="flex mb-0 items-center gap-2">
              <Checkbox
                id="explicit"
                defaultChecked={false}
                onCheckedChange={(value) => setValue('explicit', value as boolean)}
                {...register('explicit')}
              />
              <Label htmlFor="explicit">Explicit</Label>
            </InputWrapper>
          </Label>
          <Input className="input" id="slang" {...register('slang')} />
        </InputWrapper>

        <Spellings {...{ control, register }} />
      </fieldset>

      <Abbreviations {...{ control, register }} />
      <Synonyms {...{ control, register }} />
      <Antonyms {...{ control, register }} />
      <Tags {...{ control, register }} />

      <fieldset className="mb-6 ring-1 px-2 py-1 ring-neutral-200 dark:ring-neutral-700 rounded-md">
        <legend className="text-lg font-semibold mb-2">Sufijos</legend>

        <InputWrapper>
          <Label htmlFor="diminutive" className="mb-2">
            Diminutivo
          </Label>
          <Input id="diminutive" {...register('diminutive')} />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="augmentative" className="mb-2">
            Aumentativo
          </Label>
          <Input id="augmentative" {...register('augmentative')} />
        </InputWrapper>
      </fieldset>

      <Definitions {...{ control, register, handleSubmit, setValue }} />

      <Button onClick={() => console.log({ errors })} className="w-full">
        Submit
      </Button>
    </form>
  )
}
