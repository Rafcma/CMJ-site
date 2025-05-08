"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorEffect() {
  //#region Estado e Referências
  // states para o cursor personalizado
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState(0)
  //#endregion

  //#region Efeitos e Eventos
  // Configuração de eventos do mouse e interatividade
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdateTime < 16) return

      setLastUpdateTime(now)
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)

    const handleLinkHover = () => setIsHoveringLink(true)
    const handleLinkLeave = () => setIsHoveringLink(false)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleLinkHover, { passive: true })
      element.addEventListener("mouseleave", handleLinkLeave, { passive: true })
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleLinkHover)
        element.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [isVisible, lastUpdateTime])
  //#endregion

  //#region Verificação de Dispositivo
  // Verifica pra nn renderizar em mobile tb
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual do cursor personalizado
  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[100] rounded-full mix-blend-difference"
        style={{
          backgroundColor: "#fff",
          height: isHoveringLink ? 60 : 30,
          width: isHoveringLink ? 60 : 30,
        }}
        animate={{
          x: position.x - (isHoveringLink ? 30 : 15),
          y: position.y - (isHoveringLink ? 30 : 15),
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[100] rounded-full border border-white mix-blend-difference"
        animate={{
          x: position.x - (isHoveringLink ? 40 : 25),
          y: position.y - (isHoveringLink ? 40 : 25),
          height: isHoveringLink ? 80 : 50,
          width: isHoveringLink ? 80 : 50,
          opacity: isHoveringLink ? 0.3 : 0.15,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.1,
          delay: 0.02,
        }}
      />
    </>
  )
  //#endregion
}
