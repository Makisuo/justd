import { Toggle, ToggleGroup } from "@/components/ui/toggle"
import { IconBulletList, IconGrid4 } from "justd-icons"

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup>
      <Toggle>
        <IconGrid4 />
        Grid
      </Toggle>
      <Toggle>
        <IconBulletList />
        List
      </Toggle>
    </ToggleGroup>
  )
}
