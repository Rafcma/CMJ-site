"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

//#region Interfaces
// Definição dos tipos de dados para as propriedades do componente
interface SmoothScrollProps {
  children: ReactNode
}
//#endregion

export default function SmoothScroll({ children }: SmoothScrollProps) {
  //#region Hooks e Referências
  // Inicialização do router para navegação
  const router = useRouter()
  //#endregion

  //#region Efeito de Rolagem Suave
  // Configuração do comportamento de rolagem suave
  useEffect(() => {
    const html = document.documentElement

    const scrollPosition = window.scrollY
    let scrollTarget: number | null = null
    let animationFrameId: number | null = null

    const smoothScroll = (targetPosition: number, duration = 1000) => {
      scrollTarget = targetPosition
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      const startTime = performance.now()

      const step = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const easeInOutCubic =
          progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * easeInOutCubic)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step)
        } else {
          scrollTarget = null
        }
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = requestAnimationFrame(step)
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const anchor = target.closest("a")

      if (!anchor) return

      const href = anchor.getAttribute("href")

      if (!href || !href.startsWith("#")) return

      event.preventDefault()

      const targetId = href.replace("#", "")
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
        smoothScroll(targetPosition)

        router.push(`#${targetId}`, { scroll: false })
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [router])
  //#endregion

  //#region Renderização do Componente
  // retorna children sem modificação visual
  return <>{children}</>
  //#endregion
}
