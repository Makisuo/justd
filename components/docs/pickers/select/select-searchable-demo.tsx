"use client"

import { useFilter } from "react-aria"
import { UNSTABLE_Autocomplete as Autocomplete } from "react-aria-components"
import { ListBox, PopoverContent, SearchField, Select } from "ui"
const languages = [
  { id: "en", name: "English" },
  { id: "es", name: "Spanish" },
  { id: "fr", name: "French" },
  { id: "de", name: "German" },
  { id: "it", name: "Italian" },
  { id: "pt", name: "Portuguese" },
  { id: "ru", name: "Russian" },
  { id: "ja", name: "Japanese" },
  { id: "zh", name: "Chinese" },
  { id: "ar", name: "Arabic" },
]

export function SelectSearchableDemo() {
  const { contains } = useFilter({ sensitivity: "base" })
  return (
    <Select label="Select a language">
      <Select.Trigger />
      <PopoverContent
        showArrow={false}
        respectScreen={false}
        className="overflow-hidden sm:min-w-(--trigger-width)"
      >
        <Autocomplete filter={contains}>
          <div className="border-b bg-muted p-2">
            <SearchField className="rounded-lg bg-bg" autoFocus />
          </div>
          <ListBox className="border-0 shadow-none" items={languages}>
            {(item) => <Select.Option>{item.name}</Select.Option>}
          </ListBox>
        </Autocomplete>
      </PopoverContent>
    </Select>
  )
}
