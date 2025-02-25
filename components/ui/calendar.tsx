"use client"

import { CalendarContext, useSlottedContext } from "react-aria-components"

import { IconChevronLgLeft, IconChevronLgRight } from "justd-icons"
import type { CalendarProps as CalendarPrimitiveProps, DateValue } from "react-aria-components"
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  Calendar as CalendarPrimitive,
  Heading,
  Text,
  composeRenderProps,
  useLocale,
} from "react-aria-components"

import { Select } from "@/components/ui/select"
import { cn } from "@/utils/classes"
import { getLocalTimeZone, today } from "@internationalized/date"
import { Button } from "./button"

interface CalendarProps<T extends DateValue>
  extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
  className?: string
}

const Calendar = <T extends DateValue>({ errorMessage, className, ...props }: CalendarProps<T>) => {
  const now = today(getLocalTimeZone())

  return (
    <CalendarPrimitive {...props}>
      <CalendarHeader />
      <CalendarGrid className="[&_td]:border-collapse [&_td]:px-0 [&_td]:py-0.5">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={composeRenderProps(
                className,
                (className, { isSelected, isDisabled, isHovered }) =>
                  cn(
                    "relative flex size-11 cursor-default items-center justify-center rounded-lg text-fg tabular-nums outline-hidden data-hovered:bg-secondary-fg/15 sm:size-10 sm:size-9 sm:text-sm/6 forced-colors:text-[ButtonText] forced-colors:outline-0",
                    isSelected &&
                      "bg-primary text-primary-fg data-hovered:bg-primary/90 data-invalid:bg-danger data-pressed:bg-primary data-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:data-invalid:bg-[Mark]",
                    isDisabled && "text-muted-fg forced-colors:text-[GrayText]",
                    date.compare(now) === 0 &&
                      "after:-translate-x-1/2 after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:rounded-full after:bg-primary data-focus-visible:after:bg-primary-fg data-selected:after:bg-primary-fg",
                    className,
                  ),
              )}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-danger text-sm/6">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  )
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const years = Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => 1980 + i)

const CalendarHeader = ({ className, ...props }: React.ComponentProps<'header'>) => {
  const { direction } = useLocale()
  const context = useSlottedContext(CalendarContext)!
  const now = today(getLocalTimeZone())
  return (
    <header
      data-slot="calendar-header"
      className={cn("flex w-full justify-center gap-2 px-1 pt-1 pb-5 sm:pb-4", className)}
      {...props}
    >
      <Select
        aria-label="Select month"
        selectedKey={context?.value?.month ?? new Date().getMonth() + 1}
        onSelectionChange={(v) => {
          context?.onChange?.(now.set({ month: v as number }))
        }}
      >
        <Select.Trigger className="h-8 text-xs" />
        <Select.List>
          {months.map((month, index) => (
            <Select.Option key={index} id={index + 1}>
              <Select.Label>{month}</Select.Label>
            </Select.Option>
          ))}
        </Select.List>
      </Select>
      <Select
        aria-label="Select year"
        selectedKey={context?.value?.year.toString() ?? new Date().getFullYear().toString()}
        onSelectionChange={(v) => {
          context?.onChange?.(now.set({ year: v as number }))
        }}
      >
        <Select.Trigger className="h-8 text-xs tabular-nums tracking-tight" />
        <Select.List>
          {years.map((year) => (
            <Select.Option key={year} id={year.toString()}>
              <Select.Label className="tabular-nums">{year}</Select.Label>
            </Select.Option>
          ))}
        </Select.List>
      </Select>
      <Heading
        className={cn(
          "sr-only mr-2 flex-1 text-left font-medium text-muted-fg sm:text-sm",
          className,
        )}
      />
      <div className="flex items-center gap-1">
        <Button
          size="square-petite"
          className="size-8 **:data-[slot=icon]:text-fg sm:size-7"
          shape="circle"
          appearance="plain"
          slot="previous"
        >
          {direction === "rtl" ? <IconChevronLgRight /> : <IconChevronLgLeft />}
        </Button>
        <Button
          size="square-petite"
          className="size-8 **:data-[slot=icon]:text-fg sm:size-7"
          shape="circle"
          appearance="plain"
          slot="next"
        >
          {direction === "rtl" ? <IconChevronLgLeft /> : <IconChevronLgRight />}
        </Button>
      </div>
    </header>
  )
}

const CalendarGridHeader = () => {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => (
        <CalendarHeaderCell className="pb-2 font-semibold text-muted-fg text-sm sm:px-0 sm:py-0.5 lg:text-xs">
          {day}
        </CalendarHeaderCell>
      )}
    </CalendarGridHeaderPrimitive>
  )
}

Calendar.Header = CalendarHeader
Calendar.GridHeader = CalendarGridHeader

export type { CalendarProps }
export { Calendar }
