"use client"

import React from "react"

import generated from "@/__registry__/generated"
import { Code } from "@/components/rehype/code"
import type { RegistryItem } from "@/resources/types"
import { cn } from "@/utils/classes"
import { IconBrandCss, IconBrandReactjs, IconFile, IconWindowVisitFill } from "justd-icons"
import { Tab } from "react-aria-components"
import { Loader, Tabs } from "ui"

interface Props {
  source: Record<string, string>
  fullscreenUrl?: string
}

const registry = generated as Record<string, RegistryItem>

export function CodeSandbox({ source, fullscreenUrl }: Props) {
  const [rawSourceCode, setRawSourceCode] = React.useState<Record<string, string | null>>({})
  const Component = registry[source.preview]?.component
  React.useEffect(() => {
    const fetchRegistryData = async () => {
      const fetchedSourceCode: Record<string, string | null> = {}
      await Promise.all(
        Object.entries(source)
          .filter(([key]) => key !== "preview")

          .map(async ([key, path]) => {
            const registryKey = path
            const registryItem = registry[registryKey]

            if (registryItem) {
              try {
                const response = await fetch(`/registry/${registryKey}.json`)
                if (response.ok) {
                  const registryEntry = await response.json()
                  fetchedSourceCode[key] = registryEntry.files?.[0]?.content || "No content available"
                } else {
                  console.error(`Failed to fetch source code for ${path}:`, response.status)
                  fetchedSourceCode[key] = "Error loading source code."
                }
              } catch (error) {
                console.error(`Error fetching source code for ${path}:`, error)
                fetchedSourceCode[key] = "Error loading source code."
              }
            } else {
              console.error(`Registry item for ${registryKey} not found.`)
              fetchedSourceCode[key] = "Registry item not found."
            }
          })
      )
      setRawSourceCode(fetchedSourceCode)
    }

    fetchRegistryData()
  }, [source])

  if (!Component) {
    return <p>Component "{source.preview}" not found in the registry.</p>
  }
  return (
    <Tabs className="not-prose" aria-label="Code Sandbox">
      <TabsList fullscreenUrl={fullscreenUrl} />
      <Tabs.Panel id="preview" className="max-h-96 overflow-y-auto grow">
        <React.Suspense
          fallback={
            <div className="flex py-6 justify-center items-center text-sm text-muted-fg">
              <Loader variant="spin" />
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          <Component />
        </React.Suspense>
      </Tabs.Panel>
      <Tabs.Panel id="code">
        {rawSourceCode && Object.keys(rawSourceCode).length > 0 ? (
          <Tabs className="gap-0">
            <div className="flex items-center border-y bg-[#0e0e10] dark:border-zinc-800 border-zinc-700 border-x overflow-hidden rounded-t-lg justify-between">
              <Tabs.List className="border-0 gap-0">
                {Object.keys(rawSourceCode).map((key) => (
                  <Tab
                    className={(values) =>
                      cn(
                        "flex items-center gap-x-1.5 text-xs tracking-tight px-3 py-2.5 text-zinc-400 font-mono whitespace-nowrap cursor-pointer",
                        "**:data-[slot=icon]:shrink-0 **:data-[slot=icon]:-ml-0.5 **:data-[slot=icon]:size-4 first:border-l-0 border-x border-transparent",
                        values.isHovered && "dark:bg-zinc-800/50 bg-zinc-800 text-zinc-50",
                        values.isSelected &&
                          "dark:bg-zinc-800/50 bg-zinc-800 text-zinc-50 dark:border-zinc-800 border-zinc-700",
                        values.isFocused && "outline-hidden dark:bg-zinc-800/50 bg-zinc-800 text-zinc-50",
                        values.isFocusVisible && "dark:bg-zinc-800/50 bg-zinc-800 text-zinc-50"
                      )
                    }
                    key={key}
                    id={key}
                  >
                    {key.includes("css") ? (
                      <IconBrandCss className="text-blue-500" />
                    ) : key.includes(".tsx") ? (
                      <IconBrandReactjs className="text-cyan-500" />
                    ) : (
                      <IconFile />
                    )}
                    <span>{key}</span>
                  </Tab>
                ))}
              </Tabs.List>
              <div className="hidden sm:flex items-center gap-x-2 pr-3">
                <div className="size-3 bg-red-500 rounded-full" />
                <div className="size-3 bg-yellow-500 rounded-full" />
                <div className="size-3 bg-green-500 rounded-full" />
              </div>
            </div>
            {Object.entries(rawSourceCode).map(([key, value]) => (
              <Tabs.Panel
                key={key}
                id={key}
                className="border-x border-b dark:border-zinc-800 border-zinc-700 overflow-hidden rounded-b-lg"
              >
                <Code
                  withImportCopy={false}
                  className="[&_pre_span[data-line]:last-of-type]:hidden **:[pre]:!rounded-none **:[pre]:!rounded-none **:[pre]:!border-0"
                  code={value || "No source code available"}
                />
              </Tabs.Panel>
            ))}
          </Tabs>
        ) : (
          <div className="p-4 text-center">Loading source code...</div>
        )}
      </Tabs.Panel>
    </Tabs>
  )
}

export const TabsList = ({ fullscreenUrl }: { fullscreenUrl?: string }) => {
  return (
    <Tabs.List>
      <Tabs.Tab id="preview">Preview</Tabs.Tab>
      <Tabs.Tab id="code">Code</Tabs.Tab>
      {fullscreenUrl && (
        <Tabs.Tab className="ml-auto flex items-center" target="_blank" href={fullscreenUrl}>
          <IconWindowVisitFill />
          Fullscreen
        </Tabs.Tab>
      )}
    </Tabs.List>
  )
}
