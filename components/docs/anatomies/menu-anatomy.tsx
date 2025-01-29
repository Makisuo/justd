import { IconSettings } from "justd-icons"
import { Menu } from "ui"

export default function MenuAnatomy() {
  return (
    <Menu>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Content>
        <Menu.Header>
          <Menu.Label>Account</Menu.Label>
        </Menu.Header>

        <Menu.Section title="Profile">
          <Menu.Item href="#">
            <IconSettings />
            <Menu.Label />
          </Menu.Item>
          <Menu.Item href="#">
            <Menu.Label />
          </Menu.Item>
          <Menu.Item />
        </Menu.Section>

        <Menu.Separator />

        <Menu.Section>
          <Menu.Submenu>
            <Menu.Content>
              <Menu.Item />
            </Menu.Content>
          </Menu.Submenu>
        </Menu.Section>
      </Menu.Content>
    </Menu>
  )
}
