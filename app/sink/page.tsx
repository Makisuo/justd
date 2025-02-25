import { DatePicker } from "ui"
import CalendarDemo from "@/components/docs/date-and-time/calendar/calendar-demo";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-xs p-10">
        <CalendarDemo/>
        <DatePicker label="Event date" />
      </div>
    </div>
  )
}
