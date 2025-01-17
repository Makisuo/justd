"use client"
import { Breadcrumbs } from "ui"

export default function BreadcrumbsCurrentDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Components</Breadcrumbs.Item>

      <Breadcrumbs.Item className="data-current:text-primary">Navbar</Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
