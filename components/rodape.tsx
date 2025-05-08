"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Clock } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Rodape() {
  const anoAtual = new Date().getFullYear()
  const pathname = usePathname()

  // Função para lidar com cliques em links de âncora
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Se estiver em outra página e o link for para uma âncora na página inicial
    if (pathname !== "/" && href.startsWith("#")) {
      e.preventDefault()
      window.location.href = "/" + href
      return
    }

    // Se estiver na página inicial e o link for para uma âncora
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.replace("#", "")
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
        // Atualiza a URL sem causar recarregamento
        window.history.pushState({}, "", href)
      }
    }
  }

  return (
    <footer className="bg-marrom-escuro text-bege-claro relative overflow-hidden">
      {/* Efeito de fundo com linhas brilhantes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 flex justify-center md:justify-start"
            >
              <div className="logo-container w-40 h-40 flex items-center justify-center rounded-3xl">
                <Image
                  src="/images/cmj-logo-style.jpg"
                  alt="Logo CMJ CodeHaven Studio"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-bege-claro/80 mb-6 leading-relaxed"
            >
              Transformamos ideias em experiências digitais excepcionais. Especialistas em desenvolvimento web de alta
              qualidade.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-4 justify-center md:justify-start"
            >
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-6"
            >
              Links Rápidos
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <li>
                <Link href="/" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/#sobre"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#sobre")}
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#servicos")}
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/nosso-portfolio" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#contato")}
                >
                  Contato
                </Link>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-6"
            >
              Serviços
            </motion.h3>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <li>
                <Link
                  href="/#servicos"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#servicos")}
                >
                  Sites
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#servicos")}
                >
                  E-commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#servicos")}
                >
                  Sistemas Web
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#servicos")}
                >
                  SEO & Performance
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicos"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  onClick={(e) => handleAnchorClick(e, "#servicos")}
                >
                  Manutenção & Suporte
                </Link>
              </li>
            </motion.ul>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg font-semibold mb-6"
            >
              Contato
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-marrom-claro mt-0.5" />
                <div>
                  <p className="text-marrom-claro text-sm">Email:</p>
                  <a
                    href="mailto:cmjcodehaven@gmail.com"
                    className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                  >
                    cmjcodehaven@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-marrom-claro mt-0.5" />
                <div>
                  <p className="text-marrom-claro text-sm">Atendimento:</p>
                  <p className="text-bege-claro/80">Disponível 24 horas online via email</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-bege-claro/10 p-4 rounded-md mt-4"
              >
                <p className="text-bege-claro/90 text-sm">
                  "Estamos sempre prontos para transformar suas ideias em realidade digital. Entre em contato e vamos
                  conversar sobre seu projeto!"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="border-t border-marrom-claro/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-bege-claro/60 text-sm">
              &copy; {anoAtual} CMJ CodeHaven Studio. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-bege-claro/60 hover:text-bege-claro text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-bege-claro/60 hover:text-bege-claro text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
