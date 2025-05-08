import type { Metadata } from "next"
import NavigationMenu from "@/components/navigation-menu"
import Rodape from "@/components/rodape"
import FormularioServico from "@/components/formulario-servico"
import SmoothScroll from "@/components/ui/smooth-scroll"
import ParticleBackground from "@/components/ui/particle-background"

export const metadata: Metadata = {
  title: "Solicitar Serviço | CMJ CodeHaven Studio",
  description:
    "Entre em contato conosco para iniciar seu projeto. Transformamos suas ideias em experiências digitais excepcionais.",
}

export default function PaginaContatoServico() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-bege-claro">
        <NavigationMenu />

        <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 relative">
          <div className="absolute inset-0 z-0">
            <ParticleBackground density={15} color="#303030" className="opacity-10" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-light text-marrom-escuro mb-4 tracking-tighter">
                Vamos <span className="text-marrom-medio">Iniciar</span> Seu Projeto
              </h1>
              <div className="w-20 h-1 bg-marrom-medio mx-auto mb-4 md:mb-6"></div>
              <p className="text-sm sm:text-base text-marrom-escuro/80 leading-relaxed">
                Conte-nos sobre seu projeto e como podemos ajudar a transformar sua visão em realidade. Preencha o
                formulário abaixo e daremos início à jornada de criação da sua presença digital.
              </p>
            </div>

            <FormularioServico />
          </div>
        </section>

        <Rodape />
      </main>
    </SmoothScroll>
  )
}
