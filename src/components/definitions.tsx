import React, { Fragment } from 'react'
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
    <>
      {fields.map((field, k) => (
        <TextArea
          key={field.id}
          {...register(`definitions.${nestIndex}.examples.${k}.example`)}
          rows={5}
          cols={33}
          id="examples"
          placeholder="example"
        />
      ))}

      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ example: '', id: '' })
        }}
      >
        append
      </Button>
    </>
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
    <Fragment key={field.id}>
      <GeneralizedSelect
        items={items}
        defaultValue={pos}
        onValueChange={(value) => setValue(`definitions.${index}.pos`, value as Pos)}
      />
      {pos === 'idiom' && (
        <InputWrapper>
          <Label htmlFor="idiom">Idiom</Label>
          <TextArea
            key={field.id}
            {...register(`definitions.${index}.idiom`)}
            rows={5}
            cols={33}
            id="idiom"
            placeholder="idiom"
          />
        </InputWrapper>
      )}
      <InputWrapper>
        <Label htmlFor="definition">Definición</Label>
        <TextArea
          key={field.id}
          {...register(`definitions.${index}.definition`)}
          rows={5}
          cols={33}
          id="definition"
          placeholder="definition"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="example">Ejemplos</Label>
        <Examples {...{ control, register, nestIndex: index }} />
      </InputWrapper>
    </Fragment>
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
    <div>
      {fields.map((field, index) => (
        <Definition key={field.id} {...{ field, index, control, register, setValue }} />
      ))}

      <Button
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
        append
      </Button>
    </div>
  )
}
