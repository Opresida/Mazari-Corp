import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import { PDFDocument } from 'pdf-lib'
import { ArrowLeft, Upload, ShieldCheck, ShieldAlert, FileSearch, Loader2, Hash, FileCheck2 } from 'lucide-react'
import { sha256Hex, parseMarker, type MazariMarker } from '@/lib/doc-hash'

type Mode = 'documento' | 'hash'
type Verdict = 'idle' | 'match' | 'stamped' | 'nomatch' | 'nohash' | 'error'

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
  const [mode, setMode] = useState<Mode>('documento')
  const [expected, setExpected] = useState('')
  const [fromQr, setFromQr] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')

  const [validating, setValidating] = useState(false)
  const [verdict, setVerdict] = useState<Verdict>('idle')
  const [computed, setComputed] = useState('')
  const [marker, setMarker] = useState<MazariMarker | null>(null)

  useEffect(() => {
    const fromUrl = getExpectedFromUrl()
    if (fromUrl) {
      setExpected(fromUrl)
      setFromQr(true)
      setMode('hash')
    }
  }, [])

  const resetResult = () => {
    setVerdict('idle')
    setComputed('')
    setMarker(null)
  }

  const pickFile = (f: File | null) => {
    if (!f) return
    setFile(f)
    setFileName(f.name)
    resetResult()
  }

  const expectedClean = normalizeHash(expected)
  const hashReady = expectedClean.length === 64
  const canValidate = !!file && (mode === 'documento' || hashReady)

  const validate = async () => {
    if (!file || !canValidate) return
    setValidating(true)
    resetResult()
    try {
      const bytes = new Uint8Array(await file.arrayBuffer())
      const hash = await sha256Hex(bytes)
      let mk: MazariMarker | null = null
      try {
        const doc = await PDFDocument.load(bytes)
        mk = parseMarker(doc.getKeywords())
      } catch {
        mk = null
      }
      setComputed(hash)
      setMarker(mk)

      const target = (mode === 'hash' ? expectedClean : '') || mk?.hash || ''
      if (target && hash === target) setVerdict('match')
      else if (mk) setVerdict('stamped')
      else if (target) setVerdict('nomatch')
      else setVerdict('nohash')
    } catch {
      setVerdict('error')
    } finally {
      setValidating(false)
    }
  }

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
            Escolha como quer validar. Tudo roda no seu navegador — o arquivo não é enviado a nenhum servidor.
          </p>
        </div>

        {/* Seletor de modo */}
        <div className="grid grid-cols-2 gap-3">
          <ModeButton
            active={mode === 'documento'}
            onClick={() => { setMode('documento'); resetResult() }}
            icon={<FileCheck2 className="h-4 w-4" />}
            title="Com o documento"
            desc="Tenho o PDF certificado pela Mazari"
          />
          <ModeButton
            active={mode === 'hash'}
            onClick={() => { setMode('hash'); resetResult() }}
            icon={<Hash className="h-4 w-4" />}
            title="Com o hash"
            desc="Recebi o hash e quero comparar"
          />
        </div>

        {/* Campo de hash (somente modo hash) */}
        {mode === 'hash' && (
          <div className="rounded-md border border-white/10 bg-background/40 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/45">
              <Hash className="h-3.5 w-3.5 text-primary" />
              Hash esperado
              {fromQr && <span className="mz-tag" style={{ fontSize: 9 }}>via QR Code</span>}
            </div>
            <input
              value={expected}
              onChange={(e) => { setExpected(e.target.value); setFromQr(false); resetResult() }}
              placeholder="Cole aqui o hash SHA-256 (64 caracteres) que você recebeu"
              spellCheck={false}
              className={`w-full rounded-md border bg-background/60 px-3 py-2.5 mz-mono text-[12px] text-white placeholder:text-white/30 break-all focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors ${
                hashReady ? 'border-primary/50' : expectedClean.length > 0 ? 'border-amber-500/50' : 'border-white/12 focus:border-primary/50'
              }`}
            />
            {expectedClean.length > 0 && !hashReady && (
              <p className="text-[11px] text-amber-400/80 leading-snug">
                Hash incompleto — {expectedClean.length}/64 caracteres (0–9, a–f).
              </p>
            )}
          </div>
        )}

        {/* Documento (sempre) */}
        <div className="flex flex-col gap-2">
          <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45">Documento</div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={`flex w-full flex-col items-center gap-3 rounded-md border border-dashed px-4 py-10 text-center transition-colors hover:border-primary/40 ${
              file ? 'border-primary/40 bg-primary/[0.03]' : 'border-white/15'
            }`}
          >
            {file ? <FileCheck2 className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8 text-white/40" />}
            <span className="text-sm text-white/80">{fileName || 'Clique para enviar o documento PDF'}</span>
            <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
              {mode === 'hash' ? 'Envie o documento original para comparar com o hash' : 'Envie o PDF certificado pela Mazari'}
            </span>
          </button>
          <input ref={fileRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => pickFile(e.target.files?.[0] ?? null)} />
        </div>

        {/* Botão validar */}
        <button
          type="button"
          onClick={validate}
          disabled={!canValidate || validating}
          className="flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-background transition-all hover:brightness-110 box-glow disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {validating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          {validating ? 'Validando…' : 'Validar emissão de documento'}
        </button>
        {!canValidate && (
          <p className="-mt-4 text-center text-[11px] text-white/40">
            {!file
              ? 'Envie o documento para habilitar a validação.'
              : 'Cole um hash SHA-256 válido (64 caracteres) para validar.'}
          </p>
        )}

        {/* Resultado */}
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
            title="Emissão Mazari confirmada"
            subtitle="Este PDF carrega um certificado de emissão Mazari. Os dados certificados estão abaixo. Para conferir a integridade do conteúdo, valide o documento original pelo hash."
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
              <span className="text-sm font-bold">Sem certificado embutido</span>
            </div>
            <p className="text-sm text-white/55 leading-snug">
              Este PDF não tem um certificado Mazari embutido. Para validar a emissão, use o modo “Com o hash” e cole o hash recebido. Hash deste arquivo:
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

function ModeButton({
  active, onClick, icon, title, desc,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-1.5 rounded-md border p-4 text-left transition-all ${
        active ? 'border-primary/40 bg-primary/[0.05]' : 'border-white/10 bg-background/40 hover:border-white/25'
      }`}
    >
      <span className={`flex items-center gap-2 text-sm font-bold ${active ? 'text-primary' : 'text-white/85'}`}>
        {icon}
        {title}
      </span>
      <span className="text-[11px] text-white/50 leading-snug">{desc}</span>
    </button>
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
