# SEO — Mazari Corp

Documento de referência do trabalho de SEO do site `mazaricorp.com`.
Última revisão: **2026-08-04**.

---

## 1. O que estava quebrado (diagnóstico)

Auditoria do que estava no ar antes desta rodada:

| # | Problema | Impacto |
|---|---|---|
| 1 | `robots.txt` retornava **404** | Google sem instrução de crawl e sem apontador de sitemap |
| 2 | `sitemap.xml` retornava **o HTML da home** (não um XML) | Sitemap inválido — erro garantido no Search Console |
| 3 | `og:image` apontava para `/og-image.png`, que **não existia (404)** | Todo link compartilhado (WhatsApp, LinkedIn, X) saía sem imagem |
| 4 | `<html lang="en">` com conteúdo 100% em português | Sinal de idioma errado; prejudica correspondência em buscas pt-BR |
| 5 | **Sem `<link rel="canonical">`** em nenhuma página | Sem declaração de URL preferida |
| 6 | **Zero dados estruturados** (nenhum JSON-LD) | Sem elegibilidade a rich results, painel de conhecimento ou FAQ |
| 7 | Loading screen segurava a renderização por **~5,6s** | LCP reprovado; DOM vazio para crawlers durante a espera |
| 8 | `maximum-scale=1` no viewport | Bloqueia zoom — falha de acessibilidade penalizada no Lighthouse |
| 9 | `@import` de fontes dentro do CSS **e** `<link>` no HTML | Fonte baixada em duplicidade e render-blocking no bundle |
| 10 | Bundle único de **1.860 kB** (624 kB gzip) | Peso de JS derrubando INP/LCP no mobile |
| 11 | Link de WhatsApp `https://wa.me/` **sem número** | Link morto no menu mobile |
| 12 | Dois e-mails diferentes (header × rodapé) | NAP inconsistente — enfraquece sinal de entidade |
| 13 | Rodapé com "Termos" e "Política" apontando para `#` | Links mortos; sinal de site inacabado |
| 14 | Página 404 em inglês, tema claro, texto de dev | Soft 404 fora da marca |
| 15 | Copyright fixo em "© 2025" | Sinal de site desatualizado |
| 16 | **Sem nenhuma ferramenta de analytics** | Impossível medir qualquer resultado |
| 17 | **4 imagens hotlinkadas do imgur (3,78 MB)** — e o navegador tomou **403** | Imagens quebradas em produção + peso enorme fora do seu controle |
| 18 | Contraste de 3,74:1 em texto do site (mínimo WCAG AA é 4,5:1) | Falha de acessibilidade |
| 19 | Sem `llms.txt` | Sem instrução para crawlers de IA (ChatGPT, Claude, Perplexity) |

---

## 2. O que foi corrigido

### Infraestrutura de indexação
- **`public/robots.txt`** — libera o site, bloqueia `/assets/` e as rotas utilitárias,
  libera explicitamente crawlers de IA (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot,
  Google-Extended) e aponta o sitemap.
- **`public/sitemap.xml`** — XML válido com a home + extensão de imagem (`image:image`).
- **`public/site.webmanifest`** — manifest PWA com identidade e cores da marca.

### `<head>` (index.html)
- `lang="pt-BR"`
- `<link rel="canonical" href="https://mazaricorp.com/">` — declara a URL preferida
- `robots` com `max-image-preview:large` (habilita thumbnail grande no Discover/Imagens)
- `viewport` sem `maximum-scale` (zoom liberado)
- Title e description reescritos com termos de busca reais (antes: título em inglês, sem keyword)
- Open Graph e Twitter Card apontando para uma imagem **que existe**
- `geo.region` / `geo.placename` para o sinal local (Manaus/AM)

### Dados estruturados (JSON-LD)
Grafo único em `@graph` com:
- `Organization` — identidade, logo, e-mail, endereço, `knowsAbout`
- `ProfessionalService` — catálogo com os **6 serviços** (desenvolvimento, IA, blockchain,
  pentest, P&D, offshore) e `areaServed` Manaus/AM/Brasil
- `WebSite` e `WebPage` — amarrando tudo com `@id`
- `FAQPage` — 5 perguntas reais, elegível a rich result de FAQ

### Renderização e performance
- **Loading screen deixou de bloquear a página.** O conteúdo agora monta no primeiro frame
  e o splash fica por cima. Antes o React só montava a home depois de 5s.
- Splash reduzido de 4,5s → 1,9s, exibido **só na primeira visita da sessão**, pulado para
  quem tem `prefers-reduced-motion` e nas rotas utilitárias.
- **Code splitting**: `/brandbook` e `/validar` viraram `React.lazy`.
  Bundle da home: **1.860 kB → 830 kB** (624 kB → 265 kB gzip) — **−58%**.
- `@import` de fontes removido do CSS; fontes agora só via `<link>` com `preconnect` + `preload`.
- **Imagens trazidas do imgur para o domínio, em WebP**: as 4 imagens (equipe de P&D e
  seção de pentest) eram hotlink de `i.imgur.com` e o navegador estava recebendo **403**
  (proteção de hotlink) — ou seja, quebravam em produção. Agora ficam em
  `public/images/sections/` como WebP:
  **3,78 MB → 207 KB (−94,5%)**, com `width`/`height` (evita CLS), `loading="lazy"`,
  `decoding="async"` e `alt` descritivo com termo de busca.

### Acessibilidade e crawlers de IA
- Contraste corrigido em `TrustedBrands` (`text-white/40` → `text-white/60`): era 3,74:1,
  abaixo do mínimo 4,5:1 do WCAG AA.
- **`public/llms.txt`** — descreve serviços, processo, cases e contato em Markdown para
  crawlers de IA (ChatGPT, Claude, Perplexity), no formato recomendado.

### Conteúdo e semântica
- Fallback `<noscript>` com o conteúdo real da página (H1, H2 por serviço, contato) —
  serve crawlers que não executam JavaScript.
- Todas as seções com `id` e `aria-label` (`#inicio`, `#tecnologias`, `#stack`, `#manifesto`).
- Página 404 refeita: pt-BR, dark, dentro da marca, com `noindex` e caminho de volta.
- E-mail unificado em `src/lib/contact.ts` (`corporativo@mazaricorp.com`).
- Link de WhatsApp deixou de ser link morto (ver §4).
- Rodapé: coluna "Legal" com links `#` mortos substituída por uma coluna de **Serviços**
  com âncoras reais; copyright agora é dinâmico.
- `useSEO` (`src/lib/seo.ts`): title/description/canonical/robots por rota, com
  `noindex` em `/brandbook`, `/validar` e 404.

### Identidade legal, analytics e páginas jurídicas (rodada 2)

Dados conferidos em **duas fontes** da base da Receita (BrasilAPI e ReceitaWS) em 2026-08-04 —
situação cadastral **ATIVA**:

- Razão social: `45.708.417 NAYARA DAYANE LIRA DOS SANTOS`
- CNPJ: `45.708.417/0001-41`
- Endereço: Av. Professor Cláudio Portilho, 365 — Bloco A, Sala 209, Japiim, Manaus/AM, CEP 69077-738

O que entrou com isso:

- **`src/lib/contact.ts`** virou a fonte única de NAP + entidade legal (e-mail, WhatsApp
  `+55 16 98216-6580`, razão social, CNPJ, endereço). Rodapé, schema e páginas jurídicas
  leem daqui — o mesmo dado em todo lugar, que é o que o Google usa para reconhecer a entidade.
- **JSON-LD** ganhou `legalName`, `taxID`, `telephone` e `PostalAddress` completo, em
  `Organization` e em `ProfessionalService`.
- **`/privacidade`** — Política de Privacidade LGPD: controlador identificado, dados coletados,
  bases legais por finalidade (art. 7º), compartilhamento e transferência internacional (art. 33),
  prazos de retenção, os direitos do art. 18 e política de cookies.
- **`/termos`** — Termos de Uso: escopo, uso aceitável, propriedade intelectual, limitação de
  responsabilidade com ressalva do CDC, e foro em Manaus/AM.
  Ambas indexáveis e no sitemap — página jurídica real é sinal de confiança (E-E-A-T).
- Rodapé voltou a ter a coluna **Legal** com links reais (antes apontavam para `#`), mais
  o bloco de endereço em `<address>` com razão social e CNPJ.

### Dado de entidade: um lugar só (rodada 3)

Com a atualização de CNPJ em andamento, a razão social, o CNPJ e o endereço passaram a existir
em **um único arquivo**. Antes ficavam em dois — `src/lib/contact.ts` (lido pelos componentes)
e repetidos à mão no JSON-LD do `index.html`. Dois lugares significam que a próxima
atualização de cadastro sairia certa em um e errada no outro, que é exatamente a divergência
de NAP que derruba o reconhecimento de entidade no Google.

Como funciona agora:

```
src/lib/contact.ts          ← único lugar com razão social, CNPJ, endereço, telefone
        ↓
        ├─→ componentes React (rodapé, /privacidade, /termos)
        └─→ src/lib/structured-data.ts
                   ↓
              plugin `mazariSeoInject` (vite.config.ts)
                   ↓
              JSON-LD + bloco de contato escritos no index.html EM BUILD
```

A injeção acontece em build, não no navegador: o dado estruturado já sai escrito no HTML
servido, sem depender de JavaScript para o crawler ler.

**Duas garantias, ambas testadas:**

1. Se um dos marcadores (`<!--@mazari:json-ld-->`, `<!--@mazari:noscript-contact-->`) sumir do
   `index.html`, **o build falha** com mensagem explícita. Melhor quebrar do que publicar o
   site sem dado estruturado sem ninguém notar.
2. Campos que ainda não existem no registro público **não são declarados**. Hoje `TRADE_NAME`
   está vazio e `SOCIAL_PROFILES` também, então `alternateName` sai só como `"MAZARI"` e
   `sameAs` nem aparece. Testado: preenchendo `TRADE_NAME = 'Mazari Corp'`, o schema passa a
   `["Mazari Corp", "MAZARI"]` sozinho.

**Quando o novo CNPJ sair**, mexa só no bloco "Entidade legal" de `src/lib/contact.ts`
(`LEGAL_NAME`, `TRADE_NAME`, `CNPJ`, `ADDRESS`, `ENTITY_VERIFIED_AT`) e rode o build.
Rodapé, páginas jurídicas, JSON-LD e fallback `<noscript>` acompanham.

### Google Analytics 4 com Consent Mode v2

Propriedade **G-TQLF820EBM** (`src/lib/analytics.ts`), sobrescrevível por `VITE_GA4_ID`.

Implementado com consentimento **negado por padrão**, como manda a LGPD:

| Momento | Estado |
|---|---|
| Antes de decidir | `analytics_storage: denied` — **0 cookies do GA** |
| Após "Aceitar" | consentimento atualizado sem recarregar; cookies `_ga` e `_ga_TQLF820EBM` |
| Após "Recusar" | segue sem cookie; a escolha fica salva |

Verificado no navegador: nenhum cookie `_ga*` existe antes do aceite. Recusar é tão fácil
quanto aceitar (mesmo peso visual), que é exigência da LGPD. Publicidade fica sempre negada
(`ad_storage`, `ad_user_data`, `ad_personalization`), IP anonimizado.

Como a SPA troca de rota sem recarregar, os pageviews são disparados na mão
(`PageViewTracker` em `App.tsx`) — sem isso o GA4 só contaria a primeira página da visita.

Eventos de conversão já instrumentados: `contact_form_submit` e `whatsapp_click`.

### Headers (render.yaml)
`X-Content-Type-Options`, `Strict-Transport-Security`, `Permissions-Policy`,
cache curto para `robots.txt`/`sitemap.xml`, `must-revalidate` no HTML e cache
longo para assets com hash.

---

## 2.1 Resultado medido

Lighthouse mobile rodado no build de produção (`vite preview`), em 2026-08-04:

| Categoria | Antes | Depois |
|---|---|---|
| SEO | — | **100** |
| Acessibilidade | — | **100** |
| Práticas recomendadas | — | **100** |
| Agentic Browsing (crawlers de IA) | — | **100** |

**0 auditorias reprovadas** (56 aprovadas).

Outros números medidos:

| Métrica | Antes | Depois |
|---|---|---|
| JS baixado na home | 1.860 kB (624 kB gzip) | **830 kB (265 kB gzip)** |
| Imagens de seção | 3,78 MB (externas, com 403) | **207 KB (locais, WebP)** |
| Conteúdo no DOM (visão do crawler) | só após ~5,6s | **presente em 1,5s** |
| Erros no console | 1 (imagem 403) | **0** |

> A coluna "Antes" está vazia nas notas do Lighthouse porque o estado anterior
> reprovava em itens de bloqueio (sem robots.txt, canonical ausente, `lang` errado);
> o comparável honesto são os números medidos da tabela de baixo.

---

## 3. Checklist do Google Search Console

A propriedade já está verificada. Ordem de execução **depois do deploy**:

**Antes de submeter — confira o tipo da propriedade.** É a única coisa que faz o sitemap ser
rejeitado, e não dá para ver pelo site.

O domínio já está configurado certo no Render (verificado em 2026-08-04, sem seguir redirects):

| URL | Resposta |
|---|---|
| `http://mazaricorp.com/` | 301 → `https://mazaricorp.com/` |
| `http://www.mazaricorp.com/` | 301 → `https://www.mazaricorp.com/` |
| `https://www.mazaricorp.com/` | **301 → `https://mazaricorp.com/`** |
| `https://mazaricorp.com/` | **200** ← destino canônico |

O redirect preserva o caminho (`www/termos` → `termos`). Ou seja: a URL canônica real é
`https://mazaricorp.com/` (apex, https) — e é exatamente essa forma que está no `sitemap.xml`,
no `canonical` e no `robots.txt`. **Está tudo consistente.**

O risco está no GSC:

- **Propriedade de Domínio** (`mazaricorp.com`, verificada por DNS) — cobre apex, www, http e
  https de uma vez. Nada a fazer, o sitemap é aceito.
- **Propriedade de prefixo de URL** — só vale para a forma exata cadastrada. Se estiver como
  `https://www.mazaricorp.com/`, o GSC vai recusar as URLs do sitemap (que são apex) com
  "URL não permitida" / "URL não pertence à propriedade". Nesse caso, criar uma nova
  propriedade em `https://mazaricorp.com/` — ou, melhor, uma propriedade de Domínio.

Passo a passo, depois do deploy:

1. **Sitemaps** → no campo, digitar apenas `sitemap.xml` (o GSC completa com a URL da
   propriedade) → Enviar. Esperar status "Êxito".
   Se der erro, abrir `https://mazaricorp.com/sitemap.xml` no navegador e confirmar que volta
   **XML** — antes deste trabalho voltava o HTML da home, que é erro na hora.
2. **Inspeção de URL** → colar `https://mazaricorp.com/` → *Testar URL ativa* →
   conferir em "Captura de tela" se a página aparece **renderizada** (não o splash) →
   *Solicitar indexação*.
3. Repetir a inspeção para `/privacidade` e `/termos`.
4. **Testes externos** (rodar após o deploy):
   - Rich Results: `https://search.google.com/test/rich-results`
   - PageSpeed Insights: `https://pagespeed.web.dev/?url=https://mazaricorp.com`
   - Preview social: `https://www.opengraph.xyz/url/https%3A%2F%2Fmazaricorp.com`
5. **Aguardar 7–14 dias** e revisar em Desempenho quais consultas já aparecem.
   Sem analytics instalado, o Search Console é hoje a **única** fonte de dado real.

---

## 4. Pendências (precisam de informação sua)

| Item | O que falta | Onde resolver |
|---|---|---|
| 🔴 **Formulário de contato não envia nada** | O `handleSubmit` mostra o toast "Recebemos sua solicitação!" depois de 1,5s e limpa o form. **A mensagem não vai para lugar nenhum.** Com o SEO trazendo tráfego, cada lead que preencher é perdido em silêncio | `src/components/sections/Contact.tsx:24` — precisa de backend (Resend, Formspree ou o `artifacts/api-server` do próprio monorepo) |
| **Perfis sociais** | Sem LinkedIn/Instagram/GitHub, o `sameAs` do schema fica vazio — é o que alimenta o painel de conhecimento | `index.html` → `Organization.sameAs` |
| **Google Business Profile** | Não existe. É o maior multiplicador do SEO local, e o endereço já está pronto para isso | Criar em business.google.com |
| **Revisão jurídica** | `/privacidade` e `/termos` foram escritos com os dados reais da Receita e seguem a LGPD, mas não substituem revisão de advogado antes de virarem peça contratual | — |
| **`foundingDate` no schema** | Removido de propósito: o site diz "10+ anos" e o CNPJ é de 18/03/2022. Afirmar qualquer uma das duas datas em dado estruturado seria arriscado. Se "10+ anos" se refere à experiência do time (e não da empresa), vale ajustar a redação | `index.html` + copy do Hero/About |
| **CNAE** | O CNAE registrado é 73.19-0/02 "Promoção de vendas" — não cobre desenvolvimento de software (62.01-5). Não afeta SEO, mas pode travar contrato ou nota fiscal de projeto de TI | Conversar com a contabilidade |

---

## 5. Próximo passo estratégico: arquitetura de conteúdo

O site é **uma página só**. Uma página ranqueia bem para **um** tema — hoje, "Mazari Corp"
(marca). Não dá para ranquear seis serviços diferentes no mesmo documento.

Mapa de páginas recomendado, por ordem de retorno:

| Página | Termo-alvo | Concorrência |
|---|---|---|
| `/desenvolvimento-de-software` | desenvolvimento de software sob medida | Alta |
| `/blockchain` | tokenização de ativos, desenvolvimento smart contract | **Baixa** |
| `/pentest` | teste de intrusão empresa, pentest corporativo | Média |
| `/inteligencia-artificial` | automação com IA para empresas | Alta |
| `/consultoria-offshore` | abrir empresa offshore, estruturação internacional | Média |
| `/cases/<cliente>` | prova social por projeto (IDASAM, i2TA, GLOMAM, Zeus) | Baixa |
| `/blog` | cauda longa técnica | — |

Os dois de maior retorno/esforço são **`/blockchain`** e **`/cases/*`**: pouca concorrência
em português e a Mazari tem entrega real para provar. Cada página nova entra no `sitemap.xml`
e usa o `useSEO` que já está pronto.

---

## 6. Onde mexer

| Arquivo | Papel |
|---|---|
| `index.html` | SEO estático da home + JSON-LD + fallback noscript |
| `public/robots.txt` | Regras de crawl |
| `public/sitemap.xml` | Índice de URLs — **atualizar a cada página nova** |
| `public/og-image.png` | Imagem social 1200×630 (gerada por HTML → Chrome headless) |
| `public/llms.txt` | Guia para crawlers de IA — **atualizar junto com o sitemap** |
| `public/images/sections/` | Imagens WebP das seções (antes vinham do imgur) |
| `src/lib/seo.ts` | Hook `useSEO` — SEO por rota |
| `src/lib/contact.ts` | **Fonte única** de NAP + entidade legal — é aqui que se atualiza o CNPJ |
| `src/lib/structured-data.ts` | Monta o JSON-LD a partir do `contact.ts` |
| `vite.config.ts` | Plugin `mazariSeoInject` — injeta o JSON-LD no HTML em build |
| `src/lib/analytics.ts` | GA4 + Consent Mode v2 · `trackEvent()` para conversões |
| `src/components/ConsentBanner.tsx` | Banner de cookies (LGPD) |
| `src/pages/Privacidade.tsx` · `Termos.tsx` | Páginas jurídicas |
| `src/App.tsx` | Splash não-bloqueante + code splitting das rotas |
| `render.yaml` | Headers de cache e segurança |
