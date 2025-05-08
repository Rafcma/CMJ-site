"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Plus, X } from "lucide-react"

//#region Interfaces
// tipos de dados para projetos
interface Projeto {
  id: number
  titulo: string
  categoria: string
  imagem: string
  url: string
  descricao?: string
}
//#endregion

export default function SecaoPortfolio() {
  //#region Referências e Estado
  // Gerenciamento de estado e referências para animações e filtros
  const ref = useRef<HTMLElement>(null)
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos")
  const [projetoAberto, setProjetoAberto] = useState<Projeto | null>(null)
  //#endregion

  //#region Animações de Scroll
  // Config scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])
  //#endregion

  //#region Dados de Categorias e Projetos
  // Categorias para filtro e lista de projetos
  const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "sites", nome: "Sites" },
    { id: "ecommerce", nome: "E-commerce" },
    { id: "aplicacoes", nome: "Aplicações" },
  ]

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

  //#region Lógica de Filtro e Modal
  // Filtragem de projetos e manipulação de detalhes
  const projetosFiltrados =
    categoriaAtiva === "todos" ? projetos : projetos.filter((projeto) => projeto.categoria === categoriaAtiva)

  const abrirProjeto = (projeto: Projeto) => {
    setProjetoAberto(projeto)
    document.body.style.overflow = "hidden"
  }

  const fecharProjeto = () => {
    setProjetoAberto(null)
    document.body.style.overflow = ""
  }
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual da seção de portfólio
  return (
    <section id="portfolio" ref={ref} className="py-20 md:py-32 bg-bege-claro relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-marrom-escuro mb-4 tracking-tighter">
            Nosso <span className="text-marrom-medio">Portfólio</span>
          </h2>
          <div className="w-20 h-1 bg-marrom-medio mx-auto mb-6"></div>
          <p className="text-marrom-escuro/80 leading-relaxed">
            Conheça alguns dos projetos que desenvolvemos. Cada trabalho é único e personalizado para atender às
            necessidades específicas de nossos clientes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categorias.map((categoria) => (
            <motion.button
              key={categoria.id}
              onClick={() => setCategoriaAtiva(categoria.id)}
              className={`px-6 py-2 transition-all rounded-md ${
                categoriaAtiva === categoria.id
                  ? "bg-marrom-escuro text-bege-claro"
                  : "bg-bege-medio text-marrom-escuro hover:bg-marrom-claro"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoria.nome}
            </motion.button>
          ))}
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
          {projetosFiltrados.map((projeto) => (
            <motion.div
              key={projeto.id}
              className="group relative overflow-hidden cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
              onClick={() => abrirProjeto(projeto)}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={projeto.imagem || "/placeholder.svg"}
                  alt={projeto.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-marrom-escuro/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-bege-claro text-xl font-medium mb-2">{projeto.titulo}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-bege-claro flex items-center gap-1 text-sm">
                    <Plus className="h-4 w-4" />
                    <span>Ver Detalhes</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border border-marrom-escuro text-marrom-escuro px-6 py-3 rounded-md hover:bg-marrom-escuro hover:text-bege-claro transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Ver Mais Projetos</span>
            </span>
            <motion.span
              className="absolute inset-0 bg-marrom-escuro z-0 rounded-md"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </Link>
        </motion.div>
      </div>

      {/* modelo de detalhes do projeto */}
      <AnimatePresence>
        {projetoAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={fecharProjeto}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-bege-claro max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={projetoAberto.imagem || "/placeholder.svg"}
                  alt={projetoAberto.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-marrom-escuro">{projetoAberto.titulo}</h3>
                  <button className="text-marrom-escuro hover:text-marrom-medio" onClick={fecharProjeto}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-marrom-escuro/80 mb-6">{projetoAberto.descricao}</p>
                <div className="flex justify-end">
                  <a
                    href={projetoAberto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-marrom-escuro text-bege-claro px-4 py-2 hover:bg-marrom-medio transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visitar Projeto</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
  //#endregion
}
