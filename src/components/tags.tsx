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
    <div className="mb-4">
      <InputWrapper className="mb-0">
        <Label htmlFor="tags" className="mb-2">
          Tags
        </Label>

        {editableValues?.map(({ tag, id }) => (
          <div key={id} className="flex mb-4 gap-3 items-center">
            <Input disabled value={tag} />
            <Button>
              <TrashIcon />
            </Button>
          </div>
        ))}
        {fields.map((field, index) => (
          <>
            <Input
              id="tags"
              key={field.id}
              autoComplete="off"
              className="mb-4"
              {...register(`tags.${index}.tag`)}
            />
            {/* {errors.diminutive && <span>{errors.diminutive.message}</span>} */}
          </>
        ))}
      </InputWrapper>
      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ tag: '', id: '' })
        }}
      >
        <PlusIcon className="mr-2" /> {fields.length > 0 ? 'Add another tag' : 'Add a tag'}
      </Button>
    </div>
  )
}
