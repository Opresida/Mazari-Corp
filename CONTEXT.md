# CONTEXT — MAZARI CORP

Regras, brandbook, convenções de código e padrões da identidade visual. Leia antes de modificar.

---

## Identidade e Tom

### Quem é a Mazari
Operação de tecnologia que entrega engenharia de software, blockchain e inteligência artificial. **Não é agência** — a copy em todo site reforça "arquitetos de infraestrutura digital". Clientes típicos: holdings internacionais, startups Web3, institutos de pesquisa, fintechs, plataformas DeFi.

### Tom de voz
- **Premium**, não "corporativo". Evitar "soluções eficientes", "sinergia", clichês.
- **Direto**, não hype. Números concretos (10+ anos, 30+ tokens, 5 continentes) em vez de promessas vagas.
- **Técnico com elegância**. Usar termos técnicos reais (`flash loan`, `TVL`, `Core Web Vitals`, `edge location`) — o público-alvo entende. Mas sempre com contexto visual que ajuda o leigo.
- **Operação em modo silencioso**. "Operamos nos bastidores", "sigilo absoluto" — postura de fornecedor senior, não startup barulhenta.
- **Nunca mencionar o fundador pelo nome** (regra do cliente — ver `feedback_mazari_corp_no_founder_name`).

### Copy imutável
Algumas frases são institucionais e não devem mudar sem acordo:
- **About**: "Não Somos Uma Agência. Somos Arquitetos de Infraestrutura Digital."
- **Hero**: "Construímos a Tecnologia que Move Negócios Globais."
- **Desenvolvimento**: "Do Conceito ao Código. Do Código ao Mercado."
- **Blockchain**: "Tokenização, Smart Contracts e a Nova Economia Digital."
- **Process**: "Metodologia que Elimina Achismo e Entrega Resultado."
- **Cases**: "Projetos que Provam o que Prometemos."
- **Contact**: "Sua Próxima Vantagem Competitiva Começa com Uma Conversa."

---

## Brandbook

### Paleta
| Token | Hex | HSL | Uso |
|---|---|---|---|
| Primary (Neon Lime) | `#D2FF28` | `72 100% 58%` | CTAs, acentos, hubs, destaque técnico |
| Background | `#080908` | `120 6% 3%` | Fundo permanente (sem light mode) |
| Card | `#1A1B1A` | `120 2% 10%` | Cards e overlays |
| Muted FG | `#A1A1A1` | `0 0% 63%` | Texto secundário |
| Border | — | `120 2% 18%` | Bordas sutis |

**Regra de ouro:** só uma cor de acento (neon lime). Não introduzir azul, roxo, laranja. Sempre dark.

### Tipografia
- **Plus Jakarta Sans** (400/500/600/700/800) — headlines, body, títulos de card
- **JetBrains Mono** (300-700) — eyebrows, tags `01.`, labels técnicos, CTAs (`MzButton`), logos em texto, terminals, hashes, bullets de `IntegrationsList`

Contraste tipográfico dual (sans elegante + mono técnica) é parte do DNA visual.

### Padrões visuais recorrentes
- **Headline accent serif**: parte da frase em `text-primary italic font-serif font-medium text-glow`
- **Números decorativos gigantes**: seção com `01` / `02` etc em opacity `7%` no fundo
- **Dots lime pulsantes** (`.mz-dot`): em listas, status, indicadores
- **Scan lines**: borders ou gradient movement em cards no hover
- **Backdrop-blur**: cards `mz-card-soft` com blur 10px + borda lime suave
- **Splitters gradient**: linha 1px lime entre seções (`GradientSplitter`)

---

## Padrões de Código

### Imports
- Alias `@/` aponta pra `src/`
- Imports de tipo com `import type`
- Lucide icons via `import { Icon } from 'lucide-react'`

### Componentes
- Funcionais + TypeScript + interfaces locais
- Props bem tipadas (sem `any`)
- Arquivos por responsabilidade:
  - `components/sections/*` — seções full-width da home
  - `components/ui/*` — primitives reutilizáveis
  - `components/effects/*` — canvas / SVG animados pesados
  - `components/layout/*` — Header, Footer
  - `lib/*` — hooks e utilities

### Animações
- Framer Motion em 99% dos casos
- `whileInView` + `viewport={{ once: true, margin: '-10%' }}` como padrão
- Stagger com `i * 0.05` a `i * 0.1`
- Respeitar `useReducedMotion` quando for animação pesada (canvas)
- Canvas effects: `cancelAnimationFrame` no cleanup obrigatório

### Responsividade
- **Baseline: 360×740 (Galaxy S8+)**
- Padding horizontal: `px-5 sm:px-6`
- Headlines: `text-[30px] sm:text-4xl md:text-6xl` (ou `text-[32px] sm:text-5xl md:text-[72px]` no hero)
- Números gigantes decorativos: sempre com `text-[70px] sm:text-[140px] md:text-[220px]` (escalar pra mobile)
- Grids `md:grid-cols-2` ou `lg:grid-cols-4` colapsam automaticamente
- Sticky elements: `md:sticky md:top-X` — nunca sticky em mobile
- `overflow-x-hidden` no wrapper da Home
- Botões `MzButton`: `className="w-full"` em mobile
- Menu mobile: `body overflow hidden` quando aberto, safe-area via `env(safe-area-inset-*)`

### CSS custom (em `index.css`)
Toda utility futurista tem prefixo `.mz-*` pra evitar colisão com Tailwind. Ver README para a lista completa.

---

## Decisões Arquiteturais

### Por que Tailwind 4 com `@theme inline`?
- Design tokens declarativos, sem `tailwind.config.js`
- HSL nativo permite opacity via Tailwind (`bg-primary/10`)

### Por que Lenis?
- Scroll suave é parte da identidade premium
- Efeitos de parallax (FloatingCard, DecoratedHeading) ficam muito mais fluidos
- Fallback automático pra `prefers-reduced-motion`

### Por que dois pesos de fonte (Jakarta + Mono)?
- O contraste é a identidade. Remover a mono descaracteriza o visual.

### Por que canvas em vez de Three.js?
- Peso: Three.js seria 500KB+ pra o que canvas 2D faz em 10KB
- Os "3D" do site (Grid, Globe) são pseudo-3D com projeção manual — suficientes e performáticos

### Por que usar `FloatingCard` com parallax em vez de `sticky`?
- Parallax funciona melhor em mobile (sticky quebra em viewport pequeno)
- Efeito visual mais rico sem custo de viewport

### Por que `overflow-x-hidden` global?
- Números decorativos gigantes (`01`, `02` etc) e canvas full-width podem vazar em viewports estreitos
- Evita scroll horizontal involuntário

---

## Regras para a IA

- **Nunca** mencionar o fundador pelo nome (cliente removeu).
- **Nunca** introduzir cor que não seja `#D2FF28` como accent.
- **Nunca** usar Lottie — preferir SVG inline + Framer Motion.
- **Sempre** testar mobile em 360×740 antes de commitar uma seção nova.
- **Sempre** usar os componentes UI existentes (`MzButton`, `SplitText`, `IntegrationsList`…) antes de criar novo.
- **Nunca** commitar `node_modules/` ou `.env` (já no `.gitignore`).
- **Ao tocar no Header**: preservar o body-lock e safe-area do menu mobile.
- **Ao criar uma visualização dentro de `FloatingCard`**: não envolver em `mz-card-soft` (o FloatingCard já faz isso).
- **Manual intocado é princípio**: features aditivas não quebram fluxo existente.
