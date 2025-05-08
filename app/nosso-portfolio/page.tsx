import type { Metadata } from "next"
import NavigationMenu from "@/components/navigation-menu"
import Rodape from "@/components/rodape"
import PortfolioCarrossel from "@/components/portfolio-carrossel"
import SmoothScroll from "@/components/ui/smooth-scroll"

export const metadata: Metadata = {
  title: "Nosso Portfólio | CMJ CodeHaven Studio",
  description: "Conheça nossos projetos e trabalhos realizados. Desenvolvimento web profissional e de alta qualidade.",
}

export default function PaginaPortfolio() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-bege-claro">
        <NavigationMenu />

        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-3xl md:text-5xl font-light text-marrom-escuro mb-4 tracking-tighter">
                Nosso <span className="text-marrom-medio">Portfólio</span>
              </h1>
              <div className="w-20 h-1 bg-marrom-medio mx-auto mb-6"></div>
              <p className="text-marrom-escuro/80 leading-relaxed">
                Conheça alguns dos projetos que desenvolvemos. Cada trabalho é único e personalizado para atender às
                necessidades específicas de nossos clientes.
              </p>
            </div>

            <PortfolioCarrossel />
          </div>
        </section>

        <Rodape />
      </main>
    </SmoothScroll>
  )
}
