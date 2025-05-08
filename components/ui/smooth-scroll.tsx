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
    // Função para rolagem suave
    const smoothScroll = (targetPosition: number, duration = 800) => {
      const startPosition = window.scrollY
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      function animacao(currentTime: number) {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const percentageComplete = Math.min(timeElapsed / duration, 1)

        // Função de easing para suavizar o movimento
        const easeInOutQuad = (t: number) => {
          return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        }

        const run = easeInOutQuad(percentageComplete)
        window.scrollTo(0, startPosition + distance * run)

        if (timeElapsed < duration) {
          requestAnimationFrame(animacao)
        }
      }

      requestAnimationFrame(animacao)
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

        // Atualiza a URL sem causar recarregamento
        window.history.pushState({}, "", href)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [router])
  //#endregion

  //#region Renderização do Componente
  // retorna children sem modificação visual
  return <>{children}</>
  //#endregion
}
