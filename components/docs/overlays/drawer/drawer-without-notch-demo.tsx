"use client"

import { Button } from "@/components/ui/button"
import { Drawer } from "@/components/ui/drawer"

export default function DrawerWithoutNotchDemo() {
  return (
    <Drawer withNotch={false}>
      <Button shape="circle" intent="outline">
        Open
      </Button>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>The Beatles</Drawer.Title>
          <Drawer.Description>
            The Beatles were an English rock band formed in Liverpool in 1960, comprising John
            Lennon, Paul McCartney, George Harrison and Ringo Starr.
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
          <Drawer.Close shape="circle">Close</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}
