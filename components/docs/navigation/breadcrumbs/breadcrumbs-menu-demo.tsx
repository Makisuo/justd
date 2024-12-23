"use client"

import { IconDotsHorizontal } from "justd-icons"
import { Breadcrumbs, Button, Menu } from "ui"

export default function BreadcrumbsMenuDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>

      <Breadcrumbs.Item separator>
        <Menu>
          <Button appearance="plain" size="square-petite" className="-mx-1 h-6">
            <IconDotsHorizontal />
          </Button>
          <Menu.Content placement="bottom">
            <Menu.Item href="/docs/components/layouts/sidebar">Sidebar</Menu.Item>
            <Menu.Item href="/docs/components/controls/toolbar">Toolbar</Menu.Item>
            <Menu.Item href="/docs/components/collections/menu">Menu</Menu.Item>
            <Menu.Item href="/docs/components/layouts/container">Container</Menu.Item>
            <Menu.Item href="/docs/components/surfaces/chart">Chart</Menu.Item>
            <Menu.Item href="/docs/components/collections/table">Table</Menu.Item>
            <Menu.Item href="/docs/components/overlays/modal">Modal</Menu.Item>
          </Menu.Content>
        </Menu>
      </Breadcrumbs.Item>

      <Breadcrumbs.Item>Navbar</Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
