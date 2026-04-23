# ARCHITECTURE — MAZARI CORP

Mapa de código, fluxo de dados e decisões técnicas.

---

## Visão geral

```
pnpm workspace (monorepo)
├── artifacts/
│   ├── mazari-corp/        ← site institucional (este projeto)
│   ├── api-server/         ← backend (reservado, não ativo)
│   └── mockup-sandbox/     ← sandbox de protótipos
├── lib/                    ← utilitários compartilhados
└── scripts/
```

Site é SPA React, servido via Vite dev em porta 5000, deploy via Replit.

---

## Estrutura de pastas (`artifacts/mazari-corp/src/`)

```
src/
├── App.tsx                       ← wraps QueryClient + LoadingScreen + Router
├── main.tsx                      ← bootstrap React
├── index.css                     ← Tailwind 4 + @theme + utilities .mz-*
│
├── assets/
│   └── logos/
│       ├── cases/                ← logos reais dos clientes (idasam, i2ta, glomam)
│       └── tech/                 ← logos simpleicons.org (react, nextdotjs, ts…)
│
├── components/
│   ├── Header.tsx                ← nav fixa + menu mobile com body-lock
│   ├── LoadingScreen.tsx         ← boot sequence loader (5s)
│   ├── EnergyCanvas.tsx          ← DEPRECATED (esfera+raios — mantido pra referência)
│   ├── Decorative.tsx            ← sparkles, radial glows
│   │
│   ├── effects/                  ← canvas / SVG animados pesados
│   │   ├── NetworkGrid3D.tsx     ← grade 3D em perspectiva (hero)
│   │   ├── SolidityRain.tsx      ← matrix rain de Solidity (blockchain)
│   │   └── GlobeWire.tsx         ← globo 3D wireframe (consulting)
│   │
│   ├── layout/
│   │   └── Footer.tsx            ← wrapper do FlickeringFooter
│   │
│   ├── sections/                 ← seções full-width da home
│   │   ├── Hero.tsx
│   │   ├── TrustedBrands.tsx
│   │   ├── About.tsx             ← 3 pipelines sticky + nav numerado
│   │   ├── Desenvolvimento.tsx
│   │   ├── StackTecnico.tsx
│   │   ├── Blockchain.tsx        ← SolidityRain bg + 4 AssetCards
│   │   ├── VapourStatement.tsx
│   │   ├── Process.tsx           ← 4 StepCards
│   │   ├── Cases.tsx             ← zigzag + CaseNameCode com hover typing
│   │   ├── Consulting.tsx        ← GlobeWire bg + 6 jurisdições
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/                       ← primitives reutilizáveis
│   │   ├── MzButton.tsx          ← botão com seta dupla animada
│   │   ├── SplitText.tsx         ← texto letra-a-letra on-view
│   │   ├── DecoratedHeading.tsx  ← heading com setas laterais
│   │   ├── GradientSplitter.tsx
│   │   ├── IntegrationsList.tsx  ← lista com dots lime
│   │   ├── StepCard.tsx          ← card estilo "Plan N."
│   │   ├── AssetCard.tsx         ← card grande com visual na base
│   │   ├── FloatingCard.tsx      ← card com parallax horizontal
│   │   ├── TechMarquee.tsx       ← marquee infinito com gap uniforme
│   │   └── [...shadcn primitives: button, input, toaster, tooltip...]
│   │
├── lib/
│   ├── useLenis.ts               ← hook de smooth scroll global
│   └── queryClient.ts
│
├── pages/
│   ├── Home.tsx                  ← compõe todas as seções com splitters
│   └── not-found.tsx
│
├── hooks/                        ← hooks do sistema (toast, etc)
└── contexts/                     ← react contexts (se houver)
```

---

## Fluxo de dados

```
main.tsx
  └─► App.tsx
        ├─► QueryClientProvider (TanStack Query)
        ├─► TooltipProvider (Radix)
        ├─► useLenis() — monta smooth scroll global
        ├─► LoadingScreen (5s primeira carga)
        └─► WouterRouter
              └─► Home.tsx
                    ├─► Header (fixed, scroll progress bar)
                    └─► Sequência de <Section />
                          com <GradientSplitter /> entre elas
```

Cada `<Section />` é autocontida — importa seus próprios dados/arrays locais. **Não há estado global** (o site é 100% estático em termos de dados).

---

## Effects — como funcionam

### `NetworkGrid3D` (Hero)
- Canvas 2D puro
- 30 nós em coordenadas `x ∈ [-1.2, 1.2]`, `z ∈ [0, 1]`
- Projeção manual: ponto de fuga + escala por `z`
- Nós pulsam por sin(t * speed + phase)
- Câmera recua sutilmente com `window.scrollY`
- `cancelAnimationFrame` no cleanup

### `SolidityRain` (Blockchain)
- Matrix rain com ~15 colunas (calculado por viewport)
- Cada coluna tem offset Y, velocidade, índice de linha atuais
- "Cauda" de 14 linhas com alpha decrescente
- Linhas de código reais (ERC20 completo, `transfer`, `mint`, `approve`)

### `GlobeWire` (Consulting)
- Canvas 2D com projeção esférica real
- Rotação em Y: ~10°/s
- Hubs com lat/lon reais (Bahamas, Paraguai, Marrocos, Malta, Dubai)
- Hub fica invisível quando no hemisfério oposto (`z < 0`)
- Halo + shade interno pra volume

---

## Padrões de seção (pattern reconhecível)

Toda seção segue esta estrutura:

```jsx
<section id="..." className="relative py-28 md:py-32 overflow-hidden">
  {/* 1. Background opcional (canvas, grid, glow) */}
  <div className="absolute inset-0 ..." />

  <div className="relative max-w-7xl mx-auto px-5 sm:px-6 z-10">
    {/* 2. Header */}
    <DecoratedHeading
      tag="0N. Nome da Seção"
      text="Headline Principal"
      accent="Parte em lime serif."
      subhead="Descrição."
    />

    {/* 3. Conteúdo: grid de cards / FloatingCard / StepCard / custom */}

    {/* 4. CTA final (opcional) */}
    <MzButton variant="primary">Ação Principal</MzButton>
  </div>
</section>
```

---

## Decisões técnicas principais

### Scroll smooth via Lenis
Montado em `App.tsx` via `useLenis()`. Respeita `prefers-reduced-motion` automaticamente. Todo `scrollIntoView({ behavior: 'smooth' })` roda por cima do Lenis.

### Marquee sem "salto" de loop
`TechMarquee` usa `padding-right` em cada item (não `gap`) pra garantir espaçamento idêntico entre o último item do primeiro grupo e o primeiro do segundo grupo. Sem isso, loop `-50%` tem "fantasma" visível.

### FloatingCard com parallax
Usa `useScroll + useTransform` do Framer Motion. Offset de `-6% → +6%` em translateX + scale `0.96 → 1.03 → 0.96`. Performance: apenas transform (GPU).

### Quebra automática de tabelas (herdado de outros projetos — não aplicável aqui)
Neste projeto não há PDFs; herança do sistema IDASAM. Ignorar.

### Header com scroll progress
`useScroll() + useSpring()` aplicado a `scaleX` em barra de 2px na base do header. Dá feedback visual do quanto falta pra acabar a página.

### Menu mobile
- `body.style.overflow = 'hidden'` quando aberto
- ESC fecha
- Safe-area via `env(safe-area-inset-*)`
- Layout 3 camadas (top bar / lista scrollável / footer CTA sticky)
- Feedback tátil: `active:` states (não `hover:`) pra responsividade em touch

---

## Dependências principais

```json
{
  "react": "^19",
  "vite": "^7",
  "tailwindcss": "^4",
  "framer-motion": "^12",
  "lenis": "^1.3",
  "split-type": "^0.3",
  "wouter": "^3",
  "@tanstack/react-query": "^5",
  "lucide-react": "latest",
  "qrcode.react": "^3"
}
```

---

## Performance

- Bundle gzip: ~150KB (target < 200KB)
- Lighthouse desktop: target ≥ 95
- Canvas effects com throttle + cleanup: zero leaks
- Imagens: SVG inline ou logos externos pequenos (sem raster pesado)
- Fontes: Google Fonts com `display=swap`

---

## Deploy

- Repositório: `github.com/Opresida/Mazari-Corp` (branch `master`)
- Replit: deploy automático no push
- Workspace: `artifacts/mazari-corp`
