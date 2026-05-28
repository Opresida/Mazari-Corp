import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'wouter'
import { PDFDocument } from 'pdf-lib'
import { ArrowLeft, Upload, ShieldCheck, ShieldAlert, FileSearch, Loader2, Hash } from 'lucide-react'
import { sha256Hex, parseMarker, type MazariMarker } from '@/lib/doc-hash'

type Verdict = 'idle' | 'checking' | 'match' | 'stamped' | 'nomatch' | 'nohash' | 'error'

function getExpectedFromUrl(): string {
  if (typeof window === 'undefined') return ''
  const params = new URLSearchParams(window.location.search)
  return (params.get('h') || '').toLowerCase().trim()
}

function normalizeHash(raw: string): string {
  return raw.toLowerCase().replace(/[^a-f0-9]/g, '')
}

export default function Validar() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [expected, setExpected] = useState('')
  const [fromQr, setFromQr] = useState(false)
  const [computed, setComputed] = useState('')
  const [marker, setMarker] = useState<MazariMarker | null>(null)
  const [checking, setChecking] = useState(false)
  const [readError, setReadError] = useState(false)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const fromUrl = getExpectedFromUrl()
    if (fromUrl) {
      setExpected(fromUrl)
      setFromQr(true)
    }
  }, [])

  const check = async (f: File | null) => {
    if (!f) return
    setChecking(true)
    setReadError(false)
    setFileName(f.name)
    setMarker(null)
    setComputed('')
    try {
      const bytes = new Uint8Array(await f.arrayBuffer())
      const hash = await sha256Hex(bytes)
      let mk: MazariMarker | null = null
      try {
        const doc = await PDFDocument.load(bytes)
        mk = parseMarker(doc.getKeywords())
      } catch {
        mk = null
      }
      setMarker(mk)
      setComputed(hash)
    } catch {
      setReadError(true)
    } finally {
      setChecking(false)
    }
  }

  // Veredito reativo: reage ao arquivo (computed/marker) E ao hash digitado (expected)
  const verdict = useMemo<Verdict>(() => {
    if (checking) return 'checking'
    if (readError) return 'error'
    if (!computed) return 'idle'
    const target = normalizeHash(expected) || marker?.hash || ''
    if (!target) return 'nohash'
    if (computed === target) return 'match'
    if (marker) return 'stamped'
    return 'nomatch'
  }, [checking, readError, computed, expected, marker])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <a className="group flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Mazari</span>
            </a>
          </Link>
          <div className="flex items-baseline gap-0.5">
            <span className="mz-mono text-base font-extrabold tracking-tight text-white">MAZARI</span>
            <span className="mz-mono text-base font-extrabold text-primary">.</span>
            <span className="ml-2 mz-mono text-[10px] uppercase tracking-[0.25em] text-white/40">/ validar</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 md:py-14 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="mz-tag w-fit">Validação de documento</span>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Verifique a autenticidade<br />
            <span className="text-primary italic font-serif font-medium text-glow">por hash criptográfico.</span>
          </h1>
          <p className="text-base text-white/60 leading-relaxed max-w-xl">
            Cole o hash recebido, envie o documento e confirme na hora se ele é o original. Tudo roda no seu navegador — o arquivo não é enviado a nenhum servidor.
          </p>
        </div>

        {/* Passo 1 — Hash esperado (editável; vem do QR se houver) */}
        <div className="rounded-md border border-white/10 bg-background/40 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/45">
            <Hash className="h-3.5 w-3.5 text-primary" />
            Passo 1 · Hash esperado
            {fromQr && <span className="mz-tag" style={{ fontSize: 9 }}>via QR Code</span>}
          </div>
          <input
            value={expected}
            onChange={(e) => {
              setExpected(e.target.value)
              setFromQr(false)
            }}
            placeholder="Cole aqui o hash SHA-256 (64 caracteres) que você recebeu"
            spellCheck={false}
            className="w-full rounded-md border border-white/12 bg-background/60 px-3 py-2.5 mz-mono text-[12px] text-white placeholder:text-white/30 break-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
          />
          <p className="text-[11px] text-white/40 leading-snug">
            Opcional se o PDF já tiver o certificado Mazari embutido — nesse caso o hash é lido automaticamente do arquivo.
          </p>
        </div>

        {/* Passo 2 — Documento */}
        <div className="flex flex-col gap-2">
          <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45">Passo 2 · Documento</div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-md border border-dashed border-white/15 px-4 py-10 text-center transition-colors hover:border-primary/40"
          >
            <Upload className="h-8 w-8 text-white/40" />
            <span className="text-sm text-white/80">{fileName || 'Clique para enviar o documento PDF'}</span>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">Envie o documento original para confirmar integridade</span>
          </button>
          <input ref={fileRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => check(e.target.files?.[0] ?? null)} />
        </div>

        {verdict === 'checking' && (
          <div className="flex items-center justify-center gap-2 text-white/60 py-6">
            <Loader2 className="h-5 w-5 animate-spin text-primary" /> Calculando hash…
          </div>
        )}

        {verdict === 'match' && (
          <ResultCard
            tone="ok"
            icon={<ShieldCheck className="h-7 w-7 text-primary" />}
            title="Documento autêntico"
            subtitle="O hash do documento bate com o esperado. O conteúdo não foi alterado — é o original."
            marker={marker}
            computed={computed}
          />
        )}

        {verdict === 'stamped' && (
          <ResultCard
            tone="info"
            icon={<FileSearch className="h-7 w-7 text-primary" />}
            title="Certificado Mazari detectado"
            subtitle="Este é o PDF com a página de certificado. O hash certifica o documento original (pré-certificado) — envie o arquivo original, ou compare o hash certificado abaixo."
            marker={marker}
            computed={computed}
          />
        )}

        {verdict === 'nomatch' && (
          <ResultCard
            tone="warn"
            icon={<ShieldAlert className="h-7 w-7 text-red-400" />}
            title="Hash não confere"
            subtitle="O hash deste arquivo não corresponde ao esperado. O documento pode ter sido alterado ou não é o original certificado."
            marker={marker}
            computed={computed}
          />
        )}

        {verdict === 'nohash' && (
          <div className="rounded-md border border-white/15 bg-background/60 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white/80">
              <Hash className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold">Hash calculado</span>
            </div>
            <p className="text-sm text-white/55 leading-snug">
              Cole o hash esperado no Passo 1 para comparar — ou este é o hash deste documento:
            </p>
            <div className="mz-mono text-[11px] text-white/80 break-all rounded border border-white/10 bg-background/60 p-3">{computed}</div>
          </div>
        )}

        {verdict === 'error' && (
          <div className="rounded-md border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
            Não foi possível ler o arquivo. Confirme que é um PDF válido.
          </div>
        )}

        <div className="border-t border-white/10 pt-6 mz-mono text-[10px] uppercase tracking-widest text-white/40 text-center">
          MAZARI CORP · Verificação criptográfica SHA-256 · Lei 14.063/2020 · eIDAS
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  tone, icon, title, subtitle, marker, computed,
}: {
  tone: 'ok' | 'info' | 'warn'
  icon: React.ReactNode
  title: string
  subtitle: string
  marker: MazariMarker | null
  computed: string
}) {
  const border = tone === 'warn' ? 'border-red-500/30' : 'border-primary/25'
  return (
    <div className={`rounded-md border ${border} bg-background/60 p-6 flex flex-col gap-5`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full border ${border} bg-white/[0.03]`}>{icon}</div>
        <div>
          <div className="text-lg font-bold text-white">{title}</div>
          <div className="text-sm text-white/60 leading-snug max-w-md">{subtitle}</div>
        </div>
      </div>

      {marker && (
        <div className="grid sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <Field label="Signatário" value={marker.signer || '—'} />
          <Field label="Data / Hora" value={marker.date || '—'} />
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
        {marker?.hash && (
          <div>
            <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">Hash certificado (original)</div>
            <div className="mz-mono text-[11px] text-white/80 break-all">{marker.hash}</div>
          </div>
        )}
        <div>
          <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">Hash deste arquivo</div>
          <div className="mz-mono text-[11px] text-white/80 break-all">{computed}</div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-1">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  )
}
