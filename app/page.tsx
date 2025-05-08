import type { Metadata } from "next"
import NavigationMenu from "@/components/navigation-menu"
import Rodape from "@/components/rodape"
import SecaoHero from "@/components/secao-hero"
import SecaoSobre from "@/components/secao-sobre"
import SecaoServicos from "@/components/secao-servicos"
import SecaoContato from "@/components/secao-contato"
import SecaoClientes from "@/components/secao-clientes"
import SmoothScroll from "@/components/ui/smooth-scroll"
import MarqueeText from "@/components/ui/marquee-text"
import BannerPortfolio from "@/components/banner-portfolio"

export const metadata: Metadata = {
  title: "CMJ CodeHaven Studio | Desenvolvimento Web Profissional",
  description:
    "Criamos websites modernos, responsivos e de alta performance para o seu negócio. Especialistas em desenvolvimento web personalizado.",
}

export default function PaginaInicial() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-bege-claro">
        <NavigationMenu />

        {/* Hero */}
        <SecaoHero />

        {/* texto do painel animado */}
        <div className="bg-marrom-escuro py-8 overflow-hidden">
          <MarqueeText
            text="DESENVOLVIMENTO WEB • DESIGN RESPONSIVO • E-COMMERCE • SISTEMAS WEB • SEO • PERFORMANCE • "
            className="text-bege-claro/90 text-xl font-light tracking-wider"
            speed={40}
          />
        </div>

        <SecaoSobre />
        <SecaoServicos />

        {/* texto painel animado */}
        <div className="bg-marrom-escuro py-8 overflow-hidden">
          <MarqueeText
            text="TRANSFORMANDO IDEIAS EM EXPERIÊNCIAS DIGITAIS • CRIATIVIDADE • INOVAÇÃO • TECNOLOGIA • "
            className="text-gray-400 text-xl font-light tracking-wider"
            speed={40}
            direction="right"
          />
        </div>

        {/* Banner Portfolio em vez da seção completa */}
        <BannerPortfolio />

        {/* Seção de clientes sem wrapper especial */}
        <SecaoClientes />

        <SecaoContato />
        <Rodape />
      </main>
    </SmoothScroll>
  )
}
