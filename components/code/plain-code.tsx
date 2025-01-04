"use client"
import { ScrollArea, ScrollBar, ScrollViewport } from "@/components/ui/scroll-area"
import { useCopyButton } from "@/resources/lib/copy"
import { cn } from "@/utils/classes"
import type { ScrollAreaViewportProps } from "@radix-ui/react-scroll-area"
import { IconCheck, IconDuplicate } from "justd-icons"
import {
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
} from "react"
import { buttonStyles } from "ui"

export type PreProps = HTMLAttributes<HTMLElement> & {
  /**
   * Icon of code block
   *
   * When passed as a string, it assumes the value is the HTML of icon
   */
  icon?: ReactNode

  /**
   * @defaultValue true
   */
  allowCopy?: boolean

  /**
   * @defaultValue false
   */
  keepBackground?: boolean

  viewportProps?: ScrollAreaViewportProps
}

export const Pre = forwardRef<HTMLPreElement, HTMLAttributes<HTMLPreElement>>(
  ({ className, ...props }, ref) => {
    return (
      <pre ref={ref} className={cn("p-4 focus-visible:outline-none", className)} {...props}>
        {props.children}
      </pre>
    )
  },
)

Pre.displayName = "Pre"

export const PlainCode = forwardRef<HTMLElement, PreProps>(
  (
    { className, title, allowCopy = true, keepBackground = true, icon, viewportProps, ...props },
    ref,
  ) => {
    const areaRef = useRef<HTMLDivElement>(null)
    const onCopy = useCallback(() => {
      const pre = areaRef.current?.getElementsByTagName("pre").item(0)

      if (!pre) return

      const clone = pre.cloneNode(true) as HTMLElement
      clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
        node.remove()
      })

      void navigator.clipboard.writeText(clone.textContent ?? "")
    }, [])

    return (
      <figure
        ref={ref}
        {...props}
        className={cn(
          "not-prose group relative my-6 max-w-3xl overflow-hidden rounded-lg border bg-secondary/50 text-sm",
          keepBackground && "bg-white dark:bg-zinc-950!",
          className,
        )}
      >
        {title ? (
          <div className="flex flex-row items-center gap-2 border-b bg-fd-muted px-4 py-1.5">
            {icon ? (
              <div
                className="text-fd-muted-foreground [&_svg]:size-3.5"
                // biome-ignore lint/security/noDangerouslySetInnerHtmlWithChildren: <explanation>
                dangerouslySetInnerHTML={
                  typeof icon === "string"
                    ? {
                        __html: icon,
                      }
                    : undefined
                }
              >
                {typeof icon !== "string" ? icon : null}
              </div>
            ) : null}
            <figcaption className="flex-1 truncate text-fd-muted-foreground">{title}</figcaption>
            {allowCopy ? <CopyButton className="-me-2" onCopy={onCopy} /> : null}
          </div>
        ) : (
          allowCopy && (
            <CopyButton className="absolute top-2 right-2 z-[2] backdrop-blur-md" onCopy={onCopy} />
          )
        )}
        <ScrollArea ref={areaRef} dir="ltr">
          <ScrollViewport
            {...viewportProps}
            className={cn("max-h-[600px]", viewportProps?.className)}
          >
            {props.children}
          </ScrollViewport>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </figure>
    )
  },
)

PlainCode.displayName = "PlainCode"

function CopyButton({
  className,
  onCopy,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  onCopy: () => void
}): ReactElement {
  const [checked, onClick] = useCopyButton(onCopy)

  return (
    <button
      type="button"
      className={cn(
        buttonStyles({
          size: "square-petite",
          appearance: "plain",
        }),
        "transition-opacity group-hover:opacity-100",
        !checked && "opacity-0",
        className,
      )}
      aria-label="Copy Text"
      onClick={onClick}
      {...props}
    >
      <IconCheck className={cn("size-3.5 transition-transform", !checked && "scale-0")} />
      <IconDuplicate
        className={cn("absolute size-3.5 transition-transform", checked && "scale-0")}
      />
    </button>
  )
}
