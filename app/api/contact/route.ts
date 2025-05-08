import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    // Pega os dados do formulário
    const body = await request.json()
    const { nome, email, telefone, empresa, tipoProjeto, prazo, orcamento, descricao, mensagem } = body

    // Configura o transporte de email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "cmjcodehaven@gmail.com",
        pass: process.env.EMAIL_PASS, // Senha de app gerada no Google
      },
    })

    // Mapeia o tipo de projeto para um nome mais amigável
    const tipoProjetoNome =
      {
        site: "Sites",
        ecommerce: "E-commerce",
        aplicacao: "Aplicação Web",
        redesign: "Redesign de Site",
        outros: "Outros",
      }[tipoProjeto] || "Não especificado"

    // Mapeia o prazo para um nome mais amigável
    const prazoNome =
      {
        urgente: "Urgente (até 1 mês)",
        medio: "Médio prazo (1-3 meses)",
        longo: "Longo prazo (3+ meses)",
        flexivel: "Flexível",
      }[prazo] || "Não especificado"

    // Mapeia o orçamento para um nome mais amigável
    const orcamentoNome =
      {
        ate5k: "Até R$ 5.000",
        "5k-10k": "R$ 5.000 - R$ 10.000",
        "10k-20k": "R$ 10.000 - R$ 20.000",
        "20k+": "Acima de R$ 20.000",
        definir: "A definir",
      }[orcamento] || "Não especificado"

    // Determina se é um formulário de contato simples ou detalhado
    const isFormularioDetalhado = tipoProjeto && prazo && orcamento && descricao

    // Configura o email
    const mailOptions = {
      from: process.env.EMAIL_USER || "cmjcodehaven@gmail.com",
      to: "cmjcodehaven@gmail.com",
      subject: isFormularioDetalhado
        ? `Novo projeto - ${nome} - ${tipoProjetoNome}`
        : `Novo contato do site - ${nome} - ${tipoProjetoNome}`,
      html: isFormularioDetalhado
        ? `
          <h1 style="color: #303030; border-bottom: 2px solid #808080; padding-bottom: 10px;">
            Novo projeto de <span style="color: #808080; font-weight: bold;">${nome}</span>
          </h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
          <p><strong>Empresa:</strong> ${empresa || "Não informado"}</p>
          <p><strong>Tipo de Projeto:</strong> ${tipoProjetoNome}</p>
          <p><strong>Prazo Desejado:</strong> ${prazoNome}</p>
          <p><strong>Orçamento Estimado:</strong> ${orcamentoNome}</p>
          <h2 style="color: #303030; margin-top: 20px;">Descrição do Projeto:</h2>
          <p style="background-color: #f7f7f7; padding: 15px; border-left: 4px solid #808080;">${descricao}</p>
        `
        : `
          <h1 style="color: #303030; border-bottom: 2px solid #808080; padding-bottom: 10px;">
            Novo contato de <span style="color: #808080; font-weight: bold;">${nome}</span>
          </h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
          <p><strong>Tipo de Projeto:</strong> ${tipoProjetoNome}</p>
          <h2 style="color: #303030; margin-top: 20px;">Mensagem:</h2>
          <p style="background-color: #f7f7f7; padding: 15px; border-left: 4px solid #808080;">${mensagem}</p>
        `,
    }

    // Envia o email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso!" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return NextResponse.json(
      { success: false, message: "Erro ao enviar mensagem", error: String(error) },
      { status: 500 },
    )
  }
}
