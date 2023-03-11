import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'

export function Antonyms({
  control,
  register,
  editableValues
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
  editableValues?: { antonym: string; id: string }[]
}) {
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `antonyms`
  })
  return (
    <div className="mb-4">
      <InputWrapper className="mb-0">
        <Label htmlFor="antonyms" className="mb-2">
          Antonyms
        </Label>

        {editableValues?.map(({ antonym, id }) => (
          <div key={id} className="flex mb-4 gap-3 items-center">
            <Input disabled value={antonym} />
            <Button>
              <TrashIcon />
            </Button>
          </div>
        ))}
        {fields.map((field, index) => (
          <Input
            id="antonyms"
            autoComplete="off"
            className="mb-4"
            key={field.id}
            {...register(`antonyms.${index}.antonym`)}
          />
        ))}
      </InputWrapper>

      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ antonym: '', id: '' })
        }}
      >
        <PlusIcon className="mr-2" /> {fields.length > 0 ? 'Add another antonym' : 'Add an antonym'}
      </Button>
    </div>
  )
}
