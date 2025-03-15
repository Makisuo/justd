"use client"

import { Toggle } from "@/components/ui/toggle"
import { IconPin } from "justd-icons"

export default function ToggleDisabledDemo() {
  return (
    <Toggle size="square-petite" isDisabled>
      <IconPin />
    </Toggle>
  )
}
