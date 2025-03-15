"use client"

import { ColorField } from "@/components/ui/color-field"
import { IconColors } from "justd-icons"

export default function ColorFieldWithSuffixDemo() {
  return <ColorField label="Color" suffix={<IconColors />} placeholder="#FAFAFA" />
}
