"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Palette, Zap } from "lucide-react"
import ParticleBackground from "./ui/particle-background"

export default function SecaoSobre() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const valores = [
    {
      icone: <Code className="h-8 w-8 text-marrom-medio" />,
      titulo: "Excelência Técnica",
      descricao:
        "Utilizamos as tecnologias mais modernas e eficientes para criar soluções robustas e de alta performance.",
    },
    {
      icone: <Palette className="h-8 w-8 text-marrom-medio" />,
      titulo: "Design Intuitivo",
      descricao: "Criamos interfaces elegantes e funcionais que proporcionam a melhor experiência para os usuários.",
    },
    {
      icone: <Zap className="h-8 w-8 text-marrom-medio" />,
      titulo: "Resultados Rápidos",
      descricao: "Trabalhamos com metodologias ágeis para entregar projetos de qualidade no menor tempo possível.",
    },
  ]

  return (
    <section id="sobre" ref={ref} className="py-20 md:py-32 bg-bege-claro relative overflow-hidden">
      {/* Particulas do fundo com menos densidade */}
      <ParticleBackground density={15} color="#3c3424" className="opacity-20" />

      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="grid grid-cols-1 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-light text-marrom-escuro mb-6 tracking-tighter text-center">
                Sobre a <span className="text-marrom-medio">CMJ CodeHaven Studio</span>
              </h2>
              <div className="w-20 h-1 bg-marrom-medio mx-auto mb-8"></div>
              <p className="texto-descritivo text-marrom-escuro/80 mb-6">
                Somos um estúdio de desenvolvimento web especializado em criar experiências digitais excepcionais. Nossa
                equipe combina expertise técnica com design inovador para transformar ideias em soluções digitais que
                impulsionam o sucesso dos nossos clientes.
              </p>
              <p className="texto-descritivo text-marrom-escuro/80">
                Com anos de experiência no mercado, entendemos que cada projeto é único e merece uma abordagem
                personalizada. Trabalhamos em estreita colaboração com nossos clientes para entender suas necessidades e
                objetivos, garantindo resultados que superam expectativas.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {/* Primeiro valor com animação de preenchimento */}
              <motion.div
                className="bg-bege-medio/50 p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {valores[0].icone}
                </div>
                <h3 className="text-lg font-semibold text-marrom-escuro mb-2 relative z-10">{valores[0].titulo}</h3>
                <p className="texto-descritivo text-marrom-escuro/70 text-sm relative z-10">{valores[0].descricao}</p>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0 bg-marrom-claro/20 z-0"
                  initial={{ height: 0 }}
                  whileHover={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Segundo valor com animação de contorno */}
              <motion.div
                className="bg-bege-medio/50 p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {valores[1].icone}
                </div>
                <h3 className="text-lg font-semibold text-marrom-escuro mb-2 relative z-10">{valores[1].titulo}</h3>
                <p className="texto-descritivo text-marrom-escuro/70 text-sm relative z-10">{valores[1].descricao}</p>
                <motion.div
                  className="absolute inset-0 border-2 border-transparent pointer-events-none"
                  initial={{ borderColor: "transparent" }}
                  animate={{ borderColor: "transparent" }}
                  whileHover={{ borderColor: "rgba(128, 128, 128, 0.5)" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Terceiro valor com animação de escala e gradiente */}
              <motion.div
                className="bg-bege-medio/50 p-6 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {valores[2].icone}
                </div>
                <h3 className="text-lg font-semibold text-marrom-escuro mb-2 relative z-10">{valores[2].titulo}</h3>
                <p className="texto-descritivo text-marrom-escuro/70 text-sm relative z-10">{valores[2].descricao}</p>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    background: "linear-gradient(to bottom right, rgba(192, 192, 192, 0.1), rgba(128, 128, 128, 0.2))",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
