import type { SlangFormSchema } from './validations/slang'

// This function is used to parse the data from the client before it is sent to the database.
// It mostly removes empty strings from arrays and replaces empty strings with null.
export function parseSlangForPrisma({
  abbreviations,
  antonyms,
  definitions,
  spellings,
  synonyms,
  tags,
  diminutive,
  augmentative,
  ...data
}: SlangFormSchema) {
  return {
    ...data,
    diminutive: diminutive === '' ? null : diminutive,
    augmentative: augmentative === '' ? null : augmentative,
    abbreviations: abbreviations?.filter(({ abbreviation }) => abbreviation !== ''),
    antonyms: antonyms?.filter(({ antonym }) => antonym !== ''),
    definitions: definitions.map(({ idiom, examples, ...data }) => ({
      ...data,
      idiom: idiom === '' ? null : idiom,
      examples: examples?.filter(({ example }) => example !== '')
    })),
    spellings: spellings?.filter(({ spelling }) => spelling !== ''),
    synonyms: synonyms?.filter(({ synonym }) => synonym !== ''),
    tags: tags?.filter(({ tag }) => tag !== '')
  }
}
