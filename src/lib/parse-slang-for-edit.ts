import type { Payload } from './parse-slang-for-client'

export function parseSlangForEdit({
  diminutive,
  augmentative,
  definitions,
  createdAt,
  updatedAt,
  ...data
}: Payload) {
  return {
    ...data,
    diminutive: diminutive ?? '',
    augmentative: augmentative ?? '',
    definitions: definitions.map(({ idiom, ...definition }) => ({
      ...definition,
      idiom: idiom ?? ''
    })),
    createdAt: createdAt?.toISOString(),
    updatedAt: updatedAt?.toISOString()
  }
}

export type ParsedSlangForEdit = ReturnType<typeof parseSlangForEdit>
