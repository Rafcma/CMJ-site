"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Globe, ShoppingCart, Smartphone, BarChart, Layers, Rocket } from "lucide-react"
import MarqueeText from "./ui/marquee-text"

export default function SecaoServicos() {
  //#region Referências e Animações
  // Config da animaçao com scroll
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])
  //#endregion

  //#region Dados de Serviços
  // Lista de serviços oferecidos
  const servicos = [
    {
      icone: <Globe className="h-10 w-10 text-marrom-medio" />,
      titulo: "Sites",
      descricao:
        "Criamos sites profissionais que representam a identidade da sua marca e comunicam sua mensagem com eficiência.",
    },
    {
      icone: <ShoppingCart className="h-10 w-10 text-marrom-medio" />,
      titulo: "E-commerce",
      descricao: "Desenvolvemos lojas virtuais completas e otimizadas para converter visitantes em clientes.",
    },
    {
      icone: <Smartphone className="h-10 w-10 text-marrom-medio" />,
      titulo: "Sites Responsivos",
      descricao: "Garantimos que seu site funcione perfeitamente em todos os dispositivos, de smartphones a desktops.",
    },
    {
      icone: <BarChart className="h-10 w-10 text-marrom-medio" />,
      titulo: "SEO & Performance",
      descricao: "Otimizamos seu site para mecanismos de busca e garantimos carregamento rápido e eficiente.",
    },
    {
      icone: <Layers className="h-10 w-10 text-marrom-medio" />,
      titulo: "Sistemas Web",
      descricao: "Desenvolvemos aplicações web personalizadas para automatizar e otimizar processos do seu negócio.",
    },
    {
      icone: <Rocket className="h-10 w-10 text-marrom-medio" />,
      titulo: "Manutenção & Suporte",
      descricao: "Oferecemos suporte contínuo e atualizações para manter seu site seguro e funcionando perfeitamente.",
    },
  ]
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual da seção de serviços
  return (
    <section id="servicos" ref={ref} className="py-20 md:py-32 bg-marrom-claro/5 relative overflow-hidden">
      <div className="absolute top-10 left-0 right-0 opacity-5 overflow-hidden pointer-events-none">
        <MarqueeText
          text="Desenvolvimento Web • UX/UI Design • E-commerce • SEO • Sistemas Web • "
          speed={30}
          className="text-6xl font-bold text-marrom-escuro"
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light text-marrom-escuro mb-4 tracking-tighter"
          >
            Nossos <span className="text-marrom-medio">Serviços</span>
          </motion.h2>
          <div className="w-20 h-1 bg-marrom-medio mx-auto mb-6"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-marrom-escuro/80"
          >
            Oferecemos soluções digitais completas para impulsionar a presença online da sua empresa. Desde o design até
            o desenvolvimento e manutenção, cuidamos de cada detalhe para garantir resultados excepcionais.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {servicos.map((servico, index) => (
            <motion.div
              key={index}
              className="bg-bege-claro p-8 group cursor-pointer relative overflow-hidden rounded-md transition-all duration-300 hover:scale-105"
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
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-marrom-medio"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <div className="mb-6 transform group-hover:scale-110 transition-transform">{servico.icone}</div>
              <h3 className="text-xl font-semibold text-marrom-escuro mb-3">{servico.titulo}</h3>
              <p className="text-marrom-escuro/70">{servico.descricao}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
  //#endregion
}
