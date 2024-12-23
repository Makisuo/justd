import { Avatar } from "ui"

const sizes = ["small", "medium", "large", "extra-large"] as const
export default function AvatarSizeDemo() {
  return (
    <div className="flex gap-4 items-end">
      {sizes.map((size) => (
        <Avatar key={size} size={size} src="/images/avatar/cobain.jpg" />
      ))}
    </div>
  )
}
