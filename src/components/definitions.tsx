import React from 'react'
import {
  type Control,
  useFieldArray,
  type UseFormReturn,
  useWatch,
  type UseFormRegister,
  type FieldArrayWithId
} from 'react-hook-form'
import { GeneralizedSelect, type GeneralizedSelectProps } from '@/components/ui/select'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TextArea } from '@/components/ui/textarea'
import type { SlangFormSchema } from '@/lib/validations/slang'
import type { Pos } from '@prisma/client'
import { PlusIcon } from '@radix-ui/react-icons'
import { Card } from './ui/card'

export function Examples({
  control,
  register,
  nestIndex
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
  nestIndex: number
}) {
  const { fields, append } = useFieldArray({
    control,
    name: `definitions.${nestIndex}.examples`
  })
  return (
    <div>
      {fields.length > 0 && (
        <InputWrapper className="mb-0">
          <Label htmlFor={`examples-${nestIndex}`} className="mb-2">
            Examples
          </Label>
          {fields.map((field, k) => (
            <TextArea
              key={field.id}
              {...register(`definitions.${nestIndex}.examples.${k}.example`)}
              rows={5}
              cols={33}
              id={`examples-${nestIndex}`}
              placeholder="Pablo was a great guy, but..."
              className="mb-4"
            />
          ))}
        </InputWrapper>
      )}
      {/* <pre>{JSON.stringify(fields, null, 2)}</pre> */}

      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ example: '', id: '' })
        }}
      >
        <PlusIcon className="mr-2" />
        {fields.length > 0 ? `Add another example` : `Add an example`}
      </Button>
    </div>
  )
}

function Definition({
  field,
  register,
  control,
  index,
  setValue
}: { field: FieldArrayWithId; index: number } & Pick<
  UseFormReturn<SlangFormSchema>,
  'control' | 'register' | 'setValue'
>) {
  const pos = useWatch({
    control,
    name: `definitions.${index}.pos`
  })

  const items: GeneralizedSelectProps['items'] = [
    {
      label: { children: 'Part of Speech' },
      id: 'pos',
      items: [
        { props: { value: 'adjective' }, label: 'Adjective' },
        { props: { value: 'adverb' }, label: 'Adverb' },
        { props: { value: 'conjunction' }, label: 'Conjunction' },
        { props: { value: 'determiner' }, label: 'Determiner' },
        { props: { value: 'idiom' }, label: 'Idiom' },
        { props: { value: 'interjection' }, label: 'Interjection' },
        { props: { value: 'noun' }, label: 'Noun' },
        { props: { value: 'preposition' }, label: 'Preposition' },
        { props: { value: 'pronoun' }, label: 'Pronoun' },
        { props: { value: 'verb' }, label: 'Verb' }
      ]
    }
  ]

  return (
    <Card className="mb-4" key={field.id}>
      <div className="flex gap-3 items-center mb-4">
        <Label htmlFor="pos">Part of Speech</Label>
        <GeneralizedSelect
          items={items}
          defaultValue={pos}
          onValueChange={(value) => setValue(`definitions.${index}.pos`, value as Pos)}
        />
      </div>
      {pos === 'idiom' && (
        <InputWrapper className="mb-4">
          <Label htmlFor={`idiom-${index}`} className="mb-2">
            Idiom
          </Label>
          <TextArea
            key={field.id}
            {...register(`definitions.${index}.idiom`)}
            rows={5}
            cols={33}
            id={`idiom-${index}`}
            placeholder="idiom"
          />
        </InputWrapper>
      )}
      <InputWrapper className="mb-4">
        <Label htmlFor={`definition-${index}`} className="mb-2">
          Definition
        </Label>
        <TextArea
          key={field.id}
          {...register(`definitions.${index}.definition`)}
          rows={5}
          cols={33}
          id={`definition-${index}`}
          placeholder="Once upon a time..."
        />
      </InputWrapper>
      <Examples {...{ control, register, nestIndex: index }} />
    </Card>
  )
}

export function Definitions({
  control,
  register,
  setValue
}: Pick<UseFormReturn<SlangFormSchema>, 'control' | 'register' | 'setValue'>) {
  const { fields, append } = useFieldArray({
    control,
    name: `definitions`
  })
  return (
    <fieldset className="mb-6 ring-1 px-2 py-1 ring-neutral-200 dark:ring-neutral-700 rounded-md">
      <legend className="text-lg font-semibold mb-2">Definitions</legend>

      {fields.map((field, index) => (
        <Definition key={field.id} {...{ field, index, control, register, setValue }} />
      ))}

      <Button
        className="mb-2"
        onClick={(e) => {
          e.preventDefault()
          append({
            id: '',
            definition: '',
            pos: 'adjective',
            examples: [],
            idiom: ''
          })
        }}
      >
        <PlusIcon className="mr-2" />
        Add Another Definition
      </Button>
    </fieldset>
  )
}
