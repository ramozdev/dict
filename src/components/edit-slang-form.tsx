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
import { type SlangForm, slangSchema } from '@/lib/validations/slang'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
  defaultValues?: SlangForm
  userId: string
  slangId: string
}

export function EditSlangForm({ defaultValues, slangId, userId }: Props) {
  const { register, handleSubmit, setValue, control } = useForm<SlangForm>({
    defaultValues,
    resolver: zodResolver(slangSchema)
  })

  // const router = useRouter()
  // const [isPending, startTransition] = useTransition()
  // const [isFetching, setIsFetching] = useState(false)

  // Create inline loading UI
  // const isMutating = isFetching || isPending

  const onSubmit: SubmitHandler<SlangForm> = async (data) => {
    // setIsFetching(true)
    await fetch(`/api/patch/slang?userId=${userId}&slangId=${slangId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    // setIsFetching(false)

    // startTransition(() => {
    // Refresh the current route and fetch new data from the server without
    // losing client-side browser or React state.
    // router.refresh()
    // })
  }
  return (
    <form onSubmit={() => handleSubmit(onSubmit)} className="container mx-auto">
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
        <Spellings {...{ control, register }} />
      </fieldset>

      <Abbreviations {...{ control, register }} />
      <Synonyms {...{ control, register }} />
      <Antonyms {...{ control, register }} />
      <Tags {...{ control, register }} />

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