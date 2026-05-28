import { useMemo, useState } from 'react'
import { Download, ReceiptText, RotateCcw } from 'lucide-react'
import { TabShell, Block } from './TabShell'
import { valorPorExtenso } from '@/lib/extenso'
import { downloadReciboPDF, formatBRLFromCents, type ReciboData } from '@/lib/recibo-pdf'

const FORMAS = ['PIX', 'Transferência bancária', 'Boleto', 'Cartão', 'Dinheiro', 'USDC / Cripto']

function hojeBR(): string {
  return new Date().toLocaleDateString('pt-BR')
}

const INITIAL: ReciboData = {
  numero: '0001',
  valorCents: 0,
  pagadorNome: '',
  pagadorDoc: '',
  pagadorEndereco: '',
  pagadorEmail: '',
  pagadorTelefone: '',
  referente: '',
  formaPagamento: 'PIX',
  recebedorNome: 'MAZARI CORP',
  recebedorDoc: '',
  recebedorEmail: 'contato@mazaricorp.com',
  cidade: 'Manaus / AM',
  data: hojeBR(),
  assinanteNome: '',
}

const inputCls =
  'w-full rounded-md border border-white/12 bg-background/60 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors'
const labelCls = 'mz-mono text-[10px] uppercase tracking-widest text-white/45 mb-1.5 block'

export function TabRecibo() {
  const [data, setData] = useState<ReciboData>(INITIAL)

  const set = <K extends keyof ReciboData>(key: K, val: ReciboData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }))

  const valorExtenso = useMemo(() => valorPorExtenso(data.valorCents), [data.valorCents])
  const valorFmt = formatBRLFromCents(data.valorCents)

  const onValor = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    set('valorCents', digits ? parseInt(digits, 10) : 0)
  }

  const reset = () => setData({ ...INITIAL, data: hojeBR() })
  const baixar = () => downloadReciboPDF(data, valorExtenso)

  return (
    <TabShell
      number="13"
      eyebrow="Recibo"
      title="O comprovante que"
      accent="fecha o ciclo."
      lead="Modelo de recibo na identidade Mazari. Preencha online, veja o resultado em tempo real e baixe o PDF pronto para enviar ao cliente — com valor por extenso gerado automaticamente."
    >
      <div className="grid lg:grid-cols-[1fr,1.05fr] gap-6">
        {/* ===== Formulário ===== */}
        <div className="flex flex-col gap-5">
          <Block tag="Dados do recibo" title="Preencher online">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Nº do recibo</label>
                  <input className={inputCls} value={data.numero} onChange={(e) => set('numero', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Data</label>
                  <input className={inputCls} value={data.data} onChange={(e) => set('data', e.target.value)} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Valor</label>
                <input
                  className={`${inputCls} text-primary font-bold`}
                  inputMode="numeric"
                  value={data.valorCents ? valorFmt : ''}
                  placeholder="R$ 0,00"
                  onChange={(e) => onValor(e.target.value)}
                />
                {data.valorCents > 0 && (
                  <p className="mt-1.5 text-[11px] italic text-white/55 leading-snug">“{valorExtenso}”</p>
                )}
              </div>

              <div>
                <label className={labelCls}>Recebemos de (cliente)</label>
                <input
                  className={inputCls}
                  value={data.pagadorNome}
                  placeholder="Nome ou razão social"
                  onChange={(e) => set('pagadorNome', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>CPF / CNPJ do cliente</label>
                <input
                  className={inputCls}
                  value={data.pagadorDoc}
                  placeholder="000.000.000-00"
                  onChange={(e) => set('pagadorDoc', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Endereço do cliente</label>
                <input
                  className={inputCls}
                  value={data.pagadorEndereco}
                  placeholder="Rua, nº, bairro — Cidade / UF"
                  onChange={(e) => set('pagadorEndereco', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>E-mail do cliente</label>
                  <input
                    className={inputCls}
                    value={data.pagadorEmail}
                    placeholder="cliente@email.com"
                    onChange={(e) => set('pagadorEmail', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Telefone do cliente</label>
                  <input
                    className={inputCls}
                    value={data.pagadorTelefone}
                    placeholder="(92) 90000-0000"
                    onChange={(e) => set('pagadorTelefone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Referente a</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={2}
                  value={data.referente}
                  placeholder="Descrição do serviço / produto"
                  onChange={(e) => set('referente', e.target.value)}
                />
              </div>

              <div>
                <label className={labelCls}>Forma de pagamento</label>
                <select
                  className={inputCls}
                  value={data.formaPagamento}
                  onChange={(e) => set('formaPagamento', e.target.value)}
                >
                  {FORMAS.map((f) => (
                    <option key={f} value={f} className="bg-background">
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Block>

          <Block tag="Recebedor" title="Dados Mazari">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Razão social</label>
                  <input className={inputCls} value={data.recebedorNome} onChange={(e) => set('recebedorNome', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>CNPJ</label>
                  <input className={inputCls} value={data.recebedorDoc} placeholder="00.000.000/0001-00" onChange={(e) => set('recebedorDoc', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Cidade</label>
                  <input className={inputCls} value={data.cidade} onChange={(e) => set('cidade', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>E-mail</label>
                  <input className={inputCls} value={data.recebedorEmail} onChange={(e) => set('recebedorEmail', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Assinante</label>
                <input className={inputCls} value={data.assinanteNome} placeholder="Nome de quem assina" onChange={(e) => set('assinanteNome', e.target.value)} />
              </div>
            </div>
          </Block>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={baixar}
              className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-background transition-all hover:brightness-110 box-glow"
            >
              <Download className="h-4 w-4" />
              Salvar PDF
            </button>
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/55 hover:text-primary transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Limpar
            </button>
          </div>
        </div>

        {/* ===== Preview ao vivo (espelha o PDF) ===== */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="mb-2 flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/40">
            <ReceiptText className="h-3.5 w-3.5 text-primary" />
            Pré-visualização
          </div>
          <div
            className="relative overflow-hidden rounded-md border border-primary/15"
            style={{ aspectRatio: '210 / 297', background: '#080908' }}
          >
            <div className="absolute inset-x-0 top-0 h-[6px] bg-primary" />
            <div className="flex h-full flex-col px-[7%] pb-[5%] pt-[7%]">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-baseline">
                    <span className="text-[clamp(15px,3.4vw,26px)] font-extrabold tracking-tight text-white">MAZARI</span>
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary" style={{ boxShadow: '0 0 8px rgba(210,255,40,0.7)' }} />
                  </div>
                  <span className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">
                    Engenharia Digital · Web3 · Security
                  </span>
                </div>
                <div className="text-right">
                  <div className="mz-mono text-[clamp(9px,1.9vw,14px)] text-primary">RECIBO</div>
                  <div className="mz-mono text-[clamp(6px,1.3vw,10px)] text-white/85">Nº {data.numero}</div>
                  <div className="mz-mono text-[clamp(5px,1.1vw,8px)] text-white/40">{data.data}</div>
                </div>
              </div>

              <div className="mt-[4%] h-px w-full bg-white/10">
                <div className="h-[1.5px] w-1/5 bg-primary" />
              </div>

              {/* Caixa de valor */}
              <div className="mt-[5%] flex items-center justify-between rounded border border-primary/25 px-[4%] py-[3.5%]">
                <div>
                  <div className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">Valor recebido</div>
                  <div className="text-[clamp(15px,3.6vw,26px)] font-extrabold text-primary">{valorFmt}</div>
                </div>
                <div className="text-right">
                  <div className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">Forma</div>
                  <div className="text-[clamp(8px,1.6vw,12px)] text-white/90">{data.formaPagamento}</div>
                </div>
              </div>

              {/* Corpo */}
              <div className="mt-[6%] flex flex-col gap-[4%] text-[clamp(7px,1.5vw,11px)]">
                <div>
                  <div className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">Recebemos de</div>
                  <div className="font-bold text-white">{data.pagadorNome || '—'}</div>
                  {data.pagadorDoc && <div className="mz-mono text-[clamp(5px,1.1vw,8px)] text-white/45">CPF / CNPJ: {data.pagadorDoc}</div>}
                  {data.pagadorEndereco && <div className="mz-mono text-[clamp(5px,1.1vw,8px)] text-white/45">{data.pagadorEndereco}</div>}
                  {(data.pagadorEmail || data.pagadorTelefone) && (
                    <div className="mz-mono text-[clamp(5px,1.1vw,8px)] text-white/45">
                      {[data.pagadorEmail, data.pagadorTelefone].filter(Boolean).join('  ·  ')}
                    </div>
                  )}
                </div>
                <div>
                  <div className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">A quantia de</div>
                  <div className="italic text-white/90">“{valorExtenso}”</div>
                </div>
                <div>
                  <div className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">Referente a</div>
                  <div className="text-white/90">{data.referente || '—'}</div>
                </div>
              </div>

              <div className="flex-1" />

              {/* Assinatura */}
              <div className="mt-[5%] border-t border-white/10 pt-[4%]">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="mz-mono text-[clamp(5px,1.1vw,8px)] uppercase tracking-widest text-white/40">Recebedor</div>
                    <div className="text-[clamp(7px,1.5vw,11px)] font-bold text-white">{data.recebedorNome}</div>
                    {data.recebedorDoc && <div className="mz-mono text-[clamp(5px,1vw,8px)] text-white/45">CNPJ: {data.recebedorDoc}</div>}
                    <div className="mz-mono text-[clamp(5px,1vw,8px)] text-white/45">{data.recebedorEmail}</div>
                  </div>
                  <div className="text-right">
                    <div className="mz-mono text-[clamp(5px,1.1vw,8px)] text-white/45">{data.cidade}, {data.data}</div>
                    <div className="mt-[14px] w-[140px] max-w-full border-t border-primary/50 pt-1">
                      <div className="text-[clamp(7px,1.4vw,10px)] font-bold text-white">{data.assinanteNome || data.recebedorNome}</div>
                      <div className="mz-mono text-[clamp(5px,1vw,7px)] uppercase tracking-widest text-white/40">Assinatura</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[4%] border-t border-primary/20 pt-[2.5%] text-center mz-mono text-[clamp(5px,1vw,7.5px)] text-white/40">
                MAZARI CORP · {data.recebedorEmail} · mazaricorp.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabShell>
  )
}
