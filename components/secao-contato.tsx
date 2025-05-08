"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import ParticleBackground from "./ui/particle-background"

export default function SecaoContato() {
  //#region Referências e Animações
  // Referências para elementos DOM e configurações de animação de scroll
  const ref = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])
  //#endregion

  //#region Estado do Formulário
  // Gerenciamento do estado do formulário e campos de entrada
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipoProjeto: "site",
    mensagem: "",
  })

  const [enviando, setEnviando] = useState(false)
  const [mensagemEnvio, setMensagemEnvio] = useState("")
  const [tipoMensagem, setTipoMensagem] = useState("")
  const [fieldFocus, setFieldFocus] = useState<string | null>(null)
  //#endregion

  //#region Manipuladores de Eventos
  // Funções para lidar com eventos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (name: string) => {
    setFieldFocus(name)
  }

  const handleBlur = () => {
    setFieldFocus(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setMensagemEnvio("")

    try {
      // Envia dados para a API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Erro ao enviar mensagem")
      }

      setMensagemEnvio("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      setTipoMensagem("sucesso")
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        tipoProjeto: "site",
        mensagem: "",
      })

      if (formRef.current) {
        formRef.current.classList.add("form-success")
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.classList.remove("form-success")
          }
        }, 1000)
      }
    } catch (error) {
      setMensagemEnvio("Erro ao enviar mensagem. Por favor, tente novamente.")
      setTipoMensagem("erro")
      console.error("Erro no envio:", error)
    } finally {
      setEnviando(false)
    }
  }
  //#endregion

  //#region Tipos de Projeto
  // Opções para o tipo de projeto
  const tiposProjeto = [
    { valor: "site", label: "Sites" },
    { valor: "ecommerce", label: "E-commerce" },
    { valor: "aplicacao", label: "Aplicação Web" },
    { valor: "outros", label: "Outros" },
  ]
  //#endregion

  //#region Renderização do Componente
  // Estrutura visual da seção de contato
  return (
    <section id="contato" ref={ref} className="py-20 md:py-32 bg-bege-claro relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground density={15} color="#303030" className="opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity, y }} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-light text-marrom-escuro mb-4 tracking-tighter">
            Entre em <span className="text-marrom-medio">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-marrom-medio mx-auto mb-6"></div>
          <p className="text-marrom-escuro/80">
            Estamos prontos para transformar sua ideia em realidade. Entre em contato conosco para discutir seu projeto
            e descobrir como podemos ajudar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-bege-medio/30 rounded-lg overflow-hidden shadow-lg"
        >
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-marrom-escuro mb-8 text-center">Nos Conte Sobre Seu Projeto</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-marrom-escuro mb-2 text-sm font-medium">
                    Nome Completo <span className="text-marrom-medio">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    onFocus={() => handleFocus("nome")}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-marrom-escuro mb-2 text-sm font-medium">
                    Email <span className="text-marrom-medio">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefone" className="block text-marrom-escuro mb-2 text-sm font-medium">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    onFocus={() => handleFocus("telefone")}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="tipoProjeto" className="block text-marrom-escuro mb-2 text-sm font-medium">
                    Tipo de Projeto <span className="text-marrom-medio">*</span>
                  </label>
                  <select
                    id="tipoProjeto"
                    name="tipoProjeto"
                    value={formData.tipoProjeto}
                    onChange={handleChange}
                    onFocus={() => handleFocus("tipoProjeto")}
                    onBlur={handleBlur}
                    required
                    className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio appearance-none"
                  >
                    {tiposProjeto.map((tipo) => (
                      <option key={tipo.valor} value={tipo.valor}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-marrom-escuro mb-2 text-sm font-medium">
                  Detalhes do Projeto <span className="text-marrom-medio">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  onFocus={() => handleFocus("mensagem")}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 resize-none border-marrom-claro/30 hover:border-marrom-medio"
                  placeholder="Descreva seu projeto, objetivos, funcionalidades desejadas e prazos..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-marrom-escuro/70 text-sm">
                  <span className="text-marrom-medio">*</span> Campos obrigatórios
                </p>

                <motion.button
                  type="submit"
                  disabled={enviando}
                  className="bg-marrom-escuro text-bege-claro px-8 py-3 rounded-md hover:bg-marrom-medio transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 hover:scale-105 min-w-[200px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {enviando ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </motion.button>
              </div>

              {mensagemEnvio && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-md flex items-center gap-3 ${
                    tipoMensagem === "sucesso" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {tipoMensagem === "sucesso" && <CheckCircle className="h-5 w-5" />}
                  {mensagemEnvio}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12 text-center"
        >
          <p className="text-marrom-escuro/70 italic">
            &quot;Cada projeto é uma oportunidade para criar algo extraordinário. Estamos ansiosos para trabalhar com
            você!&quot;
          </p>
        </motion.div>
      </div>
    </section>
  )
  //#endregion
}
