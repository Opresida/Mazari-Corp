import { useRef, useState } from 'react'
import { Link } from 'wouter'
import { Upload, ShieldCheck, FileCheck2, Copy, Check, Loader2, ExternalLink } from 'lucide-react'
import { TabShell, Block } from './TabShell'
import { stampPdf } from '@/lib/pdf-auth-page'
import { shortHash } from '@/lib/doc-hash'

const inputCls =
  'w-full rounded-md border border-white/12 bg-background/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors'
const labelCls = 'mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-1.5 block'

function hojeBR(): string {
  const now = new Date()
  return `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

export function TabAutenticar() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [signerName, setSignerName] = useState('')
  const [signerCargo, setSignerCargo] = useState('')
  const [signerDoc, setSignerDoc] = useState('')
  const [titulo, setTitulo] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ hash: string; bytes: Uint8Array; name: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const pickFile = (f: File | null) => {
    setResult(null)
    setError('')
    if (!f) return
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Envie um arquivo PDF.')
      return
    }
    setFile(f)
    if (!titulo) setTitulo(f.name.replace(/\.pdf$/i, ''))
  }

  const carimbar = async () => {
    if (!file) return setError('Selecione um PDF primeiro.')
    if (!signerName.trim()) return setError('Informe o nome do signatário.')
    setBusy(true)
    setError('')
    try {
      const original = new Uint8Array(await file.arrayBuffer())
      const { stampedBytes, hashHex } = await stampPdf(original, {
        docTitulo: titulo.trim() || file.name,
        signerName: signerName.trim(),
        signerCargo: signerCargo.trim() || undefined,
        signerDoc: signerDoc.trim() || undefined,
        dateStr: hojeBR(),
        validationBaseUrl: window.location.origin,
      })
      setResult({ hash: hashHex, bytes: stampedBytes, name: file.name.replace(/\.pdf$/i, '') })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha ao processar o PDF.')
    } finally {
      setBusy(false)
    }
  }

  const baixar = () => {
    if (!result) return
    const blob = new Blob([result.bytes as BlobPart], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.name}-autenticado-mazari.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyHash = () => {
    if (!result) return
    navigator.clipboard.writeText(result.hash).catch(() => undefined)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <TabShell
      number="13"
      eyebrow="Autenticar"
      title="A prova que"
      accent="ninguém adultera."
      lead="Carimbe qualquer PDF com um certificado de autenticação Mazari: hash SHA-256, QR Code e validade jurídica (Lei 14.063/2020). 100% no seu navegador — o arquivo nunca sai do seu dispositivo."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload + dados */}
        <div className="flex flex-col gap-5">
          <Block tag="Documento" title="Selecione o PDF">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={`flex w-full flex-col items-center gap-3 rounded-md border border-dashed px-4 py-8 text-center transition-colors ${
                file ? 'border-primary/40 bg-primary/[0.04]' : 'border-white/15 hover:border-primary/30'
              }`}
            >
              {file ? <FileCheck2 className="h-7 w-7 text-primary" /> : <Upload className="h-7 w-7 text-white/40" />}
              <span className="text-sm text-white/80">{file ? file.name : 'Clique para escolher um PDF'}</span>
              <span className="mz-mono text-[10px] uppercase tracking-widest text-white/40">
                {file ? `${(file.size / 1024).toFixed(0)} KB · trocar arquivo` : 'qualquer documento · contrato, recibo, proposta'}
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
            />
          </Block>

          <Block tag="Signatário" title="Quem autentica">
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelCls}>Título do documento</label>
                <input className={inputCls} value={titulo} placeholder="Ex: Recibo nº 0001" onChange={(e) => setTitulo(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Nome do signatário</label>
                <input className={inputCls} value={signerName} placeholder="Nome completo" onChange={(e) => setSignerName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Cargo (opcional)</label>
                  <input className={inputCls} value={signerCargo} placeholder="Diretor" onChange={(e) => setSignerCargo(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>CPF / CNPJ (opcional)</label>
                  <input className={inputCls} value={signerDoc} placeholder="000.000.000-00" onChange={(e) => setSignerDoc(e.target.value)} />
                </div>
              </div>
            </div>
          </Block>

          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">{error}</div>
          )}

          <button
            type="button"
            onClick={carimbar}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-background transition-all hover:brightness-110 box-glow disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {busy ? 'Carimbando…' : 'Carimbar documento'}
          </button>
        </div>

        {/* Resultado */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="mb-2 flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Certificado
          </div>
          {result ? (
            <div className="mz-card-soft p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/[0.06]">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">Documento autenticado</div>
                  <div className="mz-mono text-[10px] uppercase tracking-widest text-white/45">Certificado anexado ao PDF</div>
                </div>
              </div>

              <div className="rounded-md border border-primary/20 bg-background/60 p-4">
                <div className="mz-mono text-[10px] uppercase tracking-widest text-primary mb-1.5">Hash SHA-256</div>
                <div className="mz-mono text-[11px] text-white/80 break-all leading-relaxed">{result.hash}</div>
                <button
                  type="button"
                  onClick={copyHash}
                  className="mt-2 flex items-center gap-1.5 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copiado' : `Copiar (${shortHash(result.hash)})`}
                </button>
              </div>

              <button
                type="button"
                onClick={baixar}
                className="flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-background transition-all hover:brightness-110 box-glow"
              >
                <FileCheck2 className="h-4 w-4" />
                Baixar PDF autenticado
              </button>

              <Link href="/validar">
                <a className="flex items-center justify-center gap-1.5 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors">
                  <ExternalLink className="h-3 w-3" />
                  Abrir página de validação
                </a>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border border-white/10 bg-background/40 p-8 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-white/15" />
              <p className="mt-3 text-sm text-white/50">
                O certificado aparece aqui depois de carimbar. Ele anexa uma página final ao PDF com QR Code e o hash criptográfico.
              </p>
            </div>
          )}
        </div>
      </div>

      <Block tag="Como funciona" title="Autenticação por hash, sem intermediários">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ['01', 'Impressão digital', 'O SHA-256 transforma o PDF numa impressão digital única de 64 caracteres. Mudou 1 byte, muda o hash inteiro.'],
            ['02', 'Certificado anexo', 'Uma página final na identidade Mazari carrega o hash, QR Code e a base legal (Lei 14.063/2020 · eIDAS).'],
            ['03', 'Validação pública', 'Qualquer pessoa recalcula o hash do documento original e compara — prova criptográfica, sem depender de servidor.'],
          ].map(([n, t, d]) => (
            <div key={n} className="flex flex-col gap-2">
              <span className="mz-mono text-xs text-primary font-bold">{n}</span>
              <span className="text-sm font-bold text-white">{t}</span>
              <span className="text-xs text-white/65 leading-relaxed">{d}</span>
            </div>
          ))}
        </div>
      </Block>
    </TabShell>
  )
}
