/**
 * Google Analytics 4 com Consent Mode v2.
 *
 * Propriedade da Mazari Corp: G-TQLF820EBM. Dá para sobrescrever por ambiente
 * com `VITE_GA4_ID` (útil para uma propriedade separada de staging). Se o valor
 * ficar vazio, nada é carregado — nenhum script, nenhum cookie, nenhum request.
 *
 * LGPD: o consentimento começa NEGADO. O GA4 sobe já com `analytics_storage:
 * 'denied'`, o que faz o Google coletar só ping sem cookie e sem identificador.
 * Quando o usuário aceita no banner, o consentimento é atualizado — não é
 * preciso recarregar a página.
 */

const DEFAULT_GA4_ID = 'G-TQLF820EBM'

export const GA4_ID = (
  (import.meta.env.VITE_GA4_ID as string | undefined)?.trim() || DEFAULT_GA4_ID
).trim()

export const HAS_ANALYTICS = Boolean(GA4_ID)

export const CONSENT_KEY = 'mz:consent'

type ConsentValue = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function getStoredConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

function pushConsent(value: ConsentValue) {
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* storage bloqueado — o consentimento vale só para esta sessão */
  }
  if (HAS_ANALYTICS) pushConsent(value)
}

let initialized = false

export function initAnalytics() {
  if (initialized || !HAS_ANALYTICS || typeof window === 'undefined') return
  initialized = true

  window.dataLayer = window.dataLayer || []
  // Precisa ser `function` com `arguments` — o gtag depende disso.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  const stored = getStoredConsent()

  // Estado padrão ANTES do config: negado até o usuário decidir.
  window.gtag('consent', 'default', {
    analytics_storage: stored === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(s)

  window.gtag('js', new Date())
  window.gtag('config', GA4_ID, {
    anonymize_ip: true,
    // A SPA troca de rota sem recarregar — os pageviews são enviados na mão.
    send_page_view: false,
  })

  trackPageView(window.location.pathname + window.location.search)
}

export function trackPageView(path: string) {
  if (!HAS_ANALYTICS) return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

/** Eventos de conversão do site (CTA, formulário, WhatsApp). */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!HAS_ANALYTICS) return
  window.gtag?.('event', name, params)
}
