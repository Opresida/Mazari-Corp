/**
 * Mazari Corp — Business Card PDF generator
 * --------------------------------------------
 * Gera PDF vetorial pronto para gráfica:
 *  - 85 × 55 mm (formato internacional)
 *  - Opcional: sangria de 3 mm (total 91 × 61 mm)
 *  - Opcional: marcas de corte nos 4 cantos
 *  - 2 páginas: frente + verso
 *  - Vetor puro (texto, retângulos, QR) — sem rasterização
 */
import { jsPDF } from 'jspdf'

export interface CardData {
  name: string
  role: string
  email: string
  phone: string
  location: string
  website: string
}

export interface PDFOptions {
  bleed?: boolean
  cropMarks?: boolean
}

/* Mock QR igual ao do componente — 21×21 cells */
const QR_CELLS = [
  '111111100110101111111',
  '100000101101101000001',
  '101110101011001011101',
  '101110100110001011101',
  '101110100100101011101',
  '100000101011001000001',
  '111111101010101111111',
  '000000000110000000000',
  '110010110100110011010',
  '011001001011001100100',
  '101100110101010011010',
  '010111100110100101001',
  '001000110011001010110',
  '000000001011010110100',
  '111111100110101001011',
  '100000101110100100110',
  '101110101010110011001',
  '101110100110010110100',
  '101110100101010101001',
  '100000100110100110010',
  '111111100110011010101',
]

const COLORS = {
  black: '#080908',
  lime: '#D2FF28',
  white: '#FFFFFF',
  whiteAlpha40: '#666666', // simula white/40 sobre preto
  whiteAlpha60: '#999999',
  whiteAlpha80: '#CCCCCC',
  limeGhost: '#1A2010', // simula lime/0.06 sobre preto
} as const

const CARD_W = 85 // mm
const CARD_H = 55 // mm
const BLEED = 3 // mm

function drawCropMarks(
  doc: jsPDF,
  pageW: number,
  pageH: number,
  cardW: number,
  cardH: number,
  bleed: number,
) {
  const markLength = 3 // mm
  const offset = 1 // gap entre fim da sangria e início da marca
  const lineWidth = 0.15 // mm

  doc.setLineWidth(lineWidth)
  doc.setDrawColor(0, 0, 0)

  const cardX = (pageW - cardW) / 2
  const cardY = (pageH - cardH) / 2

  // Top-left
  doc.line(cardX, cardY - bleed - offset, cardX, cardY - bleed - offset - markLength)
  doc.line(cardX - bleed - offset, cardY, cardX - bleed - offset - markLength, cardY)

  // Top-right
  doc.line(cardX + cardW, cardY - bleed - offset, cardX + cardW, cardY - bleed - offset - markLength)
  doc.line(
    cardX + cardW + bleed + offset,
    cardY,
    cardX + cardW + bleed + offset + markLength,
    cardY,
  )

  // Bottom-left
  doc.line(cardX, cardY + cardH + bleed + offset, cardX, cardY + cardH + bleed + offset + markLength)
  doc.line(
    cardX - bleed - offset,
    cardY + cardH,
    cardX - bleed - offset - markLength,
    cardY + cardH,
  )

  // Bottom-right
  doc.line(
    cardX + cardW,
    cardY + cardH + bleed + offset,
    cardX + cardW,
    cardY + cardH + bleed + offset + markLength,
  )
  doc.line(
    cardX + cardW + bleed + offset,
    cardY + cardH,
    cardX + cardW + bleed + offset + markLength,
    cardY + cardH,
  )
}

function drawQR(doc: jsPDF, x: number, y: number, size: number, fg: string, bg: string) {
  // Fundo
  doc.setFillColor(bg)
  doc.rect(x, y, size, size, 'F')

  // Padding interno (10% do tamanho)
  const pad = size * 0.08
  const inner = size - pad * 2
  const cell = inner / 21

  doc.setFillColor(fg)
  for (let row = 0; row < 21; row++) {
    const line = QR_CELLS[row]
    for (let col = 0; col < 21; col++) {
      if (line[col] === '1') {
        doc.rect(x + pad + col * cell, y + pad + row * cell, cell, cell, 'F')
      }
    }
  }
}

function drawFrente(
  doc: jsPDF,
  cardX: number,
  cardY: number,
  bleedFill: number,
) {
  // Fundo preto (com sangria se aplicável)
  doc.setFillColor(COLORS.black)
  doc.rect(
    cardX - bleedFill,
    cardY - bleedFill,
    CARD_W + bleedFill * 2,
    CARD_H + bleedFill * 2,
    'F',
  )

  // Faixa lime vertical à esquerda (1mm de largura)
  doc.setFillColor(COLORS.lime)
  doc.rect(cardX - bleedFill, cardY - bleedFill, 1, CARD_H + bleedFill * 2, 'F')

  // ─── HEADER ───
  // MAZARI. wordmark
  doc.setFont('courier', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(COLORS.white)
  doc.text('MAZARI', cardX + 5, cardY + 9)

  // Largura da palavra MAZARI em courier-bold 22pt para posicionar o ponto
  const mazariWidth = doc.getTextWidth('MAZARI')

  doc.setTextColor(COLORS.lime)
  doc.text('.', cardX + 5 + mazariWidth, cardY + 9)

  // Subtítulo
  doc.setFont('courier', 'normal')
  doc.setFontSize(5.5)
  doc.setTextColor(COLORS.whiteAlpha40)
  doc.text('CORP · ENGINEERING GROUP', cardX + 5, cardY + 13)

  // Top right: EST · 2015 / v1.0
  doc.setFontSize(5.5)
  doc.setTextColor(COLORS.lime)
  const estText = 'EST · 2015'
  const estWidth = doc.getTextWidth(estText)
  doc.text(estText, cardX + CARD_W - 5 - estWidth, cardY + 6)

  doc.setTextColor(COLORS.whiteAlpha40)
  const verText = 'v1.0'
  const verWidth = doc.getTextWidth(verText)
  doc.text(verText, cardX + CARD_W - 5 - verWidth, cardY + 9.5)

  // ─── LINHA DECORATIVA ───
  // Dot
  doc.setFillColor(COLORS.lime)
  doc.circle(cardX + 6, cardY + 28, 0.6, 'F')

  // Linha gradient (simulado como segmentos com opacidade decrescente)
  doc.setLineWidth(0.2)
  const lineSegments = 30
  const lineStart = cardX + 8
  const lineEnd = cardX + CARD_W - 5
  const segWidth = (lineEnd - lineStart) / lineSegments
  for (let i = 0; i < lineSegments; i++) {
    const alpha = 1 - i / lineSegments
    // jsPDF não tem alpha em linhas — interpolamos no canal
    const channel = Math.floor(210 * alpha)
    const channelG = Math.floor(255 * alpha)
    const channelB = Math.floor(40 * alpha)
    doc.setDrawColor(channel, channelG, channelB)
    doc.line(
      lineStart + i * segWidth,
      cardY + 28,
      lineStart + (i + 1) * segWidth,
      cardY + 28,
    )
  }

  // ─── FOOTER ───
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(COLORS.whiteAlpha80)
  doc.text('Engineering · Blockchain · AI', cardX + 5, cardY + CARD_H - 9)

  doc.setFont('courier', 'normal')
  doc.setFontSize(5.5)
  doc.setTextColor(COLORS.whiteAlpha40)
  doc.text(
    '5 CONTINENTS · 10+ YEARS · 30+ PROJECTS',
    cardX + 5,
    cardY + CARD_H - 5,
  )

  // mazaricorp.com no canto inferior direito
  doc.setFont('courier', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(COLORS.lime)
  const siteText = 'MAZARICORP.COM'
  const siteWidth = doc.getTextWidth(siteText)
  doc.text(siteText, cardX + CARD_W - 5 - siteWidth, cardY + CARD_H - 5)
}

function drawVerso(
  doc: jsPDF,
  cardX: number,
  cardY: number,
  bleedFill: number,
  data: CardData,
) {
  // Fundo preto (com sangria)
  doc.setFillColor(COLORS.black)
  doc.rect(
    cardX - bleedFill,
    cardY - bleedFill,
    CARD_W + bleedFill * 2,
    CARD_H + bleedFill * 2,
    'F',
  )

  // M. ghost no canto direito
  doc.setFont('courier', 'bold')
  doc.setFontSize(110)
  doc.setTextColor(COLORS.limeGhost)
  doc.text('M.', cardX + CARD_W - 33, cardY + 28)

  // Faixa lime vertical à direita
  doc.setFillColor(COLORS.lime)
  doc.rect(cardX + CARD_W - 1, cardY - bleedFill, 1 + bleedFill, CARD_H + bleedFill * 2, 'F')

  // ─── INFO ESQUERDA ───
  // Nome
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(COLORS.white)
  doc.text(data.name, cardX + 5, cardY + 11)

  // Cargo
  doc.setFont('courier', 'bold')
  doc.setFontSize(6)
  doc.setTextColor(COLORS.lime)
  doc.text(data.role.toUpperCase(), cardX + 5, cardY + 15.5)

  // ─── CONTATOS (4 linhas) ───
  doc.setFont('courier', 'normal')
  doc.setFontSize(7)
  const lineY0 = cardY + CARD_H - 21
  const lineH = 4

  const contacts: Array<{ icon: string; text: string; bold?: boolean }> = [
    { icon: '@', text: data.email },
    { icon: '☎', text: data.phone },
    { icon: '◉', text: data.location },
    { icon: '⌘', text: data.website, bold: true },
  ]

  contacts.forEach((c, i) => {
    const y = lineY0 + i * lineH
    // ícone em lime
    doc.setTextColor(COLORS.lime)
    doc.setFont('courier', 'bold')
    doc.text(c.icon, cardX + 5, y)
    // texto
    doc.setTextColor(c.bold ? COLORS.white : COLORS.whiteAlpha80)
    doc.setFont('courier', c.bold ? 'bold' : 'normal')
    doc.text(c.text, cardX + 9, y)
  })

  // ─── QR CODE (canto superior direito) ───
  const qrSize = 14
  const qrX = cardX + CARD_W - qrSize - 6
  const qrY = cardY + 5
  drawQR(doc, qrX, qrY, qrSize, COLORS.black, COLORS.white)

  // ─── M. signature canto inferior direito ───
  doc.setFont('courier', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(COLORS.white)
  const mText = 'M'
  const mWidth = doc.getTextWidth(mText)
  doc.text(mText, cardX + CARD_W - 12, cardY + CARD_H - 8)
  doc.setTextColor(COLORS.lime)
  doc.text('.', cardX + CARD_W - 12 + mWidth, cardY + CARD_H - 8)

  doc.setFont('courier', 'normal')
  doc.setFontSize(4.5)
  doc.setTextColor(COLORS.whiteAlpha40)
  const brandText = 'BRAND · 2026'
  const brandWidth = doc.getTextWidth(brandText)
  doc.text(brandText, cardX + CARD_W - 6 - brandWidth, cardY + CARD_H - 4)
}

export async function generateBusinessCardPDF(
  data: CardData,
  options: PDFOptions = {},
): Promise<void> {
  const { bleed = true, cropMarks = true } = options

  const bleedFill = bleed ? BLEED : 0
  const cropMargin = cropMarks ? 6 : 0
  const margin = bleedFill + cropMargin

  const pageW = CARD_W + margin * 2
  const pageH = CARD_H + margin * 2

  const doc = new jsPDF({
    unit: 'mm',
    format: [pageW, pageH],
    orientation: 'landscape',
    compress: true,
  })

  const cardX = margin
  const cardY = margin

  // ═══ Página 1 — Frente ═══
  drawFrente(doc, cardX, cardY, bleedFill)
  if (cropMarks) drawCropMarks(doc, pageW, pageH, CARD_W, CARD_H, bleedFill)

  // Footer técnico (fora da área de corte)
  if (cropMarks) {
    doc.setFont('courier', 'normal')
    doc.setFontSize(4)
    doc.setTextColor(120, 120, 120)
    doc.text(
      `MAZARI BUSINESS CARD · 85x55mm · ${bleed ? 'BLEED 3mm' : 'NO BLEED'} · FRENTE`,
      margin / 2,
      pageH - 1.5,
    )
  }

  // ═══ Página 2 — Verso ═══
  doc.addPage([pageW, pageH], 'landscape')
  drawVerso(doc, cardX, cardY, bleedFill, data)
  if (cropMarks) drawCropMarks(doc, pageW, pageH, CARD_W, CARD_H, bleedFill)

  if (cropMarks) {
    doc.setFont('courier', 'normal')
    doc.setFontSize(4)
    doc.setTextColor(120, 120, 120)
    doc.text(
      `MAZARI BUSINESS CARD · 85x55mm · ${bleed ? 'BLEED 3mm' : 'NO BLEED'} · VERSO`,
      margin / 2,
      pageH - 1.5,
    )
  }

  // ═══ Metadata ═══
  doc.setProperties({
    title: `Mazari Business Card — ${data.name}`,
    subject: 'Cartão de visita pronto para gráfica',
    author: 'Mazari Corp',
    keywords: '85x55mm, business card, mazari, brand',
    creator: 'mazaricorp.com/brandbook',
  })

  // Nome do arquivo limpo
  const safeName = data.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  doc.save(`mazari-card-${safeName || 'sem-nome'}.pdf`)
}
