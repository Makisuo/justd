"use client"

import * as React from "react"

import { ThemeSwitcher } from "@/components/theme-switcher"
import {
  IconBrandApple,
  IconChevronLgDown,
  IconCommandRegular,
  IconDashboard,
  IconHeadphones,
  IconLogout,
  IconSearch,
  IconSettings,
  IconShoppingBag
} from "justd-icons"
import { Avatar, Button, Menu, Navbar, SearchField, Separator } from "ui"

export default function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
  return (
    <>
      <Navbar {...props}>
        <Navbar.Nav>
          <Navbar.Logo href="/docs/components/layouts/navbar">
            <IconBrandApple className="size-6 lg:size-5" />
          </Navbar.Logo>
          <Navbar.Section>
            <Navbar.Item isCurrent href="#">
              Store
            </Navbar.Item>
            <Navbar.Item href="#">Mac</Navbar.Item>
            <Navbar.Item href="#">iPad</Navbar.Item>
          </Navbar.Section>
          <Navbar.Section className="ml-auto hidden lg:flex">
            <Navbar.Flex>
              <SearchField aria-label="Search for products" />
            </Navbar.Flex>
          </Navbar.Section>
        </Navbar.Nav>

        <Navbar.Compact>
          <Navbar.Flex>
            <Navbar.Trigger className="-ml-2" />
            <Separator orientation="vertical" className="h-6 lg:mx-1" />
            <Navbar.Logo href="/docs/components/layouts/navbar">
              <IconBrandApple className="size-5" />
            </Navbar.Logo>
          </Navbar.Flex>
          <Navbar.Flex>
            <Navbar.Flex>
              <Button appearance="plain" size="square-petite" aria-label="Search for products">
                <IconSearch />
              </Button>
              <Button appearance="plain" size="square-petite" aria-label="Your Bag">
                <IconShoppingBag />
              </Button>
              <ThemeSwitcher appearance="plain" />
            </Navbar.Flex>
            <Separator orientation="vertical" className="h-6 ml-1 mr-3" />
            <Menu>
              <Menu.Trigger aria-label="Open Menu" className="group gap-x-2 flex items-center">
                <Avatar alt="cobain" size="small" shape="square" src="/images/navbar/cobain.jpg" />
                <IconChevronLgDown className="size-4 group-data-pressed:rotate-180 transition-transform" />
              </Menu.Trigger>
              <Menu.Content placement="bottom right" showArrow className="sm:min-w-56">
                <Menu.Section>
                  <Menu.Header separator>
                    <span className="block">Kurt Cobain</span>
                    <span className="font-normal text-muted-fg">@cobain</span>
                  </Menu.Header>
                </Menu.Section>

                <Menu.Item href="#dashboard">
                  <IconDashboard />
                  Dashboard
                </Menu.Item>
                <Menu.Item href="#settings">
                  <IconSettings />
                  Settings
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item>
                  <IconCommandRegular />
                  Command Menu
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item href="#contact-s">
                  <IconHeadphones />
                  Contact Support
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item href="#logout">
                  <IconLogout />
                  Log out
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </Navbar.Flex>
        </Navbar.Compact>

        <Navbar.Inset>{children}</Navbar.Inset>
      </Navbar>
    </>
  )
}
