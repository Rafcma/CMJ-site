"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
  defaultTheme?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
