import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Rodape() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="bg-marrom-escuro text-bege-claro">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-16 w-40">
                <Image src="/images/cmj-logo-new.png" alt="Logo CMJ CodeHaven Studio" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-bege-claro/80 mb-6 leading-relaxed">
              Transformamos ideias em experiências digitais excepcionais. Especialistas em desenvolvimento web de alta
              qualidade.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-bege-claro hover:text-marrom-claro transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#inicio" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Sites Institucionais
                </Link>
              </li>
              <li>
                <Link href="#" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Sistemas Web
                </Link>
              </li>
              <li>
                <Link href="#" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  SEO & Performance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  Manutenção & Suporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-marrom-claro">Email:</span>
                <a
                  href="mailto:contato@cmjcodehaven.com.br"
                  className="text-bege-claro/80 hover:text-bege-claro transition-colors"
                >
                  contato@cmjcodehaven.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-marrom-claro">Telefone:</span>
                <a href="tel:+551199998888" className="text-bege-claro/80 hover:text-bege-claro transition-colors">
                  +55 (11) 9999-8888
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-marrom-claro">Endereço:</span>
                <span className="text-bege-claro/80">Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-marrom-claro/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-bege-claro/60 text-sm">
              &copy; {anoAtual} CMJ CodeHaven Studio. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-bege-claro/60 hover:text-bege-claro text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-bege-claro/60 hover:text-bege-claro text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
