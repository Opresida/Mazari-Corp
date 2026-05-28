import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import QRCode from 'qrcode'
import { buildMarker, sha256Hex } from './doc-hash'

export interface StampParams {
  docTitulo: string
  signerName: string
  signerCargo?: string
  signerDoc?: string
  dateStr: string
  validationBaseUrl: string
}

export interface StampResult {
  stampedBytes: Uint8Array
  hashHex: string
}

// Identidade MAZARI
const BG = rgb(8 / 255, 9 / 255, 8 / 255) // #080908
const LIME = rgb(210 / 255, 255 / 255, 40 / 255) // #D2FF28
const WHITE = rgb(1, 1, 1)
const MUTED = rgb(0.55, 0.57, 0.54)
const FAINT = rgb(0.38, 0.4, 0.37)
const CARD = rgb(0.09, 0.1, 0.09)

/**
 * Carimba um PDF: calcula o SHA-256 do original e anexa uma página de
 * Certificado de Autenticação na identidade MAZARI (QR + hash + signatário).
 * Tudo client-side — o hash certifica o documento enviado.
 */
export async function stampPdf(originalBytes: Uint8Array, params: StampParams): Promise<StampResult> {
  const hashHex = await sha256Hex(originalBytes)
  const pdfDoc = await PDFDocument.load(originalBytes)

  const W = 595.28 // A4 em pt
  const H = 841.89
  const M = 48
  const page = pdfDoc.addPage([W, H])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier)
  const monoBold = await pdfDoc.embedFont(StandardFonts.CourierBold)

  // Fundo full dark + barra lime no topo
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: BG })
  page.drawRectangle({ x: 0, y: H - 4, width: W, height: 4, color: LIME })

  // Wordmark MAZARI + ponto neon
  page.drawText('MAZARI', { x: M, y: H - 52, size: 22, font: fontBold, color: WHITE })
  const wmW = fontBold.widthOfTextAtSize('MAZARI', 22)
  page.drawCircle({ x: M + wmW + 7, y: H - 47, size: 3, color: LIME })
  page.drawText('ENGENHARIA DIGITAL · WEB3 · SECURITY', { x: M, y: H - 66, size: 7, font: fontMono, color: MUTED })

  // Título
  const title = 'CERTIFICADO DE AUTENTICAÇÃO DIGITAL'
  page.drawText(title, { x: M, y: H - 104, size: 15, font: fontBold, color: WHITE })
  page.drawText('Integridade verificável por hash criptográfico SHA-256.', {
    x: M, y: H - 120, size: 9, font, color: MUTED,
  })

  // Splitter
  page.drawRectangle({ x: M, y: H - 134, width: W - 2 * M, height: 0.6, color: FAINT })
  page.drawRectangle({ x: M, y: H - 134, width: 90, height: 1.4, color: LIME })

  // Bloco: QR + informações
  const boxY = H - 152 - 190
  const boxH = 190
  page.drawRectangle({
    x: M, y: boxY, width: W - 2 * M, height: boxH,
    color: CARD, borderColor: rgb(210 / 255, 255 / 255, 40 / 255), borderWidth: 0.4, opacity: 1,
  })

  // QR Code → página de validação
  const validationUrl = `${params.validationBaseUrl}/validar?h=${hashHex}`
  try {
    const qrDataUrl = await QRCode.toDataURL(validationUrl, {
      width: 320, margin: 1, color: { dark: '#D2FF28', light: '#080908' },
    })
    const qrBytes = Uint8Array.from(atob(qrDataUrl.split(',')[1]), (c) => c.charCodeAt(0))
    const qrImg = await pdfDoc.embedPng(qrBytes)
    page.drawImage(qrImg, { x: M + 22, y: boxY + 36, width: 130, height: 130 })
  } catch {
    page.drawText('QR', { x: M + 70, y: boxY + 95, size: 12, font, color: MUTED })
  }
  page.drawText('ESCANEIE PARA VALIDAR', { x: M + 30, y: boxY + 22, size: 6.5, font: fontMono, color: FAINT })

  // Informações (direita)
  const infoX = M + 184
  let cy = boxY + boxH - 30
  const field = (label: string, value: string) => {
    page.drawText(label.toUpperCase(), { x: infoX, y: cy, size: 7, font: fontMono, color: FAINT })
    page.drawText(value, { x: infoX, y: cy - 13, size: 10, font: fontBold, color: WHITE })
    cy -= 33
  }
  const titulo = params.docTitulo.length > 46 ? params.docTitulo.slice(0, 46) + '…' : params.docTitulo
  field('Documento', titulo || '—')
  field('Signatário', params.signerName || '—')
  if (params.signerCargo) field('Cargo', params.signerCargo)
  if (params.signerDoc) {
    field('CPF / CNPJ', params.signerDoc)
  }
  field('Data / Hora', params.dateStr)

  // Bloco hash
  const hashY = boxY - 56
  page.drawRectangle({
    x: M, y: hashY, width: W - 2 * M, height: 44,
    color: CARD, borderColor: LIME, borderWidth: 0.4,
  })
  page.drawText('HASH SHA-256 DO DOCUMENTO ORIGINAL', { x: M + 14, y: hashY + 28, size: 7, font: fontMono, color: LIME })
  // Quebra o hash em duas metades pra caber
  page.drawText(hashHex.slice(0, 32), { x: M + 14, y: hashY + 15, size: 8, font: monoBold, color: WHITE })
  page.drawText(hashHex.slice(32), { x: M + 14, y: hashY + 5, size: 8, font: monoBold, color: WHITE })

  // Link de validação
  const linkY = hashY - 30
  page.drawText('VALIDAR EM', { x: M, y: linkY + 10, size: 7, font: fontMono, color: FAINT })
  page.drawText(validationUrl, { x: M, y: linkY - 2, size: 7.5, font: fontMono, color: LIME })

  // Referência legal
  const legalY = linkY - 36
  page.drawRectangle({ x: M, y: legalY + 14, width: W - 2 * M, height: 0.5, color: FAINT })
  const legal = [
    'Assinatura eletrônica nos termos da Lei 14.063/2020 (Brasil) e do Regulamento (UE) 910/2014 (eIDAS).',
    'A integridade do documento original pode ser verificada recalculando seu hash SHA-256 e comparando',
    'com o valor acima — ou escaneando o QR Code. Verificação 100% criptográfica, sem intermediários.',
  ]
  legal.forEach((t, i) => {
    page.drawText(t, { x: M, y: legalY - i * 12, size: 7.5, font, color: MUTED })
  })

  // Rodapé
  page.drawRectangle({ x: 0, y: 0, width: W, height: 28, color: BG })
  page.drawRectangle({ x: 0, y: 28, width: W, height: 0.5, color: FAINT })
  const footer = 'MAZARI CORP · CONTATO@MAZARICORP.COM · MAZARICORP.COM'
  const fw = fontMono.widthOfTextAtSize(footer, 7)
  page.drawText(footer, { x: (W - fw) / 2, y: 11, size: 7, font: fontMono, color: MUTED })

  // Marcador nos metadados (auto-detecção no /validar)
  pdfDoc.setKeywords([buildMarker({ hash: hashHex, date: params.dateStr, signer: params.signerName })])
  pdfDoc.setProducer('MAZARI Corp — Autenticador de Documentos')
  pdfDoc.setSubject(`Certificado de autenticação · SHA-256 ${hashHex}`)

  const stampedBytes = await pdfDoc.save()
  return { stampedBytes, hashHex }
}
