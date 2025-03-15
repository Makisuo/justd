"use client"

import { Button } from "@/components/ui/button"
import { IconBrandLaravel } from "justd-icons"

export default function ButtonIconDemo() {
  return (
    <Button intent="danger">
      <IconBrandLaravel />
      Laravel
    </Button>
  )
}
