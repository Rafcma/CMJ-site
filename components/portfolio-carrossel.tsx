"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

//#region Interfaces
// Tipos de dados para projetos
interface Projeto {
  id: number
  titulo: string
  categoria: string
  imagem: string
  url: string
  descricao: string
}
//#endregion

export default function PortfolioCarrossel() {
  //#region Estado
  // Controla o projeto atual e animações
  const [projetoAtual, setProjetoAtual] = useState(0)
  const [direcao, setDirecao] = useState(0)
  //#endregion

  //#region Dados dos Projetos
  // Lista de projetos do portfólio
  const projetos: Projeto[] = [
    {
      id: 1,
      titulo: "Site Corporativo Moderna",
      categoria: "sites",
      imagem: "/images/portfolio-1.png",
      url: "#",
      descricao:
        "Um website corporativo moderno com design responsivo e animações sutis que destacam os serviços e conquistas da empresa.",
    },
    {
      id: 2,
      titulo: "E-commerce Boutique Elegance",
      categoria: "ecommerce",
      imagem: "/images/portfolio-2.png",
      url: "#",
      descricao:
        "Plataforma de e-commerce completa com catálogo de produtos, sistema de carrinho, pagamento integrado e painel administrativo personalizado.",
    },
    {
      id: 3,
      titulo: "Dashboard Financeiro",
      categoria: "aplicacoes",
      imagem: "/images/portfolio-3.png",
      url: "#",
      descricao:
        "Aplicação web para gestão financeira com gráficos interativos, análise de dados em tempo real e relatórios personalizáveis.",
    },
    {
      id: 4,
      titulo: "Site Institucional Tech Solutions",
      categoria: "sites",
      imagem: "/images/portfolio-4.png",
      url: "#",
      descricao:
        "Website institucional para empresa de tecnologia, com seções dinâmicas que destacam a cultura da empresa e suas soluções.",
    },
    {
      id: 5,
      titulo: "Loja Virtual Esportes Radicais",
      categoria: "ecommerce",
      imagem: "/images/portfolio-5.png",
      url: "#",
      descricao:
        "E-commerce especializado em artigos para esportes radicais, com sistema de filtragem avançado e experiência de compra otimizada.",
    },
    {
      id: 6,
      titulo: "Sistema de Gestão de Projetos",
      categoria: "aplicacoes",
      imagem: "/images/portfolio-6.png",
      url: "#",
      descricao:
        "Aplicação web para gerenciamento de projetos com funcionalidades de delegação de tarefas, timeline interativa e métricas de desempenho.",
    },
  ]
  //#endregion

  //#region Navegação
  // Funções para navegar entre projetos
  const proximoProjeto = () => {
    setDirecao(1)
    setProjetoAtual((prev) => (prev === projetos.length - 1 ? 0 : prev + 1))
  }

  const projetoAnterior = () => {
    setDirecao(-1)
    setProjetoAtual((prev) => (prev === 0 ? projetos.length - 1 : prev - 1))
  }
  //#endregion

  //#region Autoplay
  // Troca automática de projetos
  useEffect(() => {
    const timer = setTimeout(() => {
      proximoProjeto()
    }, 8000)

    return () => clearTimeout(timer)
  }, [projetoAtual])
  //#endregion

  //#region Variantes de Animação
  // Configurações para animações de transição
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
    }),
  }
  //#endregion

  //#region Renderização
  // Estrutura visual do carrossel
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="overflow-hidden relative rounded-lg shadow-lg bg-bege-medio/20 aspect-[16/9]">
        <AnimatePresence initial={false} custom={direcao} mode="wait">
          <motion.div
            key={projetoAtual}
            custom={direcao}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 25 },
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              filter: { duration: 0.4 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="relative h-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={projetos[projetoAtual].imagem || "/placeholder.svg"}
                    alt={projetos[projetoAtual].titulo}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-marrom-escuro/30 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 bg-bege-claro/95">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold text-marrom-escuro mb-2">{projetos[projetoAtual].titulo}</h2>
                  <div className="w-16 h-0.5 bg-marrom-medio mb-4"></div>
                  <span className="inline-block bg-marrom-claro/20 text-marrom-medio px-3 py-1 rounded-full text-sm mb-4">
                    {projetos[projetoAtual].categoria}
                  </span>
                  <p className="text-marrom-escuro/80 mb-6">{projetos[projetoAtual].descricao}</p>
                  <a
                    href={projetos[projetoAtual].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-marrom-escuro text-bege-claro px-4 py-2 rounded-md hover:bg-marrom-medio transition-all duration-300 w-fit"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visitar Projeto</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles de navegação */}
      <button
        onClick={projetoAnterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-bege-claro/80 hover:bg-bege-claro text-marrom-escuro p-3 rounded-full shadow-lg z-10 transition-all duration-300 hover:scale-110"
        aria-label="Projeto anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={proximoProjeto}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-bege-claro/80 hover:bg-bege-claro text-marrom-escuro p-3 rounded-full shadow-lg z-10 transition-all duration-300 hover:scale-110"
        aria-label="Próximo projeto"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-8 gap-3">
        {projetos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirecao(index > projetoAtual ? 1 : -1)
              setProjetoAtual(index)
            }}
            className={`transition-all duration-300 ${
              index === projetoAtual
                ? "bg-marrom-medio w-8 h-3 rounded-full"
                : "bg-marrom-claro/50 w-3 h-3 rounded-full hover:bg-marrom-claro"
            }`}
            aria-label={`Ir para projeto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
  //#endregion
}
