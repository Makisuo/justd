"use client"

import { IconCircleExclamation } from "justd-icons"
import { motion } from "motion/react"
import { Meter as MeterPrimitive, type MeterProps as MeterPrimitiveProps } from "react-aria-components"

import { Label } from "./field"
import { composeTailwindRenderProps } from "./primitive"

export interface MeterProps extends MeterPrimitiveProps {
  label?: string
}

const Meter = ({ label, ...props }: MeterProps) => {
  return (
    <MeterPrimitive {...props} className={composeTailwindRenderProps(props.className, "flex flex-col gap-1")}>
      {({ percentage, valueText }) => (
        <>
          <div className="flex gap-2 justify-between w-full">
            <Label>{label}</Label>
            <span className={`text-sm tabular-nums ${percentage >= 80 ? "text-danger" : "text-muted-fg"}`}>
              {percentage >= 80 && (
                <IconCircleExclamation
                  aria-label="Alert"
                  className="inline-block align-text-bottom size-4 fill-danger/20 text-danger"
                />
              )}
              {` ${valueText}`}
            </span>
          </div>
          <div className="relative h-2 rounded-full -outline-offset-1 min-w-64 bg-muted outline outline-1 outline-transparent">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full forced-colors:bg-[Highlight]"
              initial={{ width: "0%", backgroundColor: getColor(0) }}
              animate={{
                width: `${percentage}%`,
                backgroundColor: getColor(percentage),
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </>
      )}
    </MeterPrimitive>
  )
}

const getColor = (percentage: number) => {
  if (percentage < 30) {
    return "var(--primary)" // Blue
  }

  if (percentage < 50) {
    return "var(--success)" // Green
  }

  if (percentage < 70) {
    return "#eab308" // Yellow
  }

  if (percentage < 80) {
    return "var(--warning)" // Orange
  }

  return "var(--danger)" // Red
}

export { Meter }
