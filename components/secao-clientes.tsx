"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Quote } from "lucide-react"

interface Cliente {
  id: number
  nome: string
  empresa: string
  logo: string
  depoimento: string
}

export default function SecaoClientes() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const clientes: Cliente[] = [
    {
      id: 1,
      nome: "Ana Silva",
      empresa: "TechCorp",
      logo: "/images/cliente-1.png",
      depoimento:
        "A CMJ CodeHaven Studio transformou completamente nossa presença digital. O site ficou exatamente como imaginávamos e os resultados superaram nossas expectativas.",
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      empresa: "Innovate Inc",
      logo: "/images/cliente-2.png",
      depoimento:
        "Profissionalismo e criatividade definem a equipe da CMJ. Nosso e-commerce teve um aumento de 40% nas vendas após o redesign.",
    },
    {
      id: 3,
      nome: "Mariana Costa",
      empresa: "Global Solutions",
      logo: "/images/cliente-3.png",
      depoimento:
        "Excelente trabalho! O sistema desenvolvido otimizou nossos processos internos e a equipe sempre esteve disponível para ajustes e melhorias.",
    },
    {
      id: 4,
      nome: "Pedro Almeida",
      empresa: "Creative Studio",
      logo: "/images/cliente-4.png",
      depoimento:
        "A atenção aos detalhes e o compromisso com prazos fazem da CMJ um parceiro confiável. Recomendo sem hesitação.",
    },
    {
      id: 5,
      nome: "Juliana Martins",
      empresa: "Digital Agency",
      logo: "/images/cliente-5.png",
      depoimento:
        "Trabalhamos com vários desenvolvedores antes, mas a CMJ entregou o melhor resultado. O site é rápido, responsivo e visualmente impressionante.",
    },
  ]

  return (
    <section className="py-16 bg-marrom-claro/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-marrom-claro/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-marrom-claro/30 to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-marrom-escuro mb-4">
            Clientes que <span className="text-marrom-medio">Confiam</span> em Nós
          </h2>
          <div className="w-16 h-1 bg-marrom-medio mx-auto mb-6"></div>
          <p className="text-marrom-escuro/80">
            Conheça algumas das empresas que confiam em nosso trabalho e veja o que elas têm a dizer sobre nossas
            soluções.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {clientes.map((cliente) => (
            <motion.div
              key={cliente.id}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center bg-bege-claro/50 p-6 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-24 h-24 relative mb-6 grayscale hover:grayscale-0 transition-all">
                <Image src={cliente.logo || "/placeholder.svg"} alt={cliente.empresa} fill className="object-contain" />
              </div>

              <div className="text-center mb-4">
                <Quote className="h-6 w-6 text-marrom-medio mx-auto mb-2 opacity-50" />
                <p className="text-marrom-escuro/80 italic text-sm leading-relaxed mb-4">"{cliente.depoimento}"</p>
                <div className="w-8 h-0.5 bg-marrom-claro/30 mx-auto mb-3"></div>
                <h4 className="font-medium text-marrom-escuro">{cliente.nome}</h4>
                <p className="text-marrom-medio text-sm">{cliente.empresa}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
