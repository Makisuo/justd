"use client"

import { Link } from "@/components/ui/link"
import { Sheet } from "@/components/ui/sheet"
import {
  IconArrowUpRight,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandJustd,
  IconBrandX,
  IconChevronLgDown,
  IconHamburger,
  IconHome,
  IconSearch,
  IconSidebarFill,
} from "justd-icons"
import { LayoutGroup } from "motion/react"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

import { menus } from "@/app/(home)/partials/navbar"
import { IconBrandJustdBlocks } from "@/components/icons/icon-brand-justd-blocks"
import { Button } from "@/components/ui/button"
import { Menu } from "@/components/ui/menu"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/resources/config/site"
import { Button as ButtonPrimitive } from "react-aria-components"
import { Aside } from "./aside"
import { CommandPalette } from "./command-palette"
import { NavbarDropdown } from "./navbar"
import { ThemeSwitcher } from "./theme-switcher"
export function ResponsiveAside({
  openCmd,
  setOpenCmd,
}: { openCmd: boolean; setOpenCmd: (open: boolean) => void }) {
  const id = React.useId()
  const [openAside, setOpenAside] = useState(false)
  const pathname = usePathname()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => setOpenAside(false), [pathname])

  return (
    <>
      <CommandPalette setOpen={setOpenCmd} openCmd={openCmd} />
      <nav className="relative z-10 flex items-center justify-between border-b px-4 py-2.5 shadow-xs lg:hidden">
        <div className="flex items-center gap-x-4">
          <ButtonPrimitive
            onPress={() => setOpenAside(true)}
            aria-label="Search docs"
            className="pressed:text-fg text-muted-fg outline-hidden hover:text-fg focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <IconSidebarFill className="size-5" />
          </ButtonPrimitive>
          <Separator orientation="vertical" className="h-5" />
          <Link className="rounded focus:outline-hidden" href="/" aria-label="Logo">
            <IconBrandJustd className="size-5" />
          </Link>
          <Link
            className="rounded focus:outline-hidden"
            href="https://blocks.getjustd.com"
            target="_blank"
            aria-label="Logo"
          >
            <IconBrandJustdBlocks className="size-5" />
          </Link>
        </div>
        <div className="flex items-center gap-x-2 **:data-[slot=icon]:size-5">
          <ButtonPrimitive
            onPress={() => setOpenCmd(true)}
            aria-label="Search docs"
            className="pressed:text-fg text-muted-fg outline-hidden hover:text-fg focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <IconSearch />
          </ButtonPrimitive>

          <ThemeSwitcher
            className="pressed:bg-transparent px-0 hover:bg-transparent"
            intent="plain"
          />
          <Menu>
            <Button size="extra-small" intent="outline" aria-label="Search docs">
              Extra...
              <IconChevronLgDown className="duration-300 group-pressed:rotate-180" />
            </Button>
            <Menu.Content placement="bottom" className="min-w-64">
              <Menu.Item href="https://blocks.getjustd.com" target="_blank">
                <IconBrandJustdBlocks />
                <Menu.Label>Premium Blocks</Menu.Label>
                <IconArrowUpRight />
              </Menu.Item>
              <Menu.Item href="https://blocks.getjustd.com/templates" target="_blank">
                <IconBrandJustdBlocks />
                <Menu.Label>Templates</Menu.Label>
                <IconArrowUpRight />
              </Menu.Item>
              <Menu.Item href="https://x.com/getjustd" target="_blank">
                <IconBrandX />
                <Menu.Label>Twitter</Menu.Label>
                <IconArrowUpRight />
              </Menu.Item>
              <Menu.Item
                className="pressed:text-fg text-muted-fg outline-hidden hover:text-fg focus-visible:ring-2 focus-visible:ring-blue-500"
                href="https://discord.gg/DYmVJ66JUD"
                target="_blank"
              >
                <IconBrandDiscord />
                <Menu.Label>Discord</Menu.Label>
                <IconArrowUpRight />
              </Menu.Item>

              <Menu.Item href={siteConfig.repo} target="_blank">
                <IconBrandGithub />
                <Menu.Label>Github</Menu.Label>
                <IconArrowUpRight />
              </Menu.Item>
            </Menu.Content>
          </Menu>
          <Separator orientation="vertical" className="h-5" />
          <Menu>
            <ButtonPrimitive
              aria-label="Search docs"
              className="pressed:text-fg text-muted-fg outline-hidden hover:text-fg focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <IconHamburger className="size-5" />
            </ButtonPrimitive>
            <Menu.Content placement="bottom" className="min-w-64">
              <Menu.Item href="/">
                <IconHome />
                <Menu.Label>Home</Menu.Label>
              </Menu.Item>
              {menus.map((menu) => (
                <Menu.Item
                  key={menu.href}
                  href={menu.href}
                  target={menu.external ? "_blank" : undefined}
                >
                  {menu.icon && <menu.icon />}
                  <Menu.Label>{menu.label}</Menu.Label>
                  {menu.external && <IconArrowUpRight />}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu>
        </div>
      </nav>
      <Sheet.Content
        aria-label="Docs Menu"
        isOpen={openAside}
        onOpenChange={setOpenAside}
        classNames={{ content: "w-[19rem]" }}
        side="left"
        closeButton={true}
      >
        <Sheet.Header className="mb-4 flex flex-row justify-between py-2">
          <NavbarDropdown />
        </Sheet.Header>
        <Sheet.Body className="px-2">
          <LayoutGroup id={id}>
            <Aside />
          </LayoutGroup>
        </Sheet.Body>
      </Sheet.Content>
    </>
  )
}
