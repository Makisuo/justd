"use client"

import { IconCalendar2 } from "justd-icons"
import { Button, DateField, Form } from "ui"

export default function DateFieldPrefixDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateField prefix={<IconCalendar2 />} isRequired label="Event date" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
