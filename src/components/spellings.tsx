import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'

export function Spellings({
  control,
  register,
  editableValues
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
  editableValues?: { spelling: string; id: string }[]
}) {
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `spellings`
  })
  return (
    <div>
      <InputWrapper>
        <div className="flex gap-3 items-center mb-3">
          <Label htmlFor="spellings">Spellings</Label>
          <Button
            onClick={(e) => {
              e.preventDefault()
              append({ spelling: '', id: '' })
            }}
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="grid gap-3">
          {editableValues?.map(({ spelling, id }) => (
            <div key={id} className="flex gap-3 items-center">
              <Input disabled value={spelling} />
              <Button>
                <TrashIcon />
              </Button>
            </div>
          ))}
          {fields.map((field, index) => (
            <Input id="spellings" key={field.id} {...register(`spellings.${index}.spelling`)} />
          ))}
        </div>
      </InputWrapper>
    </div>
  )
}
