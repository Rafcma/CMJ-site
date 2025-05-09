import { NextResponse } from "next/server"

export async function GET() {
  // Apenas para desenvolvimento
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Não disponível em produção" }, { status: 403 })
  }

  const envVars = {
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
  }

  return NextResponse.json(envVars)
}
