"use client"

import { Time } from "@internationalized/date"
import { IconClock } from "justd-icons"

import { TimeField } from "@/components/ui/time-field"

export default function TimeFieldSuffixDemo() {
  return <TimeField suffix={<IconClock />} defaultValue={new Time()} label="Event time" />
}
