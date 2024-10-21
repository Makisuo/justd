"use client"

import React from "react"

import { Button, Form, Textarea } from "ui"

export default function TextareaValidationDemo() {
  const [value, setValue] = React.useState("")
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Textarea value={value} onChange={setValue} label="Address" isRequired className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
