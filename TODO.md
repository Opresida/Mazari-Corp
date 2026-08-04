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

---

## SEO (2026-08-04)

Trabalho completo documentado em [SEO.md](./SEO.md). Lighthouse mobile: **100 SEO ·
100 Acessibilidade · 100 Práticas · 100 Agentic Browsing**, 0 auditorias reprovadas.

**Feito**
- [x] `robots.txt`, `sitemap.xml`, `site.webmanifest`, `llms.txt`
- [x] `<head>` refeito: `lang="pt-BR"`, canonical, robots, geo, title/description com keyword
- [x] JSON-LD: Organization + ProfessionalService (6 serviços) + WebSite + WebPage + FAQPage
- [x] `og-image.png` 1200×630 real (a meta tag apontava para um arquivo 404)
- [x] Splash deixou de bloquear a renderização — conteúdo no DOM em 1,5s (era 5,6s)
- [x] Code splitting de `/brandbook` e `/validar` — bundle da home 1.860 kB → 830 kB
- [x] Imagens do imgur (davam 403) trazidas para o domínio em WebP: 3,78 MB → 207 KB
- [x] `useSEO` por rota + `noindex` em `/brandbook`, `/validar` e 404
- [x] 404 refeito em pt-BR dentro da marca
- [x] Contraste WCAG AA corrigido em `TrustedBrands`
- [x] E-mail unificado e link de WhatsApp deixou de ser link morto (`src/lib/contact.ts`)

**Feito (rodada 2 — dados legais + analytics)**
- [x] WhatsApp `+55 16 98216-6580` ligado (`src/lib/contact.ts`)
- [x] GA4 `G-TQLF820EBM` com Consent Mode v2 — 0 cookies antes do aceite (LGPD)
- [x] Banner de consentimento com "Recusar" de mesmo peso que "Aceitar"
- [x] `/privacidade` e `/termos` com razão social, CNPJ e endereço reais da Receita
- [x] JSON-LD com `legalName`, `taxID`, `telephone` e endereço completo
- [x] Rodapé com `<address>` (NAP completo) e coluna Legal com links reais
- [x] Eventos de conversão: `contact_form_submit` e `whatsapp_click`

**Feito (rodada 3 — dado de entidade centralizado)**
- [x] Razão social/CNPJ/endereço agora existem em UM arquivo (`src/lib/contact.ts`)
- [x] JSON-LD gerado em build a partir dele (plugin `mazariSeoInject` no vite.config.ts)
- [x] Build QUEBRA se o marcador de JSON-LD sumir do index.html (testado)
- [x] Campo sem registro público não é declarado no schema (`TRADE_NAME`/`sameAs` vazios) (testado)

**Pendente**
- [ ] 🟡 **Atualização de CNPJ em andamento** — quando sair, editar só o bloco "Entidade legal"
      de `src/lib/contact.ts`: `LEGAL_NAME`, `TRADE_NAME` (= "Mazari Corp"), `CNPJ`, `ADDRESS`,
      `ENTITY_VERIFIED_AT`. Rodapé, /privacidade, /termos e JSON-LD acompanham sozinhos.
- [ ] ⏸️ **Formulário de contato não envia nada** — `Contact.tsx` só mostra toast e limpa o
      form. Humberto ciente; ajuste em breve.
- [ ] Perfis sociais para o `sameAs` do schema (LinkedIn/Instagram/GitHub)
- [ ] Google Business Profile (endereço já está pronto)
- [ ] Revisão de advogado nas páginas jurídicas
- [ ] Alinhar "10+ anos" do copy com o CNPJ de 2022 (por isso `foundingDate` ficou fora do schema)
- [ ] CNAE 73.19-0/02 "Promoção de vendas" não cobre desenvolvimento de software — ver contabilidade

**Pendente — estratégico**
- [ ] Quebrar a single-page em páginas por serviço (`/blockchain`, `/pentest`, `/cases/*`).
      Uma página só ranqueia para um tema. Detalhes em SEO.md §5.
