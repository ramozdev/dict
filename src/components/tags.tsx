import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'

export function Tags({
  control,
  register
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
}) {
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `tags`
  })
  return (
    <div>
      <InputWrapper>
        <Label htmlFor="tags">Tags</Label>
        {fields.map((field, index) => (
          <Input id="tags" key={field.id} {...register(`tags.${index}.tag`)} />
        ))}
      </InputWrapper>

      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ tag: '' })
        }}
      >
        append
      </Button>
    </div>
  )
}
