import React from "react"

import { ColorPalette } from "@/app/(app)/colors/(colors)/color-palette"
import { Header } from "@/components/header"
import { siteConfig } from "@/resources/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Colors",
  description:
    "A stash of over 154 colors blending TailwindCSS vibes with HTML color names, served up in 8 slick formats.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  applicationName: siteConfig.name,
  category: "Colors",
  keywords: [
    "Justd Colors",
    "Tailwind CSS",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "Justd",
    "React Aria",
    "React Aria Components",
    "Server Components",
    "React Components",
    "Next UI Components",
    "UI Design System",
    "UI for Laravel Inertia",
    "Laravel Inertia UI",
    "Laravel Inertia Components",
    "Laravel Inertia UI Components",
    "Laravel Inertia UI Kit",
    "Laravel Inertia UI Library",
    "Laravel Inertia UI Framework",
    "Laravel Inertia Justd",
    "Laravel Justd",
    "Justd Components",
    "Justd UI Components",
    "Justd UI Kit",
    "Justd UI Library",
    "Justd UI Framework",
    "Justd Laravel Inertia",
    "Justd Laravel",
    "Justd Inertia"
  ],
  authors: [
    {
      name: "irsyadadl",
      url: "https://x.com/irsyadadl"
    }
  ]
}

export default async function Page() {
  return (
    <>
      <Header>
        Col
        <span className="text-muted-fg">ors</span>
      </Header>
      <ColorPalette />
    </>
  )
}
