"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Calendar, Briefcase, Code, Palette, Zap } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function FormularioServico() {
  // Referência para o formulário
  const formRef = useRef<HTMLFormElement>(null)
  const isMobile = useMobile()

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    tipoProjeto: "site",
    prazo: "flexivel",
    orcamento: "ate5k",
    descricao: "",
  })

  // Estado de envio
  const [enviando, setEnviando] = useState(false)
  const [mensagemEnvio, setMensagemEnvio] = useState("")
  const [tipoMensagem, setTipoMensagem] = useState("")
  const [etapaAtual, setEtapaAtual] = useState(1)
  const totalEtapas = 3

  // Manipuladores de eventos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const avancarEtapa = () => {
    if (etapaAtual < totalEtapas) {
      setEtapaAtual(etapaAtual + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const voltarEtapa = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1)
    }
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
        empresa: "",
        tipoProjeto: "site",
        prazo: "flexivel",
        orcamento: "ate5k",
        descricao: "",
      })
      setEtapaAtual(1)

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

  // Opções para os selects
  const tiposProjeto = [
    { valor: "site", label: "Site Institucional", icone: <Briefcase className="h-5 w-5" /> },
    { valor: "ecommerce", label: "E-commerce", icone: <Zap className="h-5 w-5" /> },
    { valor: "aplicacao", label: "Aplicação Web", icone: <Code className="h-5 w-5" /> },
    { valor: "redesign", label: "Redesign de Site", icone: <Palette className="h-5 w-5" /> },
    { valor: "outros", label: "Outros", icone: <Briefcase className="h-5 w-5" /> },
  ]

  const prazos = [
    { valor: "urgente", label: "Urgente (até 1 mês)" },
    { valor: "medio", label: "Médio prazo (1-3 meses)" },
    { valor: "longo", label: "Longo prazo (3+ meses)" },
    { valor: "flexivel", label: "Flexível" },
  ]

  const orcamentos = [
    { valor: "ate5k", label: "Até R$ 5.000" },
    { valor: "5k-10k", label: "R$ 5.000 - R$ 10.000" },
    { valor: "10k-20k", label: "R$ 10.000 - R$ 20.000" },
    { valor: "20k+", label: "Acima de R$ 20.000" },
    { valor: "definir", label: "A definir" },
  ]

  // Renderização condicional das etapas
  const renderEtapa = () => {
    switch (etapaAtual) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-marrom-escuro mb-4">Informações de Contato</h3>

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
                  className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="empresa" className="block text-marrom-escuro mb-2 text-sm font-medium">
                  Empresa / Organização
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio"
                  placeholder="Nome da sua empresa"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <motion.button
                type="button"
                onClick={avancarEtapa}
                className="w-full sm:w-auto bg-marrom-escuro text-bege-claro px-8 py-3 rounded-md hover:bg-marrom-medio transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                disabled={!formData.nome || !formData.email}
              >
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-marrom-escuro mb-4">Detalhes do Projeto</h3>

            <div>
              <label htmlFor="tipoProjeto" className="block text-marrom-escuro mb-2 text-sm font-medium">
                Tipo de Projeto <span className="text-marrom-medio">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tiposProjeto.map((tipo) => (
                  <div
                    key={tipo.valor}
                    className={`border rounded-md p-4 cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                      formData.tipoProjeto === tipo.valor
                        ? "border-marrom-medio bg-marrom-medio/10"
                        : "border-marrom-claro/30 hover:border-marrom-medio"
                    }`}
                    onClick={() => setFormData({ ...formData, tipoProjeto: tipo.valor })}
                  >
                    <div
                      className={`${formData.tipoProjeto === tipo.valor ? "text-marrom-medio" : "text-marrom-claro"}`}
                    >
                      {tipo.icone}
                    </div>
                    <span>{tipo.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="prazo" className="block text-marrom-escuro mb-2 text-sm font-medium">
                  Prazo Desejado
                </label>
                <select
                  id="prazo"
                  name="prazo"
                  value={formData.prazo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio appearance-none"
                >
                  {prazos.map((prazo) => (
                    <option key={prazo.valor} value={prazo.valor}>
                      {prazo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="orcamento" className="block text-marrom-escuro mb-2 text-sm font-medium">
                  Orçamento Estimado
                </label>
                <select
                  id="orcamento"
                  name="orcamento"
                  value={formData.orcamento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 border-marrom-claro/30 hover:border-marrom-medio appearance-none"
                >
                  {orcamentos.map((orcamento) => (
                    <option key={orcamento.valor} value={orcamento.valor}>
                      {orcamento.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8">
              <motion.button
                type="button"
                onClick={voltarEtapa}
                className="border border-marrom-escuro text-marrom-escuro px-6 py-3 rounded-md hover:bg-marrom-escuro hover:text-bege-claro transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Voltar</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={avancarEtapa}
                className="bg-marrom-escuro text-bege-claro px-8 py-3 rounded-md hover:bg-marrom-medio transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-marrom-escuro mb-4">Detalhes Adicionais</h3>

            <div>
              <label htmlFor="descricao" className="block text-marrom-escuro mb-2 text-sm font-medium">
                Descreva seu Projeto <span className="text-marrom-medio">*</span>
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 bg-bege-claro border transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marrom-medio/50 resize-none border-marrom-claro/30 hover:border-marrom-medio"
                placeholder="Descreva seu projeto, objetivos, funcionalidades desejadas, referências e qualquer outra informação relevante..."
              ></textarea>
            </div>

            <div className="bg-marrom-claro/10 p-4 rounded-md">
              <h4 className="font-medium text-marrom-escuro mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-marrom-medio" />
                <span>Próximos Passos</span>
              </h4>
              <p className="text-marrom-escuro/80 text-sm">
                Após o envio do formulário, nossa equipe analisará as informações e entrará em contato em até 48 horas
                para agendar uma reunião de briefing e discutir os detalhes do seu projeto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8">
              <motion.button
                type="button"
                onClick={voltarEtapa}
                className="border border-marrom-escuro text-marrom-escuro px-6 py-3 rounded-md hover:bg-marrom-escuro hover:text-bege-claro transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Voltar</span>
              </motion.button>

              <motion.button
                type="submit"
                disabled={enviando || !formData.descricao}
                className="bg-marrom-escuro text-bege-claro px-6 sm:px-8 py-3 rounded-md hover:bg-marrom-medio transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 hover:scale-105 w-full sm:w-auto sm:min-w-[220px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {enviando ? (
                  "Enviando..."
                ) : (
                  <>
                    <span>Dar o Primeiro Passo</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Indicador de progresso
  const renderProgressBar = () => {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                step <= etapaAtual ? "bg-marrom-escuro text-bege-claro" : "bg-marrom-claro/30 text-marrom-escuro"
              }`}
            >
              {step}
              <div className="absolute -bottom-6 whitespace-nowrap text-xs font-medium text-marrom-escuro">
                {isMobile
                  ? // Versão mais curta para mobile
                    step === 1
                    ? "Info"
                    : step === 2
                      ? "Projeto"
                      : "Detalhes"
                  : // Versão completa para desktop
                    step === 1
                    ? "Contato"
                    : step === 2
                      ? "Projeto"
                      : "Detalhes"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-marrom-claro/20 rounded-full mt-6">
          <div
            className="absolute top-0 left-0 h-full bg-marrom-medio rounded-full transition-all duration-500"
            style={{ width: `${((etapaAtual - 1) / (totalEtapas - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto bg-bege-medio/30 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="p-4 sm:p-8 md:p-12">
        {renderProgressBar()}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {renderEtapa()}

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
  )
}
