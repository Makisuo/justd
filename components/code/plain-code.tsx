"use client"

import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { IconBrandReactjs } from "justd-icons"
import { Group } from "react-aria-components"

interface PlainCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  lang?: string
  title?: string
}

export function PlainCode({ title, lang = "tsx", code }: PlainCodeProps) {
  return (
    <Group className="relative my-4 not-prose group">
      {title && (
        <figcaption data-rehype-pretty-code-title="" className="inline-flex gap-x-1 items-center">
          {title.includes(".tsx") ? <IconBrandReactjs className="size-4 text-sky-500" /> : null}
          {title}
        </figcaption>
      )}
      <CopyButton text={code} className="absolute top-0 right-0" />
      <CodeHighlighter removeLastLine code={code} lang={lang} />
    </Group>
  )
}
