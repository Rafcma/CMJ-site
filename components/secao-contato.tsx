"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
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
    mensagem: "",
  })

  const [enviando, setEnviando] = useState(false)
  const [mensagemEnvio, setMensagemEnvio] = useState("")
  const [tipoMensagem, setTipoMensagem] = useState("")
  const [fieldFocus, setFieldFocus] = useState<string | null>(null)
  //#endregion

  //#region Manipuladores de Eventos
  // Funções para lidar com eventos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem")
      }

      setMensagemEnvio("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      setTipoMensagem("sucesso")
      setFormData({
        nome: "",
        email: "",
        telefone: "",
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
    } finally {
      setEnviando(false)
    }
  }
  //#endregion

  //#region Dados de Contato
  // Informações de contato exibidas na seção
  const infoContato = [
    {
      icone: <Mail className="h-5 w-5 text-marrom-medio" />,
      titulo: "Email",
      conteudo: "contato@cmjcodehaven.com.br",
    },
    {
      icone: <Phone className="h-5 w-5 text-marrom-medio" />,
      titulo: "Telefone",
      conteudo: "+55 (11) 9999-8888",
    },
    {
      icone: <MapPin className="h-5 w-5 text-marrom-medio" />,
      titulo: "Endereço",
      conteudo: "Av. Paulista, 1000 - São Paulo, SP",
    },
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
          <p className="text-marrom-escuro/80 leading-relaxed">
            Estamos prontos para transformar sua ideia em realidade. Entre em contato conosco para discutir seu projeto
            e descobrir como podemos ajudar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-bege-medio/50 p-8 relative z-10"
          >
            <h3 className="text-2xl font-semibold text-marrom-escuro mb-6">Envie uma Mensagem</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-marrom-escuro mb-2 text-sm">
                  Nome Completo
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-marrom-escuro mb-2 text-sm">
                    Email
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
                <div>
                  <label htmlFor="telefone" className="block text-marrom-escuro mb-2 text-sm">
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
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-marrom-escuro mb-2 text-sm">
                  Mensagem
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
                  placeholder="Descreva seu projeto ou dúvida..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                disabled={enviando}
                className="bg-marrom-escuro text-bege-claro px-6 py-3 rounded-md hover:bg-marrom-medio transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-70 hover:scale-105"
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
              {mensagemEnvio && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-md ${
                    tipoMensagem === "sucesso" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {mensagemEnvio}
                </motion.div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between relative z-10"
          >
            <div>
              <h3 className="text-2xl font-semibold text-marrom-escuro mb-6">Informações de Contato</h3>
              <div className="space-y-6 mb-12">
                {infoContato.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-marrom-claro/20 p-3 rounded-md">{info.icone}</div>
                    <div>
                      <h4 className="text-marrom-escuro font-medium">{info.titulo}</h4>
                      <p className="text-marrom-escuro/70">{info.conteudo}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-marrom-escuro text-bege-claro p-8 rounded-md"
            >
              <h3 className="text-xl font-semibold mb-4">Horário de Atendimento</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span>9:00 - 18:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Sábado:</span>
                  <span>10:00 - 14:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
  //#endregion
}
