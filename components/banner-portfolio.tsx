"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function BannerPortfolio() {
  // Configuração para animações baseadas no scroll
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  // Estrutura visual do banner
  return (
    <motion.div ref={ref} style={{ opacity, y }} className="py-24 bg-marrom-escuro relative overflow-hidden">
      {/* Efeito de fundo com linhas brilhantes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ transform: "rotate(180deg)" }}
          >
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5" />
            <motion.path
              d="M0,50 Q25,25 50,50 T100,50"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.5"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,30 Q25,55 50,30 T100,30"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="0.5"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M0,70 Q25,45 50,70 T100,70"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.5"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo e elementos visuais - AUMENTADOS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-80 h-80 flex items-center justify-center"
          >
            <div className="logo-container w-64 h-64 flex items-center justify-center rounded-3xl">
              <Image
                src="/images/cmj-logo-style.jpg"
                alt="CMJ CodeHaven Studio"
                width={240}
                height={240}
                className="object-contain"
              />
            </div>

            {/* Círculos animados - AUMENTADOS */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-bege-claro/30"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border-3 border-bege-claro/20"
              animate={{
                scale: [1.1, 1.25, 1.1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            {/* Círculo adicional externo */}
            <motion.div
              className="absolute inset-0 rounded-full border border-bege-claro/15"
              animate={{
                scale: [1.2, 1.35, 1.2],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>

          {/* Texto e botão */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-light text-bege-claro mb-6 tracking-tighter">
              Conheça Nosso <span className="text-marrom-claro">Portfólio</span>
            </h2>
            <div className="w-20 h-1 bg-marrom-claro mx-auto md:mx-0 mb-6"></div>
            <p className="text-bege-claro/80 mb-8">
              Explore nossa coleção de trabalhos e descubra como transformamos ideias em experiências digitais
              excepcionais. Cada projeto é único e desenvolvido com atenção aos detalhes.
            </p>
            <Link
              href="/nosso-portfolio"
              className="inline-flex items-center gap-2 bg-bege-claro text-marrom-escuro px-8 py-3 rounded-md transition-all duration-300 transform hover:scale-105 group"
            >
              <span>Ver Portfólio Completo</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
