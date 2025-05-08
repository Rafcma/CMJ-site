"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

//#region Interfaces
// Definição dos tipos de dados para partículas e propriedades do componente
interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  connected: boolean
}

interface ParticleBackgroundProps {
  className?: string
  density?: number
  color?: string
  maxSize?: number
  minSize?: number
  speed?: number
  interactive?: boolean
}
//#endregion

export default function ParticleBackground({
  className = "",
  density = 30,
  color = "#303030",
  maxSize = 2,
  minSize = 0.5,
  speed = 0.5,
  interactive = true,
}: ParticleBackgroundProps) {
  //#region Estado e Referências
  // Gerenciamento de estado e referências para o canvas e animações
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  const isVisibleRef = useRef(false)
  //#endregion

  //#region Configuração do Canvas
  // Inicialização do canvas e configuração de observadores
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateDimensions = () => {
      if (canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
        canvas.width = width
        canvas.height = height
      }
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 },
    )

    observer.observe(canvas)

    return () => {
      resizeObserver.disconnect()
      observer.disconnect()
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])
  //#endregion

  //#region Inicialização de Partículas
  // Criação e configuração das partículas
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const particleCount = Math.floor((dimensions.width * dimensions.height) / (20000 / Math.min(density, 15)))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const shouldConnect = Math.random() > 0.4

      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed * 0.5,
        speedY: (Math.random() - 0.5) * speed * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        connected: shouldConnect,
      })
    }

    particlesRef.current = particles

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()

      if (isVisibleRef.current) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    return () => {
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [dimensions, density, maxSize, minSize, speed, interactive])
  //#endregion

  //#region Loop de Animação
  // Renderização e animação das partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let lastTime = 0
    const fps = 30

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (timestamp - lastTime < 1000 / fps) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      lastTime = timestamp
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const particlesToProcess = particlesRef.current

      particlesToProcess.forEach((particle, i) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > dimensions.width) particle.x = 0
        if (particle.x < 0) particle.x = dimensions.width
        if (particle.y > dimensions.height) particle.y = 0
        if (particle.y < 0) particle.y = dimensions.height

        if (interactive) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.01
            particle.x -= dx * force
            particle.y -= dy * force
          }
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        const colorValues = "48,48,48"
        ctx.fillStyle = `rgba(${colorValues}, ${particle.opacity})`
        ctx.fill()

        if (particle.connected) {
          for (let j = 0; j < particlesToProcess.length; j += 2) {
            if (i === j) continue

            const otherParticle = particlesToProcess[j]

            if (!otherParticle.connected) continue

            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(192,192,192, ${0.2 * (1 - distance / 120)})`
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [dimensions, color, interactive, mousePosition])
  //#endregion

  //#region Renderização do Componente
  // Retorno do elemento canvas com configurações
  return <canvas ref={canvasRef} className={cn("absolute inset-0", className)} style={{ pointerEvents: "none" }} />
  //#endregion
}
