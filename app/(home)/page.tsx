import { Footer } from "@/components/footer"
import { Blocks } from "./partials/blocks"
import { Cta } from "./partials/cta"
import { Hero } from "./partials/hero"
import { IconResources } from "./partials/icon-resources"
import { Navbar } from "./partials/navbar"
import { Resources } from "./partials/resources"

export default function Page() {
  return (
    <div className="relative flex min-h-svh flex-col bg-bg">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-700 to-black">
        <Navbar />
        <Hero />
      </div>
      <div className="h-96 bg-linear-to-b from-black via-70% via-bg to-bg" />
      <div className="-mt-90 sm:-mt-80 space-y-8 pb-6 sm:space-y-16 lg:pt-0">
        <Blocks />
        <IconResources />
        <Resources />
      </div>
      <Cta />
      <Footer />
    </div>
  )
}
