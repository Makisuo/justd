"use client"

import { useState } from "react"

import { IconCircleCheckFill, IconKey } from "justd-icons"
import { Button, Loader } from "ui"

export default function ButtonLoaderDemo() {
  const [loading, setLoading] = useState<"idle" | "loading" | "success">("idle")

  const pressHandler = () => {
    setLoading("loading")

    setTimeout(() => setLoading("success"), 3000)

    setTimeout(() => setLoading("idle"), 6000)
  }

  return (
    <Button isPending={loading === "loading"} className="justify-between w-52" onPress={pressHandler} intent="primary">
      {loading === "success" ? (
        <IconCircleCheckFill />
      ) : loading === "loading" ? (
        <Loader variant="spin" />
      ) : (
        <IconKey />
      )}
      {loading === "loading" ? "Generating Key..." : loading === "success" ? "Key Generated!" : "Generate API Key"}
    </Button>
  )
}
