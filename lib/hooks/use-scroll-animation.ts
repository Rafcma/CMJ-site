"use client"

import { useEffect, useState } from "react"

//#region Interfaces
// Definição dos tipos de dados para as opções de animação
interface ScrollAnimationOptions {
  threshold?: number
  delay?: number
}
//#endregion

//#region Hook de Animação de Scroll
// Hook para detectar quando um elemento entra na viewport e animar
export function useScrollAnimation({ threshold = 0.1, delay = 0 }: ScrollAnimationOptions = {}) {
  //#region Estado e Referências
  // Gerenciamento de estado para animação
  const [hasAnimated, setHasAnimated] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)
  //#endregion

  //#region Efeito de Observação
  // Configuração do IntersectionObserver para detectar visibilidade
  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setHasAnimated(true)
          }, delay)
        }
      },
      { threshold },
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, delay])
  //#endregion

  return { ref: setRef, hasAnimated }
}
//#endregion

//#region Hook de Efeito Parallax
// Hook para criar efeito de parallax(transforma descend) baseado no scroll
export function useParallaxEffect(speed = 0.2) {
  //#region Estado e Referências
  // Gerenciamento de referência para o elemento
  const [element, setElement] = useState<HTMLElement | null>(null)
  //#endregion

  //#region Efeito de Scroll
  // Configuração do efeito de parallax no scroll
  useEffect(() => {
    if (!element) return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const elementTop = element.getBoundingClientRect().top + scrollTop
      const relativeScroll = scrollTop - elementTop
      const translateY = relativeScroll * speed

      element.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [element, speed])
  //#endregion

  return setElement
}
//#endregion

//#region Hook de Efeito de Cursor
// Hook para rastrear a posição do cursor
export function useCursorEffect() {
  //#region Estado e Referências
  // Gerenciamento de estado para posição do cursor
  const [position, setPosition] = useState({ x: 0, y: 0 })
  //#endregion

  //#region Efeito de Movimento do Mouse
  // Rastreamento da posição do cursor
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updatePosition)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
    }
  }, [])
  //#endregion

  return position
}
//#endregion
