"use client"

import * as React from "react"

import { parseColor } from "@react-stately/color"
import { ColorSwatchPicker, ColorSwatchPickerItem } from "ui"

export default function ColorSwatchPickerDemo() {
  const [value, setValue] = React.useState(parseColor("#0d6efd"))
  return (
    <ColorSwatchPicker
      aria-label="Pick color"
      value={value}
      onChange={setValue}
      className="grid grid-cols-3 lg:grid-cols-6 gap-2"
    >
      <ColorSwatchPickerItem color="#f59e0b" />
      <ColorSwatchPickerItem color="#84cc16" />
      <ColorSwatchPickerItem color="#0d6efd" />
      <ColorSwatchPickerItem color="#ec4899" />
      <ColorSwatchPickerItem color="#f43f5e" />
    </ColorSwatchPicker>
  )
}
