import { type Control, useFieldArray, type UseFormRegister } from 'react-hook-form'
import { InputWrapper } from '@/components/ui/input-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SlangFormSchema } from '@/lib/validations/slang'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'

export function Tags({
  control,
  register,
  editableValues
}: {
  control: Control<SlangFormSchema>
  register: UseFormRegister<SlangFormSchema>
  editableValues?: { tag: string; id: string }[]
}) {
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `tags`
  })
  return (
    <div>
      <InputWrapper>
        <div className="flex gap-3 items-center mb-3">
          <Label htmlFor="tags">Tags</Label>
          <Button
            onClick={(e) => {
              e.preventDefault()
              append({ tag: '', id: '' })
            }}
          >
            <PlusIcon />
          </Button>
        </div>
        <div className="grid gap-3">
          {editableValues?.map(({ tag, id }) => (
            <div key={id} className="flex gap-3 items-center">
              <Input disabled value={tag} />
              <Button>
                <TrashIcon />
              </Button>
            </div>
          ))}
          {fields.map((field, index) => (
            <Input id="tags" key={field.id} {...register(`tags.${index}.tag`)} />
          ))}
        </div>
      </InputWrapper>
    </div>
  )
}
