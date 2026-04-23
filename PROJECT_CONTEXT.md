# PROJECT_CONTEXT — MAZARI CORP

Contexto do negócio e relação deste projeto com o ecossistema Mazari. Leia pra entender motivações por trás das decisões de copy e escopo.

---

## O que é a Mazari Corp

Operação de engenharia digital com foco em **infraestrutura crítica** pra empresas globais. Atua em 3 frentes:

1. **Engenharia de software** — plataformas web, apps mobile, sistemas corporativos, automação
2. **Blockchain & Web3** — smart contracts (Solidity), tokenização, DeFi, consultoria Web3
3. **Inteligência Artificial** — chatbots, análise preditiva, NLP, automação cognitiva

Opera em 5 continentes com clientes institucionais: institutos de pesquisa, fintechs, startups Web3, holdings internacionais, plataformas DeFi.

---

## Este projeto: o Site Institucional

É o **front institucional público** da Mazari. Não é produto, é canal de aquisição e autoridade:
- Provar capacidade técnica (tom "look, não só falamos — escrevemos código em produção há 10 anos")
- Apresentar cases reais com números
- Capturar leads qualificados via Contact
- Servir de link canônico quando a Mazari menciona pra clientes/parceiros

---

## Cases apresentados no site

Todos projetos REAIS entregues pela Mazari:

| Case | Natureza | Stack principal |
|---|---|---|
| **IDASAM** | Plataforma digital completa pra instituto ambiental (CRM, documentos, assinatura digital) | React + Node + Drizzle + PostgreSQL |
| **i2TA** | Site institucional + CMS + admin pra instituto de inteligência tecnológica | Next.js + pnpm monorepo + Express |
| **Protocolo Zeus** | Protocolo DeFi de flash loans e arbitragem automática em Solana (mainnet) | Rust + Anchor + Jupiter SDK + Solend |
| **GLOMAM** | Site institucional de alta capacidade com 99.99% uptime, 120k req/s, 4 edge locations | Next.js + Vercel Edge + CDN multi-region |

Cada case no site mostra: número decorativo, tag, desafio, resultado, stack, e uma visualização técnica única (dashboard, lighthouse scores, blockchain explorer, edge network stats).

---

## Jurisdições na seção Consulting

Mazari oferece estruturação offshore em 6 destinos:
- Bahamas (holding offshore 0% tax)
- Dubai (hub tech free zone)
- Malta (UE Web3-regulated)
- Marrocos (ponte Europa-África)
- Paraguai (abertura rápida, 10% tax)
- Paraguai Cidadania (passaporte Mercosul)

Cada um mostrado com setup time + taxa. CTA: "Criar Minha Offshore".

---

## Relação com outros projetos Mazari

A Mazari opera 3 sites/produtos separados que compartilham padrões:

| Projeto | Pasta | Natureza |
|---|---|---|
| **MAZARI CORP** | `/c/Users/user/mazari-corp` | Site institucional (este) |
| **MAZARI AGÊNCIA** | `/c/Users/user/mazari-agencia` | Operação como agência (opensquad + clientes isolados) |
| **Clientes individuais** | `/c/Users/user/mazari-agencia/clientes/<slug>` | Entregas pra clientes (isolados) |

A CORP é a marca-mãe visível ao mercado. A AGÊNCIA é a operação interna.

---

## Público-alvo do site

1. **Decisor técnico senior** (CTO, Head of Eng) — quer ver stack, cases reais, prova de escala
2. **Executivo C-level** — quer ver uptime, credibilidade, 5 continentes, sigilo
3. **Parceiro institucional** — quer ver como firmar parceria, jurisdições, compliance
4. **Investidor/board** — quer entender o diferencial da operação

A copy e o visual são **premium** porque o ticket é alto. Não é SaaS self-service, é consultoria-engenharia com deal de 6-7 dígitos.

---

## Restrições explícitas do cliente

- **Não mencionar o fundador** pelo nome em lugar nenhum do site. Sempre "liderança sênior", "arquitetos" etc. (ver feedback registrado)
- **Dark mode only**, neon lime como único accent
- **Footer intocável** (FlickeringFooter com selos SOC2/HIPAA/GDPR) — decisão da marca
- **Copy manual original é sagrada** — palavras-chave como "arquitetos de infraestrutura digital", "vantagem competitiva permanente" não podem ser removidas

---

## Métricas de sucesso

- Bundle < 200KB gzip
- Lighthouse desktop ≥ 95 em todas as 4 categorias
- Mobile 360×740 100% funcional
- Zero scroll horizontal em qualquer viewport
- TTFB < 100ms (Vercel edge)

---

## Deploy e hospedagem

- **Repositório**: `github.com/Opresida/Mazari-Corp` (branch `master`)
- **Hospedagem**: Replit (auto-deploy no push)
- **Monorepo**: pnpm workspaces (site em `artifacts/mazari-corp`)

---

## Próximos produtos no ecossistema (roadmap da marca)

Registrado aqui pra contexto, **não está no escopo deste projeto**:
- Brandbook institucional Mazari (`/brandbook`) — próxima etapa aprovada
- Página de cada case (`/cases/idasam`, `/cases/zeus` etc)
- Blog/changelog da Mazari
- Área de carreiras (`/juntar-se`)
