# CMJ CodeHaven Studio

Site institucional da CMJ CodeHaven Studio, desenvolvido com Next.js, Tailwind CSS e Framer Motion.

## Configuração

1. Clone o repositório
2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`
3. Crie um arquivo `.env.local` baseado no `.env.example` e adicione suas credenciais:
   \`\`\`
   EMAIL_USER=cmjcodehaven@gmail.com
   EMAIL_PASS=your_app_password_here
   \`\`\`
   
   > **Nota**: Para o Gmail, você precisa gerar uma senha de aplicativo em vez de usar sua senha normal.
   > Veja como: https://support.google.com/accounts/answer/185833

4. Execute o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`

## Deploy na Vercel

Para fazer o deploy na Vercel:

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente (EMAIL_USER e EMAIL_PASS)
4. Faça o deploy

## Estrutura do Projeto

- `app/`: Rotas e páginas da aplicação
- `components/`: Componentes reutilizáveis
- `public/`: Arquivos estáticos (imagens, etc.)

## Manutenção

### Alterando Imagens

- Logo: `/public/images/cmj-logo-new.png`
- Portfólio: `/public/images/portfolio-*.png`
- Clientes (fotos de perfil): `/public/images/cliente-profile-*.jpg`

### Alterando Textos

Os textos estão localizados nos componentes dentro da pasta `components/`.

### Formulário de Contato

O formulário de contato envia emails para o endereço configurado no arquivo `.env.local`.
