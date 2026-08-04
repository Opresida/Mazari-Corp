/**
 * Gera o JSON-LD do site a partir da fonte única em `contact.ts`.
 *
 * Roda em BUILD (plugin `mazariSeoInject` no vite.config.ts), não no navegador:
 * o resultado já sai escrito no index.html, então o crawler recebe os dados
 * estruturados sem precisar executar JavaScript.
 *
 * Não repita dado de entidade aqui — importe de `contact.ts`.
 */

import {
  SITE_URL,
  CONTACT_EMAIL,
  PHONE_E164,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  LEGAL_NAME,
  TRADE_NAME,
  BRAND_NAME,
  CNPJ,
  CNPJ_DIGITS,
  ADDRESS,
  STREET_ADDRESS,
  SOCIAL_PROFILES,
} from './contact'

const OG_IMAGE = `${SITE_URL}/og-image.png`

const TITLE = 'Mazari Corp — Desenvolvimento de Software, Blockchain e IA'
const DESCRIPTION =
  'Engenharia de software, blockchain e inteligência artificial para empresas. Plataformas, apps, smart contracts, pentest e estruturação offshore.'

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: STREET_ADDRESS,
  addressLocality: ADDRESS.city,
  addressRegion: ADDRESS.state,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
}

const SERVICES = [
  {
    name: 'Desenvolvimento de plataformas e aplicativos',
    description:
      'Plataformas web, aplicativos e sistemas corporativos sob medida, do design à escala.',
    serviceType: 'Desenvolvimento de software',
  },
  {
    name: 'Sistemas e Inteligência Artificial',
    description: 'Automação, agentes e modelos de IA integrados a processos de negócio.',
    serviceType: 'Inteligência artificial',
  },
  {
    name: 'Blockchain e Web3',
    description: 'Smart contracts, tokenização de ativos, protocolos DeFi e advisory técnico.',
    serviceType: 'Blockchain',
  },
  {
    name: 'Pentest e segurança ofensiva',
    description:
      'Teste de intrusão externo, análise de superfície de ataque e relatório executivo com plano de correção.',
    serviceType: 'Segurança da informação',
  },
  {
    name: 'Pesquisa e Desenvolvimento',
    description: 'P&D aplicado para produtos de tecnologia e inovação corporativa.',
    serviceType: 'Pesquisa e desenvolvimento',
  },
  {
    name: 'Consultoria e estruturação offshore',
    description:
      'Estruturação societária internacional em 6 jurisdições para operações globais.',
    serviceType: 'Consultoria empresarial',
  },
]

const FAQ = [
  {
    q: 'O que a Mazari Corp faz?',
    a: 'A Mazari Corp é uma operação de engenharia digital que projeta, desenvolve e escala produtos de tecnologia: plataformas e aplicativos sob medida, sistemas com inteligência artificial, soluções em blockchain e Web3, pentest e estruturação offshore para operações internacionais.',
  },
  {
    q: 'A Mazari Corp desenvolve smart contracts e tokenização?',
    a: 'Sim. Desenvolvemos smart contracts em Solidity, tokenização de ativos, integrações com protocolos DeFi e advisory técnico para projetos Web3, incluindo auditoria de arquitetura antes do deploy em mainnet.',
  },
  {
    q: 'Como funciona o processo de um projeto?',
    a: 'O processo tem quatro etapas: Imersão (entendimento do negócio e do problema), Arquitetura (desenho técnico e escopo), Construção (desenvolvimento em ciclos) e Escala (operação, monitoramento e evolução contínua).',
  },
  {
    q: 'A Mazari Corp atende empresas fora do Brasil?',
    a: 'Sim. A operação é global, com projetos entregues em 5 continentes e consultoria de estruturação offshore em 6 jurisdições internacionais.',
  },
  {
    q: 'Como solicitar um orçamento?',
    a: `Pelo formulário de contato no site ou pelo e-mail ${CONTACT_EMAIL}. O primeiro passo é uma conversa de diagnóstico para entender o objetivo do negócio antes de qualquer proposta técnica.`,
  },
]

export function buildJsonLd() {
  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    alternateName: 'MAZARI',
    legalName: LEGAL_NAME,
    taxID: CNPJ,
    vatID: CNPJ_DIGITS,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: OG_IMAGE,
      width: 1200,
      height: 630,
      caption: BRAND_NAME,
    },
    image: { '@id': `${SITE_URL}/#logo` },
    description:
      'Operação de engenharia digital, blockchain e inteligência artificial. Projetamos, desenvolvemos e escalamos produtos digitais e soluções Web3 para empresas globais.',
    email: CONTACT_EMAIL,
    telephone: PHONE_E164,
    areaServed: [
      { '@type': 'Country', name: 'Brasil' },
      { '@type': 'Place', name: 'Global' },
    ],
    address: postalAddress,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT_EMAIL,
        telephone: PHONE_E164,
        availableLanguage: ['Portuguese', 'English'],
        areaServed: 'Global',
      },
    ],
    knowsAbout: [
      'Desenvolvimento de software sob medida',
      'Blockchain',
      'Smart contracts',
      'Tokenização de ativos',
      'Inteligência artificial aplicada',
      'Teste de intrusão (pentest)',
      'Estruturação offshore',
    ],
  }

  // Só declara o que existe no registro público / na realidade.
  if (TRADE_NAME) organization.alternateName = [TRADE_NAME, 'MAZARI']
  if (SOCIAL_PROFILES.length) organization.sameAs = SOCIAL_PROFILES

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: `${BRAND_NAME} — Engenharia Digital, Blockchain e IA`,
        url: `${SITE_URL}/`,
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        image: OG_IMAGE,
        priceRange: '$$$',
        email: CONTACT_EMAIL,
        telephone: PHONE_E164,
        address: postalAddress,
        areaServed: [
          { '@type': 'City', name: ADDRESS.city },
          { '@type': 'State', name: 'Amazonas' },
          { '@type': 'Country', name: 'Brasil' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Serviços ${BRAND_NAME}`,
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', ...s },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BRAND_NAME,
        description:
          'Engenharia digital, blockchain e inteligência artificial para empresas globais.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: { '@id': `${SITE_URL}/#logo` },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: FAQ.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }
}

/** Bloco de contato do fallback `<noscript>` — mesmo dado, sem duplicar. */
export function buildNoscriptContact() {
  return `<p>
          E-mail: <a href="mailto:${CONTACT_EMAIL}" style="color:#D2FF28">${CONTACT_EMAIL}</a><br />
          WhatsApp: <a href="https://wa.me/${WHATSAPP_NUMBER}" style="color:#D2FF28">${PHONE_DISPLAY}</a>
        </p>
        <address style="font-style:normal">
          ${STREET_ADDRESS}, ${ADDRESS.district}, ${ADDRESS.city}/${ADDRESS.state},
          CEP ${ADDRESS.postalCode} · Brasil — atendimento global.
        </address>
        <p>${LEGAL_NAME} · CNPJ ${CNPJ}</p>
        <p>
          <a href="/privacidade" style="color:#D2FF28">Política de Privacidade</a> ·
          <a href="/termos" style="color:#D2FF28">Termos de Uso</a>
        </p>`
}
