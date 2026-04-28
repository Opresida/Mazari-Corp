import { useState, useMemo, useEffect, useRef } from 'react'
import { Mail, Phone, Globe2, MapPin, Download, FileDown, Check, Copy, Code2, ClipboardCheck } from 'lucide-react'
import { TabShell, Block } from './TabShell'
import type { CardData } from '@/lib/pdf/businessCard'
import {
  buildSignatureHTML,
  buildSignatureFile,
  buildSignaturePlainText,
  type SignatureData,
  type SignatureVariant,
} from '@/lib/email/signature'

/* ═══════════════ MOCK QR (SVG decorativo, igual ao do PDF) ═══════════════ */
export const QR_CELLS = [
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
] as const

function MockQR({ color = '#080908', bg = '#D2FF28' }: { color?: string; bg?: string }) {
  return (
    <svg viewBox="0 0 21 21" shapeRendering="crispEdges" className="w-full h-full">
      <rect width="21" height="21" fill={bg} />
      {QR_CELLS.map((row, y) =>
        row.split('').map((c, x) =>
          c === '1' ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />
          ) : null,
        ),
      )}
    </svg>
  )
}

const DEFAULT_DATA: CardData = {
  name: 'Nome Sobrenome',
  role: 'Founding Engineer',
  email: 'contato@mazaricorp.com',
  phone: '+55 92 ······',
  location: 'Manaus · BR · GMT-3',
  website: 'mazaricorp.com',
}

/* ═══════════════ CARTÃO · FRENTE ═══════════════ */
function BusinessCardFront({
  compact = false,
  data = DEFAULT_DATA,
}: {
  compact?: boolean
  data?: CardData
}) {
  return (
    <div
      className="relative rounded-md overflow-hidden bg-background w-full"
      style={{
        aspectRatio: '85 / 55',
        boxShadow:
          '0 30px 60px -15px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(210,255,40,0.08)',
      }}
    >
      <div className="absolute inset-0 mz-grid-bg opacity-25" aria-hidden="true" />
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(210,255,40,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
        style={{ boxShadow: '0 0 12px rgba(210,255,40,0.6)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'linear-gradient(115deg, transparent 0%, transparent 45%, rgba(255,255,255,0.04) 50%, transparent 55%, transparent 100%)',
        }}
      />

      <div
        className={`relative h-full flex flex-col justify-between ${
          compact ? 'p-4' : 'p-5 sm:p-7'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline gap-0.5">
              <span
                className={`mz-mono font-extrabold text-white tracking-tight leading-none ${
                  compact ? 'text-xl' : 'text-3xl'
                }`}
              >
                MAZARI
              </span>
              <span
                className={`mz-mono font-extrabold text-primary leading-none ${
                  compact ? 'text-xl' : 'text-3xl'
                }`}
                style={{ textShadow: '0 0 10px rgba(210,255,40,0.6)' }}
              >
                .
              </span>
            </div>
            <span
              className={`mz-mono uppercase tracking-[0.25em] text-white/40 ${
                compact ? 'text-[7px]' : 'text-[9px]'
              }`}
            >
              Corp · Engineering Group
            </span>
          </div>

          <div className="flex flex-col items-end gap-0.5">
            <span
              className={`mz-mono uppercase tracking-widest text-primary/70 ${
                compact ? 'text-[7px]' : 'text-[9px]'
              }`}
            >
              EST · 2015
            </span>
            <span
              className={`mz-mono text-white/30 ${compact ? 'text-[7px]' : 'text-[9px]'}`}
            >
              v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="mz-dot"
            style={{ width: compact ? 3 : 5, height: compact ? 3 : 5 }}
          />
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-primary/15 to-transparent" />
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span
              className={`text-white/85 font-bold leading-tight ${
                compact ? 'text-[11px]' : 'text-[15px]'
              }`}
            >
              Engineering · Blockchain · AI
            </span>
            <span
              className={`mz-mono uppercase tracking-[0.2em] text-white/40 ${
                compact ? 'text-[7px]' : 'text-[9px]'
              }`}
            >
              5 continents · 10+ years · 30+ projects
            </span>
          </div>

          <span
            className={`mz-mono uppercase tracking-widest text-primary font-semibold ${
              compact ? 'text-[8px]' : 'text-[10px]'
            }`}
          >
            {data.website}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════ CARTÃO · VERSO (100% black) ═══════════════ */
function BusinessCardBack({
  compact = false,
  data = DEFAULT_DATA,
}: {
  compact?: boolean
  data?: CardData
}) {
  return (
    <div
      className="relative rounded-md overflow-hidden w-full bg-background"
      style={{
        aspectRatio: '85 / 55',
        boxShadow:
          '0 30px 60px -15px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(210,255,40,0.08)',
      }}
    >
      {/* Textura sutil grid */}
      <div className="absolute inset-0 mz-grid-bg opacity-25" aria-hidden="true" />

      {/* Glow lime sutil canto inferior esquerdo */}
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(210,255,40,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Sheen diagonal */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'linear-gradient(115deg, transparent 0%, transparent 45%, rgba(255,255,255,0.05) 50%, transparent 55%, transparent 100%)',
        }}
      />

      {/* Faixa lime na borda direita */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1 bg-primary"
        style={{ boxShadow: '0 0 12px rgba(210,255,40,0.6)' }}
      />

      {/* Marca M. ghost gigante no fundo */}
      <div
        className="absolute -right-2 -top-4 mz-mono font-extrabold text-primary/[0.06] leading-none select-none pointer-events-none"
        style={{ fontSize: compact ? '120px' : '200px' }}
      >
        M.
      </div>

      <div
        className={`relative h-full flex ${
          compact ? 'gap-3 p-4' : 'gap-5 p-5 sm:p-7'
        }`}
      >
        {/* Coluna info */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex flex-col gap-1">
            <span
              className={`text-white font-extrabold leading-tight tracking-tight truncate ${
                compact ? 'text-base' : 'text-2xl'
              }`}
            >
              {data.name}
            </span>
            <span
              className={`mz-mono uppercase tracking-[0.2em] text-primary font-semibold truncate ${
                compact ? 'text-[8px]' : 'text-[10px]'
              }`}
            >
              {data.role}
            </span>
          </div>

          <div
            className={`flex flex-col mz-mono text-white/80 ${
              compact ? 'gap-0.5 text-[8px]' : 'gap-1 text-[10px]'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Mail
                className={`text-primary flex-shrink-0 ${
                  compact ? 'h-2 w-2' : 'h-2.5 w-2.5'
                }`}
              />
              <span className="truncate">{data.email}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Phone
                className={`text-primary flex-shrink-0 ${
                  compact ? 'h-2 w-2' : 'h-2.5 w-2.5'
                }`}
              />
              <span className="truncate">{data.phone}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin
                className={`text-primary flex-shrink-0 ${
                  compact ? 'h-2 w-2' : 'h-2.5 w-2.5'
                }`}
              />
              <span className="truncate">{data.location}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Globe2
                className={`text-primary flex-shrink-0 ${
                  compact ? 'h-2 w-2' : 'h-2.5 w-2.5'
                }`}
              />
              <span className="font-bold text-white truncate">{data.website}</span>
            </div>
          </div>
        </div>

        {/* Coluna QR + assinatura */}
        <div
          className={`flex flex-col items-end justify-between flex-shrink-0 ${
            compact ? 'gap-2' : 'gap-3'
          }`}
        >
          <div
            className={`bg-white rounded-sm overflow-hidden ${
              compact ? 'w-12 h-12 p-1' : 'w-[72px] h-[72px] p-1.5'
            }`}
          >
            <MockQR color="#080908" bg="#FFFFFF" />
          </div>

          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-baseline gap-0.5">
              <span
                className={`mz-mono font-extrabold text-white tracking-tight leading-none ${
                  compact ? 'text-base' : 'text-2xl'
                }`}
              >
                M
              </span>
              <span
                className={`mz-mono font-extrabold text-primary leading-none ${
                  compact ? 'text-base' : 'text-2xl'
                }`}
                style={{ textShadow: '0 0 6px rgba(210,255,40,0.6)' }}
              >
                .
              </span>
            </div>
            <span
              className={`mz-mono uppercase tracking-widest text-white/40 ${
                compact ? 'text-[7px]' : 'text-[8px]'
              }`}
            >
              brand · 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════ GERADOR ═══════════════ */
function BusinessCardGenerator() {
  const [data, setData] = useState<CardData>(DEFAULT_DATA)
  const [downloaded, setDownloaded] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [includeBleed, setIncludeBleed] = useState(true)
  const [includeCropMarks, setIncludeCropMarks] = useState(true)

  const update = (key: keyof CardData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const handleDownload = async () => {
    setGenerating(true)
    try {
      const { generateBusinessCardPDF } = await import('@/lib/pdf/businessCard')
      await generateBusinessCardPDF(data, { bleed: includeBleed, cropMarks: includeCropMarks })
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    } catch (err) {
      console.error('PDF generation failed', err)
      alert('Erro ao gerar o PDF. Verifique o console.')
    } finally {
      setGenerating(false)
    }
  }

  const reset = () => setData(DEFAULT_DATA)

  return (
    <Block
      tag="Gerador · Pronto para gráfica"
      title="Preencha. Visualize. Baixe em PDF."
      subtitle="Edição em tempo real do cartão. PDF vetorial em 85×55mm com sangria e marcas de corte opcionais — entregue direto na gráfica."
    >
      <div className="grid xl:grid-cols-[340px,1fr] gap-6 xl:gap-8">
        {/* ═══ Formulário ═══ */}
        <div className="flex flex-col gap-4 w-full max-w-md xl:max-w-none">
          <div className="flex items-center justify-between">
            <span className="mz-tag">Dados do cartão</span>
            <button
              type="button"
              onClick={reset}
              className="mz-mono text-[10px] uppercase tracking-widest text-white/45 hover:text-primary transition-colors"
            >
              Resetar
            </button>
          </div>

          <Field
            id="name"
            label="Nome completo"
            value={data.name}
            onChange={(v) => update('name', v)}
            placeholder="Nome Sobrenome"
            maxLength={32}
          />
          <Field
            id="role"
            label="Cargo / função"
            value={data.role}
            onChange={(v) => update('role', v)}
            placeholder="Founding Engineer"
            maxLength={32}
          />
          <Field
            id="email"
            label="E-mail"
            value={data.email}
            onChange={(v) => update('email', v)}
            placeholder="voce@mazaricorp.com"
            type="email"
            maxLength={48}
          />
          <Field
            id="phone"
            label="Telefone"
            value={data.phone}
            onChange={(v) => update('phone', v)}
            placeholder="+55 92 ······"
            maxLength={24}
          />
          <Field
            id="location"
            label="Localização"
            value={data.location}
            onChange={(v) => update('location', v)}
            placeholder="Manaus · BR · GMT-3"
            maxLength={32}
          />
          <Field
            id="website"
            label="Website"
            value={data.website}
            onChange={(v) => update('website', v)}
            placeholder="mazaricorp.com"
            maxLength={32}
          />

          {/* Opções de export */}
          <div className="rounded-md border border-white/10 bg-background/60 p-4 flex flex-col gap-3 mt-2">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/55">
              Opções de impressão
            </span>
            <Toggle
              label="Sangria 3 mm"
              hint="Adiciona 3 mm em cada lado (91×61mm)"
              checked={includeBleed}
              onChange={setIncludeBleed}
            />
            <Toggle
              label="Marcas de corte"
              hint="Crop marks nos 4 cantos"
              checked={includeCropMarks}
              onChange={setIncludeCropMarks}
            />
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={generating}
            className="group inline-flex items-center justify-between gap-3 rounded-md bg-primary text-background px-5 py-3 font-mono uppercase text-xs font-bold tracking-wider hover:brightness-110 hover:shadow-[0_0_24px_rgba(210,255,40,0.45)] transition-all disabled:opacity-50 disabled:cursor-wait"
          >
            <span className="flex items-center gap-2">
              {downloaded ? (
                <>
                  <Check className="h-4 w-4" />
                  PDF baixado
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  {generating ? 'Gerando...' : 'Baixar PDF (gráfica)'}
                </>
              )}
            </span>
            <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>

          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40 leading-relaxed">
            ↳ PDF vetorial · 2 páginas (frente + verso) · 85×55 mm · RGB
          </span>
        </div>

        {/* ═══ Preview ao vivo ═══ */}
        <div className="flex flex-col gap-6 min-w-0 w-full max-w-2xl xl:max-w-none">
          <div className="flex items-center gap-3">
            <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Preview · Frente
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          <div className="max-w-[460px]">
            <BusinessCardFront data={data} />
          </div>

          <div className="flex items-center gap-3">
            <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Preview · Verso
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
          <div className="max-w-[460px]">
            <BusinessCardBack data={data} />
          </div>
        </div>
      </div>
    </Block>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  maxLength?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="mz-mono text-[10px] uppercase tracking-widest text-white/55"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition"
      />
    </div>
  )
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 text-left"
    >
      <span
        className={`flex-shrink-0 w-9 h-5 rounded-full border transition-colors relative ${
          checked
            ? 'bg-primary/20 border-primary/60'
            : 'bg-white/5 border-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition-all ${
            checked
              ? 'translate-x-4 bg-primary shadow-[0_0_8px_rgba(210,255,40,0.6)]'
              : 'translate-x-0 bg-white/40'
          }`}
        />
      </span>
      <span className="flex flex-col gap-0">
        <span className="text-sm text-white/85">{label}</span>
        {hint && (
          <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
            {hint}
          </span>
        )}
      </span>
    </button>
  )
}

/* ═══════════════ GERADOR DE ASSINATURA DE E-MAIL ═══════════════ */
const DEFAULT_SIG: SignatureData = {
  name: 'Nome Sobrenome',
  role: 'Founding Engineer',
  email: 'contato@mazaricorp.com',
  phone: '+55 92 ······',
  location: 'Manaus · BR · GMT-3',
  website: 'mazaricorp.com',
  linkedin: '',
}

function EmailSignatureGenerator() {
  const [data, setData] = useState<SignatureData>(DEFAULT_SIG)
  const [variant, setVariant] = useState<SignatureVariant>('dark')
  const [downloaded, setDownloaded] = useState(false)
  const [copiedKind, setCopiedKind] = useState<null | 'html' | 'rich'>(null)

  const html = useMemo(() => buildSignatureHTML(data, variant), [data, variant])
  const fileHTML = useMemo(() => buildSignatureFile(data, variant), [data, variant])
  const plainText = useMemo(() => buildSignaturePlainText(data), [data])

  const update = (key: keyof SignatureData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const reset = () => setData(DEFAULT_SIG)

  const handleDownload = () => {
    const blob = new Blob([fileHTML], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const safeName = data.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    a.href = url
    a.download = `mazari-signature-${safeName || 'sem-nome'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2500)
  }

  const handleCopyHTML = async () => {
    try {
      await navigator.clipboard.writeText(html)
      setCopiedKind('html')
      setTimeout(() => setCopiedKind(null), 2000)
    } catch (err) {
      console.error(err)
      alert('Falha ao copiar. Tente baixar o arquivo HTML.')
    }
  }

  const handleCopyRich = async () => {
    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
        })
        await navigator.clipboard.write([item])
      } else {
        // Fallback: seleção manual + execCommand('copy')
        const tmp = document.createElement('div')
        tmp.contentEditable = 'true'
        tmp.innerHTML = html
        tmp.style.position = 'fixed'
        tmp.style.opacity = '0'
        tmp.style.pointerEvents = 'none'
        document.body.appendChild(tmp)
        const range = document.createRange()
        range.selectNodeContents(tmp)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
        document.execCommand('copy')
        sel?.removeAllRanges()
        document.body.removeChild(tmp)
      }
      setCopiedKind('rich')
      setTimeout(() => setCopiedKind(null), 2000)
    } catch (err) {
      console.error(err)
      alert('Falha ao copiar como rich-text. Use "Copiar HTML" e cole no Gmail.')
    }
  }

  return (
    <Block
      tag="Assinatura de E-mail"
      title="Preencha. Visualize. Cole no Gmail."
      subtitle="Gerador de assinatura HTML pronta para Gmail, Outlook e Apple Mail. Table-based, CSS inline, fontes do sistema — funciona em qualquer client."
    >
      <div className="grid xl:grid-cols-[340px,1fr] gap-6 xl:gap-8">
        {/* ═══ Formulário ═══ */}
        <div className="flex flex-col gap-4 w-full max-w-md xl:max-w-none">
          <div className="flex items-center justify-between">
            <span className="mz-tag">Dados da assinatura</span>
            <button
              type="button"
              onClick={reset}
              className="mz-mono text-[10px] uppercase tracking-widest text-white/45 hover:text-primary transition-colors"
            >
              Resetar
            </button>
          </div>

          <SigField id="sig-name" label="Nome completo" value={data.name} onChange={(v) => update('name', v)} placeholder="Nome Sobrenome" />
          <SigField id="sig-role" label="Cargo / função" value={data.role} onChange={(v) => update('role', v)} placeholder="Founding Engineer" />
          <SigField id="sig-email" label="E-mail" type="email" value={data.email} onChange={(v) => update('email', v)} placeholder="voce@mazaricorp.com" />
          <SigField id="sig-phone" label="Telefone" value={data.phone} onChange={(v) => update('phone', v)} placeholder="+55 92 ······" />
          <SigField id="sig-location" label="Localização" value={data.location} onChange={(v) => update('location', v)} placeholder="Manaus · BR · GMT-3" />
          <SigField id="sig-website" label="Website" value={data.website} onChange={(v) => update('website', v)} placeholder="mazaricorp.com" />
          <SigField id="sig-linkedin" label="LinkedIn (opcional)" value={data.linkedin || ''} onChange={(v) => update('linkedin', v)} placeholder="linkedin.com/in/..." />

          {/* Variante */}
          <div className="rounded-md border border-white/10 bg-background/60 p-4 flex flex-col gap-3 mt-2">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/55">
              Variante
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(['dark', 'light'] as const).map((v) => {
                const active = variant === v
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-colors ${
                      active
                        ? 'border-primary/60 bg-primary/10'
                        : 'border-white/10 bg-background/40 hover:border-white/25'
                    }`}
                  >
                    <span
                      className="w-full h-8 rounded-sm border"
                      style={{
                        background: v === 'dark' ? '#080908' : '#FFFFFF',
                        borderColor: v === 'dark' ? 'rgba(255,255,255,0.12)' : '#E5E5E5',
                      }}
                    />
                    <span
                      className={`mz-mono text-[10px] uppercase tracking-widest ${
                        active ? 'text-primary' : 'text-white/55'
                      }`}
                    >
                      {v === 'dark' ? 'Dark' : 'Light'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              type="button"
              onClick={handleDownload}
              className="group inline-flex items-center justify-between gap-3 rounded-md bg-primary text-background px-5 py-3 font-mono uppercase text-xs font-bold tracking-wider hover:brightness-110 hover:shadow-[0_0_24px_rgba(210,255,40,0.45)] transition-all"
            >
              <span className="flex items-center gap-2">
                {downloaded ? (
                  <>
                    <Check className="h-4 w-4" />
                    HTML baixado
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4" />
                    Baixar arquivo HTML
                  </>
                )}
              </span>
              <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyRich}
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-primary/40 bg-primary/5 text-primary px-3 py-2.5 font-mono uppercase text-[11px] font-semibold tracking-wider hover:bg-primary/10 hover:border-primary/80 transition-all"
              >
                {copiedKind === 'rich' ? (
                  <>
                    <ClipboardCheck className="h-3.5 w-3.5" /> Pronto
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="h-3.5 w-3.5" /> Copiar Rich
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCopyHTML}
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-background/60 text-white/80 px-3 py-2.5 font-mono uppercase text-[11px] font-semibold tracking-wider hover:bg-white/5 hover:border-white/30 hover:text-white transition-all"
              >
                {copiedKind === 'html' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" /> Pronto
                  </>
                ) : (
                  <>
                    <Code2 className="h-3.5 w-3.5" /> Copiar HTML
                  </>
                )}
              </button>
            </div>

            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40 leading-relaxed mt-1">
              ↳ Rich = cole direto no Gmail/Outlook · HTML = código fonte
            </span>
          </div>
        </div>

        {/* ═══ Preview + código ═══ */}
        <div className="flex flex-col gap-5 min-w-0 w-full max-w-2xl xl:max-w-none">
          {/* Preview ao vivo (iframe srcDoc — isola estilos) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Preview · {variant === 'dark' ? 'Dark' : 'Light'}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
            </div>
            <SignaturePreview html={html} variant={variant} />
          </div>

          {/* Código HTML */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
                Código fonte
              </span>
              <div className="flex-1 h-px bg-white/10" />
              <button
                type="button"
                onClick={handleCopyHTML}
                className="flex items-center gap-1.5 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
              >
                {copiedKind === 'html' ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copiedKind === 'html' ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <pre className="mz-mono text-[11px] text-white/70 bg-background/60 border border-white/10 rounded-md p-4 overflow-x-auto max-h-72 overflow-y-auto leading-relaxed">
{html}
            </pre>
          </div>

          {/* Como instalar */}
          <div className="rounded-md border border-white/10 bg-background/40 p-4">
            <span className="mz-tag mb-3 inline-block">Como instalar</span>
            <ul className="flex flex-col gap-2 text-xs text-white/70 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                <span>
                  <strong className="text-white">Gmail:</strong> Configurações → Geral → Assinatura.
                  Clique no editor, clique em <em>Copiar Rich</em> aqui, cole (Ctrl+V).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                <span>
                  <strong className="text-white">Outlook:</strong> Arquivo → Opções → Email →
                  Assinaturas. Cole com Ctrl+V no campo da assinatura.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                <span>
                  <strong className="text-white">Apple Mail:</strong> Mail → Preferências →
                  Assinaturas. Cole e <strong>desmarque</strong> "always match my default
                  message font" para preservar o estilo.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                <span>
                  <strong className="text-white">Outros (HubSpot, Front, etc):</strong> baixe o
                  arquivo HTML e abra no navegador para copiar a versão renderizada.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Block>
  )
}

function SigField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="mz-mono text-[10px] uppercase tracking-widest text-white/55"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md border border-white/10 bg-background/60 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition"
      />
    </div>
  )
}

function SignaturePreview({ html, variant }: { html: string; variant: SignatureVariant }) {
  const [height, setHeight] = useState(360)
  const wrapperBg = variant === 'dark' ? '#1a1b1a' : '#f5f5f5'

  // Mede altura natural do iframe quando o HTML muda
  useEffect(() => {
    const id = setTimeout(() => {
      const iframe = document.getElementById('sig-preview-iframe') as HTMLIFrameElement | null
      if (iframe?.contentDocument?.body) {
        const h = iframe.contentDocument.body.scrollHeight
        setHeight(Math.max(320, h + 40))
      }
    }, 80)
    return () => clearTimeout(id)
  }, [html])

  const srcDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>html,body{margin:0;padding:24px;background:${wrapperBg};display:flex;justify-content:center;}</style></head><body>${html}</body></html>`

  return (
    <div className="rounded-md border border-white/10 bg-background/40 overflow-hidden">
      <iframe
        id="sig-preview-iframe"
        title="Email signature preview"
        srcDoc={srcDoc}
        sandbox="allow-same-origin"
        style={{
          width: '100%',
          height,
          border: 'none',
          display: 'block',
          background: wrapperBg,
        }}
      />
      <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between mz-mono text-[10px] uppercase tracking-widest text-white/45">
        <span>Renderizado em iframe isolado · simula client de email</span>
        <span className="text-primary">{variant}</span>
      </div>
    </div>
  )
}

/* ═══════════════ OG IMAGE (1200×630, exportável como PNG) ═══════════════ */

const OG_W = 1200
const OG_H = 630

function OGImageContent() {
  return (
    <div
      style={{
        position: 'relative',
        width: OG_W,
        height: OG_H,
        backgroundColor: '#080908',
        overflow: 'hidden',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(210,255,40,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(210,255,40,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow central */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(210,255,40,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tag superior */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: '#D2FF28',
            padding: '8px 18px',
            border: '1px solid rgba(210,255,40,0.30)',
            borderRadius: 4,
            backgroundColor: 'rgba(210,255,40,0.05)',
            fontWeight: 600,
          }}
        >
          Engenharia · Blockchain · IA
        </span>
      </div>

      {/* Título central */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 100px',
        }}
      >
        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          A tecnologia que
          <br />
          <span
            style={{
              color: '#D2FF28',
              fontStyle: 'italic',
              fontWeight: 500,
              fontFamily: "Georgia, 'Plus Jakarta Sans', serif",
              textShadow: '0 0 40px rgba(210,255,40,0.4)',
            }}
          >
            move negócios globais.
          </span>
        </h1>
      </div>

      {/* Logo MAZARI. */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: '-1px',
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          MAZARI
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 44,
            fontWeight: 800,
            color: '#D2FF28',
            lineHeight: 1,
            textShadow: '0 0 16px rgba(210,255,40,0.6)',
          }}
        >
          .
        </span>
      </div>

      {/* Stats inferiores */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.40)',
          fontWeight: 500,
        }}
      >
        10+ years · 30+ projects · 5 continents
      </div>
    </div>
  )
}

function OGImageBlock() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef<HTMLDivElement>(null)
  const captureRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  // Scale o preview pra caber no container responsivo
  useEffect(() => {
    const wrapper = wrapperRef.current
    const visible = visibleRef.current
    if (!wrapper || !visible) return
    const apply = () => {
      const w = wrapper.clientWidth
      const scale = w / OG_W
      visible.style.transform = `scale(${scale})`
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  const handleDownload = async () => {
    if (!captureRef.current) return
    setDownloading(true)
    try {
      const html2canvasMod = await import('html2canvas')
      const html2canvas = html2canvasMod.default
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: '#080908',
        scale: 1,
        width: OG_W,
        height: OG_H,
        windowWidth: OG_W,
        windowHeight: OG_H,
        useCORS: true,
        logging: false,
      })
      await new Promise<void>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve()
              return
            }
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'mazari-og-1200x630.png'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            resolve()
          },
          'image/png',
          1.0,
        )
      })
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 2500)
    } catch (err) {
      console.error('OG export failed', err)
      alert('Erro ao exportar OG image. Verifique o console.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <Block tag="OG Image" title="Open Graph · 1200×630">
        {/* Preview escalado */}
        <div
          ref={wrapperRef}
          className="relative w-full rounded-md border border-white/15 bg-background overflow-hidden"
          style={{ aspectRatio: `${OG_W} / ${OG_H}` }}
        >
          <div
            ref={visibleRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: OG_W,
              height: OG_H,
              transformOrigin: '0 0',
            }}
          >
            <OGImageContent />
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
              PNG · 1200×630 · 1× pixel ratio
            </span>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="group inline-flex items-center gap-2 rounded-md bg-primary text-background px-4 py-2 font-mono uppercase text-[11px] font-bold tracking-wider hover:brightness-110 hover:shadow-[0_0_24px_rgba(210,255,40,0.45)] transition-all disabled:opacity-50 disabled:cursor-wait"
          >
            {downloaded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                PNG baixado
              </>
            ) : (
              <>
                <FileDown className="h-3.5 w-3.5" />
                {downloading ? 'Gerando…' : 'Baixar Imagem'}
              </>
            )}
            <Download className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </Block>

      {/* Capture target offscreen — sempre 1200×630 */}
      <div
        ref={captureRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: '-99999px',
          width: OG_W,
          height: OG_H,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <OGImageContent />
      </div>
    </>
  )
}

/* ═══════════════ TAB ═══════════════ */
export function TabApplications() {
  return (
    <TabShell
      number="10"
      eyebrow="Aplicações"
      title="A marca em uso real."
      accent="Cartão, deck, e-mail."
      lead="Como Mazari aparece fora do site institucional. Aplicações canônicas para business card, assinatura de e-mail, slide de capa, social cards e modelos de uso interno e externo."
    >
      {/* Business card showcase */}
      <Block tag="Business Card" title="Cartão de visita · 85 × 55 mm">
        <div className="relative rounded-lg border border-white/10 bg-background/40 overflow-hidden">
          <div className="absolute inset-0 mz-grid-bg opacity-20 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(210,255,40,0.07) 0%, transparent 70%)',
            }}
          />
          <div className="relative px-6 sm:px-10 py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Frente
                </span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
                  Recto
                </span>
              </div>
              <BusinessCardFront />
              <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45 text-center">
                Logo + tagline · papel preto fosco
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Verso
                </span>
                <span className="mz-mono text-[9px] uppercase tracking-widest text-white/40">
                  Verso
                </span>
              </div>
              <BusinessCardBack />
              <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45 text-center">
                Contato + QR · papel preto fosco
              </span>
            </div>
          </div>
        </div>

        {/* Especificação de impressão */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Dimensão', value: '85 × 55 mm', meta: 'Padrão internacional' },
            { label: 'Papel', value: '350 g/m²', meta: 'Couché fosco / soft touch' },
            { label: 'Acabamento', value: 'Hot stamping lime', meta: 'Sobre wordmark + ponto' },
            { label: 'Sangria', value: '+3 mm', meta: 'CMYK · 300 dpi' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-white/10 bg-background/60 p-4 flex flex-col gap-1"
            >
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                {s.label}
              </span>
              <span className="text-base font-bold text-white">{s.value}</span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-primary/80">
                {s.meta}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Gerador */}
      <BusinessCardGenerator />

      {/* Email signature generator */}
      <EmailSignatureGenerator />

      {/* Slide de capa */}
      <Block tag="Slide de Capa" title="Apresentação 16:9">
        <div className="aspect-video rounded-md border border-white/15 bg-background relative overflow-hidden">
          <div className="absolute inset-0 mz-grid-bg opacity-30" aria-hidden="true" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(210,255,40,0.10) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-0.5">
                <span className="mz-mono text-xl font-extrabold text-white tracking-tight">
                  MAZARI
                </span>
                <span className="mz-mono text-xl font-extrabold text-primary">.</span>
              </div>
              <span className="mz-tag">Q1 · 2026</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="mz-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Proposta Técnica
              </span>
              <h3 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight max-w-2xl">
                Plataforma de tokenização <br />
                <span className="text-primary italic font-serif font-medium">para ativos imobiliários.</span>
              </h3>
              <span className="mz-mono text-[11px] uppercase tracking-widest text-white/55">
                Cliente Confidencial · 04 / 2026
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="mz-dot" style={{ width: 5, height: 5 }} />
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                Confidencial · NDA aplicável
              </span>
            </div>
          </div>
        </div>
      </Block>

      {/* Social cards */}
      <div className="grid md:grid-cols-2 gap-5">
        <Block tag="Social · LinkedIn" title="Post format · 1:1">
          <div className="aspect-square rounded-md border border-white/15 bg-background relative overflow-hidden">
            <div className="absolute inset-0 mz-grid-bg opacity-30" aria-hidden="true" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <span className="mz-tag w-fit">CASE EM PRODUÇÃO</span>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-extrabold leading-tight">
                  120k
                  <span className="text-primary text-glow"> req/s</span>
                </span>
                <span className="text-base text-white/75 leading-snug">
                  4 edge locations · LCP 0.8s
                </span>
                <span className="text-base text-white/75 leading-snug">
                  18k usuários simultâneos
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="mz-mono text-[10px] uppercase tracking-widest text-white/45">
                  GLOMAM · Site institucional
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="mz-mono text-sm font-extrabold text-white">M</span>
                  <span className="mz-mono text-sm font-extrabold text-primary">.</span>
                </div>
              </div>
            </div>
          </div>
        </Block>

        <OGImageBlock />
      </div>

      {/* Web favicon strip */}
      <Block tag="Web Identity" title="Favicon · loading · select">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-background border border-white/15 rounded-lg p-2">
              <svg viewBox="0 0 180 180" className="w-10 h-10">
                <rect width="180" height="180" rx="36" fill="#080908" />
                <path d="M32 136V44H52L90 108L128 44H148V136H130V76L95 136H85L50 76V136H32Z" fill="#D2FF28" />
              </svg>
            </div>
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">Favicon</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-background border border-white/15 rounded-lg p-3 px-4 selection:bg-primary selection:text-black">
              <span className="text-sm">Texto selecionado</span>
            </div>
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">Selection · lime</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-background border border-white/15 rounded-lg p-3 flex items-center gap-2">
              <span className="mz-dot" style={{ width: 5, height: 5 }} />
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/55">
                Online · GMT-3
              </span>
            </div>
            <span className="mz-mono text-[9px] uppercase tracking-widest text-white/45">Status badge</span>
          </div>
        </div>
      </Block>
    </TabShell>
  )
}
