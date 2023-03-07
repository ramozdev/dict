import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { TrashIcon } from '@radix-ui/react-icons'

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
    <div>
      <InputWrapper>
        <div className="flex gap-3 items-center mb-3">
          <Label htmlFor="abbreviations">Abbreviations</Label>
          <Button
            onClick={(e) => {
              e.preventDefault()
              append({ abbreviation: '', id: '' })
            }}
          >
            append
          </Button>
        </div>
        <div className="grid gap-3">
          {editableValues?.map(({ abbreviation, id }) => (
            <div key={id} className="flex gap-3 items-center">
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
              {...register(`abbreviations.${index}.abbreviation`)}
            />
          ))}
        </div>
      </InputWrapper>
    </div>
  )
}
