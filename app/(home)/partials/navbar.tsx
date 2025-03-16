"use client"

import { CommandPalette } from "@/components/command-palette"
import { IconBrandJustdBlocks } from "@/components/icons/icon-brand-justd-blocks"
import { PageContainer } from "@/components/page-container"
import { Link } from "@/components/ui/link"
import { Menu } from "@/components/ui/menu"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/resources/config/site"
import {
  IconArrowUpRight,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandJustd,
  IconBrandX,
  IconHamburger,
  IconHome,
  IconSearch,
} from "justd-icons"
import { useState } from "react"
import { Button } from "react-aria-components"

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CommandPalette setOpen={setOpen} openCmd={open} />
      <PageContainer className="flex items-center justify-between py-6">
        <div className="flex items-center">
          <Link href="/" className="mr-4" aria-label="Goto homepage">
            <IconBrandJustd className="size-5 text-white" />
          </Link>
          <div className="hidden items-center gap-x-1 lg:flex">
            {menus.map((menu) => (
              <NavLink
                key={menu.href}
                href={menu.href}
                target={menu.external ? "_blank" : undefined}
              >
                {menu.icon && <menu.icon />} {menu.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4 **:data-[slot=icon]:size-5">
          <Button
            onPress={() => setOpen(true)}
            aria-label="Search docs"
            className="text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <IconSearch />
          </Button>
          <Link
            className="text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
            href="https://blocks.getjustd.com"
            target="_blank"
          >
            <IconBrandJustdBlocks />
          </Link>
          <Link
            className="text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
            href="https://x.com/getjustd"
            target="_blank"
          >
            <IconBrandX />
          </Link>
          <Link
            className="text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
            href="https://discord.gg/DYmVJ66JUD"
            target="_blank"
          >
            <IconBrandDiscord />
          </Link>
          <Link
            target="_blank"
            href={siteConfig.repo}
            className="inset-ring inset-ring-fg/10 inset-ring-white/10 inline-flex items-center gap-x-1 rounded-full bg-linear-to-r from-blue-600 via-blue-700 to-sky-500 px-2 py-1 font-medium text-white text-xs/5 tabular-nums shadow-black/50"
          >
            {/*<IconStar className="fill-yellow-500/40 text-yellow-500" />*/}
            <IconBrandGithub />
            1.3K Github
          </Link>

          <div className="flex items-center gap-x-4 lg:hidden">
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Menu>
              <Button
                aria-label="Search docs"
                className="text-blue-200 outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <IconHamburger className="size-5" />
              </Button>
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
        </div>
      </PageContainer>
    </>
  )
}

function NavLink({ ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className="flex items-center gap-x-2 rounded-full px-2.5 py-1 text-blue-100 text-sm tracking-tight outline-hidden transition duration-200 hover:bg-blue-600 hover:text-white hover:shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500"
      {...props}
    />
  )
}

export const menus = [
  { href: "/docs/2.x/getting-started/introduction", label: "Docs" },
  { href: "/components", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/icons", label: "Icons" },
  { href: "/colors", label: "Colors" },
  { href: "/blocks", label: "Blocks" },
  { href: "https://blocks.getjustd.com", label: "Pro", icon: IconBrandJustdBlocks, external: true },
  { href: "https://blocks.getjustd.com/templates", label: "Templates", external: true },
]
