"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import BlobEffect from "./ui/blob-effect"

interface NavigationMenuProps {
  className?: string
}

export default function NavigationMenu({ className }: NavigationMenuProps) {
  //#region Estado e Efeitos
  // Gerenciamento de estado para menu e scroll
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Referência para limitar o efeito de scroll até a próxima seção
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]) // Desaparece gradualmente ao rolar
  const scrollScale = useTransform(scrollY, [0, 300], [1, 0.9]) // Diminui gradualmente ao rolar

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Fechar o menu quando a rota mudar
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  //#endregion

  //#region Dados de Navegação
  // Links e itens do menu
  const menuLinks = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Serviços", href: "/#servicos" },
    { name: "Portfólio", href: "/nosso-portfolio" },
    { name: "Contato", href: "/#contato" },
  ]
  //#endregion

  //#region Variantes de Animação
  // Configurações para animações do menu
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
      },
    }),
  }
  //#endregion

  //#region Manipuladores de Eventos
  // Função para lidar com cliques em links de âncora
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Se estiver em outra página e o link for para uma âncora na página inicial
    if (pathname !== "/" && href.startsWith("/#")) {
      // Não previne o comportamento padrão, deixa navegar para a página inicial com a âncora
      return
    }

    // Se estiver na página inicial e o link for para uma âncora
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault()
      setIsOpen(false) // Fecha o menu

      // Pequeno timeout para garantir que o menu feche antes de rolar
      setTimeout(() => {
        const targetId = href.replace("/#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
          // Atualiza a URL sem causar recarregamento
          window.history.pushState({}, "", href)
        }
      }, 300)
    }
  }
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual do menu de navegação
  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-500", // z-index alto para garantir que fique acima de outros elementos
          scrolled ? "bg-bege-claro/90 backdrop-blur-md py-2 shadow-sm" : "bg-transparent py-4",
          className,
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="relative z-10">
            <div className="relative">
              {/* Container do logo com formato arredondado */}
              <motion.div
                className="relative h-20 w-40 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  opacity: scrollOpacity,
                  scale: scrollScale,
                }}
              >
                {/* Efeito de blob posicionado na logo */}
                <div className="absolute inset-0 -z-10">
                  <BlobEffect />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 h-full w-full flex items-center justify-center"
                >
                  <Image
                    src="/images/cmj-logo-new.png"
                    alt="Logo CMJ CodeHaven Studio"
                    width={280}
                    height={90}
                    className="h-auto w-auto"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </Link>

          <button
            className="relative z-[200] w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              className="w-8 h-0.5 bg-marrom-escuro mb-2 transition-transform"
            />
            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
                x: isOpen ? -20 : 0,
              }}
              className="w-8 h-0.5 bg-marrom-escuro mb-2 transition-transform"
            />
            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              className="w-8 h-0.5 bg-marrom-escuro transition-transform"
            />
          </button>
        </div>
      </header>

      {/* Menu de navegação completo - separado do header para evitar problemas de posicionamento */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 w-full h-full bg-bege-claro z-[150]"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <div className="flex flex-col justify-center items-center min-h-screen p-4">
              <button
                className="absolute top-6 right-6 z-[160] w-10 h-10 flex items-center justify-center"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
              >
                <motion.div
                  className="w-8 h-8 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Fechar</span>
                  <span className="block w-8 h-0.5 bg-marrom-escuro absolute transform rotate-45"></span>
                  <span className="block w-8 h-0.5 bg-marrom-escuro absolute transform -rotate-45"></span>
                </motion.div>
              </button>

              <motion.nav className="flex flex-col items-center space-y-8">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit={{
                      opacity: 0,
                      y: 20,
                      transition: { duration: 0.25 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="text-marrom-escuro text-5xl md:text-6xl font-light tracking-tighter hover:scale-105 transition-all duration-300 hover:shadow-glow"
                      onClick={(e) => {
                        handleAnchorClick(e, link.href)
                        setIsOpen(false) // Fecha o menu ao clicar em um link
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="absolute bottom-16 left-0 w-full px-4 md:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-marrom-escuro/70">
                  <p>© {new Date().getFullYear()} CMJ CodeHaven Studio</p>
                  <div className="mt-4 md:mt-0">
                    <a href="mailto:cmjcodehaven@gmail.com">cmjcodehaven@gmail.com</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
  //#endregion
}
