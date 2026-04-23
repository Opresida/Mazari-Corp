# MAZARI CORP — Site Institucional

Site institucional da MAZARI CORP, operação de engenharia digital, blockchain e inteligência artificial. Identidade visual futurista dark + neon lime (`#D2FF28`) inspirada em premium tech sites (TensorStax / Linear / Vercel).

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | **React 19** + **TypeScript 5** |
| Build | **Vite 7** |
| Estilização | **Tailwind CSS 4** com `@theme inline` (design tokens HSL) |
| Animação | **Framer Motion 12** |
| Smooth Scroll | **Lenis 1.3** (global, via hook customizado) |
| Texto | **Plus Jakarta Sans** (principal) + **JetBrains Mono** (UI técnica) |
| Split Text | `split-type` + Framer Motion stagger |
| Roteamento | **Wouter 3** |
| UI primitives | shadcn/ui + Radix |
| Monorepo | pnpm workspaces |

---

## Rodar localmente

```bash
# Na raiz do monorepo
pnpm install

# No diretório do site
cd artifacts/mazari-corp
pnpm dev
```

> Servidor em `http://localhost:5000`

### Binários Windows

O Replit remove binários Windows quando publica. Se for rodar no Windows, reinstale:

```bash
pnpm add -Dw @rollup/rollup-win32-x64-msvc lightningcss-win32-x64-msvc @tailwindcss/oxide-win32-x64-msvc
```

---

## Arquitetura do Site

Homepage single-page com 10 seções sequenciais, separadas por `GradientSplitter`. Cada seção tem identidade visual distinta mas compartilha o brandbook (tokens CSS, componentes UI).

| # | Seção | Efeito de destaque |
|---|---|---|
| 00 | **Hero** | `NetworkGrid3D` (grade 3D em perspectiva + nós pulsantes) + info-boxes inferiores |
| 01 | **TrustedBrands** | Marquee infinito de logos tech (React, Next.js, TypeScript, Solidity, Python, AWS…) |
| 02 | **About** | Nav numerado 1-2-3 + 3 pipelines sticky com screens técnicos (dashboard, mapa-múndi dot map, vault de IP) |
| 03 | **Desenvolvimento** | Headline `01.` + 2 FloatingCards com parallax (Plataformas & Apps · Sistemas & IA) |
| 04 | **StackTecnico** | `DecoratedHeading` com setas convergentes + 2 FloatingCards (Frontend/Backend · Blockchain/Web3) |
| 05 | **Blockchain** | `SolidityRain` de fundo (matrix de código) + 4 AssetCards com visualizações SVG (tokens, editor, pools DeFi, advisory) |
| 06 | **VapourStatement** | 4 frases com efeito vapor animado |
| 07 | **Process** | 4 StepCards com sub-cards (Imersão → Arquitetura → Construção → Escala) |
| 08 | **Cases** | Zigzag com números 01-04 gigantes + `CaseNameCode` (nome em mono + hover com typing de linha de código) · IDASAM, i2TA, Protocolo Zeus, GLOMAM |
| 09 | **Consulting** | `GlobeWire` (globo 3D wireframe rotacionando) + 6 jurisdições + CTA "Criar Minha Offshore" |
| 10 | **Testimonials** | 3 colunas com auto-scroll vertical em velocidades diferentes |
| 11 | **Contact** | Card "o que acontece agora" + terminal decorativo + formulário em mono |

---

## Sistema de Componentes

### Effects (canvas / SVG animados)
- `effects/NetworkGrid3D.tsx` — grade 3D em perspectiva com 30 nós pulsantes (hero)
- `effects/SolidityRain.tsx` — matrix rain de código Solidity real (blockchain)
- `effects/GlobeWire.tsx` — globo wireframe 3D com rotação em Y + hubs com lat/lon reais (consulting)

### UI primitives (reutilizáveis)
- `ui/MzButton.tsx` — botão com seta dupla animada no hover (slide-out + slide-in)
- `ui/SplitText.tsx` — texto letra-a-letra com stagger randômico on-view
- `ui/DecoratedHeading.tsx` — headline central com setas laterais que convergem no scroll
- `ui/GradientSplitter.tsx` — linha 1px com gradient lime (horizontal ou vertical)
- `ui/IntegrationsList.tsx` — lista com dots lime pulsantes + texto mono
- `ui/StepCard.tsx` — card estilo "Plan N." com sub-cards
- `ui/AssetCard.tsx` — card grande com título/caption/visual (padrão TensorStax)
- `ui/FloatingCard.tsx` — card com parallax horizontal (translate + scale) no scroll
- `ui/TechMarquee.tsx` — marquee horizontal com gap uniforme (loop perfeito)

### Helpers
- `lib/useLenis.ts` — hook de smooth scroll global (respeita `prefers-reduced-motion`)

---

## Design System

### Tokens (em `src/index.css`)
- `--color-primary` = `#D2FF28` (neon lime)
- `--color-background` = `#080908` (dark)
- `--color-card` = `#1A1B1A`
- `--font-sans` = Plus Jakarta Sans
- `--font-mono` = JetBrains Mono

### Utility classes custom
- `.mz-mono` — JetBrains Mono
- `.mz-tag` — tag lime quadrada com borda (eyebrows)
- `.mz-dot` — dot lime 6px pulsante com glow
- `.mz-splitter` / `.mz-splitter-vert` — linha gradient lime no meio
- `.mz-grid-bg` — background grid sutil
- `.mz-glow` — drop-shadow lime
- `.mz-card-soft` — card com backdrop-blur + borda lime suave
- `.text-glow` — text-shadow lime
- `.eyebrow` — tag lime clássica

---

## Responsividade

Otimizado para **360×740 (Samsung Galaxy S8+)** como baseline. Regras:
- Container padrão `px-5 sm:px-6`
- Headlines `text-[30px] sm:text-4xl md:text-6xl`
- Números decorativos gigantes reduzidos no mobile (`80px sm:140px md:240px`)
- Globe com opacity reduzida em mobile
- Menu mobile com body-lock, ESC fechar, safe-area, feedback tátil (`active:` states)
- `overflow-x-hidden` global no wrapper da Home

---

## Deploy

Hospedado no Replit. Push para `master` faz deploy automático.

---

## Docs complementares

- [CONTEXT.md](./CONTEXT.md) — regras de negócio, brandbook, padrões de código
- [ARCHITECTURE.md](./ARCHITECTURE.md) — fluxo de dados, estrutura de pastas, decisões
- [TODO.md](./TODO.md) — pendências e roadmap
- [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) — contexto do negócio Mazari + produtos
