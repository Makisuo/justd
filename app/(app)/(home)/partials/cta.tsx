"use client"

import { siteConfig } from "@/resources/config/site"
import { IconBrandGithub } from "justd-icons"
import { Container, Heading, Link, buttonStyles } from "ui"

export function Cta() {
  return (
    <div className="border-t bg-muted/40 py-8 lg:py-16">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <Heading className="text-2xl sm:text-3xl" level={3}>
            Justd is Open Source
          </Heading>
          <p className="mt-2 mb-4 text-base text-muted-fg lg:text-lg">
            Our code's chillin' on GitHub - dive in, peep it, or drop some hot commits if you're
            feelin' it!
          </p>

          <Link
            target="_blank"
            href={siteConfig.repo}
            className={buttonStyles({ size: "large", intent: "outline" })}
          >
            <IconBrandGithub />
            GitHub
          </Link>
        </div>
      </Container>
    </div>
  )
}
