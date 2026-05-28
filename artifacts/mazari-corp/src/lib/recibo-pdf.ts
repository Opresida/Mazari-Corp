import { jsPDF } from 'jspdf'

export interface ReciboData {
  numero: string
  valorCents: number
  pagadorNome: string
  pagadorDoc: string
  pagadorEndereco: string
  pagadorEmail: string
  pagadorTelefone: string
  referente: string
  formaPagamento: string
  recebedorNome: string
  recebedorDoc: string
  recebedorEmail: string
  cidade: string
  data: string
  assinanteNome: string
}

type RGB = [number, number, number]
const BG: RGB = [8, 9, 8]
const WHITE: RGB = [255, 255, 255]
const LIME: RGB = [210, 255, 40]
const MUTED: RGB = [138, 143, 136]
const LINE: RGB = [54, 60, 52]

export function formatBRLFromCents(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function generateReciboPDF(data: ReciboData, valorExtenso: string): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const L = 20
  const R = 190
  const W = R - L

  const fill = (c: RGB) => doc.setFillColor(c[0], c[1], c[2])
  const stroke = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2])
  const text = (c: RGB) => doc.setTextColor(c[0], c[1], c[2])

  // Fundo full dark + barra lime no topo
  fill(BG)
  doc.rect(0, 0, 210, 297, 'F')
  fill(LIME)
  doc.rect(0, 0, 210, 2, 'F')

  // Wordmark MAZARI + ponto neon
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(21)
  text(WHITE)
  doc.text('MAZARI', L, 27)
  const wmW = doc.getTextWidth('MAZARI')
  fill(LIME)
  doc.circle(L + wmW + 2.4, 26.2, 1.5, 'F')
  doc.setFont('courier', 'normal')
  doc.setFontSize(7)
  text(MUTED)
  doc.text('ENGENHARIA DIGITAL · WEB3 · SECURITY', L, 32)

  // Bloco RECIBO (direita)
  doc.setFont('courier', 'normal')
  doc.setFontSize(13)
  text(LIME)
  doc.text('RECIBO', R, 24, { align: 'right' })
  doc.setFontSize(9)
  text(WHITE)
  doc.text(`Nº ${data.numero}`, R, 29.5, { align: 'right' })
  text(MUTED)
  doc.text(data.data, R, 34, { align: 'right' })

  // Splitter
  stroke(LINE)
  doc.setLineWidth(0.3)
  doc.line(L, 40, R, 40)
  stroke(LIME)
  doc.setLineWidth(0.7)
  doc.line(L, 40, L + 34, 40)

  // Caixa de valor
  const boxY = 48
  const boxH = 26
  stroke(LIME)
  doc.setLineWidth(0.3)
  doc.roundedRect(L, boxY, W, boxH, 1.6, 1.6, 'S')
  doc.setFont('courier', 'normal')
  doc.setFontSize(8)
  text(MUTED)
  doc.text('VALOR RECEBIDO', L + 6, boxY + 9)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  text(LIME)
  doc.text(formatBRLFromCents(data.valorCents), L + 6, boxY + 20)
  // Forma de pagamento (direita da caixa)
  doc.setFont('courier', 'normal')
  doc.setFontSize(8)
  text(MUTED)
  doc.text('FORMA', R - 6, boxY + 9, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  text(WHITE)
  doc.text(data.formaPagamento || '—', R - 6, boxY + 18, { align: 'right' })

  let y = boxY + boxH + 16

  const label = (t: string) => {
    doc.setFont('courier', 'normal')
    doc.setFontSize(8)
    text(MUTED)
    doc.text(t, L, y)
    y += 6
  }
  const value = (t: string, opts?: { italic?: boolean; bold?: boolean; size?: number; color?: RGB }) => {
    const style = opts?.bold ? 'bold' : opts?.italic ? 'italic' : 'normal'
    doc.setFont('helvetica', style)
    doc.setFontSize(opts?.size ?? 11)
    text(opts?.color ?? WHITE)
    const lines = doc.splitTextToSize(t || '—', W)
    doc.text(lines, L, y)
    y += lines.length * (opts?.size ? opts.size * 0.45 : 5) + 9
  }

  // Recebemos de
  label('RECEBEMOS DE')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  text(WHITE)
  doc.text(data.pagadorNome || '—', L, y)
  y += 6.5
  const detail = (t: string) => {
    doc.setFont('courier', 'normal')
    doc.setFontSize(9)
    text(MUTED)
    doc.text(t, L, y)
    y += 4.5
  }
  if (data.pagadorDoc) detail(`CPF / CNPJ: ${data.pagadorDoc}`)
  if (data.pagadorEndereco) detail(data.pagadorEndereco)
  const contato = [data.pagadorEmail, data.pagadorTelefone].filter(Boolean).join('   ·   ')
  if (contato) detail(contato)
  y += 7

  // A quantia por extenso
  label('A QUANTIA DE')
  value(`“${valorExtenso}”`, { italic: true, size: 11, color: WHITE })

  // Referente a
  label('REFERENTE A')
  value(data.referente, { size: 11 })

  // Splitter antes do rodapé de assinatura
  const sigBlockY = 232
  stroke(LINE)
  doc.setLineWidth(0.3)
  doc.line(L, sigBlockY - 14, R, sigBlockY - 14)

  // Recebedor (esquerda)
  doc.setFont('courier', 'normal')
  doc.setFontSize(8)
  text(MUTED)
  doc.text('RECEBEDOR', L, sigBlockY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  text(WHITE)
  doc.text(data.recebedorNome, L, sigBlockY + 6)
  doc.setFont('courier', 'normal')
  doc.setFontSize(8)
  text(MUTED)
  if (data.recebedorDoc) doc.text(`CNPJ: ${data.recebedorDoc}`, L, sigBlockY + 11)
  if (data.recebedorEmail) doc.text(data.recebedorEmail, L, sigBlockY + 15.5)

  // Local/data + assinatura (direita)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  text(MUTED)
  doc.text(`${data.cidade}, ${data.data}`, R, sigBlockY - 2, { align: 'right' })
  stroke(LIME)
  doc.setLineWidth(0.4)
  doc.line(R - 70, sigBlockY + 8, R, sigBlockY + 8)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  text(WHITE)
  doc.text(data.assinanteNome || data.recebedorNome, R, sigBlockY + 13, { align: 'right' })
  doc.setFont('courier', 'normal')
  doc.setFontSize(7.5)
  text(MUTED)
  doc.text('ASSINATURA', R, sigBlockY + 17.5, { align: 'right' })

  // Rodapé
  stroke(LIME)
  doc.setLineWidth(0.3)
  doc.line(L, 282, R, 282)
  doc.setFont('courier', 'normal')
  doc.setFontSize(7.5)
  text(MUTED)
  doc.text(
    `MAZARI CORP · ${data.recebedorEmail || 'contato@mazaricorp.com'} · mazaricorp.com`,
    105,
    288,
    { align: 'center' },
  )

  return doc
}

export function downloadReciboPDF(data: ReciboData, valorExtenso: string) {
  const doc = generateReciboPDF(data, valorExtenso)
  const safe = (data.pagadorNome || 'cliente').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase()
  doc.save(`recibo-mazari-${data.numero}-${safe}.pdf`)
}
