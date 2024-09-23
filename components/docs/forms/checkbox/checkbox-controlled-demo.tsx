"use client"

import React from "react"

import { Checkbox, Description } from "ui"

export default function CheckboxControlledDemo() {
  const [selected, setSelection] = React.useState(false)
  return (
    <>
      <Checkbox isSelected={selected} onChange={setSelection} value="updates">
        Receive Updates
      </Checkbox>
      <Description className="mt-2 block [&>strong]:text-fg">
        You have <strong>{selected ? "enabled" : "disabled"}</strong> the option.
      </Description>
    </>
  )
}
