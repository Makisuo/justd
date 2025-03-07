"use client"

import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { focusButtonStyles } from "./primitive"

const linkStyles = tv({
  base: "transition-[color,_opacity] outline-0 focus-visible:outline-2 outline-offset-2 forced-colors:outline-[Highlight] focus-visible:outline-ring",
  variants: {
    intent: {
      unstyled: "text-current",
      primary: "text-primary hover:underline",
      secondary: "text-secondary-fg hover:underline",
    },
    isDisabled: {
      true: "cursor-default opacity-60 forced-colors:disabled:text-[GrayText]",
    },
  },
  defaultVariants: {
    intent: "unstyled",
  },
})

interface LinkProps extends LinkPrimitiveProps {
  intent?: "primary" | "secondary" | "unstyled"
  ref?: React.RefObject<HTMLAnchorElement>
}

const Link = ({ className, ref, ...props }: LinkProps) => {
  return (
    <LinkPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, intent: props.intent, className }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </LinkPrimitive>
  )
}

export type { LinkProps }
export { Link, linkStyles }
