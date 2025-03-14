"use client"

import { IconChevronLgDown } from "justd-icons"
import { Button, Card, Menu } from "ui"

export default function CardActionDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Customers</Card.Title>
        <Card.Description>
          Manage and view customer details with available actions aligned to the right.
        </Card.Description>
        <Card.Action>
          <Menu>
            <Button size="small" intent="outline">
              Export... <IconChevronLgDown />
            </Button>
            <Menu.Content placement="bottom end">
              <Menu.Item>Export to PDF</Menu.Item>
              <Menu.Item>Export to CSV</Menu.Item>
            </Menu.Content>
          </Menu>
        </Card.Action>
      </Card.Header>
    </Card>
  )
}
