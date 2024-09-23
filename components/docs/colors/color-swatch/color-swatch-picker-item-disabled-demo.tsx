"use client"

import * as React from "react"

import { ControlledValues } from "@/components/docs/colors/controlled-values"
import { parseColor } from "@react-stately/color"
import { ColorSwatchPicker, ColorSwatchPickerItem } from "ui"

export default function ColorSwatchPickerDemo() {
  const [value, setValue] = React.useState(parseColor("#0d6efd"))
  return (
    <div className="flex flex-col gap-4">
      <ColorSwatchPicker
        aria-label="Pick color"
        value={value}
        onChange={setValue}
        className="flex justify-center gap-2"
      >
        <ColorSwatchPickerItem isDisabled color="#f59e0b" />
        <ColorSwatchPickerItem color="#84cc16" />
        <ColorSwatchPickerItem color="#0d6efd" />
        <ColorSwatchPickerItem isDisabled color="#ec4899" />
        <ColorSwatchPickerItem isDisabled color="#f43f5e" />
      </ColorSwatchPicker>

      <ControlledValues color={value} />
    </div>
  )
}
