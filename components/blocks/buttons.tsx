"use client"

import { Button } from "ui"

import { Wrapper } from "@/app/(app)/(home)/partials/resources"

export function Buttons() {
  return (
    <Wrapper>
      <div className="flex gap-4">
        <Button intent="plain">Label</Button>
        <Button intent="outline">Label</Button>
        <Button intent="secondary">Label</Button>
      </div>
    </Wrapper>
  )
}
