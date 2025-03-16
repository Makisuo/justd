"use client"

import { PageContainer } from "@/components/page-container"
import { buttonStyles } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { siteConfig } from "@/resources/config/site"
import { IconBrandJustd, IconCube } from "justd-icons"
import { Header } from "react-aria-components"

export function Hero() {
  return (
    <>
      <div className="py-4 sm:py-8 lg:pt-10 xl:pt-20 2xl:pt-24">
        <PageContainer>
          <Header className="text-left">
            <h1 className="mt-4 mb-4 max-w-6xl bg-linear-to-r from-blue-400 to-blue-200 bg-clip-text pb-1 font-semibold text-3xl text-transparent tracking-tight lg:mb-6 lg:text-6xl">
              Accessible React components made for you to copy, customize, and own.
            </h1>
            <p className="block max-w-2xl text-base text-zinc-400 leading-relaxed md:leading-relaxed lg:text-xl [&_strong]:font-medium [&_strong]:text-white">
              <strong className="text-white">{siteConfig.name}</strong> is a chill set of React
              components, built on top of <strong className="text-fg">React Aria Components</strong>
              , all about keeping the web accessible. Easy to customize and just copy & paste into
              your React projects. Plus, it includes{" "}
              <strong className="text-fg">Tailwind CSS</strong> for sleek styling right out of the
              box.
            </p>
          </Header>

          <div className="mt-6 flex items-center gap-x-2">
            <Link
              className={buttonStyles({
                size: "large",
              })}
              href="/docs/2.x/getting-started/installation"
            >
              <IconBrandJustd />
              Get started
            </Link>
            <Link
              className={buttonStyles({
                size: "large",
                intent: "secondary",
              })}
              href="/docs/2.x/components/buttons/button"
            >
              <IconCube />
              Components
            </Link>
          </div>
        </PageContainer>
      </div>
    </>
  )
}
