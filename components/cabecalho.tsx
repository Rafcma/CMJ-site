"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import BlobEffect from "./ui/blob-effect"

export default function Cabecalho() {
  //#region Estado e Efeitos
  // Gerenciamento de estado para menu e scroll
  const [menuAberto, setMenuAberto] = useState(false)
  const [scrollado, setScrollado] = useState(false)

  // Efeito de scroll limitado até a próxima seção
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]) // Desaparece gradualmente ao rolar
  const scrollScale = useTransform(scrollY, [0, 300], [1, 0.9]) // Diminui gradualmente ao rolar

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrollado(true)
      } else {
        setScrollado(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const alternarMenu = () => setMenuAberto(!menuAberto)
  //#endregion

  //#region Dados de Navegação
  // Links e itens do menu
  const itensMenu = [
    { nome: "Início", href: "#inicio" },
    { nome: "Sobre", href: "#sobre" },
    { nome: "Serviços", href: "#servicos" },
    { nome: "Portfólio", href: "#portfolio" },
    { nome: "Contato", href: "#contato" },
  ]
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual do cabeçalho
  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrollado ? "bg-bege-claro/90 backdrop-blur-md py-2 shadow-sm" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
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
              {/* Efeito de blob posicionado atrás do logo */}
              <div className="absolute inset-0 -z-10">
                <BlobEffect />
              </div>

              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <Image
                  src="/images/cmj-logo-new.png"
                  alt="Logo CMJ CodeHaven Studio"
                  width={180}
                  height={90}
                  className="h-auto w-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {itensMenu.map((item) => (
            <Link
              key={item.nome}
              href={item.href}
              className="text-marrom-escuro hover:text-marrom-medio transition-colors text-sm uppercase tracking-wider font-medium"
            >
              {item.nome}
            </Link>
          ))}
          <Link
            href="#contato"
            className="bg-marrom-escuro text-bege-claro px-5 py-2 rounded-md hover:bg-marrom-medio text-sm uppercase tracking-wider font-medium hover:scale-105 transition-all duration-300"
          >
            Orçamento
          </Link>
        </nav>

        {/* Botão Menu Mobile */}
        <button
          className="md:hidden text-marrom-escuro z-10"
          onClick={alternarMenu}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Mobile */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: menuAberto ? 1 : 0,
            x: menuAberto ? 0 : "100%",
          }}
          transition={{ duration: 0.3 }}
          className={`fixed inset-0 bg-bege-claro flex flex-col justify-center items-center md:hidden ${
            menuAberto ? "block" : "hidden pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center space-y-6">
            {itensMenu.map((item) => (
              <Link
                key={item.nome}
                href={item.href}
                className="text-marrom-escuro hover:text-marrom-medio transition-colors text-xl uppercase tracking-wider font-medium"
                onClick={alternarMenu}
              >
                {item.nome}
              </Link>
            ))}
            <Link
              href="#contato"
              className="bg-marrom-escuro text-bege-claro px-5 py-2 rounded-md hover:bg-marrom-medio text-xl uppercase tracking-wider font-medium mt-4 hover:scale-105 transition-all duration-300"
              onClick={alternarMenu}
            >
              Orçamento
            </Link>
          </nav>
        </motion.div>
      </div>
    </header>
  )
  //#endregion
}
