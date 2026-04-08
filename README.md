# MAZARI CORP — Site Institucional

Site institucional da MAZARI CORP, empresa de tecnologia e inteligência de negócios.

## Stack

- **React 19** + **Vite 7** + **Tailwind CSS 4**
- **Framer Motion** para animações
- **Plus Jakarta Sans** (Google Fonts)
- **pnpm** monorepo (workspaces)
- **Wouter** para roteamento

## Rodar localmente

```bash
# Na raiz do projeto
pnpm install

# No diretório do site
cd artifacts/mazari-corp
pnpm dev
```

> Abre em `http://localhost:5000`

### Binários Windows necessários

O Replit exclui binários Windows. Instale manualmente:

```bash
pnpm add -Dw @rollup/rollup-win32-x64-msvc lightningcss-win32-x64-msvc @tailwindcss/oxide-win32-x64-msvc
```

## Estrutura do Site

| Seção | Descrição |
|-------|-----------|
| Hero | Canvas com raios de energia + partículas neon lime |
| Trusted Brands | Marquee com clientes (IDASAM, i2TA, Glomam) |
| About | Manifesto — "Arquitetos de Infraestrutura Digital" |
| Desenvolvimento | Seção dedicada: Sites, Apps, Sistemas, IA |
| Blockchain | Seção dedicada: Tokenização, Smart Contracts, DeFi, Web3 |
| Vapour Statement | Frases animadas com efeito de vaporização |
| Processo | Timeline 4 etapas: Imersão → Arquitetura → Construção → Escala |
| Cases | Projetos reais: IDASAM, i2TA, Glomam |
| Consulting | Estruturação offshore (6 jurisdições) |
| Team | Fundador Humberto Mazari + badges de equipe |
| Testimonials | 9 depoimentos em 3 colunas com auto-scroll |
| Contact | Formulário com dropdown de serviço |

## Tema

- **Background:** #080908 (dark)
- **Cards:** #1A1B1A
- **Primary/Accent:** #D2FF28 (neon lime)
- **Font:** Plus Jakarta Sans (400-800)

## Deploy

Hospedado no Replit. Push para `main` faz deploy automático.
