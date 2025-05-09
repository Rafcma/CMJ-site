"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import ParticleBackground from "./ui/particle-background"

export default function SecaoHero() {
  //#region Referências e Animações
  // Config pra animações baseadas no scroll
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  //#endregion

  //#region Dados de Conteúdo
  // Texto e conteudo da seção
  const titleWords = "Transformamos ideias em experiências digitais excepcionais".split(" ")
  //#endregion

  //#region Manipuladores de Eventos
  // Função de scroll interativo
  const scrollParaProximaSecao = () => {
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
  }
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual
  return (
    <section
      id="inicio"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground density={15} color="#303030" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center">
        <motion.div style={{ opacity, scale, y }} className="text-center max-w-5xl mx-auto mb-12 relative">
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-marrom-escuro leading-tight tracking-tighter mb-8">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.05,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="fonte-bodoni inline-block mr-2 mb-2 font-bold"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-marrom-escuro/80 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Somos especialistas em desenvolvimento web, criando sites modernos, responsivos e de alta performance que
            elevam a presença digital da sua empresa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
          >
            <Link
              href="/contato-servico"
              className="botao-iniciar-projeto bg-marrom-escuro text-bege-claro px-8 py-3 rounded-md transition-all duration-500 transform hover:scale-105 text-center font-light tracking-wide text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Iniciar Projeto</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-marrom-medio to-marrom-escuro z-0 rounded-md"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </Link>
          </motion.div>

          {/* Seta posicionada de forma fixa abaixo do botão com z-index aumentado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 cursor-pointer z-10"
            onClick={scrollParaProximaSecao}
          >
            <motion.div
              className="bg-bege-claro/80 p-3 rounded-full shadow-md hover:bg-bege-claro transition-colors"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <ArrowDown className="text-marrom-escuro h-6 w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
  //#endregion
}
