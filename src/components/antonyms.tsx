import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { TrashIcon } from '@radix-ui/react-icons'

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
    <div>
      <InputWrapper>
        <div className="flex gap-3 items-center mb-3">
          <Label htmlFor="antonyms">Antonyms</Label>
          <Button
            onClick={(e) => {
              e.preventDefault()
              append({ antonym: '', id: '' })
            }}
          >
            append
          </Button>
        </div>
        <div className="grid gap-3">
          {editableValues?.map(({ antonym, id }) => (
            <div key={id} className="flex gap-3 items-center">
              <Input disabled value={antonym} />
              <Button>
                <TrashIcon />
              </Button>
            </div>
          ))}
          {fields.map((field, index) => (
            <Input id="antonyms" key={field.id} {...register(`antonyms.${index}.antonym`)} />
          ))}
        </div>
      </InputWrapper>
    </div>
  )
}
