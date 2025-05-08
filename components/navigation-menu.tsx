"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
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
  //#endregion

  //#region Dados de Navegação
  // Links e itens do menu
  const menuLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
  ]
  //#endregion

  //#region Variantes de Animação
  // Configurações para animações do menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, x: -50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
      },
    }),
  }
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual do menu de navegação
  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
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

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-50 w-10 h-10 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <div className="flex flex-col justify-center items-center w-full h-full">
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
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-bege-claro dark:bg-marrom-escuro flex flex-col justify-center items-center z-40"
            >
              <div className="container mx-auto px-4">
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
                        x: -50,
                        transition: { duration: 0.25 },
                      }}
                    >
                      <Link
                        href={link.href}
                        className="text-marrom-escuro dark:text-bege-claro hover:text-marrom-medio dark:hover:text-marrom-claro text-5xl md:text-6xl font-light tracking-tighter hover:scale-105 transition-all duration-300 hover:shadow-glow"
                        onClick={() => setIsOpen(false)}
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
                  <div className="flex flex-col md:flex-row justify-between items-center text-sm text-marrom-escuro/70 dark:text-bege-claro/70">
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
      </div>
    </header>
  )
  //#endregion
}
