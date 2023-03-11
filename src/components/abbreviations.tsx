import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'

export function Abbreviations({
  control,
  register,
  editableValues
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
  editableValues?: { abbreviation: string; id: string }[]
}) {
  const { fields, append } = useFieldArray({
    control,
    name: `abbreviations`
  })

  return (
    <div className="mb-4">
      <InputWrapper className="mb-0">
        <Label htmlFor="abbreviations" className="mb-2">
          Abbreviations
        </Label>

        {editableValues?.map(({ abbreviation, id }) => (
          <div key={id} className="flex mb-4 gap-3 items-center">
            <Input disabled value={abbreviation} />
            <Button>
              <TrashIcon />
            </Button>
          </div>
        ))}
        {fields.map((field, index) => (
          <Input
            id="abbreviations"
            key={field.id}
            autoComplete="off"
            className="mb-4"
            {...register(`abbreviations.${index}.abbreviation`)}
          />
        ))}
      </InputWrapper>

      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ abbreviation: '', id: '' })
        }}
      >
        <PlusIcon className="mr-2" />{' '}
        {fields.length > 0 ? 'Add another abbreviation' : 'Add an abbreviation'}
      </Button>
    </div>
  )
}
