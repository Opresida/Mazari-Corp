import { useEffect } from 'react'

/**
 * SEO por rota para SPA.
 *
 * O index.html já carrega o SEO completo da home (title, description, canonical,
 * robots, Open Graph e JSON-LD). Este hook existe para as rotas internas: como o
 * wouter troca de página sem recarregar o documento, as tags do index.html
 * ficariam "presas" na home. Aqui elas são reescritas na navegação e restauradas
 * no unmount.
 *
 * Regra: só a home é indexável. /brandbook e /validar são utilitárias e entram
 * como noindex (também bloqueadas no robots.txt).
 */

const SITE_URL = 'https://mazaricorp.com'

export interface SeoConfig {
  title: string
  description: string
  /** Caminho absoluto começando com "/" — ex: "/brandbook" */
  path: string
  noindex?: boolean
  /** URL absoluta da imagem social. Default: og-image padrão do site. */
  image?: string
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

export function useSEO({ title, description, path, noindex = false, image }: SeoConfig) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? `${SITE_URL}/og-image.png`

    // Guarda o estado anterior para restaurar ao sair da rota
    const previous = {
      title: document.title,
      description:
        document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? '',
      robots: document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? '',
      canonical:
        document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? SITE_URL,
      ogTitle:
        document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? '',
      ogDescription:
        document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ??
        '',
      ogUrl: document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? '',
      ogImage:
        document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content ?? '',
      twitterTitle:
        document.head.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content ?? '',
      twitterDescription:
        document.head.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content ??
        '',
      twitterImage:
        document.head.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.content ?? '',
    }

    document.title = title
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noindex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    )
    setCanonical(url)

    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    return () => {
      document.title = previous.title
      setMeta('meta[name="description"]', 'name', 'description', previous.description)
      setMeta('meta[name="robots"]', 'name', 'robots', previous.robots)
      setCanonical(previous.canonical)
      setMeta('meta[property="og:title"]', 'property', 'og:title', previous.ogTitle)
      setMeta('meta[property="og:description"]', 'property', 'og:description', previous.ogDescription)
      setMeta('meta[property="og:url"]', 'property', 'og:url', previous.ogUrl)
      setMeta('meta[property="og:image"]', 'property', 'og:image', previous.ogImage)
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', previous.twitterTitle)
      setMeta(
        'meta[name="twitter:description"]',
        'name',
        'twitter:description',
        previous.twitterDescription,
      )
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', previous.twitterImage)
    }
  }, [title, description, path, noindex, image])
}
