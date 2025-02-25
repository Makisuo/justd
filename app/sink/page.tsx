import { DatePicker } from "ui"

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xs p-10">
        <DatePicker label="Event date" />
      </div>
    </div>
  )
}
