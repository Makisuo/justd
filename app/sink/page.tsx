import MenuBasicDemo from "@/components/docs/collections/menu/menu-basic-demo"
import PopoverDemo from "@/components/docs/overlays/popover/popover-demo"

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <MenuBasicDemo />
      <PopoverDemo />
      {/*<ComboBoxDemo/>*/}
      {/*<SelectDemo/>*/}
    </div>
  )
}
