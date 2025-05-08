"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
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
        <motion.div style={{ opacity, y }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <Image src="/images/sobre-imagem.png" alt="Equipe CMJ CodeHaven Studio" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-8 border-marrom-claro/20 -z-10"></div>
            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 border-4 border-marrom-medio/30 -z-10"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-marrom-escuro mb-4 tracking-tighter">
                Sobre a <span className="text-marrom-medio">CMJ CodeHaven Studio</span>
              </h2>
              <div className="w-20 h-1 bg-marrom-medio mb-6"></div>
              <p className="text-marrom-escuro/80 leading-relaxed mb-6">
                Somos um estúdio de desenvolvimento web especializado em criar experiências digitais excepcionais. Nossa
                equipe combina expertise técnica com design inovador para transformar ideias em soluções digitais que
                impulsionam o sucesso dos nossos clientes.
              </p>
              <p className="text-marrom-escuro/80 leading-relaxed">
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
              {valores.map((valor, index) => (
                <motion.div
                  key={index}
                  className="bg-bege-medio/50 p-6 hover:shadow-md transition-shadow"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6 },
                    },
                  }}
                >
                  <div className="mb-4">{valor.icone}</div>
                  <h3 className="text-lg font-semibold text-marrom-escuro mb-2">{valor.titulo}</h3>
                  <p className="text-marrom-escuro/70 text-sm">{valor.descricao}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
