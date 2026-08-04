/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FONTE ÚNICA dos dados de contato e da entidade legal.            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Buscadores usam consistência de NAP (nome/endereço/telefone) como sinal de
 * confiança — o mesmo dado precisa bater no site, no schema, na política de
 * privacidade e no Google Business Profile. Divergência derruba esse sinal.
 *
 * Por isso NADA daqui é repetido à mão em outro lugar:
 *   · componentes React importam destas constantes;
 *   · o JSON-LD do index.html é GERADO em build a partir daqui
 *     (`src/lib/structured-data.ts` + plugin em `vite.config.ts`).
 *
 * ⚠️ ATUALIZAÇÃO DE CNPJ EM ANDAMENTO (informado em 2026-08-04)
 * Quando a alteração sair na Receita, mexa SÓ no bloco "Entidade legal" abaixo:
 *   1. `LEGAL_NAME`  → nova razão social
 *   2. `TRADE_NAME`  → nome fantasia ("Mazari Corp", quando registrado)
 *   3. `CNPJ`        → se o número mudar
 *   4. `ADDRESS`     → se o endereço mudar
 *   5. `ENTITY_VERIFIED_AT` → data da nova conferência
 * O rodapé, as páginas /privacidade e /termos e todo o JSON-LD acompanham sozinhos.
 * Depois rode `npx vite build` e confira o resultado (o build falha se o JSON-LD
 * não for injetado).
 */

export const SITE_URL = 'https://mazaricorp.com'

// ── Contato ────────────────────────────────────────────────
export const CONTACT_EMAIL = 'corporativo@mazaricorp.com'

/** DDI + DDD + número, só dígitos. */
export const WHATSAPP_NUMBER = '5516982166580'

/** Formato E.164 — é o que schema.org e o Google esperam. */
export const PHONE_E164 = '+5516982166580'

export const PHONE_DISPLAY = '(16) 98216-6580'

export const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Mazari Corp e quero falar sobre um projeto.'

export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : '#contato'

export const HAS_WHATSAPP = Boolean(WHATSAPP_NUMBER)

// ── Entidade legal ─────────────────────────────────────────
// Conferido em duas fontes da base da Receita (BrasilAPI + ReceitaWS).

/** Data da última conferência dos dados na Receita. */
export const ENTITY_VERIFIED_AT = '2026-08-04'

/** Razão social — como consta no CNPJ. */
export const LEGAL_NAME = '45.708.417 NAYARA DAYANE LIRA DOS SANTOS'

/**
 * Nome fantasia registrado no CNPJ. Hoje o cadastro está sem nome fantasia;
 * a alteração para "Mazari Corp" está em andamento. Enquanto estiver vazio,
 * o schema não afirma nome fantasia nenhum — melhor omitir do que declarar
 * dado que não bate com o registro público.
 */
export const TRADE_NAME = ''

/** Marca sob a qual a operação se apresenta (independe de registro). */
export const BRAND_NAME = 'Mazari Corp'

export const CNPJ = '45.708.417/0001-41'

/** Só dígitos — usado em `vatID` e em integrações. */
export const CNPJ_DIGITS = CNPJ.replace(/\D/g, '')

export const ADDRESS = {
  street: 'Avenida Professor Cláudio Portilho, 365',
  complement: 'Bloco A, Sala 209',
  district: 'Japiim',
  city: 'Manaus',
  state: 'AM',
  postalCode: '69077-738',
  country: 'BR',
} as const

/** Endereço em uma linha, para rodapé e documentos. */
export const ADDRESS_LINE = `${ADDRESS.street} — ${ADDRESS.complement}, ${ADDRESS.district}, ${ADDRESS.city}/${ADDRESS.state}, CEP ${ADDRESS.postalCode}`

/** Rua + complemento, como schema.org espera em `streetAddress`. */
export const STREET_ADDRESS = `${ADDRESS.street}, ${ADDRESS.complement}`

/**
 * Perfis oficiais (LinkedIn, Instagram, GitHub…). Alimentam o `sameAs` do
 * schema, que é o que o Google usa para ligar a marca a um painel de
 * conhecimento. Vazio hoje — quando houver, é só adicionar as URLs.
 */
export const SOCIAL_PROFILES: string[] = []
