# TODO — MAZARI CORP

Lista de pendências, melhorias planejadas e histórico.

---

## 🔥 Próximo (aprovado)

- [ ] **Brandbook visual** (rota `/brandbook`) — sessão técnica com paleta, tipografia, componentes, tokens. (próxima etapa acordada)

---

## Alta prioridade

- [ ] Integrar formulário de Contact com backend real (hoje só mostra toast de sucesso)
- [ ] Substituir `href="https://wa.me/"` (menu mobile) e `mailto:contato@mazari.corp` pelos valores reais
- [ ] Abrir links "Ver estudo completo" dos Cases (hoje botão sem destino) — cada case com página própria ou modal

## Média prioridade

- [ ] `/brandbook` — como as outras squads da Mazari têm
- [ ] Scroll-spy no Header (destacar link da seção visível)
- [ ] `prefers-reduced-motion` em todos os effects (parte já tem, faltam alguns)
- [ ] Lighthouse audit completo — target ≥ 95 em todas as categorias
- [ ] Open Graph image 1200×630 customizada

## Baixa prioridade

- [ ] i18n (PT-BR → EN) pra expansão internacional
- [ ] Blog/changelog institucional integrado (CMS headless?)
- [ ] Cursor custom (lime) pra desktop
- [ ] Depoimentos reais (substituir os 9 placeholders do Testimonials)
- [ ] Removed: `EnergyCanvas.tsx` (hero antigo com esfera+raios) — está deprecated, remover quando validar que ninguém importa

---

## Bugs conhecidos

- Nenhum crítico registrado.

---

## ✅ Concluído

### 2026-04-23 — Upgrade visual futurista (referências TensorStax)

**Foundation**
- [x] Tailwind 4 + JetBrains Mono + utilities `.mz-*`
- [x] Lenis smooth scroll global via `useLenis()`

**Effects**
- [x] `NetworkGrid3D` — substitui `EnergyCanvas` no hero
- [x] `SolidityRain` — matrix rain no Blockchain
- [x] `GlobeWire` — globo 3D wireframe no Consulting

**UI primitives**
- [x] `MzButton` com seta dupla animada
- [x] `SplitText` com stagger randômico
- [x] `DecoratedHeading` com setas convergentes
- [x] `GradientSplitter`, `IntegrationsList`, `StepCard`, `AssetCard`
- [x] `FloatingCard` com parallax horizontal
- [x] `TechMarquee` com loop contínuo (fix do "salto")

**Seções reescritas**
- [x] Hero: background network grid + info-boxes + MzButtons
- [x] About: 3 pipelines sticky + nav numerado + screens técnicos (dashboard + mapa dot-map + vault)
- [x] Desenvolvimento: 2 FloatingCards (Plataformas & Apps / Sistemas & IA)
- [x] StackTecnico (seção NOVA): 2 FloatingCards (Frontend-Backend / Blockchain-Web3)
- [x] Blockchain: SolidityRain + 4 AssetCards com visualizações SVG (tokens, editor code, DeFi pools, advisory)
- [x] Process: 4 StepCards com sub-entregas por etapa
- [x] Cases: zigzag + CaseNameCode (nome mono + hover typing) — 4 cases: IDASAM, i2TA, Protocolo Zeus (DeFi Solana), GLOMAM (site alta capacidade)
- [x] Consulting: GlobeWire bg + 6 jurisdições + CTA "Criar Minha Offshore"
- [x] Contact: 2 colunas (info + terminal decorativo / formulário em mono)
- [x] Header futurista: logo mono com cursor + scroll progress bar + links numerados
- [x] LoadingScreen reescrita: boot sequence + terminal + barra de progresso

**Dot map mundial**
- [x] SVG paths geográficos substituídos por matriz dot-map 60×24 reconhecível no ScreenGlobal do About

**Copy e cleanup**
- [x] Seção Team removida da home
- [x] Todas as menções a "Humberto" removidas
- [x] VapourStatement: "Blockchain sem Compromisso" → "Blockchain Intocável" + fontSize mobile reduzido

**Responsividade**
- [x] Otimização para 360×740 (Galaxy S8+)
- [x] `overflow-x-hidden` global
- [x] Headlines escalados por breakpoint
- [x] Números decorativos gigantes reduzidos no mobile
- [x] Menu mobile completamente redesenhado:
  - Body-lock scroll
  - ESC fecha
  - Safe-area
  - Layout 3 camadas com footer CTA sticky
  - Atalhos de contato (WhatsApp + E-mail)
  - Feedback tátil `active:`
- [x] CaseNameCode responsivo ("Protocolo Zeus" cabe em 360px)

**Assets**
- [x] Logos reais (IDASAM/i2TA/Glomam) copiados dos outros projetos
- [x] Logos tech baixados do simpleicons.org CC0

---

## Decisões adiadas

- **Three.js pra 3D real** — adia ad aeternum. Canvas 2D com projeção manual é suficiente.
- **Lottie** — descartado por peso/dependência. SVG inline preferido.
- **Dark / Light mode toggle** — o site é dark-only por decisão de marca.
