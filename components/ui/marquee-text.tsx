"use client"

import type React from "react"

import { useRef } from "react"
import { cn } from "@/lib/utils"

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export default function MarqueeText({
  text,
  className,
  speed = 10,
  direction = "left",
  pauseOnHover = true,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculando a duração da animação com base na velocidade
  const duration = 400 / speed

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div
        className="flex"
        style={
          {
            "--duration": `${duration}s`,
            "--direction": direction === "left" ? "normal" : "reverse",
          } as React.CSSProperties
        }
      >
        {/* Repete o texto, animação continua */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-marquee flex-shrink-0 px-4"
            style={{
              animationDuration: `var(--duration)`,
              animationDirection: `var(--direction)`,
              animationPlayState: pauseOnHover ? "running" : "paused",
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}
