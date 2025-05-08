"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Quote, X } from "lucide-react"

interface Cliente {
  id: number
  nome: string
  empresa: string
  foto: string // Aqui troca imagem de perfil cliente
  logo: string
  depoimento: string
}

export default function SecaoClientes() {
  //#region Estado e Refs
  // Apenas controle do cliente selecionado, sem animações de fade
  const [clienteAtivo, setClienteAtivo] = useState<number | null>(null)
  //#endregion

  //#region Dados dos Clientes
  // Lista de clientes e depoimentos
  const clientes: Cliente[] = [
    {
      id: 1,
      nome: "Ana Silva",
      empresa: "TechCorp",
      foto: "/images/cliente-profile-1.png", // Aqui troca imagem de perfil cliente
      logo: "/images/cliente-1.png",
      depoimento:
        "A CMJ CodeHaven Studio transformou completamente nossa presença digital. O site ficou exatamente como imaginávamos e os resultados superaram nossas expectativas.",
    },
    {
      id: 2,
      nome: "Carlos Mendes",
      empresa: "Innovate Inc",
      foto: "/images/cliente-profile-2.png", // Aqui troca imagem de perfil cliente
      logo: "/images/cliente-2.png",
      depoimento:
        "Profissionalismo e criatividade definem a equipe da CMJ. Nosso e-commerce teve um aumento de 40% nas vendas após o redesign.",
    },
    {
      id: 3,
      nome: "Mariana Costa",
      empresa: "Global Solutions",
      foto: "/images/cliente-profile-3.png", // Aqui troca imagem de perfil cliente
      logo: "/images/cliente-3.png",
      depoimento:
        "Excelente trabalho! O sistema desenvolvido otimizou nossos processos internos e a equipe sempre esteve disponível para ajustes e melhorias.",
    },
    {
      id: 4,
      nome: "Pedro Almeida",
      empresa: "Creative Studio",
      foto: "/images/cliente-profile-4.jpg", // Aqui troca imagem de perfil cliente
      logo: "/images/cliente-4.png",
      depoimento:
        "A atenção aos detalhes e o compromisso com prazos fazem da CMJ um parceiro confiável. Recomendo sem hesitação.",
    },
    {
      id: 5,
      nome: "Juliana Martins",
      empresa: "Digital Agency",
      foto: "/images/cliente-profile-5.png", // Aqui troca imagem de perfil cliente
      logo: "/images/cliente-5.png",
      depoimento:
        "Trabalhamos com vários desenvolvedores antes, mas a CMJ entregou o melhor resultado. O site é rápido, responsivo e visualmente impressionante.",
    },
  ]
  //#endregion

  //#region Manipuladores de Eventos
  // Funções para abrir e fechar detalhes do cliente
  const toggleCliente = (id: number) => {
    if (clienteAtivo === id) {
      setClienteAtivo(null)
    } else {
      setClienteAtivo(id)
    }
  }
  //#endregion

  //#region Renderização
  // Estrutura visual da seção de clientes - sem animações de fade
  return (
    <section id="clientes" className="py-16 bg-marrom-claro/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-marrom-claro/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-marrom-claro/30 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-marrom-escuro mb-4">
            Clientes que <span className="text-marrom-medio">Confiam</span> em Nós
          </h2>
          <div className="w-16 h-1 bg-marrom-medio mx-auto mb-6"></div>
          <p className="texto-descritivo text-marrom-escuro/80">
            Conheça algumas das empresas que confiam em nosso trabalho e veja o que elas têm a dizer sobre nossas
            soluções.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientes.map((cliente) => (
            <motion.div
              key={cliente.id}
              className="bg-bege-claro/50 rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 cursor-pointer" onClick={() => toggleCliente(cliente.id)}>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 relative mr-4 rounded-full overflow-hidden border-2 border-marrom-claro/30">
                    <Image src={cliente.foto || "/placeholder.svg"} alt={cliente.nome} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium text-marrom-escuro text-lg">{cliente.nome}</h4>
                    <p className="text-marrom-medio text-sm">{cliente.empresa}</p>
                  </div>
                </div>

                <div className="mb-4 h-20">
                  <p className="texto-descritivo text-marrom-escuro/80 text-sm line-clamp-3">
                    "{cliente.depoimento.substring(0, 120)}..."
                  </p>
                </div>

                <div className="flex justify-end items-center">
                  <button
                    className="text-sm text-marrom-medio hover:text-marrom-escuro transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCliente(cliente.id)
                    }}
                  >
                    Ler depoimento
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de depoimento */}
      <AnimatePresence>
        {clienteAtivo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-marrom-escuro/80 flex items-center justify-center p-4 z-50"
            onClick={() => setClienteAtivo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-marrom-escuro max-w-lg w-full rounded-lg overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-bege-claro/70 hover:text-bege-claro z-10"
                onClick={() => setClienteAtivo(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {clienteAtivo && (
                <div className="p-8">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 relative mb-4 rounded-full overflow-hidden border-4 border-marrom-claro/30">
                      <Image
                        src={clientes[clienteAtivo - 1].foto || "/placeholder.svg"}
                        alt={clientes[clienteAtivo - 1].nome}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-bege-claro">{clientes[clienteAtivo - 1].nome}</h3>
                    <p className="text-bege-claro/70">{clientes[clienteAtivo - 1].empresa}</p>
                  </div>

                  <div className="relative">
                    <Quote className="h-8 w-8 text-bege-claro/20 absolute -top-4 -left-2" />
                    <p className="texto-descritivo text-bege-claro/90 leading-relaxed text-center italic">
                      "{clientes[clienteAtivo - 1].depoimento}"
                    </p>
                    <Quote className="h-8 w-8 text-bege-claro/20 absolute -bottom-4 -right-2 transform rotate-180" />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
  //#endregion
}
