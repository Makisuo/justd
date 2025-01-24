"use client"

import { useState } from "react"

import type { Key } from "react-aria-components"
import { Breadcrumbs } from "ui"

export default function BreadcrumbsCollectionsDemo() {
  const [breadcrumbs, setBreadcrumbs] = useState([
    { id: 1, label: "Dashboard", href: "#" },
    { id: 2, label: "Reports", href: "#" },
    { id: 3, label: "2024 Quarterly Review" },
  ])

  const navigate = (id: Key) => {
    const i = breadcrumbs.findIndex((item) => item.id === id)
    setBreadcrumbs(breadcrumbs.slice(0, i + 1))
  }
  return (
    <Breadcrumbs items={breadcrumbs} onAction={navigate}>
      {(item) => (
        <>
          <Breadcrumbs.Item href={item.href}>{item.label}</Breadcrumbs.Item>
        </>
      )}
    </Breadcrumbs>
  )
}
