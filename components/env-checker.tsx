"use client"

import { useEffect, useState } from "react"

export default function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkEnvVars() {
      try {
        const response = await fetch("/api/check-env")
        const data = await response.json()
        setEnvStatus(data)
      } catch (error) {
        console.error("Erro ao verificar variáveis de ambiente:", error)
      } finally {
        setLoading(false)
      }
    }

    checkEnvVars()
  }, [])

  // Componente apenas para desenvolvimento, não renderiza nada em produção
  if (process.env.NODE_ENV === "production") return null

  if (loading)
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 p-4 rounded-md z-50">
        Verificando variáveis de ambiente...
      </div>
    )

  return (
    <div className="fixed bottom-4 right-4 bg-gray-100 p-4 rounded-md shadow-lg z-50 max-w-xs">
      <h3 className="font-bold mb-2">Status das Variáveis de Ambiente:</h3>
      <ul className="space-y-1">
        {Object.entries(envStatus).map(([key, exists]) => (
          <li key={key} className={exists ? "text-green-600" : "text-red-600"}>
            {key}: {exists ? "✓" : "✗"}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-gray-500">Este componente só aparece em desenvolvimento</p>
    </div>
  )
}
