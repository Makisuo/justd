"use client"

import { IconDashboard } from "justd-icons"
import { Button } from "ui"

export default function ButtonIntentDemo() {
  return (
    <div className="flex flex-wrap gap-2 max-w-sm">
      <Button>
        <IconDashboard /> Label
      </Button>
      <Button intent="secondary">
        <IconDashboard /> Label
      </Button>
      <Button intent="danger">
        <IconDashboard /> Label
      </Button>
      <Button intent="warning">
        <IconDashboard /> Label
      </Button>
    </div>
  )
}
