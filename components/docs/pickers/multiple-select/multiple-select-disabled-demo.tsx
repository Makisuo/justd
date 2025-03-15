"use client"

import { MultipleSelect } from "@/components/ui/multiple-select"
import type { SelectedKey } from "@/components/ui/multiple-select"
import { useListData } from "react-stately"

export default function MultipleSelectDisabledDemo() {
  const selectedItems = useListData<SelectedKey>({
    initialItems: [],
  })
  return (
    <MultipleSelect
      isDisabled
      className="max-w-xs"
      label="Fruits"
      selectedItems={selectedItems}
      items={fruits}
      tag={(item) => <MultipleSelect.Tag textValue={item.name}>{item.name}</MultipleSelect.Tag>}
    >
      {(item) => {
        return <MultipleSelect.Option textValue={item.name}>{item.name}</MultipleSelect.Option>
      }}
    </MultipleSelect>
  )
}

const fruits: SelectedKey[] = [{ id: 1, name: "Apple" }]
