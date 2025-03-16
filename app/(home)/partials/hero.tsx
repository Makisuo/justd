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
      {/*<div aria-hidden="true" className="-top-10 sm:-top-56 -z-10 absolute inset-x-0 hidden transform-gpu overflow-hidden blur-3xl sm:block">*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      clipPath:*/}
      {/*        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",*/}
      {/*    }}*/}
      {/*    className="-translate-x-1/2 relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] rotate-[30deg] bg-linear-to-tr opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-indigo-500 dark:to-blue-600 dark:opacity-20"*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="pt-10 pb-6 sm:py-8 lg:pt-10 xl:pt-20 2xl:pt-24">
        <PageContainer>
          <Header className="text-center sm:text-left">
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

          <div className="mt-6 flex items-center justify-center gap-x-2 sm:justify-start">
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
