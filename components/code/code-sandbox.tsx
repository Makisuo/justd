"use client"

import React from "react"

import generated from "@/__registry__/generated"
import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { copyToClipboard } from "@/resources/lib/copy"
import type { RegistryItem } from "@/resources/types"
import { cn } from "@/utils/classes"
import { IconBrandCss, IconBrandReactjs, IconFile, IconWindowVisitFill } from "justd-icons"
import { Tab } from "react-aria-components"
import { Loader, Tabs } from "ui"

interface Props {
  source: Record<string, string>
  src?: string
  classNames?: {
    preview?: string
    code?: string
  }
}

const registry = generated as Record<string, RegistryItem>

export function CodeSandbox({ classNames, source, src }: Props) {
  const [copiedStates, setCopiedStates] = React.useState<Record<string, boolean>>({})
  const [rawSourceCode, setRawSourceCode] = React.useState<Record<string, string | null>>({})
  const typeOfComponent = registry[source.preview]?.type
  const Component = registry[source.preview]?.component

  const handleCopy = (key: string, value: string | null) => {
    if (value) {
      copyToClipboard(value)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    }
  }

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
      <TabsList src={src} />
      <Tabs.Panel id="preview" className={cn("max-h-110 overflow-y-auto grow", classNames?.preview)}>
        <React.Suspense
          fallback={
            <div className="flex py-6 justify-center items-center text-sm text-muted-fg">
              <Loader variant="spin" />
              <span className="sr-only">Loading...</span>
            </div>
          }
        >
          {typeOfComponent === "registry:blocks" ? (
            <iframe src={src} className="min-h-110 border rounded-xl overflow-hidden size-full" />
          ) : (
            <Component />
          )}
        </React.Suspense>
      </Tabs.Panel>
      <Tabs.Panel id="code" className={classNames?.code}>
        {rawSourceCode && Object.keys(rawSourceCode).length > 0 ? (
          <Tabs className="gap-0 relative">
            {/*bg-[#0e0e10]*/}
            <div className="flex items-center border-y bg-[#0e0e11] dark:border-zinc-800 border-zinc-700 border-x overflow-hidden rounded-t-lg justify-between">
              <Tabs.List className="border-0 relative overflow-x-auto scrollbar-hidden gap-0">
                {Object.keys(rawSourceCode).map((key) => (
                  <Tab
                    className={(values) =>
                      cn(
                        "flex items-center gap-x-1.5 text-xs tracking-tight p-3 text-zinc-400 font-mono whitespace-nowrap cursor-pointer",
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
            </div>
            {Object.entries(rawSourceCode).map(([key, value]) => (
              <Tabs.Panel
                key={key}
                id={key}
                className="border-x border-b bg-(--shiki-bg) dark:border-zinc-800 border-zinc-700 overflow-hidden rounded-b-lg"
              >
                <CopyButton
                  className="absolute sm:grid hidden top-0.5 right-1"
                  alwaysVisible
                  isCopied={copiedStates[key] || false}
                  onPress={() => handleCopy(key, value)}
                />
                <CodeHighlighter
                  max96={false}
                  plain
                  className="overflow-auto p-4 max-h-110"
                  removeLastLine
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

export const TabsList = ({ src }: { src?: string }) => {
  return (
    <Tabs.List>
      <Tabs.Tab id="preview">Preview</Tabs.Tab>
      <Tabs.Tab id="code">Code</Tabs.Tab>
      {src && (
        <Tabs.Tab className="ml-auto flex items-center" target="_blank" href={src}>
          <IconWindowVisitFill />
          Fullscreen
        </Tabs.Tab>
      )}
    </Tabs.List>
  )
}