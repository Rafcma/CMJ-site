"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface BlobEffectProps {
  className?: string
  offsetX?: number
  offsetY?: number
}

export default function BlobEffect({ className = "", offsetX = 0, offsetY = 0 }: BlobEffectProps) {
  //#region Estado e Referências
  // Gerenciamento de estado para o efeito de blob
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)
  //#endregion

  //#region Efeitos e Eventos
  // Configuração de eventos do mouse e interatividade
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => {
      isHovering.current = true
    }

    const handleMouseLeave = () => {
      isHovering.current = false
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual do efeito de blob
  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          className="w-[120%] h-[120%]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            transform: `translate(${offsetX}%, ${offsetY}%)`,
          }}
        >
          <motion.path
            fill="rgba(180, 180, 180, 0.25)"
            d="M40.4,-62.1C52.9,-53.8,63.8,-42.8,70.2,-29.2C76.6,-15.6,78.5,0.6,74.4,15.1C70.3,29.6,60.2,42.3,47.8,52.5C35.4,62.7,20.7,70.3,4.2,74.8C-12.3,79.3,-30.6,80.7,-44.2,73.1C-57.8,65.5,-66.7,49,-72.3,32.2C-77.9,15.4,-80.2,-1.7,-76.3,-17.1C-72.4,-32.5,-62.3,-46.2,-49.3,-54.5C-36.3,-62.8,-20.3,-65.7,-3.9,-65.8C12.5,-65.9,27.9,-70.3,40.4,-62.1Z"
            animate={{
              d: [
                "M40.4,-62.1C52.9,-53.8,63.8,-42.8,70.2,-29.2C76.6,-15.6,78.5,0.6,74.4,15.1C70.3,29.6,60.2,42.3,47.8,52.5C35.4,62.7,20.7,70.3,4.2,74.8C-12.3,79.3,-30.6,80.7,-44.2,73.1C-57.8,65.5,-66.7,49,-72.3,32.2C-77.9,15.4,-80.2,-1.7,-76.3,-17.1C-72.4,-32.5,-62.3,-46.2,-49.3,-54.5C-36.3,-62.8,-20.3,-65.7,-3.9,-65.8C12.5,-65.9,27.9,-70.3,40.4,-62.1Z",
                "M55.3,-75.6C71.9,-67.5,85.9,-52.3,91.2,-34.8C96.6,-17.3,93.3,2.5,85.8,19.8C78.3,37.1,66.6,51.9,52.1,62.4C37.6,72.9,20.3,79.1,1.7,77.1C-16.9,75.1,-36.8,64.9,-51.7,51.2C-66.6,37.5,-76.5,20.3,-79.1,1.5C-81.7,-17.3,-77,-36.1,-65.5,-48.8C-54,-61.5,-35.7,-68,-18.2,-74.9C-0.7,-81.8,15.9,-89.1,32.2,-86.8C48.5,-84.5,64.5,-72.6,55.3,-75.6Z",
                "M47.7,-73.5C60.2,-67.3,67.8,-50.6,72.1,-34.4C76.4,-18.2,77.3,-2.5,74.4,12.4C71.5,27.3,64.8,41.3,54.1,52.1C43.4,62.9,28.7,70.4,13.1,73.9C-2.5,77.4,-18.9,76.9,-33.2,70.6C-47.5,64.3,-59.7,52.3,-67.8,37.8C-75.9,23.3,-79.9,6.3,-77.2,-9.5C-74.5,-25.3,-65.1,-39.9,-52.8,-46.9C-40.5,-53.9,-25.3,-53.3,-9.9,-58.5C5.5,-63.7,21,-79.7,35.2,-79.9C49.4,-80.1,62.3,-64.5,47.7,-73.5Z",
              ],
              x: [0, mousePosition.x / 20, 0],
              y: [0, mousePosition.y / 20, 0],
            }}
            transition={{
              d: {
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              x: {
                duration: 1.2,
                ease: "easeOut",
              },
              y: {
                duration: 1.2,
                ease: "easeOut",
              },
            }}
          />
        </svg>
      </motion.div>
    </div>
  )
  //#endregion
}
