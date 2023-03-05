import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'

export function Abbreviations({
  control,
  register
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
}) {
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `abbreviations`
  })
  return (
    <div>
      <InputWrapper>
        <Label htmlFor="abbreviations">Abbreviations</Label>
        {fields.map((field, index) => (
          <Input
            id="abbreviations"
            key={field.id}
            {...register(`abbreviations.${index}.abbreviation`)}
          />
        ))}
      </InputWrapper>

      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ abbreviation: '' })
        }}
      >
        append
      </Button>
    </div>
  )
}
