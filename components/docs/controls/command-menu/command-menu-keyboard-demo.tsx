"use client"

import React from "react"

import { Button, CommandMenu } from "ui"

export default function CommandMenuKeyboardDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <Button appearance="outline" onPress={() => setIsOpen(true)}>
        Open
      </Button>
      <CommandMenu isOpen={isOpen} onOpenChange={setIsOpen}>
        <CommandMenu.Input placeholder="Quick search..." />
        <CommandMenu.List>
          <CommandMenu.Item>
            Account Settings
            <CommandMenu.Keyboard keys="⌘A" />
          </CommandMenu.Item>

          <CommandMenu.Item>
            Profile
            <CommandMenu.Keyboard keys="⌘P" />
          </CommandMenu.Item>

          <CommandMenu.Item>
            Notifications
            <CommandMenu.Keyboard keys="⌘N" />
          </CommandMenu.Item>

          <CommandMenu.Item>
            Privacy Settings
            <CommandMenu.Keyboard keys="⌘S" />
          </CommandMenu.Item>

          <CommandMenu.Item>
            Billing Information
            <CommandMenu.Keyboard keys="⌘B" />
          </CommandMenu.Item>

          <CommandMenu.Item>
            Logout
            <CommandMenu.Keyboard keys="⌘L" />
          </CommandMenu.Item>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
